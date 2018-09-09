/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GLResource = function () {
    function GLResource(gl) {
        _classCallCheck(this, GLResource);

        this._gl = gl;
    }

    _createClass(GLResource, [{
        key: "gl",
        get: function get() {
            return this._gl;
        }
    }]);

    return GLResource;
}();

/* harmony default export */ __webpack_exports__["a"] = (GLResource);
//# sourceMappingURL=gl-resource.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_resource__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var FBO = function (_GLResource) {
    _inherits(FBO, _GLResource);

    function FBO(gl, width, height) {
        _classCallCheck(this, FBO);

        var _this = _possibleConstructorReturn(this, (FBO.__proto__ || Object.getPrototypeOf(FBO)).call(this, gl));

        _this.id = gl.createFramebuffer();
        _this.width = width;
        _this.height = height;
        return _this;
    }

    _createClass(FBO, [{
        key: "bind",
        value: function bind(colorBuffers) {
            var depthBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var gl = _get(FBO.prototype.__proto__ || Object.getPrototypeOf(FBO.prototype), "gl", this);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.id);
            gl.viewport(0, 0, this.width, this.height);
            for (var i = 0; i < colorBuffers.length; ++i) {
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl['COLOR_ATTACHMENT' + i], gl.TEXTURE_2D, colorBuffers[i], 0);
            }
            if (depthBuffer) {
                gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
            }
        }
    }, {
        key: "freeGLResources",
        value: function freeGLResources() {
            _get(FBO.prototype.__proto__ || Object.getPrototypeOf(FBO.prototype), "gl", this).deleteFramebuffer(this.id);
            this.id = null;
        }
    }], [{
        key: "bindDefault",
        value: function bindDefault(gl) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
    }]);

    return FBO;
}(__WEBPACK_IMPORTED_MODULE_0__gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (FBO);
//# sourceMappingURL=fbo.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return encodeDecodeStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildTouchShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return buildUpdateShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildNormalsShader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__ = __webpack_require__(5);


var encodeDecodeStr = "const float HEIGHT_RANGE = 1.0;\nconst float VEL_RANGE = 0.25;\n\nstruct Cell {\n    float h; //height\n    float v; //velocity\n};\n\n/* Decodes a float value (16 bits in [0,1])\n * from a 2D value (2x8bits in [0,1]x[0,1]) */\nfloat decode16bit(vec2 v)\n{\n    const vec2 weights = 255.0 * vec2(256.0, 1.0) / (256.0*256.0 - 1.0);\n    return dot(weights, v);\n}\n\n/* Encodes a float value (16 bits in [0,1])\n * into a 2D value (2x8bits in [0,1]x[0,1]) */\nvec2 encode16bit(float f)\n{\n    const vec2 base = (256.0*256.0 - 1.0) / vec2(256.0, 1.0);\n    return floor(mod(f * base, 256.0)) / 255.0;\n}\n\nfloat decode(vec2 v, float range)\n{\n    return (2.0 * decode16bit(v) - 1.0) * range;\n}\n\nvec2 encode(float value, float range)\n{\n    return encode16bit(0.5 * value / range + 0.5);\n}\n\nfloat decodeHeight(vec4 texel)\n{\n    return decode(texel.rg, HEIGHT_RANGE);\n}\nvec2 encodeHeight(float h)\n{\n    return encode(h, HEIGHT_RANGE);\n}\n\nvec3 decodeNormal(vec4 texel, float amplitude)\n{\n    vec3 result = 2.0 * texel.rgb - 1.0;\n    return normalize(result * vec3(amplitude, amplitude, 1));\n}\nvec4 encodeNormal(vec3 n)\n{\n    return vec4(0.5 * n + 0.5, 1);\n}\n\nfloat decodeVelocity(vec4 texel)\n{\n    return decode(texel.ba, VEL_RANGE);\n}\nvec2 encodeVelocity(float h)\n{\n    return encode(h, VEL_RANGE);\n}\n\nCell decodeCell(vec4 texel)\n{\n    return Cell(decodeHeight(texel), decodeVelocity(texel));\n}\nvec4 encodeCell(Cell cell)\n{\n    return vec4(encodeHeight(cell.h), encodeVelocity(cell.v));\n}";
var fullscreenVert = "attribute vec2 aCorner; //{0,1}x{0,1}\n\nvarying vec2 sampleCoords;\n\nvoid main(void) {\n    sampleCoords = aCorner;\n    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);\n}";
var touchFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec2 uCoords;\nuniform vec2 uSize;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    Cell cell = decodeCell(texture2D(uWater, sampleCoords));\n\n    float dist = length((sampleCoords - uCoords) / uSize);\n    dist = clamp(dist, 0.0, 1.0);\n\n    cell.h = mix(-0.6*HEIGHT_RANGE, cell.h, smoothstep(0.0, 1.0, dist));\n    cell.v *= step(1.0, dist);\n\n    gl_FragColor = encodeCell(cell);\n}";
var updateFrag = "precision mediump float;\n\nuniform sampler2D uPrevWater;\n\nuniform float uDt;\nuniform vec2 uTexelSize;\n\nuniform float uC; //surface tension\nuniform float uK; // vertical spring's stiffness\nuniform float uF; //friction\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    Cell cell = decodeCell(texture2D(uPrevWater, sampleCoords));\n\n    float neighbours = decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(uTexelSize.x, 0))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(uTexelSize.x, 0))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(0, uTexelSize.y))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(0, uTexelSize.y)));\n    neighbours *= 0.25;\n\n    /* Update velocity */\n    cell.v += -uDt * uK * cell.h; //vertical spring\n    cell.v += uDt * uC * (neighbours - cell.h); //surface tension\n    cell.v *= uF; //attenuation\n\n    /* Update position */\n    cell.h += uDt * cell.v;\n\n    gl_FragColor = encodeCell(cell);\n}";
var normalsFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec2 uTexelSize;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\n/* Returns the normal, assuming the amplitude is 1. */\nvec3 computeNormal(vec2 coords)\n{\n    float dZx = decodeHeight(texture2D(uWater, coords + vec2(uTexelSize.x, 0))) -\n                decodeHeight(texture2D(uWater, coords - vec2(uTexelSize.x, 0)));\n    \n    float dZy = decodeHeight(texture2D(uWater, coords + vec2(0, uTexelSize.y))) -\n                decodeHeight(texture2D(uWater, coords - vec2(0, uTexelSize.y)));\n    \n    vec3 normal = cross(vec3(uTexelSize.x, 0, dZx), vec3(0, uTexelSize.y, dZy));\n    normal.xy *= 0.4 * HEIGHT_RANGE;\n\n    return normalize(normal);\n}\n\nvoid main(void) {\n    vec3 normal = computeNormal(sampleCoords);\n\n    gl_FragColor = encodeNormal(normal);\n}";
function buildTouchShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = touchFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__["a" /* default */].createQuad(gl, 0, 0, 1, 1);
    return shader;
}
function buildUpdateShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = updateFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__["a" /* default */].createQuad(gl, 0, 0, 1, 1);
    return shader;
}
function buildNormalsShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = normalsFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__["a" /* default */].createQuad(gl, 0, 0, 1, 1);
    return shader;
}

//# sourceMappingURL=water-shaders.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_resource__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


