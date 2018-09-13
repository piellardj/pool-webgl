import * as Utils from "./gl-utils/utils";
import FBO from "./gl-utils/fbo";
import Water from "./water";
import Viewer from "./viewer/viewer";
import Viewer2D from "./viewer/viewer2D";
import Viewer3D from "./viewer/viewer3D";
import ViewerCommon from "./viewer/viewerCommon";
import * as Controls from "./controls";

/** Initializes a WebGL context */
function initGL(canvas: HTMLCanvasElement, flags: any): WebGLRenderingContext {
    let gl: WebGLRenderingContext = canvas.getContext("webgl", flags) as WebGLRenderingContext;
    if (!gl) {
        gl = canvas.getContext("experimental-webgl", flags);
        if (!gl) {
            alert("Your browser or device does not seem to support WebGL.");
            return null;
        }
        alert("Your browser or device only supports experimental WebGL.\n" +
            "The simulation may not run as expected.");
    }

    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    Utils.resizeCanvas(gl, false);

    return gl;
}

function addEventToResizeButton(): void {
    const canvasContainer = document.getElementById("canvas-container") as HTMLElement;
    const resizeButton = document.getElementById("resize-button") as HTMLElement;

    if (canvasContainer === null || resizeButton === null)
        return;
    
    resizeButton.addEventListener("click", function() {
        canvasContainer.classList.toggle("fullscreen");

        if (canvasContainer.classList.contains("fullscreen")) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
    });

    window.addEventListener("keypress", function(e: any) {
        console.log("ozgnzo");
        console.log(e.keyCode);
        if (e.keyCode == 27) {
            canvasContainer.classList.toggle("fullscreen");
        }
    }, false);
}

window.addEventListener("load", function() {
    console.log("nodsfnog");
    addEventToResizeButton();
}, false);

function main() {
    const canvas: HTMLCanvasElement = document.getElementById("glcanvas") as HTMLCanvasElement;
    const gl: WebGLRenderingContext = initGL(canvas, { alpha: false });
    if (!gl)// || !Requirements.check(gl))
        return;

    const side = 512;
    const water: Water = new Water(gl, side, side);
    const viewerCommon: ViewerCommon = new ViewerCommon(gl, 512, "rc/tile.png");
    const viewer2D: Viewer2D = new Viewer2D(gl, viewerCommon);
    const viewer3D: Viewer3D = new Viewer3D(gl, viewerCommon);

    Controls.bind(canvas, water, viewer2D, viewer3D);

    let viewer: Viewer = viewer3D;
    Controls.bindRendererChooser(
        () => { viewer = viewer2D; },
        () => { viewer = viewer3D; });

    /* Update the FPS indicator every second. */
    let instantFPS: number = 0;
    const fpsText = document.getElementById("fps-text");
    const updateFpsText = function () {
        fpsText.textContent = instantFPS.toFixed(0);
    };
    setInterval(updateFpsText, 1000);

    let lastUpdate = 0;
    function mainLoop(time) {
        time *= 0.001; //dt is now in seconds
        let dt = time - lastUpdate;
        instantFPS = 1 / dt;
        lastUpdate = time;

        /* Updating */
        viewer.interact(water);
        water.update(1 / 60);

        Utils.resizeCanvas(gl, false);
        
        /* Drawing */
        if (viewer.caustics) {
            viewerCommon.caustics.compute(water, viewer.amplitude, viewer.waterLevel, viewer.eta);
        }

        FBO.bindDefault(gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        viewer.display(water, viewerCommon);

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
}

main();