import Viewer from "./viewer";
import Water from "../water";
import Caustics from "./caustics";
import Shader from "../gl-utils/shader";
import FBO from "../gl-utils/fbo";
import * as ShadersBuilder from "./viewer2D-shaders";
import { mouse } from "../controls";

class Viewer2D extends Viewer {
    private _caustics: Caustics;

    private _displayShader: Shader;

    private _tileTexture: WebGLTexture;

    constructor(gl: WebGLRenderingContext) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);

        this._caustics = new Caustics(gl, 512, 512);
        this.caustics = true;

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

        this._caustics.freeGLResources();
        this._displayShader.freeGLResources();
        gl.deleteTexture(this._tileTexture);
    }

    public display(water: Water): void {
        const gl = super.gl; //shortcut

        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);

        if (this.caustics) {
            this._caustics.compute(water, this.amplitude, this.depth, this.eta);
        }

        const displayShader = this._displayShader;

        FBO.bindDefault(gl);

        displayShader.u["uWater"].value = water.heightmap;
        displayShader.u["uNormals"].value = water.normalmap;
        displayShader.u["uCausticsTexture"].value = this._caustics.texture;
        displayShader.u["uUseCaustics"].value = this.caustics;

        displayShader.use();
        displayShader.bindUniformsAndAttributes();

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public interact(water: Water): void {
        if (mouse.pressed) {
            water.touch(mouse.pos[0] * water.width, mouse.pos[1] * water.height, 8);
        }
    }

    protected updateSpecular(): void {
        this._displayShader.u["uSpecular"].value = super.specular;
    }

    protected updateCaustics(): void {
    }

    protected updateAmplitude(): void {
        this._displayShader.u["uAmplitude"].value = super.amplitude;
    }

    protected updateDepth(): void {
        this._displayShader.u["uDepth"].value = super.depth;
    }

    protected updateOpacity(): void {
        this._displayShader.u["uOpacity"].value = super.opacity;
    }
    
    protected updateEta(): void {
        this._displayShader.u["uEta"].value = super.eta;
    }
}

export default Viewer2D;