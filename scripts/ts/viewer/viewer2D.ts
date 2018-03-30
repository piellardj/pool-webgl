import Viewer from "./viewer";
import Water from "../water";
import Shader from "../gl-utils/shader";
import * as ShadersBuilder from "./viewer2D-shaders";
import { mouse } from "../controls";

class Viewer2D extends Viewer {
    private _displayShader: Shader;

    private _tileTexture: WebGLTexture;

    private _specular: boolean;
    private _amplitude: number;
    private _depth: number;
    private _opacity: number;
    private _eta: number;

    constructor(gl: WebGLRenderingContext) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);

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

        this._displayShader = ShadersBuilder.buildDisplayShader(gl);
        this._displayShader.u["uTileTexture"].value = this._tileTexture;
        this._displayShader.u["uTileRepetition"].value = [4, 4];

        this.specular = true;
        this.amplitude = 0.001;
        this.depth = 1;
        this.opacity = 0.15;
        this.eta = 1.17;
    }

    public freeGLResources(): void {
        const gl = super.gl;

        this._displayShader.freeGLResources();
        gl.deleteTexture(this._tileTexture);
    }

    public display(water: Water): void {
        const gl = super.gl; //shortcut
        const displayShader = this._displayShader;

        displayShader.u["uWater"].value = water.heightmap;
        displayShader.u["uTexelSize"].value = [1 / water.width, 1 / water.height];

        displayShader.use();
        displayShader.bindUniformsAndAttributes();

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public interact(water: Water): void {
        if (mouse.pressed) {
            water.touch(mouse.pos[0] * water.width, mouse.pos[1] * water.height, 8);
        }
    }

    set specular(b: boolean) {
        this._specular = b;
        this._displayShader.u["uSpecular"].value = b;
    }
    get specular(): boolean {
        return this._specular;
    }

    set amplitude(a: number) {
        this._amplitude = a;
        this._displayShader.u["uAmplitude"].value = a;
    }
    get amplitude(): number {
        return this._amplitude;
    }

    set depth(d: number) {
        this._depth = d;
        this._displayShader.u["uDepth"].value = d;
    }
    get depth(): number {
        return this._depth;
    }

    set opacity(o: number) {
        this._opacity = o;
        this._displayShader.u["uOpacity"].value = o;
    }
    get opacity(): number {
        return this._opacity;
    }

    set eta(e: number) {
        this._eta = e;
        this._displayShader.u["uEta"].value = e;
    }
    get eta(): number {
        return this._eta;
    }
}

export default Viewer2D;