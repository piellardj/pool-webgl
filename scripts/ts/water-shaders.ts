import Shader from "./gl-utils/shader";
import VBO from "./gl-utils/vbo";

const encodeDecodeStr: string =
    `const float HEIGHT_RANGE = 1.0;
const float VEL_RANGE = 0.25;

struct Cell {
    float h; //height
    float v; //velocity
};

/* Decodes a float value (16 bits in [0,1])
 * from a 2D value (2x8bits in [0,1]x[0,1]) */
float decode16bit(vec2 v)
{
    const vec2 weights = 255.0 * vec2(256.0, 1.0) / (256.0*256.0 - 1.0);
    return dot(weights, v);
}

/* Encodes a float value (16 bits in [0,1])
 * into a 2D value (2x8bits in [0,1]x[0,1]) */
vec2 encode16bit(float f)
{
    const vec2 base = (256.0*256.0 - 1.0) / vec2(256.0, 1.0);
    return floor(mod(f * base, 256.0)) / 255.0;
}

float decode(vec2 v, float range)
{
    return (2.0 * decode16bit(v) - 1.0) * range;
}

vec2 encode(float value, float range)
{
    return encode16bit(0.5 * value / range + 0.5);
}

float decodeHeight(vec4 texel)
{
    return decode(texel.rg, HEIGHT_RANGE);
}
vec2 encodeHeight(float h)
{
    return encode(h, HEIGHT_RANGE);
}

vec3 decodeNormal(vec4 texel)
{
    return 2.0 * texel.rgb + 1.0;
}
vec4 encodeNormal(vec3 n)
{
    return vec4(0.5 * n + 0.5, 1);
}

float decodeVelocity(vec4 texel)
{
    return decode(texel.ba, VEL_RANGE);
}
vec2 encodeVelocity(float h)
{
    return encode(h, VEL_RANGE);
}

Cell decodeCell(vec4 texel)
{
    return Cell(decodeHeight(texel), decodeVelocity(texel));
}
vec4 encodeCell(Cell cell)
{
    //cell.h = 0.9 * clamp(cell.h, -HEIGHT_RANGE, HEIGHT_RANGE);
    //cell.v = 0.9 * clamp(cell.v, -VEL_RANGE, VEL_RANGE);

    return vec4(encodeHeight(cell.h), encodeVelocity(cell.v));
}`;

const fullscreenVert: string =
    `attribute vec2 aCorner; //{0,1}x{0,1}

varying vec2 sampleCoords;

void main(void) {
    sampleCoords = aCorner;
    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);
}`;

const touchFrag: string =
    `precision mediump float;

uniform sampler2D uWater;

uniform vec2 uCoords;
uniform vec2 uSize;

varying vec2 sampleCoords;

___ENCODE_DECODE___

void main(void) {
    Cell cell = decodeCell(texture2D(uWater, sampleCoords));

    float dist = length((sampleCoords - uCoords) / uSize);
    dist = clamp(dist, 0.0, 1.0);

    cell.h = mix(-0.5*HEIGHT_RANGE, cell.h, dist);
    cell.v *= step(1.0, dist);

    gl_FragColor = encodeCell(cell);
}`;

const updateFrag: string =
    `precision mediump float;

uniform sampler2D uPrevWater;

uniform float uDt;
uniform vec2 uTexelSize;

uniform float uC; //surface tension
uniform float uK; // vertical spring's stiffness
uniform float uF; //friction

varying vec2 sampleCoords;

___ENCODE_DECODE___

void main(void) {
    Cell cell = decodeCell(texture2D(uPrevWater, sampleCoords));

    float neighbours = decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(uTexelSize.x, 0))) +
        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(uTexelSize.x, 0))) +
        decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(0, uTexelSize.y))) +
        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(0, uTexelSize.y)));
    neighbours *= 0.25;

    /* Update velocity */
    cell.v += -uDt * uK * cell.h; //vertical spring
    cell.v += uDt * uC * (neighbours - cell.h); //surface tension
    cell.v *= uF; //attenuation

    /* Update position */
    cell.h += uDt * cell.v;

    gl_FragColor = encodeCell(cell);
}`;

const normalsFrag: string =
    `precision mediump float;

uniform sampler2D uWater;

uniform vec2 uTexelSize;

varying vec2 sampleCoords;

___ENCODE_DECODE___

vec3 computeNormal(vec2 coords)
{
    const float amplitude = 1.0;

    float dZx = decodeHeight(texture2D(uWater, coords + vec2(uTexelSize.x, 0))) -
                decodeHeight(texture2D(uWater, coords - vec2(uTexelSize.x, 0)));
    
    float dZy = decodeHeight(texture2D(uWater, coords + vec2(0, uTexelSize.y))) -
                decodeHeight(texture2D(uWater, coords - vec2(0, uTexelSize.y)));
    
    vec3 normal = cross(vec3(uTexelSize.x, 0, dZx), vec3(0, uTexelSize.y, dZy));
    normal.xy *= amplitude;

    return normalize(normal);
}

void main(void) {
    vec3 normal = computeNormal(sampleCoords);

    gl_FragColor = encodeNormal(normal);
}`;

function buildTouchShader(gl: WebGLRenderingContext): Shader {
    const vertSrc: string = fullscreenVert;
    const fragSrc = touchFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);

    const shader: Shader = new Shader(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = VBO.createQuad(gl, 0, 0, 1, 1);
    return shader
}

function buildUpdateShader(gl: WebGLRenderingContext): Shader {
    const vertSrc: string = fullscreenVert;
    const fragSrc = updateFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);

    const shader: Shader = new Shader(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = VBO.createQuad(gl, 0, 0, 1, 1);
    return shader
}

function buildNormalsShader(gl: WebGLRenderingContext): Shader {
    const vertSrc: string = fullscreenVert;
    const fragSrc = normalsFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);

    const shader: Shader = new Shader(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = VBO.createQuad(gl, 0, 0, 1, 1);
    return shader
}

export {
    encodeDecodeStr,
    buildTouchShader,
    buildUpdateShader,
    buildNormalsShader,
};