import GLResource from "../gl-utils/gl-resource";
import Water from "../water";

abstract class Viewer extends GLResource {
    private _showSpecular: boolean;
    private _showCaustics: boolean;
    private _amplitude: number;
    private _waterLevel: number;
    private _opacity: number;
    private _eta: number;

    constructor(gl: WebGLRenderingContext) {
        super(gl);
    }

    public freeGLResources(): void {
    }

    public abstract display(water: Water): void;

    public abstract interact(water: Water): void;

    protected abstract updateSpecular(): void;
    protected abstract updateCaustics(): void;
    protected abstract updateAmplitude(): void;
    protected abstract updateWaterLevel(): void;
    protected abstract updateOpacity(): void;
    protected abstract updateEta(): void;

    set specular(b: boolean) {
        this._showSpecular = b;
        this.updateSpecular();
    }
    get specular(): boolean {
        return this._showSpecular;
    }

    set caustics(b: boolean) {
        this._showCaustics = b;
        this.updateCaustics();
    }
    get caustics(): boolean {
        return this._showCaustics;
    }

    set amplitude(a: number) {
        this._amplitude = a;
        this.updateAmplitude();
    }
    get amplitude(): number {
        return this._amplitude;
    }

    set waterLevel(d: number) {
        this._waterLevel = d;
        this.updateWaterLevel();
    }
    get waterLevel(): number {
        return this._waterLevel;
    }

    set opacity(o: number) {
        this._opacity = o;
        this.updateOpacity();
    }
    get opacity(): number {
        return this._opacity;
    }

    set eta(e: number) {
        this._eta = e;
        this.updateEta();
    }
    get eta(): number {
        return this._eta;
    }
}

export default Viewer;