function notImplemented(gl, location, value) {
    alert("NOT IMPLEMENTED YET");
}
function bindUniformFloat(gl, location, value) {
    if (Array.isArray(value)) {
        gl.uniform1fv(location, value);
    } else {
        gl.uniform1f(location, value);
    }
}
function bindUniformFloat2v(gl, location, value) {
    gl.uniform2fv(location, value);
}
function bindUniformFloat3v(gl, location, value) {
    gl.uniform3fv(location, value);
}
function bindUniformFloat4v(gl, location, value) {
    gl.uniform4fv(location, value);
}
function bindUniformInt(gl, location, value) {
    if (Array.isArray(value)) {
        gl.uniform1iv(location, value);
    } else {
        gl.uniform1iv(location, value);
    }
}
function bindUniformInt2v(gl, location, value) {
    gl.uniform2iv(location, value);
}
function bindUniformInt3v(gl, location, value) {
    gl.uniform3iv(location, value);
}
function bindUniformInt4v(gl, location, value) {
    gl.uniform4iv(location, value);
}
function bindUniformBool(gl, location, value) {
    gl.uniform1i(location, +value);
}
function bindUniformBool2v(gl, location, value) {
    gl.uniform2iv(location, value);
}
function bindUniformBool3v(gl, location, value) {
    gl.uniform3iv(location, value);
}
function bindUniformBool4v(gl, location, value) {
    gl.uniform4iv(location, value);
}
function bindUniformFloatMat2(gl, location, value) {
    gl.uniformMatrix2fv(location, false, value);
}
function bindUniformFloatMat3(gl, location, value) {
    gl.uniformMatrix3fv(location, false, value);
}
function bindUniformFloatMat4(gl, location, value) {
    gl.uniformMatrix4fv(location, false, value);
}
function bindSampler2D(gl, location, unitNb, value) {
    gl.uniform1i(location, unitNb);
    gl.activeTexture(gl['TEXTURE' + unitNb]);
    gl.bindTexture(gl.TEXTURE_2D, value);
}
function bindSamplerCube(gl, location, unitNb, value) {
    gl.uniform1i(location, unitNb);
    gl.activeTexture(gl['TEXTURE' + unitNb]);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, value);
}
;
/* From WebGL spec:
* http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14 */
var types = {
    0x8B50: { str: 'FLOAT_VEC2', binder: bindUniformFloat2v },
    0x8B51: { str: 'FLOAT_VEC3', binder: bindUniformFloat3v },
    0x8B52: { str: 'FLOAT_VEC4', binder: bindUniformFloat4v },
    0x8B53: { str: 'INT_VEC2', binder: bindUniformInt2v },
    0x8B54: { str: 'INT_VEC3', binder: bindUniformInt3v },
    0x8B55: { str: 'INT_VEC4', binder: bindUniformInt4v },
    0x8B56: { str: 'BOOL', binder: bindUniformBool },
    0x8B57: { str: 'BOOL_VEC2', binder: bindUniformBool2v },
    0x8B58: { str: 'BOOL_VEC3', binder: bindUniformBool3v },
    0x8B59: { str: 'BOOL_VEC4', binder: bindUniformBool4v },
    0x8B5A: { str: 'FLOAT_MAT2', binder: bindUniformFloatMat2 },
    0x8B5B: { str: 'FLOAT_MAT3', binder: bindUniformFloatMat3 },
    0x8B5C: { str: 'FLOAT_MAT4', binder: bindUniformFloatMat4 },
    0x8B5E: { str: 'SAMPLER_2D', binder: bindSampler2D },
    0x8B60: { str: 'SAMPLER_CUBE', binder: bindSamplerCube },
    0x1400: { str: 'BYTE', binder: notImplemented },
    0x1401: { str: 'UNSIGNED_BYTE', binder: notImplemented },
    0x1402: { str: 'SHORT', binder: notImplemented },
    0x1403: { str: 'UNSIGNED_SHORT', binder: notImplemented },
    0x1404: { str: 'INT', binder: bindUniformInt },
    0x1405: { str: 'UNSIGNED_INT', binder: notImplemented },
    0x1406: { str: 'FLOAT', binder: bindUniformFloat }
};

var ShaderProgram = function (_GLResource) {
    _inherits(ShaderProgram, _GLResource);

    function ShaderProgram(gl, vertexSource, fragmentSource) {
        _classCallCheck(this, ShaderProgram);

        function createShader(type, source) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!success) {
                console.log(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        var _this = _possibleConstructorReturn(this, (ShaderProgram.__proto__ || Object.getPrototypeOf(ShaderProgram)).call(this, gl));

        _this.id = null;
        _this.uCount = 0;
        _this.aCount = 0;
        var vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
        var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
        var id = gl.createProgram();
        gl.attachShader(id, vertexShader);
        gl.attachShader(id, fragmentShader);
        gl.linkProgram(id);
        var success = gl.getProgramParameter(id, gl.LINK_STATUS);
        if (!success) {
            console.log(gl.getProgramInfoLog(id));
            gl.deleteProgram(id);
        } else {
            _this.id = id;
            _this.introspection();
        }
        return _this;
    }

    _createClass(ShaderProgram, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            _get(ShaderProgram.prototype.__proto__ || Object.getPrototypeOf(ShaderProgram.prototype), "gl", this).deleteProgram(this.id);
            this.id = null;
        }
    }, {
        key: "introspection",
        value: function introspection() {
            var gl = _get(ShaderProgram.prototype.__proto__ || Object.getPrototypeOf(ShaderProgram.prototype), "gl", this);
            this.uCount = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
            this.u = [];
            for (var i = 0; i < this.uCount; ++i) {
                var uniform = gl.getActiveUniform(this.id, i);
                var name = uniform.name;
                this.u[name] = {
                    value: null,
                    loc: gl.getUniformLocation(this.id, name),
                    size: uniform.size,
                    type: uniform.type
                };
            }
            this.aCount = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
            this.a = [];
            for (var _i = 0; _i < this.aCount; ++_i) {
                var attribute = gl.getActiveAttrib(this.id, _i);
                var _name = attribute.name;
                this.a[_name] = {
                    VBO: null,
                    loc: gl.getAttribLocation(this.id, _name),
                    size: attribute.size,
                    type: attribute.type
                };
            }
        }
    }, {
        key: "use",
        value: function use() {
            _get(ShaderProgram.prototype.__proto__ || Object.getPrototypeOf(ShaderProgram.prototype), "gl", this).useProgram(this.id);
        }
    }, {
        key: "bindUniforms",
        value: function bindUniforms() {
            var gl = _get(ShaderProgram.prototype.__proto__ || Object.getPrototypeOf(ShaderProgram.prototype), "gl", this);
            var currTextureUnitNb = 0;
            for (var uName in this.u) {
                var uniform = this.u[uName];
                if (uniform.value !== null) {
                    if (uniform.type === 0x8B5E || uniform.type === 0x8B60) {
                        var unitNb = currTextureUnitNb;
                        types[uniform.type].binder(gl, uniform.loc, unitNb, uniform.value);
                        currTextureUnitNb++;
                    } else {
                        types[uniform.type].binder(gl, uniform.loc, uniform.value);
                    }
                }
            }
        }
    }, {
        key: "bindAttributes",
        value: function bindAttributes() {
            for (var aName in this.a) {
                var attribute = this.a[aName];
                if (attribute.VBO !== null) {
                    attribute.VBO.bind(attribute.loc);
                }
            }
        }
    }, {
        key: "bindUniformsAndAttributes",
        value: function bindUniformsAndAttributes() {
            this.bindUniforms();
            this.bindAttributes();
        }
    }]);

    return ShaderProgram;
}(__WEBPACK_IMPORTED_MODULE_0__gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ShaderProgram);
//# sourceMappingURL=shader.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return bindRendererChooser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mouse__ = __webpack_require__(12);

