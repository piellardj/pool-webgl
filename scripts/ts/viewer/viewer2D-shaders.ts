import Shader from "../gl-utils/shader";
import VBO from "../gl-utils/vbo";
import { encodeDecodeStr } from "../water-shaders";

const fullscreenVert: string =
    `attribute vec2 aCorner; //{0,1}x{0,1}

varying vec2 sampleCoords;

void main(void) {
    sampleCoords = aCorner;
    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);
}`;

const displayFrag: string =
    `precision mediump float;

uniform sampler2D uWater;

varying vec2 sampleCoords;

___ENCODE_DECODE___

void main(void) {
    float h = decodeHeight(texture2D(uWater, sampleCoords)) * 10.0;

    gl_FragColor = vec4(vec3(h*0.5+0.5), 1);
}`;

function buildDisplayShader(gl: WebGLRenderingContext): Shader {
    const vertSrc: string = fullscreenVert;
    const fragSrc = displayFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);

    const shader: Shader = new Shader(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = VBO.createQuad(gl, 0, 0, 1, 1);
    return shader
}

export {
    buildDisplayShader,
};