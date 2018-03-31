import Water from "./water";
import Viewer2D from "./viewer/viewer2D";

class Mouse {
    private elt: HTMLElement;

    public pressed: boolean;

    private _posInPx: number[];
    private _pos: number[];

    private _movementInPx: number[];
    private _movement: number[];

    private _pivotInPx: number[];

    constructor(elt: HTMLElement) {
        this.elt = elt;
        this._posInPx = [0, 0];
        this._pivotInPx = [0, 0];
        this.setPosInPx([0, 0]);
        this.setMovementInPx([0, 0]);

        const mouse = this;
        const mouseMove = (e) => {
            const absolutePos = [e.clientX, e.clientY];
            mouse.setPosInPx(mouse.documentToElement(absolutePos));
        };
        const mouseDown = () => {
            mouse.pressed = true;
            mouse.setMovementInPx([0, 0]);
            mouse._pivotInPx = mouse._posInPx;
        };
        const mouseUp = () => { mouse.pressed = false; };

        document.addEventListener("mousemove", mouseMove, false);
        elt.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);
    }

    public get posInPx(): number[] {
        return this._posInPx;
    }

    public get pos(): number[] {
        return this._pos;
    }

    public get movementInPx(): number[] {
        return this._movementInPx;
    }

    public get movement(): number[] {
        return this._movement;
    }

    private setPosInPx(pos: number[]): void {
        const toPivot: number[] = [
            this._pivotInPx[0] - pos[0],
            this._pivotInPx[1] - pos[1]
        ];
        const distToPivot = Math.sqrt(toPivot[0] * toPivot[0] + toPivot[1] * toPivot[1]);
        const maxDist = 16;

        if (distToPivot > maxDist) {
            toPivot[0] *= maxDist / distToPivot;
            toPivot[1] *= maxDist / distToPivot;

            this._pivotInPx[0] = pos[0] + toPivot[0];
            this._pivotInPx[1] = pos[1] + toPivot[1];
        }
        const movementInPx = [-toPivot[0] / maxDist, -toPivot[1] / maxDist];
        this.setMovementInPx(movementInPx);
        this._posInPx = pos;
        this._pos = this.setRelative(pos);
    }

    private setMovementInPx(movement: number[]): void {
        this._movementInPx = movement;
        this._movement = this.setRelative(movement);
    }

    private setRelative(pos: number[]): number[] {
        return [
            pos[0] / this.elt.clientWidth,
            pos[1] / this.elt.clientHeight
        ];
    }
    private documentToElement(pos: number[]): number[] {
        const rect = this.elt.getBoundingClientRect();
        return [
            pos[0] - rect.left,
            this.elt.clientHeight - (pos[1] - rect.top),
        ];
    }
}

let mouse: Mouse = new Mouse(document.body);

function bindMouse(canvas: HTMLCanvasElement): void {
    mouse = new Mouse(canvas);
}

function bindControls(water: Water, viewer2D: Viewer2D): void {
    function bindInput(element: HTMLElement, func, input: string) {
        element.addEventListener(input, func, false);
        func();
    }

    {
        function setResolution(size: number, radio: HTMLInputElement) {
            if (radio.checked) {
                water.reset(size, size);
            }
        }
        const resolutions: number[] = [128, 256, 512];

        for (let res of resolutions) {
            const radioName = "quality-" + res + "-button";
            const radio = document.getElementById(radioName) as HTMLInputElement;
            const update = () => { setResolution(res, radio); };
            bindInput(radio, update, "change");
        }
    }

    {
        const rainCheckbox: HTMLInputElement = document.getElementById("rain-checkbox") as HTMLInputElement;
        const updateRain = () => { water.rain = rainCheckbox.checked; };
        bindInput(rainCheckbox, updateRain, "change");
    }

    {
        const tensionSlider: HTMLInputElement = document.getElementById("tension-slider") as HTMLInputElement;
        const updateTension = () => { water.surfaceTension = +tensionSlider.value; };
        bindInput(tensionSlider, updateTension, "input");
    }
    {
        const springSlider: HTMLInputElement = document.getElementById("spring-slider") as HTMLInputElement;
        const updateSpring = () => { water.springStiffness = +springSlider.value; };
        bindInput(springSlider, updateSpring, "input");
    }
    {
        const dispersionSlider: HTMLInputElement = document.getElementById("dispersion-slider") as HTMLInputElement;
        const updateDispersion = () => { water.dispersion = +dispersionSlider.value; };
        bindInput(dispersionSlider, updateDispersion, "input");
    }

    {
        const specularCheckbox: HTMLInputElement = document.getElementById("specular-checkbox") as HTMLInputElement;
        const updateSpecular = () => { viewer2D.specular = specularCheckbox.checked; };
        bindInput(specularCheckbox, updateSpecular, "change");
    }
    {
        const causticsCheckbox: HTMLInputElement = document.getElementById("caustics-checkbox") as HTMLInputElement;
        const updateCaustics = () => { viewer2D.caustics = causticsCheckbox.checked; };
        bindInput(causticsCheckbox, updateCaustics, "change");
    }
    {
        const amplitudeSlider: HTMLInputElement = document.getElementById("amplitude-slider") as HTMLInputElement;
        const updateAmplitude = () => { viewer2D.amplitude = +amplitudeSlider.value; };
        bindInput(amplitudeSlider, updateAmplitude, "input");
    }
    {
        const depthSlider: HTMLInputElement = document.getElementById("depth-slider") as HTMLInputElement;
        const updateDepth = () => { viewer2D.depth = +depthSlider.value; };
        bindInput(depthSlider, updateDepth, "input");
    }
    {
        const opacitySlider: HTMLInputElement = document.getElementById("opacity-slider") as HTMLInputElement;
        const updateOpacity = () => { viewer2D.opacity = +opacitySlider.value; };
        bindInput(opacitySlider, updateOpacity, "input");
    }
    {
        const etaSlider: HTMLInputElement = document.getElementById("refraction-slider") as HTMLInputElement;
        const updateEta = () => { viewer2D.eta = +etaSlider.value; };
        bindInput(etaSlider, updateEta, "input");
    }
}

function bind(canvas: HTMLCanvasElement, water: Water, viewer2D: Viewer2D): void {
    bindControls(water, viewer2D);
    bindMouse(canvas);
}

export { mouse, bind };