var mouse = new __WEBPACK_IMPORTED_MODULE_0__mouse__["a" /* Mouse */](document.getElementById("glcanvas"));
function bindControls(water, viewer2D, viewer3D) {
    function bindInput(element, func, input) {
        element.addEventListener(input, func, false);
        func();
    }
    {
        (function () {
            var setResolution = function setResolution(size, radio) {
                if (radio.checked) {
                    water.reset(size, size);
                }
            };

            var resolutions = [128, 256, 512];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var res = _step.value;

                    var radioName = "quality-" + res + "-button";
                    var radio = document.getElementById(radioName);
                    var update = function update() {
                        setResolution(res, radio);
                    };
                    bindInput(radio, update, "change");
                };

                for (var _iterator = resolutions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        })();
    }
    {
        var rainCheckbox = document.getElementById("rain-checkbox");
        var updateRain = function updateRain() {
            water.rain = rainCheckbox.checked;
        };
        bindInput(rainCheckbox, updateRain, "change");
    }
    {
        var tensionSlider = document.getElementById("tension-slider");
        var updateTension = function updateTension() {
            water.surfaceTension = +tensionSlider.value;
        };
        bindInput(tensionSlider, updateTension, "input");
    }
    {
        var springSlider = document.getElementById("spring-slider");
        var updateSpring = function updateSpring() {
            water.springStiffness = +springSlider.value;
        };
        bindInput(springSlider, updateSpring, "input");
    }
    {
        var dispersionSlider = document.getElementById("dispersion-slider");
        var updateDispersion = function updateDispersion() {
            water.dispersion = +dispersionSlider.value;
        };
        bindInput(dispersionSlider, updateDispersion, "input");
    }
    {
        var specularCheckbox = document.getElementById("specular-checkbox");
        var updateSpecular = function updateSpecular() {
            viewer2D.specular = specularCheckbox.checked;
            viewer3D.specular = specularCheckbox.checked;
        };
        bindInput(specularCheckbox, updateSpecular, "change");
    }
    {
        var causticsCheckbox = document.getElementById("caustics-checkbox");
        var updateCaustics = function updateCaustics() {
            viewer2D.caustics = causticsCheckbox.checked;
            viewer3D.caustics = causticsCheckbox.checked;
        };
        bindInput(causticsCheckbox, updateCaustics, "change");
    }
    {
        var fresnelCheckbox = document.getElementById("fresnel-checkbox");
        var _updateSpecular = function _updateSpecular() {
            viewer2D.fresnel = fresnelCheckbox.checked;
            viewer3D.fresnel = fresnelCheckbox.checked;
        };
        bindInput(fresnelCheckbox, _updateSpecular, "change");
    }
    {
        var amplitudeSlider = document.getElementById("amplitude-slider");
        var updateAmplitude = function updateAmplitude() {
            viewer2D.amplitude = +amplitudeSlider.value;
            viewer3D.amplitude = +amplitudeSlider.value;
        };
        bindInput(amplitudeSlider, updateAmplitude, "input");
    }
    {
        var levelSlider = document.getElementById("level-slider");
        var updateWaterLevel = function updateWaterLevel() {
            viewer2D.waterLevel = +levelSlider.value;
            viewer3D.waterLevel = +levelSlider.value;
        };
        bindInput(levelSlider, updateWaterLevel, "input");
    }
    {
        var opacitySlider = document.getElementById("opacity-slider");
        var updateOpacity = function updateOpacity() {
            viewer2D.opacity = +opacitySlider.value;
            viewer3D.opacity = +opacitySlider.value;
        };
        bindInput(opacitySlider, updateOpacity, "input");
    }
    {
        var etaSlider = document.getElementById("refraction-slider");
        var updateEta = function updateEta() {
            viewer2D.eta = +etaSlider.value;
            viewer3D.eta = +etaSlider.value;
        };
        bindInput(etaSlider, updateEta, "input");
    }
}
function bind(canvas, water, viewer2D, viewer3D) {
    bindControls(water, viewer2D, viewer3D);
}
function bindRendererChooser(choose2D, choose3D) {
    var button2D = document.getElementById("renderer-2D-button");
    button2D.addEventListener("change", choose2D, false);
    var button3D = document.getElementById("renderer-3D-button");
    button3D.addEventListener("change", choose3D, false);
    if (button2D.checked) {
        choose2D();
    } else {
        choose3D();
    }
}

//# sourceMappingURL=controls.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_resource__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var VBO = function (_GLResource) {
    _inherits(VBO, _GLResource);

    function VBO(gl, array, size, type) {
        _classCallCheck(this, VBO);

        var _this = _possibleConstructorReturn(this, (VBO.__proto__ || Object.getPrototypeOf(VBO)).call(this, gl));

        _this.id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.id);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        _this.size = size;
        _this.type = type;
        _this.normalize = false;
        _this.stride = 0;
        _this.offset = 0;
        return _this;
    }

    _createClass(VBO, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            this.gl.deleteBuffer(this.id);
            this.id = null;
        }
    }, {
        key: "bind",
        value: function bind(location) {
            var gl = _get(VBO.prototype.__proto__ || Object.getPrototypeOf(VBO.prototype), "gl", this);
            gl.enableVertexAttribArray(location);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
            gl.vertexAttribPointer(location, this.size, this.type, this.normalize, this.stride, this.offset);
        }
    }], [{
        key: "createQuad",
        value: function createQuad(gl, minX, minY, maxX, maxY) {
            var vert = [minX, minY, maxX, minY, minX, maxY, maxX, maxY];
            return new VBO(gl, new Float32Array(vert), 2, gl.FLOAT);
        }
    }]);

    return VBO;
}(__WEBPACK_IMPORTED_MODULE_0__gl_resource__["a" /* default */]);

;
/* harmony default export */ __webpack_exports__["a"] = (VBO);
//# sourceMappingURL=vbo.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Viewer = function (_GLResource) {
    _inherits(Viewer, _GLResource);

    function Viewer(gl) {
        _classCallCheck(this, Viewer);

        return _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call(this, gl));
    }

    _createClass(Viewer, [{
        key: "freeGLResources",
        value: function freeGLResources() {}
    }, {
        key: "specular",
        set: function set(b) {
            this._showSpecular = b;
            this.updateSpecular();
        },
        get: function get() {
            return this._showSpecular;
        }
    }, {
        key: "caustics",
        set: function set(b) {
            this._showCaustics = b;
            this.updateCaustics();
        },
        get: function get() {
            return this._showCaustics;
        }
    }, {
        key: "fresnel",
        set: function set(b) {
            this._useFresnel = b;
            this.updateFresnel();
        },
        get: function get() {
            return this._useFresnel;
        }
    }, {
        key: "amplitude",
        set: function set(a) {
            this._amplitude = a;
            this.updateAmplitude();
        },
        get: function get() {
            return this._amplitude;
        }
    }, {
        key: "waterLevel",
        set: function set(d) {
            this._waterLevel = d;
            this.updateWaterLevel();
        },
        get: function get() {
            return this._waterLevel;
        }
    }, {
        key: "opacity",
        set: function set(o) {
            this._opacity = o;
            this.updateOpacity();
        },
        get: function get() {
            return this._opacity;
        }
    }, {
        key: "eta",
        set: function set(e) {
            this._eta = e;
            this.updateEta();
        },
        get: function get() {
            return this._eta;
        }
    }]);

    return Viewer;
}(__WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Viewer);
//# sourceMappingURL=viewer.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_utils__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__water__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__viewer_viewer2D__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__viewer_viewer3D__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewer_viewerCommon__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controls__ = __webpack_require__(4);







