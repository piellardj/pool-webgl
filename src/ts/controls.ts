import Water from "./water";
import Viewer2D from "./viewer/viewer2D";
import Viewer3D from "./viewer/viewer3D";

import "./page-interface-generated";

function bindControls(water: Water, viewer2D: Viewer2D, viewer3D: Viewer3D): void {
    {
        const RESOLUTION_CONTROL_ID = "quality";
        const setResolution = (resolution: string[]) => {
            const size = +resolution[0];
            water.reset(size, size);
        }
        Page.Tabs.addObserver(RESOLUTION_CONTROL_ID, setResolution);
        setResolution(Page.Tabs.getValues(RESOLUTION_CONTROL_ID));
    }
    {
        const RAIN_CONTROL_ID = "rain-checkbox-id";
        const updateRain = (enable: boolean) => { water.rain = enable; };
        Page.Checkbox.addObserver(RAIN_CONTROL_ID, updateRain);
        updateRain(Page.Checkbox.isChecked(RAIN_CONTROL_ID));
    }
    {
        const TENSION_CONTROL_ID = "surface-tension-range-id";
        const updateTension = (tension: number) => { water.surfaceTension = tension; };
        Page.Range.addObserver(TENSION_CONTROL_ID, updateTension);
        updateTension(Page.Range.getValue(TENSION_CONTROL_ID));
    }
    {
        const SPRING_CONTROL_ID = "stiffness-range-id";
        const updateSpring = (stiffness: number) => { water.springStiffness = stiffness; };
        Page.Range.addObserver(SPRING_CONTROL_ID, updateSpring);
        updateSpring(Page.Range.getValue(SPRING_CONTROL_ID));
    }
    {
        const DISPERSION_CONTROL_ID = "dispersion-range-id";
        const updateDispersion = (dispersion: number) => { water.dispersion = dispersion; };
        Page.Range.addObserver(DISPERSION_CONTROL_ID, updateDispersion);
        updateDispersion(Page.Range.getValue(DISPERSION_CONTROL_ID));
    }

    {
        const SPECULAR_CONTROL_ID = "specular-checkbox-id";
        const updateSpecular = (enable: boolean) => {
            viewer2D.specular = enable;
            viewer3D.specular = enable;
        };
        Page.Checkbox.addObserver(SPECULAR_CONTROL_ID, updateSpecular);
        updateSpecular(Page.Checkbox.isChecked(SPECULAR_CONTROL_ID));
    }
    {
        const CAUSTICS_CONTROL_ID = "caustics-checkbox-id";
        const updateCaustics = (enable: boolean) => {
            viewer2D.caustics = enable;
            viewer3D.caustics = enable;
        };
        Page.Checkbox.addObserver(CAUSTICS_CONTROL_ID, updateCaustics);
        updateCaustics(Page.Checkbox.isChecked(CAUSTICS_CONTROL_ID));
    }
    {
        const FRESNEL_CONTROL_ID = "fresnel-checkbox-id";
        const updateSpecular = (enable: boolean) => {
            viewer2D.fresnel = enable;
            viewer3D.fresnel = enable;
        };
        Page.Checkbox.addObserver(FRESNEL_CONTROL_ID, updateSpecular);
        updateSpecular(Page.Checkbox.isChecked(FRESNEL_CONTROL_ID));
    }
    {
        const AMPLITUDE_CONTROL_ID = "amplitude-range-id";
        const updateAmplitude = (amplitude: number) => {
            viewer2D.amplitude = amplitude;
            viewer3D.amplitude = amplitude;
        };
        Page.Range.addObserver(AMPLITUDE_CONTROL_ID, updateAmplitude);
        updateAmplitude(Page.Range.getValue(AMPLITUDE_CONTROL_ID));
    }
    {
        const LEVEL_CONTROL_ID = "level-range-id";
        const updateWaterLevel = (level: number) => {
            viewer2D.waterLevel = level;
            viewer3D.waterLevel = level;
        };
        Page.Range.addObserver(LEVEL_CONTROL_ID, updateWaterLevel);
        updateWaterLevel(Page.Range.getValue(LEVEL_CONTROL_ID));
    }
    {
        const OPACITY_CONTROL_ID = "opacity-range-id";
        const updateOpacity = (opacity: number) => {
            viewer2D.opacity = opacity;
            viewer3D.opacity = opacity;
        };
        Page.Range.addObserver(OPACITY_CONTROL_ID, updateOpacity);
        updateOpacity(Page.Range.getValue(OPACITY_CONTROL_ID));
    }
    {
        const ETA_CONTROL_ID = "refraction-range-id";
        const updateEta = (eta: number) => {
            viewer2D.eta = eta;
            viewer3D.eta = eta;
        };
        Page.Range.addObserver(ETA_CONTROL_ID, updateEta);
        updateEta(Page.Range.getValue(ETA_CONTROL_ID));
    }
}

function bind(water: Water, viewer2D: Viewer2D, viewer3D: Viewer3D): void {
    bindControls(water, viewer2D, viewer3D);
}

function bindRendererChooser(choose2D: () => void, choose3D: () => void) {
    function bindViewer(viewerStr: string[]) {
        if (viewerStr[0] === "2D") {
            choose2D();
        } else {
            choose3D();
        }
    }
    const VIEWER_CONTROL_ID = "viewer";
    Page.Tabs.addObserver(VIEWER_CONTROL_ID, bindViewer);
    bindViewer(Page.Tabs.getValues(VIEWER_CONTROL_ID));
}

export { bind, bindRendererChooser };