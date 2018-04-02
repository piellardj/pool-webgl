import Shader from "../gl-utils/shader";
import VBO from "../gl-utils/vbo";
import { encodeDecodeStr } from "../water-shaders";

const causticsVert: string =
    `attribute vec2 aVert;

uniform sampler2D uWater;
uniform sampler2D uNormals;

uniform float uAmplitude;
uniform float uWaterLevel;
uniform float uEta;

varying vec2 sourceCoords;
varying vec2 refractedCoords;

___ENCODE_DECODE___

void main(void) {
    float height = decodeHeight(texture2D(uWater, aVert));
    height = uWaterLevel + 0.5 * uAmplitude * height;
    vec3 normal = decodeNormal(texture2D(uNormals, aVert), uAmplitude);

    const vec3 fromLight = vec3(0, 0, -1);
    vec3 refracted = refract(fromLight, normal, uEta);
    vec3 toGround = height * refracted / refracted.z;

    vec2 groundCoords = aVert + toGround.xy;

    sourceCoords = aVert;
    refractedCoords = groundCoords;

    gl_Position = vec4(2.0*groundCoords - 1.0, 0.0, 1.0);
}`;

const causticsFrag: string =
    `#extension GL_OES_standard_derivatives : enable
precision mediump float;

varying vec2 sourceCoords;
varying vec2 refractedCoords;

void main(void)
{
    float sourceArea = length(dFdx(sourceCoords)) * length(dFdy(sourceCoords));
    float refractedArea = length(dFdx(refractedCoords)) * length(dFdy(refractedCoords));

    float variation = sourceArea / refractedArea;

    gl_FragColor = .2 * vec4(variation - 0.75);
}`;

function buildCausticsShader(gl: WebGLRenderingContext): Shader {
    const vertSrc = causticsVert.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);;
    const fragSrc = causticsFrag;

    return new Shader(gl, vertSrc, fragSrc);
}

export {
    buildCausticsShader,
};