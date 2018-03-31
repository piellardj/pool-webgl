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
uniform sampler2D uTileTexture;
uniform sampler2D uCausticsTexture;

uniform vec2 uTileRepetition;
uniform vec2 uTexelSize;

uniform bool uSpecular;
uniform bool uUseCaustics;
uniform float uAmplitude;
uniform float uDepth;
uniform float uOpacity;
uniform float uEta;

varying vec2 sampleCoords;

___ENCODE_DECODE___

vec4 sampleTileTex(vec2 coords)
{
    return texture2D(uTileTexture, coords * uTileRepetition);
}

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

float computeSpecular(vec3 normal, vec3 fromLight)
{
    vec3 reflected = reflect(fromLight, normal);
    float result = max(0.0, dot(normal, reflected));

    result = pow(result, 50.0);

    return (result-0.9)/.3 * step(0.9, result) + 
           0.9 * step(0.9, pow(result, 4.0));
}

void main(void)
{

    float h = decodeHeight(texture2D(uWater, sampleCoords));
    vec3 normal = computeNormal(sampleCoords);

    vec3 ray = vec3(0, 0, -1);
    ray = refract(ray, normal, uEta);
    vec3 toGround = uDepth * ray / ray.z;

    vec2 groundCoords = sampleCoords + toGround.xy;
    vec3 tileColor = sampleTileTex(groundCoords).rgb;
    float caustics = texture2D(uCausticsTexture, groundCoords).r;

    vec3 waterColor = vec3(0.0, 0.2, 0.5);

    float opacity = uOpacity * length(toGround);
    opacity = clamp(opacity, 0.0, 1.0);

    const vec3 fromLight = normalize(vec3(-.03,-.05,-1));
    float specular = computeSpecular(normal, fromLight);

    vec3 bottomColor = tileColor + float(uUseCaustics) * caustics;
    vec3 finalColor = mix(bottomColor, waterColor, opacity) +
                      vec3(specular) * float(uSpecular);
    //finalColor = 0.001* finalColor + texture2D(uCausticsTexture, sampleCoords).r;
    gl_FragColor = vec4(finalColor, 1.0);
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