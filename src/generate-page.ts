import * as fs from "fs";
import * as fse  from "fs-extra";
import * as path from "path";
import { Demopage } from "webpage-templates";

const data = {
    title: "Pool",
    description: "Water ripples simulation running on GPU",
    introduction: [
        "This project is a WebGL simulation running entirely on GPU. The water surface is modelled as a grid of springs. In 3D mode you can move the camera with the mouse and zoom in or out with ctrl + mouse wheel. In 2D mode you can interact with the water using the left mouse button."
    ],
    githubProjectName: "pool-webgl",
    readme: {
        filepath: path.join(__dirname, "..", "README.md"),
        branchName: "master"
    },
    additionalLinks: [],
    scriptFiles: [
        "script/gl-matrix-2.5.1-min.js",
        "script/main.min.js"
    ],
    indicators: [
        {
            id: "fps",
            label: "FPS"
        }
    ],
    canvas: {
        width: 512,
        height: 512,
        enableFullscreen: true
    },
    controlsSections: [
        {
            title: "Simulation",
            controls: [
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "Quality",
                    id: "quality",
                    unique: true,
                    options: [
                        {
                            value: "128",
                            label: "128",
                            checked: true
                        },
                        {
                            value: "256",
                            label: "256"
                        },
                        {
                            value: "512",
                            label: "512"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Rain",
                    id: "rain-checkbox-id",
                    checked: true
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Surface tension",
                    id: "surface-tension-range-id",
                    min: 0,
                    max: 30,
                    value: 20,
                    step: 0.1
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Spring stiffness",
                    id: "stiffness-range-id",
                    min: 0,
                    max: 1,
                    value: 0.15,
                    step: 0.01
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Dispersion",
                    id: "dispersion-range-id",
                    min: 0.9,
                    max: 1,
                    value: 0.996,
                    step: 0.001
                }
            ]
        },
        {
            title: "Rendering",
            controls: [
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "Viewer",
                    id: "viewer",
                    unique: true,
                    options: [
                        {
                            value: "2D",
                            label: "2D"
                        },
                        {
                            value: "3D",
                            label: "3D",
                            checked: true
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Specular",
                    id: "specular-checkbox-id",
                    checked: true
                },
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Caustics",
                    id: "caustics-checkbox-id"
                },
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Fresnel",
                    id: "fresnel-checkbox-id",
                    checked: true
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Amplitude",
                    id: "amplitude-range-id",
                    min: 0,
                    max: 0.06,
                    value: 0.03,
                    step: 0.001
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Water level",
                    id: "level-range-id",
                    min: 0.03,
                    max: 5,
                    value: 0.7,
                    step: 0.01
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Opacity",
                    id: "opacity-range-id",
                    min: 0,
                    max: 1.5,
                    value: 0.4,
                    step: 0.01
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Refraction",
                    id: "refraction-range-id",
                    min: 0.5,
                    max: 1,
                    value: 0.8,
                    step: 0.01
                }
            ]
        }
    ]
};

const SRC_DIR = path.resolve(__dirname);
const DEST_DIR = path.resolve(__dirname, "..", "docs");
const minified = true;

const buildResult = Demopage.build(data, DEST_DIR, {
    debug: !minified,
});

// disable linting on this file because it is generated
buildResult.pageScriptDeclaration = "/* tslint:disable */\n" + buildResult.pageScriptDeclaration;

const SCRIPT_DECLARATION_FILEPATH = path.resolve(__dirname, ".", "ts", "page-interface-generated.ts");
fs.writeFileSync(SCRIPT_DECLARATION_FILEPATH, buildResult.pageScriptDeclaration);


fse.copySync(path.resolve(SRC_DIR, "static"), DEST_DIR);
