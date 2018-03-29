import GLResource from "../gl-utils/gl-resource";
import Water from "../water";

abstract class Viewer extends GLResource {
    constructor(gl: WebGLRenderingContext) {
        super(gl);
    }

    public freeGLResources(): void {
    }

    public abstract display(water: Water): void;
}

export default Viewer;