
type Callback = (m: Mouse, ...args: any[]) => void;
type PressCallback = (m: Mouse) => void;
type ReleaseCallback = (m: Mouse) => void;
type MoveCallback = (m: Mouse, mvt: number[], relativeMvt: number[]) => void;
type WheelCallback = (m: Mouse, delta: number) => void;

class Mouse {
    private _elt: HTMLElement;

    private _pressed: boolean;
    private _pos: number[];

    private _pressCallbacks: PressCallback[];
    private _releaseCallbacks: ReleaseCallback[];
    private _moveCallbacks: MoveCallback[];
    private _wheelCallbacks: WheelCallback[];

    constructor(elt: HTMLElement) {
        this._elt = elt;
        this._pressed = false;
        this._pos = [0, 0];
        this._pressCallbacks = [];
        this._releaseCallbacks = [];
        this._moveCallbacks = [];
        this._wheelCallbacks = [];

        const mouse = this;
        const mouseMove = (e) => {
            const absolutePos = [e.clientX, e.clientY];
            const newPos = mouse.documentToElement(absolutePos);

            const mvt = [newPos[0] - mouse.pos[0], newPos[1] - mouse.pos[1]];
            mouse._pos = newPos;

            for (let callback of this._moveCallbacks) {
                callback(mouse, mvt, mouse.setRelative(mvt));
            }
        };
        const mouseDown = () => {
            mouse._pressed = true;
            for (let callback of this._pressCallbacks) {
                callback(mouse);
            }
        };
        const mouseUp = () => {
            mouse._pressed = false;
            for (let callback of this._releaseCallbacks) {
                callback(mouse);
            }
        };

        const mouseWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (e.ctrlKey && mouse.isInElt) {
               e.preventDefault();

                for (let callback of this._wheelCallbacks) {
                    callback(mouse, e.deltaX || e.deltaY || e.deltaZ);
                }
            }
        };

        document.addEventListener("mousemove", mouseMove, false);
        elt.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);
        elt.addEventListener("wheel", mouseWheel, false);
    }

    public get pressed(): boolean {
        return this._pressed;
    }

    public get pos(): number[] {
        return this._pos;
    }

    public get relativePos(): number[] {
        return this.setRelative(this.pos);
    }

    public get isInElt(): boolean {
        const p = this.relativePos;
        return p[0] > 0 && p[1] > 0 && p[0] < 1 && p[1] < 1;
    }

    public addMoveCallback(callback: MoveCallback): void {
        this.addCallback(callback, this._moveCallbacks);
    }
    public removeMoveCallback(callback: MoveCallback): boolean {
        return this.removeCallback(callback, this._moveCallbacks);
    }

    public addPressCallback(callback: PressCallback): void {
        this.addCallback(callback, this._pressCallbacks);
    }
    public removePressCallback(callback: PressCallback): boolean {
        return this.removeCallback(callback, this._moveCallbacks);
    }

    public addReleaseCallback(callback: ReleaseCallback): void {
        this.addCallback(callback, this._releaseCallbacks);
    }
    public removeReleaseCallback(callback: ReleaseCallback): boolean {
        return this.removeCallback(callback, this._releaseCallbacks);
    }

    public addWheelCallback(callback: WheelCallback): void {
        this.addCallback(callback, this._wheelCallbacks);
    }
    public removeWheelCallback(callback: WheelCallback): boolean {
        return this.removeCallback(callback, this._wheelCallbacks);
    }

    private addCallback(callback: Callback, callbackList: Callback[]): void {
        if (this.findIndexOf(callback, callbackList) < 0) {
            callbackList.push(callback);
        }
    }

    private removeCallback(callback: Callback, callbackList: Callback[]): boolean {
        const index = this.findIndexOf(callback, callbackList);

        if (index < 0) {
            return false;
        }

        callbackList.splice(index, 1);
        return true;
    }

    private findIndexOf<T>(e: T, a: T[]): number {
        const l = a.length;

        for (let i = 0; i < l; i++) {
            if (a[i] === e) {
                return i;
            }
        }

        return -1;
    }

    private setRelative(p: number[]): number[] {
        return [
            p[0] / this._elt.clientWidth,
            p[1] / this._elt.clientHeight,
        ];
    }
    private documentToElement(pos: number[]): number[] {
        const rect = this._elt.getBoundingClientRect();
        return [
            pos[0] - rect.left,
            this._elt.clientHeight - (pos[1] - rect.top),
        ];
    }
}

export { Mouse, Callback, PressCallback, ReleaseCallback, MoveCallback, WheelCallback};