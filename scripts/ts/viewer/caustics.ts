import GLResource from "../gl-utils/gl-resource";
import FBO from "../gl-utils/fbo";
import Water from "../water";
import Shader from "../gl-utils/shader";
import * as ShadersBuilder from "./caustics-shaders";

class Caustics extends GLResource {
    private _width: number;
    private _height: number;

    private _supported: boolean;

    private _gridWidth: number;
    private _gridHeight: number;

    private _shader: Shader;

    private _texture: WebGLTexture;
    private _fbo: FBO;

    private _vertices: WebGLBuffer;
    private _indices: WebGLBuffer;

    constructor(gl: WebGLRenderingContext, w: number, h: number) {
        super(gl);

        this._supported = gl.getExtension('OES_standard_derivatives') !== null;

        const n = 128;
        this._gridWidth = n;
        this._gridHeight = n;

        this.reset(w, h);
    }

    public freeGLResources(): void {
        const gl = super.gl; //shortcut

        if (this._shader) {
            this._shader.freeGLResources();
        }
        if (this._texture) {
            gl.deleteTexture(this._texture);
        }
        if (this._fbo) {
            this._fbo.freeGLResources();
        }

        if (this._vertices) {
            gl.deleteBuffer(this._vertices);
        }
        if (this._indices) {
            gl.deleteBuffer(this._indices);
        }
    }

    public compute(water: Water, amplitude: number, depth: number, eta: number): void {
        if (!this.supported)
            return;

        const gl = super.gl;
        const shader = this._shader;

        shader.u["uWater"].value = water.heightmap;
        shader.u["uTexelSize"].value = [1 / water.width, 1 / water.height];
        shader.u["uAmplitude"].value = amplitude;
        shader.u["uDepth"].value = depth;
        shader.u["uEta"].value = eta;

        this._fbo.bind([this._texture]);
        gl.clear(gl.COLOR_BUFFER_BIT);

        shader.use();
        shader.bindUniforms();//AndAttributes();

        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertices);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indices);

        const nbTriangles = 2 * (this._gridWidth - 1) * (this._gridHeight - 1);
        gl.drawElements(gl.TRIANGLES, 3 * nbTriangles, gl.UNSIGNED_SHORT, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);
    }

    public reset(w: number, h: number): void {
        if (!this.supported)
            return;

        this.freeGLResources();

        const gl = super.gl;

        this._width = w;
        this._height = h;

        this._shader = ShadersBuilder.buildCausticsShader(gl);

        this._fbo = new FBO(gl, w, h);

        /* Texture initialization */
        const data: number[] = new Array(3 * w * h).fill(127);
        const uintData = new Uint8Array(data);

        const wrap = gl.CLAMP_TO_EDGE;
        const filter = gl.LINEAR;
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0,
            gl.RGB, gl.UNSIGNED_BYTE, uintData);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);

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
                this._vertices = id;
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
                this._indices = id;
            }
        }
    }

    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }

    get texture(): WebGLTexture {
        return this._texture;
    }

    get supported(): boolean {
        return this._supported;
    }
}

export default Caustics;