/** Initializes a WebGL context */
function initGL(canvas, flags) {
    var gl = canvas.getContext("webgl", flags);
    if (!gl) {
        gl = canvas.getContext("experimental-webgl", flags);
        if (!gl) {
            alert("Your browser or device does not seem to support WebGL.");
            return null;
        }
        alert("Your browser or device only supports experimental WebGL.\n" + "The simulation may not run as expected.");
    }
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    __WEBPACK_IMPORTED_MODULE_0__gl_utils_utils__["a" /* resizeCanvas */](gl, false);
    return gl;
}
function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = initGL(canvas, { alpha: false });
    if (!gl) // || !Requirements.check(gl))
        return;
    var side = 512;
    var water = new __WEBPACK_IMPORTED_MODULE_2__water__["a" /* default */](gl, side, side);
    var viewerCommon = new __WEBPACK_IMPORTED_MODULE_5__viewer_viewerCommon__["a" /* default */](gl, 512, "rc/tile.png");
    var viewer2D = new __WEBPACK_IMPORTED_MODULE_3__viewer_viewer2D__["a" /* default */](gl, viewerCommon);
    var viewer3D = new __WEBPACK_IMPORTED_MODULE_4__viewer_viewer3D__["a" /* default */](gl, viewerCommon);
    __WEBPACK_IMPORTED_MODULE_6__controls__["a" /* bind */](canvas, water, viewer2D, viewer3D);
    var viewer = viewer3D;
    __WEBPACK_IMPORTED_MODULE_6__controls__["b" /* bindRendererChooser */](function () {
        viewer = viewer2D;
    }, function () {
        viewer = viewer3D;
    });
    /* Update the FPS indicator every second. */
    var instantFPS = 0;
    var fpsText = document.getElementById("fps-text");
    var updateFpsText = function updateFpsText() {
        fpsText.textContent = instantFPS.toFixed(0);
    };
    setInterval(updateFpsText, 1000);
    var lastUpdate = 0;
    function mainLoop(time) {
        time *= 0.001; //dt is now in seconds
        var dt = time - lastUpdate;
        instantFPS = 1 / dt;
        lastUpdate = time;
        /* Updating */
        viewer.interact(water);
        water.update(1 / 60);
        /* Drawing */
        if (viewer.caustics) {
            viewerCommon.caustics.compute(water, viewer.amplitude, viewer.waterLevel, viewer.eta);
        }
        __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__["a" /* default */].bindDefault(gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        viewer.display(water, viewerCommon);
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
}
main();
//# sourceMappingURL=main.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resizeCanvas; });
function resizeCanvas(gl) {
    var hidpi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var cssPixel = hidpi ? window.devicePixelRatio : 1;
    var width = Math.floor(gl.canvas.clientWidth * cssPixel);
    var height = Math.floor(gl.canvas.clientHeight * cssPixel);
    if (gl.canvas.width != width || gl.canvas.height != height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
}

//# sourceMappingURL=utils.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__water_shaders__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Water = function (_GLResource) {
    _inherits(Water, _GLResource);

    function Water(gl, w, h) {
        _classCallCheck(this, Water);

        var _this = _possibleConstructorReturn(this, (Water.__proto__ || Object.getPrototypeOf(Water)).call(this, gl));

        _this._FBO = new __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__["a" /* default */](gl, w, h);
        _this._touchShader = __WEBPACK_IMPORTED_MODULE_2__water_shaders__["b" /* buildTouchShader */](gl);
        _this._updateShader = __WEBPACK_IMPORTED_MODULE_2__water_shaders__["c" /* buildUpdateShader */](gl);
        _this._normalsShader = __WEBPACK_IMPORTED_MODULE_2__water_shaders__["a" /* buildNormalsShader */](gl);
        _this.surfaceTension = 20.0;
        _this.springStiffness = 0.1;
        _this.dispersion = 0.999;
        _this.rain = true;
        _this.reset(w, h);
        return _this;
    }

    _createClass(Water, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            if (this._FBO) {
                this._FBO.freeGLResources();
            }
            this.freeTextures();
            this.freeShaders();
        }
    }, {
        key: "freeTextures",
        value: function freeTextures() {
            var gl = _get(Water.prototype.__proto__ || Object.getPrototypeOf(Water.prototype), "gl", this); //shortcut
            if (this._normalsTex) {
                gl.deleteTexture(this._normalsTex);
            }
            if (this._heightmapsTex) {
                gl.deleteTexture(this._heightmapsTex[0]);
                gl.deleteTexture(this._heightmapsTex[1]);
            }
        }
    }, {
        key: "freeShaders",
        value: function freeShaders() {
            if (this._touchShader) {
                this._touchShader.freeGLResources();
            }
            if (this._updateShader) {
                this._updateShader.freeGLResources();
            }
        }
    }, {
        key: "update",
        value: function update(dt) {
            var gl = this.gl; //shortcut
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);
            if (this.rain && Math.random() < 0.1) {
                this.touch(Math.random() * this.width, Math.random() * this.height, 8);
            }
            var updateShader = this._updateShader;
            updateShader.u["uPrevWater"].value = this.currHeightmap;
            updateShader.u["uDt"].value = dt * 10;
            this._FBO.bind([this.nextHeightmap]);
            updateShader.use();
            updateShader.bindUniformsAndAttributes();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            this.switchHeightmaps();
            this.computeNormals();
        }
    }, {
        key: "computeNormals",
        value: function computeNormals() {
            var gl = this.gl; //shortcut
            var shader = this._normalsShader;
            shader.u["uWater"].value = this.currHeightmap;
            this._FBO.bind([this._normalsTex]);
            shader.use();
            shader.bindUniformsAndAttributes();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }, {
        key: "touch",
        value: function touch(coordX, coordY, radius) {
            var gl = this.gl; //shortcut
            var touchShader = this._touchShader;
            touchShader.u["uWater"].value = this.currHeightmap;
            touchShader.u["uCoords"].value = [coordX / this.width, coordY / this.height];
            touchShader.u["uSize"].value = [radius / this.width, radius / this.height];
            this._FBO.bind([this.nextHeightmap]);
            touchShader.use();
            touchShader.bindUniformsAndAttributes();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            this.switchHeightmaps();
            this.computeNormals();
        }
    }, {
        key: "switchHeightmaps",
        value: function switchHeightmaps() {
            this._currIndex = (this._currIndex + 1) % 2;
        }
    }, {
        key: "reset",
        value: function reset(w, h) {
            this.freeTextures();
            var gl = _get(Water.prototype.__proto__ || Object.getPrototypeOf(Water.prototype), "gl", this); //shortcut
            this._width = w;
            this._height = h;
            this._FBO.width = w;
            this._FBO.height = h;
            this._updateShader.u["uTexelSize"].value = [1 / w, 1 / h];
            this._normalsShader.u["uTexelSize"].value = [1 / w, 1 / h];
            var uintTexels = new Array(4 * w * h).fill(127);
            var uintData = new Uint8Array(uintTexels);
            var wrap = gl.REPEAT;
            var filter = gl.LINEAR;
            var textures = [];
            for (var i = 0; i < 2; ++i) {
                var texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, uintData);
                textures.push(texture);
            }
            {
                var _texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, _texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.UNSIGNED_BYTE, uintData);
                textures.push(_texture);
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = textures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var iT = _step.value;

                    gl.bindTexture(gl.TEXTURE_2D, iT);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._normalsTex = textures[2];
            this._heightmapsTex = [textures[0], textures[1]];
            this._currIndex = 0;
            this.computeNormals();
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        }
    }, {
        key: "surfaceTension",
        set: function set(c) {
            this._surfaceTension = c;
            this._updateShader.u["uC"].value = c;
        },
        get: function get() {
            return this._surfaceTension;
        }
    }, {
        key: "springStiffness",
        set: function set(k) {
            this._springStiffness = k;
            this._updateShader.u["uK"].value = k;
        },
        get: function get() {
            return this._springStiffness;
        }
    }, {
        key: "dispersion",
        set: function set(f) {
            this._dispersion = f;
            this._updateShader.u["uF"].value = f;
        },
        get: function get() {
            return this._dispersion;
        }
    }, {
        key: "heightmap",
        get: function get() {
            return this._heightmapsTex[this._currIndex];
        }
    }, {
        key: "normalmap",
        get: function get() {
            return this._normalsTex;
        }
    }, {
        key: "currHeightmap",
        get: function get() {
            return this._heightmapsTex[this._currIndex];
        }
    }, {
        key: "nextHeightmap",
        get: function get() {
            return this._heightmapsTex[(this._currIndex + 1) % 2];
        }
    }]);

    return Water;
}(__WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Water);
//# sourceMappingURL=water.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewer2D_shaders__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controls__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Viewer2D = function (_Viewer) {
    _inherits(Viewer2D, _Viewer);

    function Viewer2D(gl, common) {
        _classCallCheck(this, Viewer2D);

        function isPowerOf2(n) {
            if (typeof n !== 'number') return 'Not a number';
            return n && (n & n - 1) === 0;
        }

        var _this = _possibleConstructorReturn(this, (Viewer2D.__proto__ || Object.getPrototypeOf(Viewer2D)).call(this, gl));

        _this._displayShader = __WEBPACK_IMPORTED_MODULE_2__viewer2D_shaders__["a" /* buildDisplayShader */](gl);
        _this._displayShader.u["uTileTexture"].value = common.tileTexture;
        _this._displayShader.u["uCaustics"].value = common.caustics.texture;
        return _this;
    }

    _createClass(Viewer2D, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            this._displayShader.freeGLResources();
        }
    }, {
        key: "display",
        value: function display(water, common) {
            var gl = _get(Viewer2D.prototype.__proto__ || Object.getPrototypeOf(Viewer2D.prototype), "gl", this); //shortcut
            gl.disable(gl.CULL_FACE);
            gl.disable(gl.DEPTH_TEST);
            var displayShader = this._displayShader;
            __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__["a" /* default */].bindDefault(gl);
            displayShader.u["uWater"].value = water.heightmap;
            displayShader.u["uNormals"].value = water.normalmap;
            displayShader.use();
            displayShader.bindUniformsAndAttributes();
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
    }, {
        key: "interact",
        value: function interact(water) {
            if (__WEBPACK_IMPORTED_MODULE_3__controls__["c" /* mouse */].pressed) {
                var p = __WEBPACK_IMPORTED_MODULE_3__controls__["c" /* mouse */].relativePos;
                water.touch(p[0] * water.width, p[1] * water.height, 8);
            }
        }
    }, {
        key: "updateSpecular",
        value: function updateSpecular() {
            this._displayShader.u["uShowSpecular"].value = this.specular;
        }
    }, {
        key: "updateCaustics",
        value: function updateCaustics() {
            this._displayShader.u["uShowCaustics"].value = this.caustics;
        }
    }, {
        key: "updateFresnel",
        value: function updateFresnel() {}
    }, {
        key: "updateAmplitude",
        value: function updateAmplitude() {
            this._displayShader.u["uAmplitude"].value = this.amplitude;
        }
    }, {
        key: "updateWaterLevel",
        value: function updateWaterLevel() {
            this._displayShader.u["uWaterLevel"].value = this.waterLevel;
        }
    }, {
        key: "updateOpacity",
        value: function updateOpacity() {
            this._displayShader.u["uOpacity"].value = this.opacity;
        }
    }, {
        key: "updateEta",
        value: function updateEta() {
            this._displayShader.u["uEta"].value = this.eta;
        }
    }]);

    return Viewer2D;
}(__WEBPACK_IMPORTED_MODULE_0__viewer__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Viewer2D);
//# sourceMappingURL=viewer2D.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildDisplayShader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__water_shaders__ = __webpack_require__(2);



