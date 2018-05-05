import Viewer from "./viewer";
import ViewerCommon from "./viewerCommon";
import Water from "../water";
import Caustics from "./caustics";
import Shader from "../gl-utils/shader";
import FBO from "../gl-utils/fbo";
import * as ShadersBuilder from "./viewer3D-shaders";
import { mouse } from "../controls";
import { Mouse, MoveCallback } from "../mouse";
import OrbitalCamera from "../orbitalCamera";

class Viewer3D extends Viewer {
    private _vertices: WebGLBuffer;
    private _normals: WebGLBuffer;

    private _pMatrix: number[];
    private _mvpMatrix: number[];
    private _camera: OrbitalCamera;

    private _sidesShader: Shader;
    private _surfaceShader: Shader;

    private _gridWidth: number;
    private _gridHeight: number;

    private _gridVertices: WebGLBuffer;
    private _gridIndices: WebGLBuffer;

    constructor(gl: WebGLRenderingContext, common: ViewerCommon) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);

        this._pMatrix = mat4.create();
        this._mvpMatrix = mat4.create();
        mat4.perspective(this._pMatrix, 45, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);

        this._camera = new OrbitalCamera([0, 0, this.waterLevel - .5], 1.7);
        this._camera.theta = 0;
        this._camera.phi = 0.8;

        const n = 256;
        this.initSurface(n, n);

        this.init();

        const shaders = [this._sidesShader, this._surfaceShader];
        for (let shader of shaders) {
            shader.u["uTileTexture"].value = common.tileTexture;
            shader.u["uCaustics"].value = common.caustics.texture;
        }

        const minPhi = 0.000001, maxPhi = 1.2;
        const viewer = this;
        const moveCamera: MoveCallback = (m: Mouse, mvt: number[], relMvt: number[]) => {
            if (mouse.pressed) {
                viewer._camera.theta -= 2 * 3.14159 * relMvt[0];
                viewer._camera.phi += 2 * relMvt[1];
                viewer._camera.phi = Math.min(maxPhi, Math.max(minPhi, viewer._camera.phi));
                viewer.updateMVPMatrix();
            }
        }
        mouse.addMoveCallback(moveCamera);
    }

    private updateMVPMatrix(): void {
        mat4.multiply(this._mvpMatrix, this._pMatrix, this._camera.viewMatrix);
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
        const gl = super.gl; //shortcut

        gl.deleteBuffer(this._vertices);
        gl.deleteBuffer(this._normals);
        this._sidesShader.freeGLResources();
        this._surfaceShader.freeGLResources();

        gl.deleteBuffer(this._gridVertices);
        gl.deleteBuffer(this._gridIndices);
    }

    public display(water: Water, common: ViewerCommon): void {
        const gl = super.gl; //shortcut

        /* Update camera position */
        this._sidesShader.u["uEyePos"].value = this._camera.eyePos;
        this._surfaceShader.u["uEyePos"].value = this._camera.eyePos;

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
        shader.u["uNormals"].value = water.normalmap;

        shader.use();
        shader.bindUniforms();

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

        this._sidesShader = ShadersBuilder.buildSidesShader(gl);
        this._sidesShader.u["uMVPMatrix"].value = this._mvpMatrix;

        this._surfaceShader = ShadersBuilder.buildSurfaceShader(gl);
        this._surfaceShader.u["uMVPMatrix"].value = this._mvpMatrix;

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

    protected updateSpecular(): void {
        this._sidesShader.u["uSpecular"].value = this.specular;
        this._surfaceShader.u["uSpecular"].value = this.specular;
    }

    protected updateCaustics(): void {
        this._sidesShader.u["uShowCaustics"].value = this.caustics;
        this._surfaceShader.u["uShowCaustics"].value = this.caustics;
    }

    protected updateAmplitude(): void {
        const amplitude = 5 * this.amplitude;
        this._sidesShader.u["uAmplitude"].value = amplitude;
        this._surfaceShader.u["uAmplitude"].value = amplitude;
    }

    protected updateWaterLevel(): void {
        this._sidesShader.u["uWaterLevel"].value = this.waterLevel;
        this._surfaceShader.u["uWaterLevel"].value = this.waterLevel;
        this._camera.focusPoint = [0, 0, this.waterLevel - .5];
        this.updateMVPMatrix();
    }

    protected updateOpacity(): void {
        this._sidesShader.u["uOpacity"].value = this.opacity;
        this._surfaceShader.u["uOpacity"].value = this.opacity;
    }

    protected updateEta(): void {
        this._sidesShader.u["uEta"].value = this.eta;
        this._surfaceShader.u["uEta"].value = this.eta;

        let F0 = (1 - this.eta) / (1 + this.eta);
        F0 = F0 * F0;
        this._sidesShader.u["uF0"].value = F0;
        this._surfaceShader.u["uF0"].value = F0;
    }
}

export default Viewer3D;