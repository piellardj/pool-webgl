import GLResource from "./gl-utils/gl-resource";
import FBO from "./gl-utils/fbo";
import Shader from "./gl-utils/shader";
import * as ShaderBuilder from "./water-shaders";

class Water extends GLResource {
    private _width: number;
    private _height: number;

    private _FBO: FBO;

    private _normalsTex: WebGLTexture;
    private _heightmapsTex: WebGLTexture[];
    private _currIndex: number;

    private _touchShader: Shader;
    private _updateShader: Shader;
    private _normalsShader: Shader;

    private _surfaceTension: number;
    private _springStiffness: number;
    private _dispersion: number;

    public rain: boolean;

    constructor(gl: WebGLRenderingContext, w: number, h: number) {
        super(gl);

        this._FBO = new FBO(gl, w, h);
        this._touchShader = ShaderBuilder.buildTouchShader(gl);
        this._updateShader = ShaderBuilder.buildUpdateShader(gl);
        this._normalsShader = ShaderBuilder.buildNormalsShader(gl);

        this.surfaceTension = 20.0;
        this.springStiffness = 0.1;
        this.dispersion = 0.999;

        this.rain = true;

        this.reset(w, h);
    }

    public freeGLResources(): void {
        if (this._FBO) {
            this._FBO.freeGLResources();
        }

        this.freeTextures();
        this.freeShaders();
    }

    private freeTextures(): void {
        const gl = super.gl; //shortcut

        if (this._normalsTex) {
            gl.deleteTexture(this._normalsTex);
        }
        if (this._heightmapsTex) {
            gl.deleteTexture(this._heightmapsTex[0]);
            gl.deleteTexture(this._heightmapsTex[1]);
        }
    }

    private freeShaders(): void {
        if (this._touchShader) {
            this._touchShader.freeGLResources();
        }

        if (this._updateShader) {
            this._updateShader.freeGLResources();
        }
    }

    public update(dt: number): void {
        const gl = this.gl; //shortcut

        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);

        if (this.rain && Math.random() < 0.1) {
            this.touch(Math.random() * this.width, Math.random() * this.height, 8);
        }

        const updateShader = this._updateShader;

        updateShader.u["uPrevWater"].value = this.currHeightmap;
        updateShader.u["uDt"].value = dt * 10;

        this._FBO.bind([this.nextHeightmap]);
        updateShader.use();
        updateShader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        this.switchHeightmaps();

        this.computeNormals();
    }

    private computeNormals(): void {
        const gl = this.gl; //shortcut
        const shader = this._normalsShader;

        shader.u["uWater"].value = this.currHeightmap;

        this._FBO.bind([this._normalsTex]);
        shader.use();
        shader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public touch(coordX: number, coordY: number, radius: number): void {
        const gl = this.gl; //shortcut
        const touchShader = this._touchShader;

        touchShader.u["uWater"].value = this.currHeightmap;
        touchShader.u["uCoords"].value = [coordX / this.width, coordY / this.height];
        touchShader.u["uSize"].value = [radius / this.width, radius / this.height];

        this._FBO.bind([this.nextHeightmap]);
        touchShader.use();
        touchShader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        this.switchHeightmaps();
        this.computeNormals();
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    set surfaceTension(c: number) {
        this._surfaceTension = c;
        this._updateShader.u["uC"].value = c;
    }
    set springStiffness(k: number) {
        this._springStiffness = k;
        this._updateShader.u["uK"].value = k;
    }
    set dispersion(f: number) {
        this._dispersion = f;
        this._updateShader.u["uF"].value = f;
    }

    get surfaceTension(): number {
        return this._surfaceTension;
    }
    get springStiffness(): number {
        return this._springStiffness;
    }
    get dispersion(): number {
        return this._dispersion;
    }

    get heightmap(): WebGLTexture {
        return this._heightmapsTex[this._currIndex];
    }

    get normalmap(): WebGLTexture {
        return this._normalsTex;
    }

    private get currHeightmap(): WebGLTexture {
        return this._heightmapsTex[this._currIndex];
    }

    private get nextHeightmap(): WebGLTexture {
        return this._heightmapsTex[(this._currIndex + 1) % 2];
    }

    private switchHeightmaps(): void {
        this._currIndex = (this._currIndex + 1) % 2;
    }

    public reset(w: number, h: number): void {
        this.freeTextures();

        const gl = super.gl; //shortcut

        this._width = w;
        this._height = h;
        this._FBO.width = w;
        this._FBO.height = h;

        this._updateShader.u["uTexelSize"].value = [1 / w, 1 / h];
        this._normalsShader.u["uTexelSize"].value = [1 / w, 1 / h];

        const uintTexels: number[] = new Array(4 * w * h).fill(127);
        const uintData = new Uint8Array(uintTexels);

        const wrap = gl.REPEAT;
        const filter = gl.LINEAR;
        let textures: WebGLTexture[] = [];
        for (let i = 0; i < 2; ++i) {
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0,
                gl.RGBA, gl.UNSIGNED_BYTE, uintData);
            textures.push(texture);
        }
        {
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0,
                gl.RGB, gl.UNSIGNED_BYTE, uintData);
            textures.push(texture);
        }

        for (let iT of textures) {
            gl.bindTexture(gl.TEXTURE_2D, iT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
        }

        this._normalsTex = textures[2];
        this._heightmapsTex = [textures[0], textures[1]];
        this._currIndex = 0;

        this.computeNormals();
    }
}

export default Water;