var fullscreenVert = "attribute vec2 aCorner; //{0,1}x{0,1}\n\nvarying vec2 sampleCoords;\n\nvoid main(void) {\n    sampleCoords = aCorner;\n    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);\n}";
var displayFrag = "precision mediump float;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\nuniform sampler2D uCaustics;\nuniform sampler2D uTileTexture;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\nuniform float uEta;\nuniform float uOpacity;\nuniform bool uShowSpecular;\nuniform bool uShowCaustics;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nconst vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);\nconst vec3 SPECULAR_COLOR = vec3(1);\nconst float TILE_REPETITION = 4.0;\n\nvoid main(void)\n{\n    float height = decodeHeight(texture2D(uWater, sampleCoords));\n    height = uWaterLevel + 0.5 * uAmplitude * height;\n    vec3 normal = decodeNormal(texture2D(uNormals, sampleCoords), uAmplitude);\n\n    vec3 position = vec3(sampleCoords, height);\n\n    const vec3 fromEye = vec3(0, 0, -1);\n    vec3 refracted = refract(fromEye, normal, uEta);\n    refracted *= height / refracted.z;\n    vec2 coordsOnFloor = sampleCoords + refracted.xy;\n\n    vec3 tileColor = texture2D(uTileTexture, TILE_REPETITION * coordsOnFloor).rgb;\n    float caustics = texture2D(uCaustics, coordsOnFloor).r;\n    caustics = mix(0.5, caustics, float(uShowCaustics));\n    vec3 floorColor = tileColor * (0.5 + caustics);\n\n    float opacity = clamp(uOpacity * length(refracted), 0.0, 1.0);\n    vec3 color = mix(floorColor, WATER_COLOR, opacity);\n\n    const vec3 fromLight = normalize(vec3(.05, -.1, -.8));\n    vec3 reflected = reflect(fromLight, normal);\n    float specular = max(0.0, dot(reflected, -fromEye));\n    specular = pow(specular, 1000.0) * float(uShowSpecular);\n\n    gl_FragColor = vec4(color + specular, 1);\n}";
function buildDisplayShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = displayFrag.replace(/___ENCODE_DECODE___/g, __WEBPACK_IMPORTED_MODULE_2__water_shaders__["d" /* encodeDecodeStr */]);
    var shader = new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = __WEBPACK_IMPORTED_MODULE_1__gl_utils_vbo__["a" /* default */].createQuad(gl, 0, 0, 1, 1);
    return shader;
}

