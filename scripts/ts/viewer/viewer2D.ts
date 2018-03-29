import Viewer from "./viewer";
import Water from "../water";
import Shader from "../gl-utils/shader";
import * as ShadersBuilder from "./viewer2D-shaders";

class Viewer2D extends Viewer {
    private _displayShader: Shader;

    constructor(gl: WebGLRenderingContext) {
        super(gl);

        this._displayShader = ShadersBuilder.buildDisplayShader(gl);
    }

    public freeGLResources(): void {
        this._displayShader.freeGLResources();
    }

    public display(water: Water): void {
        const gl = super.gl; //shortcut

        this._displayShader.u["uWater"].value = water.heightmap;
        this._displayShader.use();
        this._displayShader.bindUniformsAndAttributes();

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}

export default Viewer2D;