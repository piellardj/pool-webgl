import Shader from "../gl-utils/shader";
import { encodeDecodeStr } from "../water-shaders";

const waterCommonStr: string =
    `
/* Fresnel factor describes the proportion of refracted and reflected.
* Arguments expected to be normalized. */
float getFresnelFactor(const vec3 normal, const vec3 fromEye)
{
    float F0 = (1.0 - uEta) / (1.0 + uEta);
    F0 = F0 * F0;
    //float F0 = 0.5;
        
    return mix(pow(1.0 - dot(normal,-fromEye), 5.0), 1.0, F0);
}

vec3 getTileColor(const vec2 coords)
{
    if (any(lessThan(coords, vec2(0))) || any(greaterThan(coords, vec2(1)))) {
        return vec3(0);
    }

    return texture2D(uTileTexture, 4.0 * coords).rgb;
}

float getCaustics(const vec2 coords)
{
    return 0.0;
}

vec3 getFloorColor(const vec2 coords)
{
    return getTileColor(coords) + getCaustics(coords);
}

/* Floor color mixed with opacity.
* 'refracted' expected to be normalized. */
vec3 getRefractedColor(const vec3 entryPoint, vec3 refracted)
{
    if (refracted.z >= 0.0) {
        return WATER_COLOR;
    }

    refracted *= -entryPoint.z / refracted.z;

    vec2 groundCoords = entryPoint.xy + .5 + refracted.xy;
    vec3 floorColor = getFloorColor(groundCoords);

    float opacity = uOpacity * length(refracted);
    opacity = clamp(opacity, 0.0, 1.0);

    return mix(floorColor, WATER_COLOR, opacity);
}

vec3 getReflectedColor(const vec3 dir)
{
    return 0.5*WATER_COLOR;
}

vec4 getSpecular(const vec3 reflected)
{
    return vec4(1,0,0,0);
}

vec3 computeColor(const vec3 pos, const vec3 fromEye, const vec3 normal)
{
    vec3 refracted = refract(fromEye, normal, uEta);
    vec3 reflected = reflect(fromEye, normal);

    vec3 refractedColor = getRefractedColor(vPosition, refracted);
    vec3 reflectedColor = getReflectedColor(reflected);

    float fresnelFactor = getFresnelFactor(fromEye, normal);

    vec3 surfaceColor = mix(refractedColor, reflectedColor, fresnelFactor);
    vec4 specularColor = getSpecular(reflected);

    return mix(surfaceColor, specularColor.rgb, specularColor.a);
}`;

const sidesVert: string =
    `attribute vec3 aPosition; //in {-.5, +.5} x {-.5, +.5} x {+0, +1}
attribute vec2 aNormal; //normalized in {-1, +1} x {-1, +1}

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float uDepth;
uniform float uAmplitude;

varying vec3 vPosition;
varying vec2 vNormal;
varying float relativeHeight; //relative to amplitude, in [-1, +1]

void main(void) {
    float dH = uAmplitude / 2.0;

    vPosition = aPosition;
    vPosition.z *= uDepth + dH;

    vNormal = aNormal;

    relativeHeight = (vPosition.z - uDepth) / dH;
    
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 1.0);
}`;

const sidesFrag: string =
    `precision mediump float;

uniform sampler2D uWater;
uniform sampler2D uTileTexture;

uniform vec3 uEyePos;

uniform float uEta;
uniform float uOpacity;

varying vec3 vPosition;
varying vec2 vNormal;
varying float relativeHeight; //relative to amplitude, in [-1, +1]

const vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);
const vec3 SPARKLE_COLOR = vec3(1);

___ENCODE_DECODE___

___WATER_COMMON___

/* Returns true for every fragment above the water level */
bool shouldSkip()
{
    float surface = decodeHeight(texture2D(uWater, vPosition.xy + .5));
    return (relativeHeight > surface);
}

void main(void)
{
    /* Skip the fragments above water level */
    if (shouldSkip()) {
        discard;
    }

    vec3 fromEye = normalize(vPosition - uEyePos);
    vec3 normal = vec3(vNormal, 0); //already normalized

    vec3 color = computeColor(vPosition, fromEye, normal);

    gl_FragColor = vec4(color, 1);
}`;

const surfaceVert: string =
    `attribute vec2 aSampleCoords; //in [0,1] x [0,1]

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D uWater;
uniform sampler2D uNormals;

uniform float uDepth;
uniform float uAmplitude;

varying vec3 vPosition;
varying vec3 vNormal;

___ENCODE_DECODE___

void main(void) {
    float height = decodeHeight(texture2D(uWater, aSampleCoords));

    float dH = uAmplitude / 2.0;

    vPosition.xy = aSampleCoords - .5;
    vPosition.z = uDepth + dH * height;

    vNormal = decodeNormal(texture2D(uNormals, aSampleCoords));
    vNormal = normalize(vec3(vNormal * vec3(dH, dH, 1)));
    
    gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 1.0);
}`;

const surfaceFrag: string =
    `precision mediump float;

uniform sampler2D uTileTexture;

uniform vec3 uEyePos;

uniform float uEta;
uniform float uOpacity;

varying vec3 vPosition;
varying vec3 vNormal;

const vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);
const vec3 SPARKLE_COLOR = vec3(1);

___WATER_COMMON___

void main(void)
{
    vec3 fromEye = normalize(vPosition - uEyePos);
    vec3 normal = normalize(vNormal);

    vec3 color = computeColor(vPosition, fromEye, normal);

    gl_FragColor = mix(vec4(vNormal, 1), vec4(color, 1), 1.0);
}`;

function buildSidesShader(gl: WebGLRenderingContext): Shader {
    const vertSrc = sidesVert;
    let fragSrc = sidesFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    fragSrc = fragSrc.replace(/___WATER_COMMON___/g, waterCommonStr);

    return new Shader(gl, vertSrc, fragSrc);
}

function buildSurfaceShader(gl: WebGLRenderingContext): Shader {
    const vertSrc = surfaceVert.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    let fragSrc = surfaceFrag.replace(/___WATER_COMMON___/g, waterCommonStr);

    return new Shader(gl, vertSrc, fragSrc);
}

export {
    buildSidesShader,
    buildSurfaceShader,
};