//# sourceMappingURL=viewer2D-shaders.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function () {
    function Mouse(elt) {
        var _this = this;

        _classCallCheck(this, Mouse);

        this._elt = elt;
        this._pressed = false;
        this._pos = [0, 0];
        this._pressCallbacks = [];
        this._releaseCallbacks = [];
        this._moveCallbacks = [];
        this._wheelCallbacks = [];
        var mouse = this;
        var mouseMove = function mouseMove(e) {
            var absolutePos = [e.clientX, e.clientY];
            var newPos = mouse.documentToElement(absolutePos);
            var mvt = [newPos[0] - mouse.pos[0], newPos[1] - mouse.pos[1]];
            mouse._pos = newPos;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this._moveCallbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var callback = _step.value;

                    callback(mouse, mvt, mouse.setRelative(mvt));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
        var mouseDown = function mouseDown() {
            mouse._pressed = true;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = _this._pressCallbacks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var callback = _step2.value;

                    callback(mouse);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        };
        var mouseUp = function mouseUp() {
            mouse._pressed = false;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _this._releaseCallbacks[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var callback = _step3.value;

                    callback(mouse);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        };
        var mouseWheel = function mouseWheel(e) {
            if (e.ctrlKey && mouse.isInElt) {
                e.preventDefault();
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = _this._wheelCallbacks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var callback = _step4.value;

                        callback(mouse, e.deltaX || e.deltaY || e.deltaZ);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        };
        document.addEventListener("mousemove", mouseMove, false);
        elt.addEventListener("mousedown", mouseDown, false);
        document.addEventListener("mouseup", mouseUp, false);
        elt.addEventListener("wheel", mouseWheel, false);
    }

    _createClass(Mouse, [{
        key: "addMoveCallback",
        value: function addMoveCallback(callback) {
            this.addCallback(callback, this._moveCallbacks);
        }
    }, {
        key: "removeMoveCallback",
        value: function removeMoveCallback(callback) {
            return this.removeCallback(callback, this._moveCallbacks);
        }
    }, {
        key: "addPressCallback",
        value: function addPressCallback(callback) {
            this.addCallback(callback, this._pressCallbacks);
        }
    }, {
        key: "removePressCallback",
        value: function removePressCallback(callback) {
            return this.removeCallback(callback, this._moveCallbacks);
        }
    }, {
        key: "addReleaseCallback",
        value: function addReleaseCallback(callback) {
            this.addCallback(callback, this._releaseCallbacks);
        }
    }, {
        key: "removeReleaseCallback",
        value: function removeReleaseCallback(callback) {
            return this.removeCallback(callback, this._releaseCallbacks);
        }
    }, {
        key: "addWheelCallback",
        value: function addWheelCallback(callback) {
            this.addCallback(callback, this._wheelCallbacks);
        }
    }, {
        key: "removeWheelCallback",
        value: function removeWheelCallback(callback) {
            return this.removeCallback(callback, this._wheelCallbacks);
        }
    }, {
        key: "addCallback",
        value: function addCallback(callback, callbackList) {
            if (this.findIndexOf(callback, callbackList) < 0) {
                callbackList.push(callback);
            }
        }
    }, {
        key: "removeCallback",
        value: function removeCallback(callback, callbackList) {
            var index = this.findIndexOf(callback, callbackList);
            if (index < 0) {
                return false;
            }
            callbackList.splice(index, 1);
            return true;
        }
    }, {
        key: "findIndexOf",
        value: function findIndexOf(e, a) {
            var l = a.length;
            for (var i = 0; i < l; i++) {
                if (a[i] === e) {
                    return i;
                }
            }
            return -1;
        }
    }, {
        key: "setRelative",
        value: function setRelative(p) {
            return [p[0] / this._elt.clientWidth, p[1] / this._elt.clientHeight];
        }
    }, {
        key: "documentToElement",
        value: function documentToElement(pos) {
            var rect = this._elt.getBoundingClientRect();
            return [pos[0] - rect.left, this._elt.clientHeight - (pos[1] - rect.top)];
        }
    }, {
        key: "pressed",
        get: function get() {
            return this._pressed;
        }
    }, {
        key: "pos",
        get: function get() {
            return this._pos;
        }
    }, {
        key: "relativePos",
        get: function get() {
            return this.setRelative(this.pos);
        }
    }, {
        key: "isInElt",
        get: function get() {
            var p = this.relativePos;
            return p[0] > 0 && p[1] > 0 && p[0] < 1 && p[1] < 1;
        }
    }]);

    return Mouse;
}();


//# sourceMappingURL=mouse.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer3D_shaders__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controls__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__orbitalCamera__ = __webpack_require__(15);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Viewer3D = function (_Viewer) {
    _inherits(Viewer3D, _Viewer);

    function Viewer3D(gl, common) {
        _classCallCheck(this, Viewer3D);

        var _this = _possibleConstructorReturn(this, (Viewer3D.__proto__ || Object.getPrototypeOf(Viewer3D)).call(this, gl));

        _this._pMatrix = mat4.create();
        _this._mvpMatrix = mat4.create();
        mat4.perspective(_this._pMatrix, 45, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);
        _this._camera = new __WEBPACK_IMPORTED_MODULE_3__orbitalCamera__["a" /* default */]([0, 0, _this.waterLevel - .5], 1.7);
        _this._camera.theta = 0;
        _this._camera.phi = 0.8;
        _this._lightDirection = vec3.fromValues(1, 0, -1);
        vec3.normalize(_this._lightDirection, _this._lightDirection);
        var n = 256;
        _this.initSurface(n, n);
        _this.init();
        var shaders = [_this._sidesShader, _this._surfaceShader];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = shaders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var shader = _step.value;

                shader.u["uTileTexture"].value = common.tileTexture;
                shader.u["uCaustics"].value = common.caustics.texture;
                shader.u["uLightDir"].value = _this._lightDirection;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        var minPhi = 0.000001,
            maxPhi = 1.2;
        var viewer = _this;
        var moveCamera = function moveCamera(m, mvt, relMvt) {
            if (__WEBPACK_IMPORTED_MODULE_2__controls__["c" /* mouse */].pressed) {
                viewer._camera.theta -= 0.5 * 2 * 3.14159 * relMvt[0];
                viewer._camera.phi += 0.5 * 2 * relMvt[1];
                viewer._camera.phi = Math.min(maxPhi, Math.max(minPhi, viewer._camera.phi));
                viewer.updateMVPMatrix();
            }
        };
        __WEBPACK_IMPORTED_MODULE_2__controls__["c" /* mouse */].addMoveCallback(moveCamera);
        var minDist = 1.42,
            maxDist = 3;
        var changeDist = function changeDist(m, delta) {
            var d = viewer._camera.distance + delta * 0.002;
            d = Math.min(maxDist, Math.max(minDist, d));
            viewer._camera.distance = d;
            viewer.updateMVPMatrix();
        };
        __WEBPACK_IMPORTED_MODULE_2__controls__["c" /* mouse */].addWheelCallback(changeDist);
        return _this;
    }

    _createClass(Viewer3D, [{
        key: "updateMVPMatrix",
        value: function updateMVPMatrix() {
            mat4.multiply(this._mvpMatrix, this._pMatrix, this._camera.viewMatrix);
        }
    }, {
        key: "initSurface",
        value: function initSurface(w, h) {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            this._gridWidth = w;
            this._gridHeight = h;
            /* Grid vertices */
            {
                var nX = this._gridWidth;
                var nY = this._gridHeight;
                {
                    var vert = [];
                    for (var iY = 0; iY < nY; ++iY) {
                        for (var iX = 0; iX < nX; ++iX) {
                            vert.push(iX / (nX - 1));
                            vert.push(iY / (nY - 1));
                        }
                    }
                    var array = new Float32Array(vert);
                    var id = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, id);
                    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    this._gridVertices = id;
                }
                {
                    var indices = [];
                    for (var _iY = 0; _iY < nY - 1; ++_iY) {
                        for (var _iX = 0; _iX < nX - 1; ++_iX) {
                            indices.push(_iY * nX + _iX);
                            indices.push(_iY * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX);
                            indices.push(_iY * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX);
                        }
                    }
                    var _array = new Uint16Array(indices);
                    var _id = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _id);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, _array, gl.STATIC_DRAW);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    this._gridIndices = _id;
                }
            }
        }
    }, {
        key: "freeGLResources",
        value: function freeGLResources() {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            gl.deleteBuffer(this._vertices);
            gl.deleteBuffer(this._normals);
            this._sidesShader.freeGLResources();
            this._surfaceShader.freeGLResources();
            gl.deleteBuffer(this._gridVertices);
            gl.deleteBuffer(this._gridIndices);
        }
    }, {
        key: "display",
        value: function display(water, common) {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            /* Update camera position */
            this._sidesShader.u["uEyePos"].value = this._camera.eyePos;
            this._surfaceShader.u["uEyePos"].value = this._camera.eyePos;
            /* Actual displaying */
            gl.enable(gl.CULL_FACE);
            gl.enable(gl.DEPTH_TEST);
            this.displaySides(water);
            this.displaySurface(water);
        }
    }, {
        key: "interact",
        value: function interact(water) {}
    }, {
        key: "displaySides",
        value: function displaySides(water) {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            var shader = this._sidesShader;
            shader.u["uWater"].value = water.heightmap;
            shader.use();
            shader.bindUniforms();
            var vLoc = 0;
            var nLoc = 1;
            gl.enableVertexAttribArray(vLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertices);
            gl.vertexAttribPointer(vLoc, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(nLoc);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._normals);
            gl.vertexAttribPointer(nLoc, 2, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLES, 0, 4 * 6);
            gl.disableVertexAttribArray(nLoc);
            gl.disableVertexAttribArray(vLoc);
        }
    }, {
        key: "displaySurface",
        value: function displaySurface(water) {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            var shader = this._surfaceShader;
            shader.u["uWater"].value = water.heightmap;
            shader.u["uNormals"].value = water.normalmap;
            shader.use();
            shader.bindUniforms();
            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._gridVertices);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._gridIndices);
            var nbTriangles = 2 * (this._gridWidth - 1) * (this._gridHeight - 1);
            gl.drawElements(gl.TRIANGLES, 3 * nbTriangles, gl.UNSIGNED_SHORT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.disableVertexAttribArray(0);
        }
    }, {
        key: "init",
        value: function init() {
            var gl = _get(Viewer3D.prototype.__proto__ || Object.getPrototypeOf(Viewer3D.prototype), "gl", this); //shortcut
            this._sidesShader = __WEBPACK_IMPORTED_MODULE_1__viewer3D_shaders__["a" /* buildSidesShader */](gl);
            this._sidesShader.u["uMVPMatrix"].value = this._mvpMatrix;
            this._surfaceShader = __WEBPACK_IMPORTED_MODULE_1__viewer3D_shaders__["b" /* buildSurfaceShader */](gl);
            this._surfaceShader.u["uMVPMatrix"].value = this._mvpMatrix;
            /* Buffer data */
            {
                var vert = [+.5, -.5, +1, -.5, -.5, +1, -.5, -.5, +0, +.5, -.5, +1, -.5, -.5, +0, +.5, -.5, +0, +.5, +.5, +1, +.5, -.5, +1, +.5, -.5, +0, +.5, +.5, +1, +.5, -.5, +0, +.5, +.5, +0, +.5, +.5, +1, -.5, +.5, +0, -.5, +.5, +1, -.5, +.5, +0, +.5, +.5, +1, +.5, +.5, +0, -.5, -.5, +1, -.5, +.5, +1, -.5, -.5, +0, -.5, -.5, +0, -.5, +.5, +1, -.5, +.5, +0];
                var id = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, id);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
                this._vertices = id;
            }
            {
                var norm = [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, +1, 0, +1, 0, +1, 0, +1, 0, +1, 0, +1, 0, 0, +1, 0, +1, 0, +1, 0, +1, 0, +1, 0, +1, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0];
                var _id2 = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, _id2);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);
                this._normals = _id2;
            }
        }
    }, {
        key: "updateSpecular",
        value: function updateSpecular() {
            this._sidesShader.u["uSpecular"].value = this.specular;
            this._surfaceShader.u["uSpecular"].value = this.specular;
        }
    }, {
        key: "updateCaustics",
        value: function updateCaustics() {
            this._sidesShader.u["uShowCaustics"].value = this.caustics;
            this._surfaceShader.u["uShowCaustics"].value = this.caustics;
        }
    }, {
        key: "updateFresnel",
        value: function updateFresnel() {
            this._sidesShader.u["uFresnel"].value = this.fresnel;
            this._surfaceShader.u["uFresnel"].value = this.fresnel;
        }
    }, {
        key: "updateAmplitude",
        value: function updateAmplitude() {
            var amplitude = 5 * this.amplitude;
            this._sidesShader.u["uAmplitude"].value = amplitude;
            this._surfaceShader.u["uAmplitude"].value = amplitude;
        }
    }, {
        key: "updateWaterLevel",
        value: function updateWaterLevel() {
            this._sidesShader.u["uWaterLevel"].value = this.waterLevel;
            this._surfaceShader.u["uWaterLevel"].value = this.waterLevel;
            this._camera.focusPoint = [0, 0, this.waterLevel - .5];
            this.updateMVPMatrix();
        }
    }, {
        key: "updateOpacity",
        value: function updateOpacity() {
            this._sidesShader.u["uOpacity"].value = this.opacity;
            this._surfaceShader.u["uOpacity"].value = this.opacity;
        }
    }, {
        key: "updateEta",
        value: function updateEta() {
            this._sidesShader.u["uEta"].value = this.eta;
            this._surfaceShader.u["uEta"].value = this.eta;
            var F0 = (1 - this.eta) / (1 + this.eta);
            F0 = F0 * F0;
            this._sidesShader.u["uF0"].value = F0;
            this._surfaceShader.u["uF0"].value = F0;
        }
    }]);

    return Viewer3D;
}(__WEBPACK_IMPORTED_MODULE_0__viewer__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Viewer3D);
//# sourceMappingURL=viewer3D.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildSidesShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return buildSurfaceShader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__water_shaders__ = __webpack_require__(2);


