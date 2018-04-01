import Viewer from "./viewer";
import Water from "../water";
import Caustics from "./caustics";
import Shader from "../gl-utils/shader";
import FBO from "../gl-utils/fbo";
import * as ShadersBuilder from "./viewer3D-shaders";
import { mouse } from "../controls";

class Viewer3D extends Viewer {
    private _vertices: WebGLBuffer;
    private _normals: WebGLBuffer;

    private _tileTexture: WebGLTexture;

    private _specular: boolean;
    public caustics: boolean;
    private _amplitude: number;
    private _depth: number;
    private _opacity: number;
    private _eta: number;

    private _pMatrix;
    private _mvMatrix;

    private _distance: number;
    private _angle: number;

    private _sidesShader: Shader;
    private _surfaceShader: Shader;

    private _gridWidth: number;
    private _gridHeight: number;

    private _gridVertices: WebGLBuffer;
    private _gridIndices: WebGLBuffer;

    constructor(gl: WebGLRenderingContext) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);

        this._distance = 1;
        this._angle = 0;

        this._depth = 2;
        this._amplitude = .1;

        /* Texture */
        this._tileTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._tileTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        const tileTexture = this._tileTexture;

        const tileImg = new Image();
        tileImg.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, tileTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tileImg);

            if (isPowerOf2(tileImg.width) && isPowerOf2(tileImg.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        tileImg.src = "rc/tile.png";

        const n = 128;
        this.initSurface(n, n);

        this.init();
    }

    public initSurface(w: number, h: number): void {
        const gl = super.gl; //shortcut

        this._gridWidth = w;
        this._gridHeight = h;

        /* Grid vertices */
        {
            const nX = this._gridWidth;
            const nY = this._gridHeight;
            {
                const vert = [];
                for (let iY = 0; iY < nY; ++iY) {
                    for (let iX = 0; iX < nX; ++iX) {
                        vert.push(iX / (nX - 1));
                        vert.push(iY / (nY - 1));
                    }
                }
                const array = new Float32Array(vert);

                const id = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, id);
                gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                this._gridVertices = id;
            }
            {
                const indices = [];
                for (let iY = 0; iY < nY - 1; ++iY) {
                    for (let iX = 0; iX < nX - 1; ++iX) {
                        indices.push(iY * nX + iX);
                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);

                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);
                    }
                }

                const array = new Uint16Array(indices);

                const id = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                this._gridIndices = id;
            }
        }
    }

    public freeGLResources(): void {
        const gl = super.gl;

        gl.deleteTexture(this._tileTexture);
        gl.deleteBuffer(this._vertices);
        gl.deleteBuffer(this._normals);
        this._sidesShader.freeGLResources();
        this._surfaceShader.freeGLResources();

        gl.deleteBuffer(this._gridVertices);
        gl.deleteBuffer(this._gridIndices);
    }

    public display(water: Water): void {
        const gl = super.gl; //shortcut

        /* Update camera position */
        this._angle += 0.002;

        const from = [
            this._distance * Math.cos(this._angle),
            this._distance * Math.sin(this._angle),
            this.depth + .8];
        const to = [0, 0, this.depth - .5];
        const up = [0, 0, 1];
        mat4.lookAt(this._mvMatrix, from, to, up);

        this._sidesShader.u["uEyePos"].value = from;
        this._surfaceShader.u["uEyePos"].value = from;

        /* Actual displaying */
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        this.displaySides(water);
        this.displaySurface(water);
    }

    public interact(water: Water): void {
    }

    private displaySides(water: Water): void {
        const gl = super.gl; //shortcut
        const shader = this._sidesShader;

        shader.u["uWater"].value = water.heightmap;
        shader.u["uTileTexture"].value = this._tileTexture;

        shader.use();
        shader.bindUniforms();

        const vLoc = 0;
        const nLoc = 1;
        gl.enableVertexAttribArray(vLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertices);
        gl.vertexAttribPointer(vLoc, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(nLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._normals);
        gl.vertexAttribPointer(nLoc, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 4 * 6);

        gl.disableVertexAttribArray(nLoc);
        gl.disableVertexAttribArray(vLoc);
    }

    private displaySurface(water: Water): void {
        const gl = super.gl; //shortcut
        const shader = this._surfaceShader;

        shader.u["uWater"].value = water.heightmap;
        shader.u["uTileTexture"].value = this._tileTexture;
        shader.u["uNormals"].value = water.normalmap;

        shader.use();
        shader.bindUniforms();//AndAttributes();

        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._gridVertices);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._gridIndices);

        const nbTriangles = 2 * (this._gridWidth - 1) * (this._gridHeight - 1);
        gl.drawElements(gl.TRIANGLES, 3 * nbTriangles, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);
    }

    private init() {
        const gl = super.gl; //shortcut

        this._pMatrix = mat4.create();
        mat4.perspective(this._pMatrix, 45, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);

        this._mvMatrix = mat4.create();

        this._sidesShader = ShadersBuilder.buildSidesShader(gl);
        this._sidesShader.u["uMVMatrix"].value = this._mvMatrix;
        this._sidesShader.u["uPMatrix"].value = this._pMatrix;

        this._surfaceShader = ShadersBuilder.buildSurfaceShader(gl);
        this._surfaceShader.u["uMVMatrix"].value = this._mvMatrix;
        this._surfaceShader.u["uPMatrix"].value = this._pMatrix;

        /* Buffer data */
        {
            const vert = [
                +.5, -.5, +1,
                -.5, -.5, +1,
                -.5, -.5, +0,
                +.5, -.5, +1,
                -.5, -.5, +0,
                +.5, -.5, +0,

                +.5, +.5, +1,
                +.5, -.5, +1,
                +.5, -.5, +0,
                +.5, +.5, +1,
                +.5, -.5, +0,
                +.5, +.5, +0,

                +.5, +.5, +1,
                -.5, +.5, +0,
                -.5, +.5, +1,
                -.5, +.5, +0,
                +.5, +.5, +1,
                +.5, +.5, +0,

                -.5, -.5, +1,
                -.5, +.5, +1,
                -.5, -.5, +0,
                -.5, -.5, +0,
                -.5, +.5, +1,
                -.5, +.5, +0,];

            const id = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, id);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
            this._vertices = id;
        }

        {
            const norm = [
                0, -1,
                0, -1,
                0, -1,
                0, -1,
                0, -1,
                0, -1,

                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,

                0, +1,
                0, +1,
                0, +1,
                0, +1,
                0, +1,
                0, +1,

                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,];

            const id = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, id);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);
            this._normals = id;
        }
    }

    set specular(b: boolean) {
        this._specular = b;
        //this._displayShader.u["uSpecular"].value = b;
    }
    get specular(): boolean {
        return this._specular;
    }

    set amplitude(a: number) {
        this._amplitude = a;
        this._sidesShader.u["uAmplitude"].value = 200 * a;
        this._surfaceShader.u["uAmplitude"].value = 200 * a;
    }
    get amplitude(): number {
        return this._amplitude;
    }

    set depth(d: number) {
        this._depth = d;
        this._sidesShader.u["uDepth"].value = d;
        this._surfaceShader.u["uDepth"].value = d;
    }
    get depth(): number {
        return this._depth;
    }

    set opacity(o: number) {
        this._opacity = o;
        this._sidesShader.u["uOpacity"].value = o;
        this._surfaceShader.u["uOpacity"].value = o;
    }
    get opacity(): number {
        return this._opacity;
    }

    set eta(e: number) {
        this._eta = e;
        this._sidesShader.u["uEta"].value = e;
        this._surfaceShader.u["uEta"].value = e;
    }
    get eta(): number {
        return this._eta;
    }
}

export default Viewer3D;