import Shader from "../gl-utils/shader";
import { encodeDecodeStr } from "../water-shaders";

const waterCommonStr: string =
    `
uniform sampler2D uCaustics;
uniform sampler2D uTileTexture;

uniform vec3 uLightDir; //normalized

uniform float uF0;
uniform float uEta;
uniform float uOpacity;
uniform bool uSpecular;
uniform bool uShowCaustics;
uniform bool uFresnel;

const vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);
const vec3 SPECULAR_COLOR = vec3(1);
const float TILE_REPETITION = 4.0;

/* Fresnel factor describes the proportion of refracted and reflected.
* Arguments expected to be normalized. */
float getFresnelFactor(const vec3 normal, const vec3 fromEye)
{
    float computed = mix(pow(1.0 - dot(normal,-fromEye), 5.0), 1.0, uF0);
    return min(float(uFresnel), computed);
}

vec3 getTileColor(const vec2 coords)
{
    return texture2D(uTileTexture, TILE_REPETITION * coords).rgb;
}

float getCaustics(const vec2 coords)
{
    return mix(0.5, texture2D(uCaustics, coords).r, float(uShowCaustics));
}

vec3 getFloorColor(const vec2 coords)
{
    if (any(lessThan(coords, vec2(0))) || any(greaterThan(coords, vec2(1)))) {
        return vec3(0);
    }

    return getTileColor(coords) * (0.5 + getCaustics(coords));
}

/* Floor color mixed with opacity.
* 'refracted' expected to be normalized. */
vec3 getRefractedColor(const vec3 entryPoint, vec3 refracted)
{
    if (refracted.z >= 0.0) {
        return WATER_COLOR;
    }

    refracted *= -entryPoint.z / refracted.z;

    vec2 groundCoords = entryPoint.xy + refracted.xy;
    vec3 floorColor = getFloorColor(groundCoords + .5);

    /*float f = 1.0;

    if (groundCoords.x < -.5) {
        f = min(f, abs((-.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));
    }
    if (groundCoords.x > .5) {
        f = min(f, abs((.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));
    }
    if (groundCoords.y < -.5) {
        f = min(f, abs((-.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));
    }
    if (groundCoords.y > .5) {
        f = min(f, abs((.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));
    }

    refracted *= f;*/

    float opacity = uOpacity * entryPoint.z;//length(refracted);
    opacity = clamp(opacity, 0.0, 1.0);

    return mix(floorColor, WATER_COLOR, opacity);
}

vec3 getReflectedColor(const vec3 dir)
{
    return vec3(0.5, 0.5, 0.8);
}

vec4 getSpecular(const vec3 reflected)
{
    float f = max(0.0, dot(-uLightDir, reflected));
    f = pow(f, 200.0);
    f *= float(uSpecular);

    return vec4(SPECULAR_COLOR, f);
}

vec3 computeColor(const vec3 pos, const vec3 fromEye, const vec3 normal)
{
    vec3 refracted = refract(fromEye, normal, uEta);
    vec3 reflected = reflect(fromEye, normal);

    vec3 refractedColor = getRefractedColor(pos, refracted);
    vec3 reflectedColor = getReflectedColor(reflected);

    float fresnelFactor = getFresnelFactor(fromEye, normal);

    vec3 surfaceColor = mix(refractedColor, reflectedColor, fresnelFactor);
    vec4 specularColor = getSpecular(reflected);

    return mix(surfaceColor, specularColor.rgb, specularColor.a);
}`;

const sidesVert: string =
    `attribute vec3 aPosition; //in {-.5, +.5} x {-.5, +.5} x {+0, +1}
attribute vec2 aNormal; //normalized in {-1, +1} x {-1, +1}

uniform mat4 uMVPMatrix;

uniform float uWaterLevel;
uniform float uAmplitude;

varying vec3 vPosition;
varying vec2 vNormal;
varying float relativeHeight; //relative to amplitude, in [-1, +1]

void main(void) {
    float dH = uAmplitude / 2.0;

    vPosition = aPosition;
    vPosition.z *= uWaterLevel + dH;

    vNormal = aNormal;

    relativeHeight = (vPosition.z - uWaterLevel) / dH;
    
    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);
}`;

const sidesFrag: string =
    `precision mediump float;

uniform sampler2D uWater;

uniform vec3 uEyePos;

varying vec3 vPosition;
varying vec2 vNormal;
varying float relativeHeight; //relative to amplitude, in [-1, +1]

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

uniform mat4 uMVPMatrix;

uniform sampler2D uWater;
uniform sampler2D uNormals;

uniform float uWaterLevel;
uniform float uAmplitude;

varying vec3 vPosition;
varying vec3 vNormal;

___ENCODE_DECODE___

void main(void) {
    float height = decodeHeight(texture2D(uWater, aSampleCoords));

    float dH = uAmplitude / 2.0;

    vPosition.xy = aSampleCoords - .5;
    vPosition.z = uWaterLevel + dH * height;
    vPosition.z -= 0.001; //slight shift to avoid artifacts at surface-sides jointure

    vNormal = decodeNormal(texture2D(uNormals, aSampleCoords), uAmplitude);
    
    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);
}`;

const surfaceFrag: string =
    `precision mediump float;

uniform vec3 uEyePos;

varying vec3 vPosition;
varying vec3 vNormal;

___WATER_COMMON___

void main(void)
{
    vec3 fromEye = normalize(vPosition - uEyePos);
    vec3 normal = normalize(vNormal);

    vec3 color = computeColor(vPosition, fromEye, normal);

    gl_FragColor = vec4(color, 1);
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