var waterCommonStr = "\nuniform sampler2D uCaustics;\nuniform sampler2D uTileTexture;\n\nuniform vec3 uLightDir; //normalized\n\nuniform float uF0;\nuniform float uEta;\nuniform float uOpacity;\nuniform bool uSpecular;\nuniform bool uShowCaustics;\nuniform bool uFresnel;\n\nconst vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);\nconst vec3 SPECULAR_COLOR = vec3(1);\nconst float TILE_REPETITION = 4.0;\n\n/* Fresnel factor describes the proportion of refracted and reflected.\n* Arguments expected to be normalized. */\nfloat getFresnelFactor(const vec3 normal, const vec3 fromEye)\n{\n    float computed = mix(pow(1.0 - dot(normal,-fromEye), 5.0), 1.0, uF0);\n    return min(float(uFresnel), computed);\n}\n\nvec3 getTileColor(const vec2 coords)\n{\n    return texture2D(uTileTexture, TILE_REPETITION * coords).rgb;\n}\n\nfloat getCaustics(const vec2 coords)\n{\n    return mix(0.5, texture2D(uCaustics, coords).r, float(uShowCaustics));\n}\n\nvec3 getFloorColor(const vec2 coords)\n{\n    if (any(lessThan(coords, vec2(0))) || any(greaterThan(coords, vec2(1)))) {\n        return vec3(0);\n    }\n\n    return getTileColor(coords) * (0.5 + getCaustics(coords));\n}\n\n/* Floor color mixed with opacity.\n* 'refracted' expected to be normalized. */\nvec3 getRefractedColor(const vec3 entryPoint, vec3 refracted)\n{\n    if (refracted.z >= 0.0) {\n        return WATER_COLOR;\n    }\n\n    refracted *= -entryPoint.z / refracted.z;\n\n    vec2 groundCoords = entryPoint.xy + refracted.xy;\n    vec3 floorColor = getFloorColor(groundCoords + .5);\n\n    /*float f = 1.0;\n\n    if (groundCoords.x < -.5) {\n        f = min(f, abs((-.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));\n    }\n    if (groundCoords.x > .5) {\n        f = min(f, abs((.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));\n    }\n    if (groundCoords.y < -.5) {\n        f = min(f, abs((-.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));\n    }\n    if (groundCoords.y > .5) {\n        f = min(f, abs((.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));\n    }\n\n    refracted *= f;*/\n\n    float opacity = uOpacity * entryPoint.z;//length(refracted);\n    opacity = clamp(opacity, 0.0, 1.0);\n\n    return mix(floorColor, WATER_COLOR, opacity);\n}\n\nvec3 getReflectedColor(const vec3 dir)\n{\n    return 0.5 * WATER_COLOR;\n}\n\nvec4 getSpecular(const vec3 reflected)\n{\n    float f = max(0.0, dot(-uLightDir, reflected));\n    f = pow(f, 200.0);\n    f *= float(uSpecular);\n\n    return vec4(SPECULAR_COLOR, f);\n}\n\nvec3 computeColor(const vec3 pos, const vec3 fromEye, const vec3 normal)\n{\n    vec3 refracted = refract(fromEye, normal, uEta);\n    vec3 reflected = reflect(fromEye, normal);\n\n    vec3 refractedColor = getRefractedColor(pos, refracted);\n    vec3 reflectedColor = getReflectedColor(reflected);\n\n    float fresnelFactor = getFresnelFactor(fromEye, normal);\n\n    vec3 surfaceColor = mix(refractedColor, reflectedColor, fresnelFactor);\n    vec4 specularColor = getSpecular(reflected);\n\n    return mix(surfaceColor, specularColor.rgb, specularColor.a);\n}";
var sidesVert = "attribute vec3 aPosition; //in {-.5, +.5} x {-.5, +.5} x {+0, +1}\nattribute vec2 aNormal; //normalized in {-1, +1} x {-1, +1}\n\nuniform mat4 uMVPMatrix;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\n\nvarying vec3 vPosition;\nvarying vec2 vNormal;\nvarying float relativeHeight; //relative to amplitude, in [-1, +1]\n\nvoid main(void) {\n    float dH = uAmplitude / 2.0;\n\n    vPosition = aPosition;\n    vPosition.z *= uWaterLevel + dH;\n\n    vNormal = aNormal;\n\n    relativeHeight = (vPosition.z - uWaterLevel) / dH;\n    \n    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);\n}";
var sidesFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec3 uEyePos;\n\nvarying vec3 vPosition;\nvarying vec2 vNormal;\nvarying float relativeHeight; //relative to amplitude, in [-1, +1]\n\n___ENCODE_DECODE___\n\n___WATER_COMMON___\n\n/* Returns true for every fragment above the water level */\nbool shouldSkip()\n{\n    float surface = decodeHeight(texture2D(uWater, vPosition.xy + .5));\n    return (relativeHeight > surface);\n}\n\nvoid main(void)\n{\n    /* Skip the fragments above water level */\n    if (shouldSkip()) {\n        discard;\n    }\n\n    vec3 fromEye = normalize(vPosition - uEyePos);\n    vec3 normal = vec3(vNormal, 0); //already normalized\n    \n    vec3 color = computeColor(vPosition, fromEye, normal);\n\n    gl_FragColor = vec4(color, 1);\n}";
var surfaceVert = "attribute vec2 aSampleCoords; //in [0,1] x [0,1]\n\nuniform mat4 uMVPMatrix;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    float height = decodeHeight(texture2D(uWater, aSampleCoords));\n\n    float dH = uAmplitude / 2.0;\n\n    vPosition.xy = aSampleCoords - .5;\n    vPosition.z = uWaterLevel + dH * height;\n\n    vNormal = decodeNormal(texture2D(uNormals, aSampleCoords), uAmplitude);\n    \n    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);\n}";
var surfaceFrag = "precision mediump float;\n\nuniform vec3 uEyePos;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n\n___WATER_COMMON___\n\nvoid main(void)\n{\n    vec3 fromEye = normalize(vPosition - uEyePos);\n    vec3 normal = normalize(vNormal);\n\n    vec3 color = computeColor(vPosition, fromEye, normal);\n\n    gl_FragColor = vec4(color, 1);\n}";
function buildSidesShader(gl) {
    var vertSrc = sidesVert;
    var fragSrc = sidesFrag.replace(/___ENCODE_DECODE___/g, __WEBPACK_IMPORTED_MODULE_1__water_shaders__["d" /* encodeDecodeStr */]);
    fragSrc = fragSrc.replace(/___WATER_COMMON___/g, waterCommonStr);
    return new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
}
function buildSurfaceShader(gl) {
    var vertSrc = surfaceVert.replace(/___ENCODE_DECODE___/g, __WEBPACK_IMPORTED_MODULE_1__water_shaders__["d" /* encodeDecodeStr */]);
    var fragSrc = surfaceFrag.replace(/___WATER_COMMON___/g, waterCommonStr);
    return new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
}

//# sourceMappingURL=viewer3D-shaders.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OrbitalCamera = function () {
    function OrbitalCamera(focusPoint, distance) {
        _classCallCheck(this, OrbitalCamera);

        this._focus = focusPoint;
        this._distance = distance;
        this._theta = 0;
        this._phi = 0.01;
        this._eyePos = [0, 0, 0];
        this._viewMatrix = mat4.create();
        this.recompute();
    }

    _createClass(OrbitalCamera, [{
        key: "recompute",
        value: function recompute() {
            var sin = Math.sin;
            var cos = Math.cos;
            this._eyePos[0] = this.focusPoint[0] + this.distance * (sin(this.phi) * cos(this.theta));
            this._eyePos[1] = this.focusPoint[1] + this.distance * (sin(this.phi) * sin(this.theta));
            this._eyePos[2] = this.focusPoint[2] + this.distance * cos(this.phi);
            this._viewMatrix = mat4.lookAt(this._viewMatrix, this.eyePos, this.focusPoint, [0, 0, 1]);
        }
    }, {
        key: "focusPoint",
        get: function get() {
            return this._focus;
        },
        set: function set(newFocus) {
            this._focus = newFocus;
            this.recompute();
        }
    }, {
        key: "distance",
        get: function get() {
            return this._distance;
        },
        set: function set(newDistance) {
            this._distance = newDistance;
            this.recompute();
        }
    }, {
        key: "theta",
        get: function get() {
            return this._theta;
        },
        set: function set(newTheta) {
            this._theta = newTheta;
            this.recompute();
        }
    }, {
        key: "phi",
        get: function get() {
            return this._phi;
        },
        set: function set(newPhi) {
            this._phi = newPhi;
            this.recompute();
        }
    }, {
        key: "eyePos",
        get: function get() {
            return this._eyePos;
        }
    }, {
        key: "viewMatrix",
        get: function get() {
            return this._viewMatrix;
        }
    }]);

    return OrbitalCamera;
}();

