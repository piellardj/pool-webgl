import GLResource from "./gl-utils/gl-resource";
import FBO from "./gl-utils/fbo";
import Shader from "./gl-utils/shader";
import * as ShaderBuilder from "./water-shaders";

class Water extends GLResource {
    private _width: number;
    private _height: number;

    private _FBO: FBO;

    private _heightmapsTex: WebGLTexture[];
    private _currIndex: number;

    private _touchShader: Shader;
    private _updateShader: Shader;

    private _surfaceTension: number;
    private _springStiffness: number;
    private _dispersion: number;

    public rain: boolean;
    
    constructor(gl: WebGLRenderingContext, w: number, h: number) {
        super(gl);

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
        if (this.rain && Math.random() < 0.02) {
            this.touch(Math.random()  * this.width, Math.random() * this.height, 8);
        }

        const gl = this.gl; //shortcut
        const updateShader = this._updateShader;

        updateShader.u["uPrevWater"].value = this.currHeightmap;
        updateShader.u["uDt"].value = dt * 10;

        this._FBO.bind([this.nextHeightmap]);
        updateShader.use();
        updateShader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        this.switchHeightmaps();
    }

    public touch(coordX: number, coordY: number, radius: number) {
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
        this.freeGLResources();

        const gl = super.gl; //shortcut

        this._width = w;
        this._height = h;
        this._FBO = new FBO(gl, w, h);

        this._touchShader = ShaderBuilder.buildTouchShader(gl);
        this._updateShader = ShaderBuilder.buildUpdateShader(gl);
        this._updateShader.u["uTexelSize"].value = [1 / w, 1 / h];

        this.surfaceTension = 3.0;
        this.springStiffness = 0.2;
        this.dispersion = 0.997;

        const uintTexels: number[] = new Array(4 * w * h).fill(127);
        const uintData = new Uint8Array(uintTexels);

        let textures: WebGLTexture[] = [];
        for (let i = 0; i < 2; ++i) {
            let texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0,
                gl.RGBA, gl.UNSIGNED_BYTE, uintData);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            textures.push(texture);
        }

        this._heightmapsTex = textures;
        this._currIndex = 0;
    }
}

export default Water;