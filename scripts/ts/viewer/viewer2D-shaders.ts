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
uniform sampler2D uNormals;
uniform sampler2D uCaustics;
uniform sampler2D uTileTexture;

uniform float uWaterLevel;
uniform float uAmplitude;
uniform float uEta;
uniform float uOpacity;
uniform bool uShowSpecular;
uniform bool uShowCaustics;

varying vec2 sampleCoords;

___ENCODE_DECODE___

const vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);
const vec3 SPECULAR_COLOR = vec3(1);
const float TILE_REPETITION = 4.0;

void main(void)
{
    float height = decodeHeight(texture2D(uWater, sampleCoords));
    height = uWaterLevel + 0.5 * uAmplitude * height;
    vec3 normal = decodeNormal(texture2D(uNormals, sampleCoords), uAmplitude);

    vec3 position = vec3(sampleCoords, height);

    const vec3 fromEye = vec3(0, 0, -1);
    vec3 refracted = refract(fromEye, normal, uEta);
    refracted *= height / refracted.z;
    vec2 coordsOnFloor = sampleCoords + refracted.xy;

    vec3 tileColor = texture2D(uTileTexture, TILE_REPETITION * coordsOnFloor).rgb;
    float caustics = texture2D(uCaustics, coordsOnFloor).r;
    caustics = caustics * float(uShowCaustics);
    vec3 floorColor = tileColor * (1.0 + caustics);

    float opacity = clamp(uOpacity * length(refracted), 0.0, 1.0);
    vec3 color = mix(floorColor, WATER_COLOR, opacity);

    const vec3 fromLight = normalize(vec3(.01, -.02, -1));
    vec3 reflected = reflect(fromLight, normal);
    float specular = max(0.0, dot(reflected, -fromEye));
    specular = pow(specular, 100.0) * float(uShowSpecular);

    gl_FragColor = vec4(color + specular, 1);
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