/* harmony default export */ __webpack_exports__["a"] = (OrbitalCamera);
//# sourceMappingURL=orbitalCamera.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__caustics__ = __webpack_require__(17);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ViewerCommon = function (_GLResource) {
    _inherits(ViewerCommon, _GLResource);

    function ViewerCommon(gl, causticsRes, tileTexPath) {
        _classCallCheck(this, ViewerCommon);

        function isPowerOf2(n) {
            if (typeof n !== 'number') return 'Not a number';
            return n && (n & n - 1) === 0;
        }

        /* Create caustics */
        var _this = _possibleConstructorReturn(this, (ViewerCommon.__proto__ || Object.getPrototypeOf(ViewerCommon)).call(this, gl));

        _this._caustics = new __WEBPACK_IMPORTED_MODULE_1__caustics__["a" /* default */](gl, causticsRes, causticsRes);
        /* Create tile texture. Default texture is blue 1x1 texture. */
        _this._tileTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, _this._tileTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        var tileImg = new Image();
        var tileTexture = _this._tileTexture;
        tileImg.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, tileTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tileImg);
            if (isPowerOf2(tileImg.width) && isPowerOf2(tileImg.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        tileImg.src = tileTexPath;
        return _this;
    }

    _createClass(ViewerCommon, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            var gl = _get(ViewerCommon.prototype.__proto__ || Object.getPrototypeOf(ViewerCommon.prototype), "gl", this); //shortcut
            this._caustics.freeGLResources();
            this._caustics = null;
            gl.deleteTexture(this._tileTexture);
            this._tileTexture = null;
        }
    }, {
        key: "caustics",
        get: function get() {
            return this._caustics;
        }
    }, {
        key: "tileTexture",
        get: function get() {
            return this._tileTexture;
        }
    }]);

    return ViewerCommon;
}(__WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ViewerCommon);
//# sourceMappingURL=viewerCommon.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__caustics_shaders__ = __webpack_require__(18);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Caustics = function (_GLResource) {
    _inherits(Caustics, _GLResource);

    function Caustics(gl, w, h) {
        _classCallCheck(this, Caustics);

        var _this = _possibleConstructorReturn(this, (Caustics.__proto__ || Object.getPrototypeOf(Caustics)).call(this, gl));

        _this._supported = gl.getExtension('OES_standard_derivatives') !== null;
        var n = 128;
        _this._gridWidth = n;
        _this._gridHeight = n;
        _this.reset(w, h);
        return _this;
    }

    _createClass(Caustics, [{
        key: "freeGLResources",
        value: function freeGLResources() {
            var gl = _get(Caustics.prototype.__proto__ || Object.getPrototypeOf(Caustics.prototype), "gl", this); //shortcut
            if (this._shader) {
                this._shader.freeGLResources();
            }
            if (this._texture) {
                gl.deleteTexture(this._texture);
            }
            if (this._fbo) {
                this._fbo.freeGLResources();
            }
            if (this._vertices) {
                gl.deleteBuffer(this._vertices);
            }
            if (this._indices) {
                gl.deleteBuffer(this._indices);
            }
        }
    }, {
        key: "compute",
        value: function compute(water, amplitude, waterLevel, eta) {
            if (!this.supported) return;
            var gl = _get(Caustics.prototype.__proto__ || Object.getPrototypeOf(Caustics.prototype), "gl", this); //shortcut
            var shader = this._shader;
            shader.u["uWater"].value = water.heightmap;
            shader.u["uNormals"].value = water.normalmap;
            shader.u["uAmplitude"].value = 0.1 * amplitude;
            shader.u["uWaterLevel"].value = waterLevel;
            shader.u["uEta"].value = eta;
            this._fbo.bind([this._texture]);
            gl.clear(gl.COLOR_BUFFER_BIT);
            shader.use();
            shader.bindUniforms(); //AndAttributes();
            gl.enableVertexAttribArray(0);
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertices);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indices);
            var nbTriangles = 2 * (this._gridWidth - 1) * (this._gridHeight - 1);
            gl.drawElements(gl.TRIANGLES, 3 * nbTriangles, gl.UNSIGNED_SHORT, 0);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.disableVertexAttribArray(0);
        }
    }, {
        key: "reset",
        value: function reset(w, h) {
            if (!this.supported) return;
            this.freeGLResources();
            var gl = _get(Caustics.prototype.__proto__ || Object.getPrototypeOf(Caustics.prototype), "gl", this); //shortcut
            this._width = w;
            this._height = h;
            this._shader = __WEBPACK_IMPORTED_MODULE_2__caustics_shaders__["a" /* buildCausticsShader */](gl);
            this._fbo = new __WEBPACK_IMPORTED_MODULE_1__gl_utils_fbo__["a" /* default */](gl, w, h);
            /* Texture initialization */
            var data = new Array(3 * w * h).fill(127);
            var uintData = new Uint8Array(data);
            var wrap = gl.CLAMP_TO_EDGE;
            var filter = gl.LINEAR;
            this._texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.UNSIGNED_BYTE, uintData);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
            /* Grid vertices */
            {
                var nX = this._gridWidth;
                var nY = this._gridHeight;
                {
                    var vert = [];
                    for (var iY = 0; iY < nY; ++iY) {
                        for (var iX = 0; iX < nX; ++iX) {
                            vert.push(iX / (nX - 1));
                            vert.push(iY / (nY - 1));
                        }
                    }
                    var array = new Float32Array(vert);
                    var id = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, id);
                    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);
                    this._vertices = id;
                }
                {
                    var indices = [];
                    for (var _iY = 0; _iY < nY - 1; ++_iY) {
                        for (var _iX = 0; _iX < nX - 1; ++_iX) {
                            indices.push(_iY * nX + _iX);
                            indices.push(_iY * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX);
                            indices.push(_iY * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX + 1);
                            indices.push((_iY + 1) * nX + _iX);
                        }
                    }
                    var _array = new Uint16Array(indices);
                    var _id = gl.createBuffer();
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _id);
                    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, _array, gl.STATIC_DRAW);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                    this._indices = _id;
                }
            }
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        }
    }, {
        key: "texture",
        get: function get() {
            return this._texture;
        }
    }, {
        key: "supported",
        get: function get() {
            return this._supported;
        }
    }]);

    return Caustics;
}(__WEBPACK_IMPORTED_MODULE_0__gl_utils_gl_resource__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Caustics);
//# sourceMappingURL=caustics.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildCausticsShader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__water_shaders__ = __webpack_require__(2);


var causticsVert = "attribute vec2 aVert;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\n\nuniform float uAmplitude;\nuniform float uWaterLevel;\nuniform float uEta;\n\nvarying vec2 sourceCoords;\nvarying vec2 refractedCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    float height = decodeHeight(texture2D(uWater, aVert));\n    height = uWaterLevel + 0.5 * uAmplitude * height;\n    vec3 normal = decodeNormal(texture2D(uNormals, aVert), uAmplitude);\n\n    const vec3 fromLight = vec3(0, 0, -1);\n    vec3 refracted = refract(fromLight, normal, uEta);\n    vec3 toGround = height * refracted / refracted.z;\n\n    vec2 groundCoords = aVert + toGround.xy;\n\n    sourceCoords = aVert;\n    refractedCoords = groundCoords;\n\n    gl_Position = vec4(2.0*groundCoords - 1.0, 0.0, 1.0);\n}";
var causticsFrag = "#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\nvarying vec2 sourceCoords;\nvarying vec2 refractedCoords;\n\nvoid main(void)\n{\n    float sourceArea = length(dFdx(sourceCoords)) * length(dFdy(sourceCoords));\n    float refractedArea = length(dFdx(refractedCoords)) * length(dFdy(refractedCoords));\n\n    float variation = sourceArea / refractedArea;\n\n    gl_FragColor = 0.5 + .9 * vec4(variation - 1.0);\n}";
function buildCausticsShader(gl) {
    var vertSrc = causticsVert.replace(/___ENCODE_DECODE___/g, __WEBPACK_IMPORTED_MODULE_1__water_shaders__["d" /* encodeDecodeStr */]);
    ;
    var fragSrc = causticsFrag;
    return new __WEBPACK_IMPORTED_MODULE_0__gl_utils_shader__["a" /* default */](gl, vertSrc, fragSrc);
}

//# sourceMappingURL=caustics-shaders.js.map

/***/ })
/******/ ]);