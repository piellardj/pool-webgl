import Viewer from "./viewer";
import ViewerCommon from "./viewerCommon";
import Water from "../water";
import Caustics from "./caustics";
import Shader from "../gl-utils/shader";
import FBO from "../gl-utils/fbo";
import Viewport from "../gl-utils/viewport";
import * as ShadersBuilder from "./viewer2D-shaders";
import { mouse } from "../controls";

class Viewer2D extends Viewer {
    private _displayShader: Shader;
    private _viewport: Viewport;

    constructor(gl: WebGLRenderingContext, common: ViewerCommon) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);
        
        this._displayShader = ShadersBuilder.buildDisplayShader(gl);
        this._displayShader.u["uTileTexture"].value = common.tileTexture;
        this._displayShader.u["uCaustics"].value = common.caustics.texture;

        this._viewport = new Viewport;
    }

    public freeGLResources(): void {
        this._displayShader.freeGLResources();
    }

    private updateViewport(): void {
        const gl = super.gl;
        const side = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);
        
        this._viewport.left = 0.5 * (gl.drawingBufferWidth - side);
        this._viewport.lower = 0.5 * (gl.drawingBufferHeight - side);
        this._viewport.width = side;
        this._viewport.height = side;
    }

    public display(water: Water, common: ViewerCommon): void {
        const gl = super.gl; //shortcut

        this.updateViewport();

        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);

        const displayShader = this._displayShader;

        FBO.bindDefault(gl, this._viewport);

        displayShader.u["uWater"].value = water.heightmap;
        displayShader.u["uNormals"].value = water.normalmap;

        displayShader.use();
        displayShader.bindUniformsAndAttributes();

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    public interact(water: Water): void {
        if (mouse.pressed) {
            const p = mouse.pos;

            this.updateViewport();
            p[0] = (p[0] - this._viewport.left) / this._viewport.width;
            p[1] = (p[1] - this._viewport.lower) / this._viewport.height;

            water.touch(p[0] * water.width, p[1] * water.height, 8);
        }
    }

    protected updateSpecular(): void {
        this._displayShader.u["uShowSpecular"].value = this.specular;
    }

    protected updateCaustics(): void {
        this._displayShader.u["uShowCaustics"].value = this.caustics;
    }

    protected updateFresnel(): void {
    }

    protected updateAmplitude(): void {
        this._displayShader.u["uAmplitude"].value = this.amplitude;
    }

    protected updateWaterLevel(): void {
        this._displayShader.u["uWaterLevel"].value = this.waterLevel;
    }

    protected updateOpacity(): void {
        this._displayShader.u["uOpacity"].value = this.opacity;
    }
    
    protected updateEta(): void {
        this._displayShader.u["uEta"].value = this.eta;
    }
}

export default Viewer2D;