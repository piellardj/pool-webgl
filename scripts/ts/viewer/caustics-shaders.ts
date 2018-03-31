import Shader from "../gl-utils/shader";
import VBO from "../gl-utils/vbo";
import { encodeDecodeStr } from "../water-shaders";

const causticsVert: string =
    `attribute vec2 aVert;

uniform sampler2D uWater;

uniform vec2 uTexelSize;

uniform float uAmplitude;
uniform float uDepth;
uniform float uEta;

varying vec2 sourceCoords;
varying vec2 refractedCoords;

___ENCODE_DECODE___

vec3 computeNormal(vec2 coords)
{
    float dZx = decodeHeight(texture2D(uWater, coords + vec2(uTexelSize.x, 0))) -
                decodeHeight(texture2D(uWater, coords - vec2(uTexelSize.x, 0)));
    
    float dZy = decodeHeight(texture2D(uWater, coords + vec2(0, uTexelSize.y))) -
                decodeHeight(texture2D(uWater, coords - vec2(0, uTexelSize.y)));
    
    vec3 normal = cross(vec3(uTexelSize.x, 0, dZx), vec3(0, uTexelSize.y, dZy));
    normal.xy *= uAmplitude;

    return normalize(normal);
}

void main(void) {
    float h = decodeHeight(texture2D(uWater, aVert));
    vec3 normal = computeNormal(aVert);

    vec3 ray = normalize(vec3(0, 0, -1));
    ray = refract(ray, normal, uEta);
    vec3 toGround = uDepth * ray / ray.z;

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
    // float sourceArea = length(dot(dFdx(sourceCoords), dFdy(sourceCoords)));
    // float refractedArea = length(dot(dFdx(refractedCoords), dFdy(refractedCoords)));

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