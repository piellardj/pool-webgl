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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/controls.ts":
/*!****************************!*\
  !*** ./src/ts/controls.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bindControls(water, viewer2D, viewer3D) {
    {
        var RESOLUTION_CONTROL_ID = "quality";
        var setResolution = function (resolution) {
            var size = +resolution[0];
            water.reset(size, size);
        };
        Tabs.addObserver(RESOLUTION_CONTROL_ID, setResolution);
        setResolution(Tabs.getValues(RESOLUTION_CONTROL_ID));
    }
    {
        var RAIN_CONTROL_ID = "rain-checkbox-id";
        var updateRain = function (enable) { water.rain = enable; };
        Checkbox.addObserver(RAIN_CONTROL_ID, updateRain);
        updateRain(Checkbox.isChecked(RAIN_CONTROL_ID));
    }
    {
        var TENSION_CONTROL_ID = "surface-tension-range-id";
        var updateTension = function (tension) { water.surfaceTension = tension; };
        Range.addObserver(TENSION_CONTROL_ID, updateTension);
        updateTension(Range.getValue(TENSION_CONTROL_ID));
    }
    {
        var SPRING_CONTROL_ID = "stiffness-range-id";
        var updateSpring = function (stiffness) { water.springStiffness = stiffness; };
        Range.addObserver(SPRING_CONTROL_ID, updateSpring);
        updateSpring(Range.getValue(SPRING_CONTROL_ID));
    }
    {
        var DISPERSION_CONTROL_ID = "dispersion-range-id";
        var updateDispersion = function (dispersion) { water.dispersion = dispersion; };
        Range.addObserver(DISPERSION_CONTROL_ID, updateDispersion);
        updateDispersion(Range.getValue(DISPERSION_CONTROL_ID));
    }
    {
        var SPECULAR_CONTROL_ID = "specular-checkbox-id";
        var updateSpecular = function (enable) {
            viewer2D.specular = enable;
            viewer3D.specular = enable;
        };
        Checkbox.addObserver(SPECULAR_CONTROL_ID, updateSpecular);
        updateSpecular(Checkbox.isChecked(SPECULAR_CONTROL_ID));
    }
    {
        var CAUSTICS_CONTROL_ID = "caustics-checkbox-id";
        var updateCaustics = function (enable) {
            viewer2D.caustics = enable;
            viewer3D.caustics = enable;
        };
        Checkbox.addObserver(CAUSTICS_CONTROL_ID, updateCaustics);
        updateCaustics(Checkbox.isChecked(CAUSTICS_CONTROL_ID));
    }
    {
        var FRESNEL_CONTROL_ID = "fresnel-checkbox-id";
        var updateSpecular = function (enable) {
            viewer2D.fresnel = enable;
            viewer3D.fresnel = enable;
        };
        Checkbox.addObserver(FRESNEL_CONTROL_ID, updateSpecular);
        updateSpecular(Checkbox.isChecked(FRESNEL_CONTROL_ID));
    }
    {
        var AMPLITUDE_CONTROL_ID = "amplitude-range-id";
        var updateAmplitude = function (amplitude) {
            viewer2D.amplitude = amplitude;
            viewer3D.amplitude = amplitude;
        };
        Range.addObserver(AMPLITUDE_CONTROL_ID, updateAmplitude);
        updateAmplitude(Range.getValue(AMPLITUDE_CONTROL_ID));
    }
    {
        var LEVEL_CONTROL_ID = "level-range-id";
        var updateWaterLevel = function (level) {
            viewer2D.waterLevel = level;
            viewer3D.waterLevel = level;
        };
        Range.addObserver(LEVEL_CONTROL_ID, updateWaterLevel);
        updateWaterLevel(Range.getValue(LEVEL_CONTROL_ID));
    }
    {
        var OPACITY_CONTROL_ID = "opacity-range-id";
        var updateOpacity = function (opacity) {
            viewer2D.opacity = opacity;
            viewer3D.opacity = opacity;
        };
        Range.addObserver(OPACITY_CONTROL_ID, updateOpacity);
        updateOpacity(Range.getValue(OPACITY_CONTROL_ID));
    }
    {
        var ETA_CONTROL_ID = "refraction-range-id";
        var updateEta = function (eta) {
            viewer2D.eta = eta;
            viewer3D.eta = eta;
        };
        Range.addObserver(ETA_CONTROL_ID, updateEta);
        updateEta(Range.getValue(ETA_CONTROL_ID));
    }
}
function bind(water, viewer2D, viewer3D) {
    bindControls(water, viewer2D, viewer3D);
}
exports.bind = bind;
function bindRendererChooser(choose2D, choose3D) {
    function bindViewer(viewerStr) {
        if (viewerStr[0] === "2D") {
            choose2D();
        }
        else {
            choose3D();
        }
    }
    var VIEWER_CONTROL_ID = "viewer";
    Tabs.addObserver(VIEWER_CONTROL_ID, bindViewer);
    bindViewer(Tabs.getValues(VIEWER_CONTROL_ID));
}
exports.bindRendererChooser = bindRendererChooser;


/***/ }),

/***/ "./src/ts/gl-utils/fbo.ts":
/*!********************************!*\
  !*** ./src/ts/gl-utils/fbo.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var FBO = (function (_super) {
    __extends(FBO, _super);
    function FBO(gl, width, height) {
        var _this = _super.call(this, gl) || this;
        _this.id = gl.createFramebuffer();
        _this.width = width;
        _this.height = height;
        return _this;
    }
    FBO.prototype.bind = function (colorBuffers, depthBuffer) {
        if (depthBuffer === void 0) { depthBuffer = null; }
        var gl = _super.prototype.gl.call(this);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.id);
        gl.viewport(0, 0, this.width, this.height);
        for (var i = 0; i < colorBuffers.length; ++i) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl['COLOR_ATTACHMENT' + i], gl.TEXTURE_2D, colorBuffers[i], 0);
        }
        if (depthBuffer) {
            gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        }
    };
    FBO.bindDefault = function (gl, viewport) {
        if (viewport === void 0) { viewport = null; }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (viewport === null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        else {
            gl.viewport(viewport.left, viewport.lower, viewport.width, viewport.height);
        }
    };
    FBO.prototype.freeGLResources = function () {
        _super.prototype.gl.call(this).deleteFramebuffer(this.id);
        this.id = null;
    };
    return FBO;
}(gl_resource_1.default));
exports.default = FBO;


/***/ }),

/***/ "./src/ts/gl-utils/gl-resource.ts":
/*!****************************************!*\
  !*** ./src/ts/gl-utils/gl-resource.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GLResource = (function () {
    function GLResource(gl) {
        this._gl = gl;
    }
    GLResource.prototype.gl = function () {
        return this._gl;
    };
    return GLResource;
}());
exports.default = GLResource;


/***/ }),

/***/ "./src/ts/gl-utils/shader.ts":
/*!***********************************!*\
  !*** ./src/ts/gl-utils/shader.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
function notImplemented(gl, location, value) {
    alert("NOT IMPLEMENTED YET");
}
function bindUniformFloat(gl, location, value) {
    if (Array.isArray(value)) {
        gl.uniform1fv(location, value);
    }
    else {
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
    }
    else {
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
var ShaderProgram = (function (_super) {
    __extends(ShaderProgram, _super);
    function ShaderProgram(gl, vertexSource, fragmentSource) {
        var _this = this;
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
        _this = _super.call(this, gl) || this;
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
        }
        else {
            _this.id = id;
            _this.introspection();
        }
        return _this;
    }
    ShaderProgram.prototype.freeGLResources = function () {
        _super.prototype.gl.call(this).deleteProgram(this.id);
        this.id = null;
    };
    ShaderProgram.prototype.introspection = function () {
        var gl = _super.prototype.gl.call(this);
        this.uCount = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
        this.u = [];
        for (var i = 0; i < this.uCount; ++i) {
            var uniform = gl.getActiveUniform(this.id, i);
            var name_1 = uniform.name;
            this.u[name_1] = {
                value: null,
                loc: gl.getUniformLocation(this.id, name_1),
                size: uniform.size,
                type: uniform.type,
            };
        }
        this.aCount = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
        this.a = [];
        for (var i = 0; i < this.aCount; ++i) {
            var attribute = gl.getActiveAttrib(this.id, i);
            var name_2 = attribute.name;
            this.a[name_2] = {
                VBO: null,
                loc: gl.getAttribLocation(this.id, name_2),
                size: attribute.size,
                type: attribute.type,
            };
        }
    };
    ShaderProgram.prototype.use = function () {
        _super.prototype.gl.call(this).useProgram(this.id);
    };
    ShaderProgram.prototype.bindUniforms = function () {
        var gl = _super.prototype.gl.call(this);
        var currTextureUnitNb = 0;
        for (var uName in this.u) {
            var uniform = this.u[uName];
            if (uniform.value !== null) {
                if (uniform.type === 0x8B5E || uniform.type === 0x8B60) {
                    var unitNb = currTextureUnitNb;
                    types[uniform.type].binder(gl, uniform.loc, unitNb, uniform.value);
                    currTextureUnitNb++;
                }
                else {
                    types[uniform.type].binder(gl, uniform.loc, uniform.value);
                }
            }
        }
    };
    ShaderProgram.prototype.bindAttributes = function () {
        for (var aName in this.a) {
            var attribute = this.a[aName];
            if (attribute.VBO !== null) {
                attribute.VBO.bind(attribute.loc);
            }
        }
    };
    ShaderProgram.prototype.bindUniformsAndAttributes = function () {
        this.bindUniforms();
        this.bindAttributes();
    };
    return ShaderProgram;
}(gl_resource_1.default));
exports.default = ShaderProgram;


/***/ }),

/***/ "./src/ts/gl-utils/utils.ts":
/*!**********************************!*\
  !*** ./src/ts/gl-utils/utils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function resizeCanvas(gl, hidpi) {
    if (hidpi === void 0) { hidpi = false; }
    var cssPixel = (hidpi) ? window.devicePixelRatio : 1;
    var width = Math.floor(gl.canvas.clientWidth * cssPixel);
    var height = Math.floor(gl.canvas.clientHeight * cssPixel);
    if (gl.canvas.width != width || gl.canvas.height != height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
}
exports.resizeCanvas = resizeCanvas;


/***/ }),

/***/ "./src/ts/gl-utils/vbo.ts":
/*!********************************!*\
  !*** ./src/ts/gl-utils/vbo.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var VBO = (function (_super) {
    __extends(VBO, _super);
    function VBO(gl, array, size, type) {
        var _this = _super.call(this, gl) || this;
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
    VBO.prototype.freeGLResources = function () {
        this.gl().deleteBuffer(this.id);
        this.id = null;
    };
    VBO.createQuad = function (gl, minX, minY, maxX, maxY) {
        var vert = [
            minX, minY,
            maxX, minY,
            minX, maxY,
            maxX, maxY,
        ];
        return new VBO(gl, new Float32Array(vert), 2, gl.FLOAT);
    };
    VBO.prototype.bind = function (location) {
        var gl = _super.prototype.gl.call(this);
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
        gl.vertexAttribPointer(location, this.size, this.type, this.normalize, this.stride, this.offset);
    };
    return VBO;
}(gl_resource_1.default));
;
exports.default = VBO;


/***/ }),

/***/ "./src/ts/gl-utils/viewport.ts":
/*!*************************************!*\
  !*** ./src/ts/gl-utils/viewport.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Viewport = (function () {
    function Viewport() {
    }
    return Viewport;
}());
exports.default = Viewport;


/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(__webpack_require__(/*! ./gl-utils/utils */ "./src/ts/gl-utils/utils.ts"));
var fbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/fbo */ "./src/ts/gl-utils/fbo.ts"));
var water_1 = __importDefault(__webpack_require__(/*! ./water */ "./src/ts/water.ts"));
var viewer2D_1 = __importDefault(__webpack_require__(/*! ./viewer/viewer2D */ "./src/ts/viewer/viewer2D.ts"));
var viewer3D_1 = __importDefault(__webpack_require__(/*! ./viewer/viewer3D */ "./src/ts/viewer/viewer3D.ts"));
var viewerCommon_1 = __importDefault(__webpack_require__(/*! ./viewer/viewerCommon */ "./src/ts/viewer/viewerCommon.ts"));
var Controls = __importStar(__webpack_require__(/*! ./controls */ "./src/ts/controls.ts"));
function initGL(canvas, flags) {
    function setError(message) {
        Demopage.setErrorMessage("webgl-support", message);
    }
    var gl = canvas.getContext("webgl", flags);
    if (!gl) {
        gl = canvas.getContext("experimental-webgl", flags);
        if (!gl) {
            setError("Your browser or device does not seem to support WebGL.");
            return null;
        }
        setError("Your browser or device only supports experimental WebGL.\n" +
            "The simulation may not run as expected.");
    }
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);
    Utils.resizeCanvas(gl, false);
    return gl;
}
function main() {
    var canvas = Canvas.getCanvas();
    var gl = initGL(canvas, {});
    if (!gl)
        return;
    var toggleFullscreen = function (fullscreen) {
        canvas.parentElement.style.background = fullscreen ? "black" : "none";
    };
    Canvas.Observers.fullscreenToggle.push(toggleFullscreen);
    toggleFullscreen(Canvas.isFullScreen());
    var side = 512;
    var water = new water_1.default(gl, side, side);
    var viewerCommon = new viewerCommon_1.default(gl, 512, "rc/tile.png");
    var viewer2D = new viewer2D_1.default(gl, viewerCommon);
    var viewer3D = new viewer3D_1.default(gl, viewerCommon);
    Controls.bind(water, viewer2D, viewer3D);
    var viewer = viewer3D;
    Controls.bindRendererChooser(function () { viewer = viewer2D; }, function () { viewer = viewer3D; });
    var instantFPS = 0;
    var updateFpsText = function () {
        Canvas.setIndicatorText("fps", instantFPS.toFixed(0));
    };
    setInterval(updateFpsText, 1000);
    var lastUpdate = 0;
    function mainLoop(time) {
        time *= 0.001;
        var dt = time - lastUpdate;
        instantFPS = 1 / dt;
        lastUpdate = time;
        viewer.interact(water);
        water.update(1 / 60);
        Utils.resizeCanvas(gl, false);
        if (viewer.caustics) {
            viewerCommon.caustics.compute(water, viewer.amplitude, viewer.waterLevel, viewer.eta);
        }
        fbo_1.default.bindDefault(gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        viewer.display(water, viewerCommon);
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
}
main();


/***/ }),

/***/ "./src/ts/orbitalCamera.ts":
/*!*********************************!*\
  !*** ./src/ts/orbitalCamera.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OrbitalCamera = (function () {
    function OrbitalCamera(focusPoint, distance) {
        this._focus = focusPoint;
        this._distance = distance;
        this._theta = 0;
        this._phi = 0.01;
        this._eyePos = [0, 0, 0];
        this._viewMatrix = mat4.create();
        this.recompute();
    }
    Object.defineProperty(OrbitalCamera.prototype, "focusPoint", {
        get: function () {
            return this._focus;
        },
        set: function (newFocus) {
            this._focus = newFocus;
            this.recompute();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrbitalCamera.prototype, "distance", {
        get: function () {
            return this._distance;
        },
        set: function (newDistance) {
            this._distance = newDistance;
            this.recompute();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrbitalCamera.prototype, "theta", {
        get: function () {
            return this._theta;
        },
        set: function (newTheta) {
            this._theta = newTheta;
            this.recompute();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrbitalCamera.prototype, "phi", {
        get: function () {
            return this._phi;
        },
        set: function (newPhi) {
            this._phi = newPhi;
            this.recompute();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrbitalCamera.prototype, "eyePos", {
        get: function () {
            return this._eyePos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrbitalCamera.prototype, "viewMatrix", {
        get: function () {
            return this._viewMatrix;
        },
        enumerable: true,
        configurable: true
    });
    OrbitalCamera.prototype.recompute = function () {
        var sin = Math.sin;
        var cos = Math.cos;
        this._eyePos[0] = this.focusPoint[0] + this.distance * (sin(this.phi) * cos(this.theta));
        this._eyePos[1] = this.focusPoint[1] + this.distance * (sin(this.phi) * sin(this.theta));
        this._eyePos[2] = this.focusPoint[2] + this.distance * (cos(this.phi));
        this._viewMatrix = mat4.lookAt(this._viewMatrix, this.eyePos, this.focusPoint, [0, 0, 1]);
    };
    return OrbitalCamera;
}());
exports.default = OrbitalCamera;


/***/ }),

/***/ "./src/ts/viewer/caustics-shaders.ts":
/*!*******************************************!*\
  !*** ./src/ts/viewer/caustics-shaders.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shader_1 = __importDefault(__webpack_require__(/*! ../gl-utils/shader */ "./src/ts/gl-utils/shader.ts"));
var water_shaders_1 = __webpack_require__(/*! ../water-shaders */ "./src/ts/water-shaders.ts");
var causticsVert = "attribute vec2 aVert;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\n\nuniform float uAmplitude;\nuniform float uWaterLevel;\nuniform float uEta;\n\nvarying vec2 sourceCoords;\nvarying vec2 refractedCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    float height = decodeHeight(texture2D(uWater, aVert));\n    height = uWaterLevel + 0.5 * uAmplitude * height;\n    vec3 normal = decodeNormal(texture2D(uNormals, aVert), uAmplitude);\n\n    const vec3 fromLight = vec3(0, 0, -1);\n    vec3 refracted = refract(fromLight, normal, uEta);\n    vec3 toGround = height * refracted / refracted.z;\n\n    vec2 groundCoords = aVert + toGround.xy;\n\n    sourceCoords = aVert;\n    refractedCoords = groundCoords;\n\n    gl_Position = vec4(2.0*groundCoords - 1.0, 0.0, 1.0);\n}";
var causticsFrag = "#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n\nvarying vec2 sourceCoords;\nvarying vec2 refractedCoords;\n\nvoid main(void)\n{\n    float sourceArea = length(dFdx(sourceCoords)) * length(dFdy(sourceCoords));\n    float refractedArea = length(dFdx(refractedCoords)) * length(dFdy(refractedCoords));\n\n    float variation = sourceArea / refractedArea;\n\n    gl_FragColor = 0.5 + .9 * vec4(variation - 1.0);\n}";
function buildCausticsShader(gl) {
    var vertSrc = causticsVert.replace(/___ENCODE_DECODE___/g, water_shaders_1.encodeDecodeStr);
    ;
    var fragSrc = causticsFrag;
    return new shader_1.default(gl, vertSrc, fragSrc);
}
exports.buildCausticsShader = buildCausticsShader;


/***/ }),

/***/ "./src/ts/viewer/caustics.ts":
/*!***********************************!*\
  !*** ./src/ts/viewer/caustics.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ../gl-utils/gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var fbo_1 = __importDefault(__webpack_require__(/*! ../gl-utils/fbo */ "./src/ts/gl-utils/fbo.ts"));
var ShadersBuilder = __importStar(__webpack_require__(/*! ./caustics-shaders */ "./src/ts/viewer/caustics-shaders.ts"));
var Caustics = (function (_super) {
    __extends(Caustics, _super);
    function Caustics(gl, w, h) {
        var _this = _super.call(this, gl) || this;
        _this._supported = gl.getExtension('OES_standard_derivatives') !== null;
        var n = 128;
        _this._gridWidth = n;
        _this._gridHeight = n;
        _this.reset(w, h);
        return _this;
    }
    Caustics.prototype.freeGLResources = function () {
        var gl = _super.prototype.gl.call(this);
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
    };
    Caustics.prototype.compute = function (water, amplitude, waterLevel, eta) {
        if (!this.supported)
            return;
        var gl = _super.prototype.gl.call(this);
        var shader = this._shader;
        shader.u["uWater"].value = water.heightmap;
        shader.u["uNormals"].value = water.normalmap;
        shader.u["uAmplitude"].value = 0.1 * amplitude;
        shader.u["uWaterLevel"].value = waterLevel;
        shader.u["uEta"].value = eta;
        this._fbo.bind([this._texture]);
        gl.clear(gl.COLOR_BUFFER_BIT);
        shader.use();
        shader.bindUniforms();
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertices);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indices);
        var nbTriangles = 2 * (this._gridWidth - 1) * (this._gridHeight - 1);
        gl.drawElements(gl.TRIANGLES, 3 * nbTriangles, gl.UNSIGNED_SHORT, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(0);
    };
    Caustics.prototype.reset = function (w, h) {
        if (!this.supported)
            return;
        this.freeGLResources();
        var gl = _super.prototype.gl.call(this);
        this._width = w;
        this._height = h;
        this._shader = ShadersBuilder.buildCausticsShader(gl);
        this._fbo = new fbo_1.default(gl, w, h);
        var data = new Array(3 * w * h);
        for (var i = 0; i < data.length; ++i) {
            data[i] = 127;
        }
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
                for (var iY = 0; iY < nY - 1; ++iY) {
                    for (var iX = 0; iX < nX - 1; ++iX) {
                        indices.push(iY * nX + iX);
                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);
                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);
                    }
                }
                var array = new Uint16Array(indices);
                var id = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                this._indices = id;
            }
        }
    };
    Object.defineProperty(Caustics.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Caustics.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Caustics.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Caustics.prototype, "supported", {
        get: function () {
            return this._supported;
        },
        enumerable: true,
        configurable: true
    });
    return Caustics;
}(gl_resource_1.default));
exports.default = Caustics;


/***/ }),

/***/ "./src/ts/viewer/viewer.ts":
/*!*********************************!*\
  !*** ./src/ts/viewer/viewer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ../gl-utils/gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var Viewer = (function (_super) {
    __extends(Viewer, _super);
    function Viewer(gl) {
        return _super.call(this, gl) || this;
    }
    Viewer.prototype.freeGLResources = function () {
    };
    Object.defineProperty(Viewer.prototype, "specular", {
        get: function () {
            return this._showSpecular;
        },
        set: function (b) {
            this._showSpecular = b;
            this.updateSpecular();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "caustics", {
        get: function () {
            return this._showCaustics;
        },
        set: function (b) {
            this._showCaustics = b;
            this.updateCaustics();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "fresnel", {
        get: function () {
            return this._useFresnel;
        },
        set: function (b) {
            this._useFresnel = b;
            this.updateFresnel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "amplitude", {
        get: function () {
            return this._amplitude;
        },
        set: function (a) {
            this._amplitude = a;
            this.updateAmplitude();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "waterLevel", {
        get: function () {
            return this._waterLevel;
        },
        set: function (d) {
            this._waterLevel = d;
            this.updateWaterLevel();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "opacity", {
        get: function () {
            return this._opacity;
        },
        set: function (o) {
            this._opacity = o;
            this.updateOpacity();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Viewer.prototype, "eta", {
        get: function () {
            return this._eta;
        },
        set: function (e) {
            this._eta = e;
            this.updateEta();
        },
        enumerable: true,
        configurable: true
    });
    return Viewer;
}(gl_resource_1.default));
exports.default = Viewer;


/***/ }),

/***/ "./src/ts/viewer/viewer2D-shaders.ts":
/*!*******************************************!*\
  !*** ./src/ts/viewer/viewer2D-shaders.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shader_1 = __importDefault(__webpack_require__(/*! ../gl-utils/shader */ "./src/ts/gl-utils/shader.ts"));
var vbo_1 = __importDefault(__webpack_require__(/*! ../gl-utils/vbo */ "./src/ts/gl-utils/vbo.ts"));
var water_shaders_1 = __webpack_require__(/*! ../water-shaders */ "./src/ts/water-shaders.ts");
var fullscreenVert = "attribute vec2 aCorner; //{0,1}x{0,1}\n\nvarying vec2 sampleCoords;\n\nvoid main(void) {\n    sampleCoords = aCorner;\n    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);\n}";
var displayFrag = "precision mediump float;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\nuniform sampler2D uCaustics;\nuniform sampler2D uTileTexture;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\nuniform float uEta;\nuniform float uOpacity;\nuniform bool uShowSpecular;\nuniform bool uShowCaustics;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nconst vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);\nconst vec3 SPECULAR_COLOR = vec3(1);\nconst float TILE_REPETITION = 4.0;\n\nvoid main(void)\n{\n    float height = decodeHeight(texture2D(uWater, sampleCoords));\n    height = uWaterLevel + 0.5 * uAmplitude * height;\n    vec3 normal = decodeNormal(texture2D(uNormals, sampleCoords), uAmplitude);\n\n    vec3 position = vec3(sampleCoords, height);\n\n    const vec3 fromEye = vec3(0, 0, -1);\n    vec3 refracted = refract(fromEye, normal, uEta);\n    refracted *= height / refracted.z;\n    vec2 coordsOnFloor = sampleCoords + refracted.xy;\n\n    vec3 tileColor = texture2D(uTileTexture, TILE_REPETITION * coordsOnFloor).rgb;\n    float caustics = texture2D(uCaustics, coordsOnFloor).r;\n    caustics = mix(0.5, caustics, float(uShowCaustics));\n    vec3 floorColor = tileColor * (0.5 + caustics);\n\n    float opacity = clamp(uOpacity * length(refracted), 0.0, 1.0);\n    vec3 color = mix(floorColor, WATER_COLOR, opacity);\n\n    const vec3 fromLight = normalize(vec3(.05, -.1, -.8));\n    vec3 reflected = reflect(fromLight, normal);\n    float specular = max(0.0, dot(reflected, -fromEye));\n    specular = pow(specular, 1000.0) * float(uShowSpecular);\n\n    gl_FragColor = vec4(color + specular, 1);\n}";
function buildDisplayShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = displayFrag.replace(/___ENCODE_DECODE___/g, water_shaders_1.encodeDecodeStr);
    var shader = new shader_1.default(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = vbo_1.default.createQuad(gl, 0, 0, 1, 1);
    return shader;
}
exports.buildDisplayShader = buildDisplayShader;


/***/ }),

/***/ "./src/ts/viewer/viewer2D.ts":
/*!***********************************!*\
  !*** ./src/ts/viewer/viewer2D.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var viewer_1 = __importDefault(__webpack_require__(/*! ./viewer */ "./src/ts/viewer/viewer.ts"));
var fbo_1 = __importDefault(__webpack_require__(/*! ../gl-utils/fbo */ "./src/ts/gl-utils/fbo.ts"));
var viewport_1 = __importDefault(__webpack_require__(/*! ../gl-utils/viewport */ "./src/ts/gl-utils/viewport.ts"));
var ShadersBuilder = __importStar(__webpack_require__(/*! ./viewer2D-shaders */ "./src/ts/viewer/viewer2D-shaders.ts"));
var Viewer2D = (function (_super) {
    __extends(Viewer2D, _super);
    function Viewer2D(gl, common) {
        var _this = _super.call(this, gl) || this;
        _this._displayShader = ShadersBuilder.buildDisplayShader(gl);
        _this._displayShader.u["uTileTexture"].value = common.tileTexture;
        _this._displayShader.u["uCaustics"].value = common.caustics.texture;
        _this._viewport = new viewport_1.default;
        return _this;
    }
    Viewer2D.prototype.freeGLResources = function () {
        this._displayShader.freeGLResources();
    };
    Viewer2D.prototype.updateViewport = function () {
        var gl = _super.prototype.gl.call(this);
        var side = Math.min(gl.drawingBufferWidth, gl.drawingBufferHeight);
        this._viewport.left = 0.5 * (gl.drawingBufferWidth - side);
        this._viewport.lower = 0.5 * (gl.drawingBufferHeight - side);
        this._viewport.width = side;
        this._viewport.height = side;
    };
    Viewer2D.prototype.display = function (water, common) {
        var gl = _super.prototype.gl.call(this);
        this.updateViewport();
        gl.disable(gl.CULL_FACE);
        gl.disable(gl.DEPTH_TEST);
        var displayShader = this._displayShader;
        fbo_1.default.bindDefault(gl, this._viewport);
        displayShader.u["uWater"].value = water.heightmap;
        displayShader.u["uNormals"].value = water.normalmap;
        displayShader.use();
        displayShader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    Viewer2D.prototype.interact = function (water) {
        if (Canvas.isMouseDown()) {
            var canvasSize = Canvas.getSize();
            var p = Canvas.getMousePosition();
            p[0] *= canvasSize[0];
            p[1] = (1 - p[1]) * canvasSize[1];
            this.updateViewport();
            p[0] = (p[0] - this._viewport.left) / this._viewport.width;
            p[1] = (p[1] - this._viewport.lower) / this._viewport.height;
            water.touch(p[0] * water.width, p[1] * water.height, 8);
        }
    };
    Viewer2D.prototype.updateSpecular = function () {
        this._displayShader.u["uShowSpecular"].value = this.specular;
    };
    Viewer2D.prototype.updateCaustics = function () {
        this._displayShader.u["uShowCaustics"].value = this.caustics;
    };
    Viewer2D.prototype.updateFresnel = function () {
    };
    Viewer2D.prototype.updateAmplitude = function () {
        this._displayShader.u["uAmplitude"].value = this.amplitude;
    };
    Viewer2D.prototype.updateWaterLevel = function () {
        this._displayShader.u["uWaterLevel"].value = this.waterLevel;
    };
    Viewer2D.prototype.updateOpacity = function () {
        this._displayShader.u["uOpacity"].value = this.opacity;
    };
    Viewer2D.prototype.updateEta = function () {
        this._displayShader.u["uEta"].value = this.eta;
    };
    return Viewer2D;
}(viewer_1.default));
exports.default = Viewer2D;


/***/ }),

/***/ "./src/ts/viewer/viewer3D-shaders.ts":
/*!*******************************************!*\
  !*** ./src/ts/viewer/viewer3D-shaders.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shader_1 = __importDefault(__webpack_require__(/*! ../gl-utils/shader */ "./src/ts/gl-utils/shader.ts"));
var water_shaders_1 = __webpack_require__(/*! ../water-shaders */ "./src/ts/water-shaders.ts");
var waterCommonStr = "\nuniform sampler2D uCaustics;\nuniform sampler2D uTileTexture;\n\nuniform vec3 uLightDir; //normalized\n\nuniform float uF0;\nuniform float uEta;\nuniform float uOpacity;\nuniform bool uSpecular;\nuniform bool uShowCaustics;\nuniform bool uFresnel;\n\nconst vec3 WATER_COLOR = vec3(0.0, 0.2, 0.5);\nconst vec3 SPECULAR_COLOR = vec3(1);\nconst float TILE_REPETITION = 4.0;\n\n/* Fresnel factor describes the proportion of refracted and reflected.\n* Arguments expected to be normalized. */\nfloat getFresnelFactor(const vec3 normal, const vec3 fromEye)\n{\n    float computed = mix(pow(1.0 - dot(normal,-fromEye), 5.0), 1.0, uF0);\n    return min(float(uFresnel), computed);\n}\n\nvec3 getTileColor(const vec2 coords)\n{\n    return texture2D(uTileTexture, TILE_REPETITION * coords).rgb;\n}\n\nfloat getCaustics(const vec2 coords)\n{\n    return mix(0.5, texture2D(uCaustics, coords).r, float(uShowCaustics));\n}\n\nvec3 getFloorColor(const vec2 coords)\n{\n    if (any(lessThan(coords, vec2(0))) || any(greaterThan(coords, vec2(1)))) {\n        return vec3(0);\n    }\n\n    return getTileColor(coords) * (0.5 + getCaustics(coords));\n}\n\n/* Floor color mixed with opacity.\n* 'refracted' expected to be normalized. */\nvec3 getRefractedColor(const vec3 entryPoint, vec3 refracted)\n{\n    if (refracted.z >= 0.0) {\n        return WATER_COLOR;\n    }\n\n    refracted *= -entryPoint.z / refracted.z;\n\n    vec2 groundCoords = entryPoint.xy + refracted.xy;\n    vec3 floorColor = getFloorColor(groundCoords + .5);\n\n    /*float f = 1.0;\n\n    if (groundCoords.x < -.5) {\n        f = min(f, abs((-.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));\n    }\n    if (groundCoords.x > .5) {\n        f = min(f, abs((.5 - entryPoint.x) / (groundCoords.x - entryPoint.x)));\n    }\n    if (groundCoords.y < -.5) {\n        f = min(f, abs((-.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));\n    }\n    if (groundCoords.y > .5) {\n        f = min(f, abs((.5 - entryPoint.y) / (groundCoords.y - entryPoint.y)));\n    }\n\n    refracted *= f;*/\n\n    float opacity = uOpacity * entryPoint.z;//length(refracted);\n    opacity = clamp(opacity, 0.0, 1.0);\n\n    return mix(floorColor, WATER_COLOR, opacity);\n}\n\nvec3 getReflectedColor(const vec3 dir)\n{\n    return vec3(0.5, 0.5, 0.8);\n}\n\nvec4 getSpecular(const vec3 reflected)\n{\n    float f = max(0.0, dot(-uLightDir, reflected));\n    f = pow(f, 200.0);\n    f *= float(uSpecular);\n\n    return vec4(SPECULAR_COLOR, f);\n}\n\nvec3 computeColor(const vec3 pos, const vec3 fromEye, const vec3 normal)\n{\n    vec3 refracted = refract(fromEye, normal, uEta);\n    vec3 reflected = reflect(fromEye, normal);\n\n    vec3 refractedColor = getRefractedColor(pos, refracted);\n    vec3 reflectedColor = getReflectedColor(reflected);\n\n    float fresnelFactor = getFresnelFactor(fromEye, normal);\n\n    vec3 surfaceColor = mix(refractedColor, reflectedColor, fresnelFactor);\n    vec4 specularColor = getSpecular(reflected);\n\n    return mix(surfaceColor, specularColor.rgb, specularColor.a);\n}";
var sidesVert = "attribute vec3 aPosition; //in {-.5, +.5} x {-.5, +.5} x {+0, +1}\nattribute vec2 aNormal; //normalized in {-1, +1} x {-1, +1}\n\nuniform mat4 uMVPMatrix;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\n\nvarying vec3 vPosition;\nvarying vec2 vNormal;\nvarying float relativeHeight; //relative to amplitude, in [-1, +1]\n\nvoid main(void) {\n    float dH = uAmplitude / 2.0;\n\n    vPosition = aPosition;\n    vPosition.z *= uWaterLevel + dH;\n\n    vNormal = aNormal;\n\n    relativeHeight = (vPosition.z - uWaterLevel) / dH;\n    \n    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);\n}";
var sidesFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec3 uEyePos;\n\nvarying vec3 vPosition;\nvarying vec2 vNormal;\nvarying float relativeHeight; //relative to amplitude, in [-1, +1]\n\n___ENCODE_DECODE___\n\n___WATER_COMMON___\n\n/* Returns true for every fragment above the water level */\nbool shouldSkip()\n{\n    float surface = decodeHeight(texture2D(uWater, vPosition.xy + .5));\n    return (relativeHeight > surface);\n}\n\nvoid main(void)\n{\n    /* Skip the fragments above water level */\n    if (shouldSkip()) {\n        discard;\n    }\n\n    vec3 fromEye = normalize(vPosition - uEyePos);\n    vec3 normal = vec3(vNormal, 0); //already normalized\n    \n    vec3 color = computeColor(vPosition, fromEye, normal);\n\n    gl_FragColor = vec4(color, 1);\n}";
var surfaceVert = "attribute vec2 aSampleCoords; //in [0,1] x [0,1]\n\nuniform mat4 uMVPMatrix;\n\nuniform sampler2D uWater;\nuniform sampler2D uNormals;\n\nuniform float uWaterLevel;\nuniform float uAmplitude;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    float height = decodeHeight(texture2D(uWater, aSampleCoords));\n\n    float dH = uAmplitude / 2.0;\n\n    vPosition.xy = aSampleCoords - .5;\n    vPosition.z = uWaterLevel + dH * height;\n    vPosition.z -= 0.001; //slight shift to avoid artifacts at surface-sides jointure\n\n    vNormal = decodeNormal(texture2D(uNormals, aSampleCoords), uAmplitude);\n    \n    gl_Position = uMVPMatrix * vec4(vPosition, 1.0);\n}";
var surfaceFrag = "precision mediump float;\n\nuniform vec3 uEyePos;\n\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n\n___WATER_COMMON___\n\nvoid main(void)\n{\n    vec3 fromEye = normalize(vPosition - uEyePos);\n    vec3 normal = normalize(vNormal);\n\n    vec3 color = computeColor(vPosition, fromEye, normal);\n\n    gl_FragColor = vec4(color, 1);\n}";
function buildSidesShader(gl) {
    var vertSrc = sidesVert;
    var fragSrc = sidesFrag.replace(/___ENCODE_DECODE___/g, water_shaders_1.encodeDecodeStr);
    fragSrc = fragSrc.replace(/___WATER_COMMON___/g, waterCommonStr);
    return new shader_1.default(gl, vertSrc, fragSrc);
}
exports.buildSidesShader = buildSidesShader;
function buildSurfaceShader(gl) {
    var vertSrc = surfaceVert.replace(/___ENCODE_DECODE___/g, water_shaders_1.encodeDecodeStr);
    var fragSrc = surfaceFrag.replace(/___WATER_COMMON___/g, waterCommonStr);
    return new shader_1.default(gl, vertSrc, fragSrc);
}
exports.buildSurfaceShader = buildSurfaceShader;


/***/ }),

/***/ "./src/ts/viewer/viewer3D.ts":
/*!***********************************!*\
  !*** ./src/ts/viewer/viewer3D.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var viewer_1 = __importDefault(__webpack_require__(/*! ./viewer */ "./src/ts/viewer/viewer.ts"));
var ShadersBuilder = __importStar(__webpack_require__(/*! ./viewer3D-shaders */ "./src/ts/viewer/viewer3D-shaders.ts"));
var orbitalCamera_1 = __importDefault(__webpack_require__(/*! ../orbitalCamera */ "./src/ts/orbitalCamera.ts"));
var Viewer3D = (function (_super) {
    __extends(Viewer3D, _super);
    function Viewer3D(gl, common) {
        var _this = _super.call(this, gl) || this;
        _this._pMatrix = mat4.create();
        _this._mvpMatrix = mat4.create();
        mat4.perspective(_this._pMatrix, 45, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 100.0);
        _this._camera = new orbitalCamera_1.default([0, 0, _this.waterLevel - .5], 1.7);
        _this._camera.theta = 0;
        _this._camera.phi = 0.8;
        _this._lightDirection = vec3.fromValues(1, 0, -1);
        vec3.normalize(_this._lightDirection, _this._lightDirection);
        var n = 256;
        _this.initSurface(n, n);
        _this.init();
        var shaders = [_this._sidesShader, _this._surfaceShader];
        for (var _i = 0, shaders_1 = shaders; _i < shaders_1.length; _i++) {
            var shader = shaders_1[_i];
            shader.u["uTileTexture"].value = common.tileTexture;
            shader.u["uCaustics"].value = common.caustics.texture;
            shader.u["uLightDir"].value = _this._lightDirection;
        }
        var minPhi = 0.000001, maxPhi = 1.2;
        Canvas.Observers.mouseDrag.push(function (dX, dY) {
            _this._camera.theta -= 0.5 * 2 * 3.14159 * dX;
            _this._camera.phi -= 0.5 * 2 * dY;
            _this._camera.phi = Math.min(maxPhi, Math.max(minPhi, _this._camera.phi));
            _this.updateMVPMatrix();
        });
        var minDist = 1.42, maxDist = 3;
        Canvas.Observers.mouseWheel.push(function (delta) {
            var d = _this._camera.distance + 0.2 * delta;
            d = Math.min(maxDist, Math.max(minDist, d));
            _this._camera.distance = d;
            _this.updateMVPMatrix();
        });
        return _this;
    }
    Viewer3D.prototype.updatePMatrix = function () {
        var canvas = _super.prototype.gl.call(this).canvas;
        mat4.perspective(this._pMatrix, 45, canvas.clientWidth / canvas.clientHeight, 0.1, 100.0);
    };
    Viewer3D.prototype.updateMVPMatrix = function () {
        this.updatePMatrix();
        mat4.multiply(this._mvpMatrix, this._pMatrix, this._camera.viewMatrix);
    };
    Viewer3D.prototype.initSurface = function (w, h) {
        var gl = _super.prototype.gl.call(this);
        this._gridWidth = w;
        this._gridHeight = h;
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
                for (var iY = 0; iY < nY - 1; ++iY) {
                    for (var iX = 0; iX < nX - 1; ++iX) {
                        indices.push(iY * nX + iX);
                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);
                        indices.push(iY * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX + 1);
                        indices.push((iY + 1) * nX + iX);
                    }
                }
                var array = new Uint16Array(indices);
                var id = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, id);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                this._gridIndices = id;
            }
        }
    };
    Viewer3D.prototype.freeGLResources = function () {
        var gl = _super.prototype.gl.call(this);
        gl.deleteBuffer(this._vertices);
        gl.deleteBuffer(this._normals);
        this._sidesShader.freeGLResources();
        this._surfaceShader.freeGLResources();
        gl.deleteBuffer(this._gridVertices);
        gl.deleteBuffer(this._gridIndices);
    };
    Viewer3D.prototype.display = function (water, common) {
        var gl = _super.prototype.gl.call(this);
        this._sidesShader.u["uEyePos"].value = this._camera.eyePos;
        this._surfaceShader.u["uEyePos"].value = this._camera.eyePos;
        this.updateMVPMatrix();
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        this.displaySides(water);
        this.displaySurface(water);
    };
    Viewer3D.prototype.interact = function (water) {
    };
    Viewer3D.prototype.displaySides = function (water) {
        var gl = _super.prototype.gl.call(this);
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
    };
    Viewer3D.prototype.displaySurface = function (water) {
        var gl = _super.prototype.gl.call(this);
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
    };
    Viewer3D.prototype.init = function () {
        var gl = _super.prototype.gl.call(this);
        this._sidesShader = ShadersBuilder.buildSidesShader(gl);
        this._sidesShader.u["uMVPMatrix"].value = this._mvpMatrix;
        this._surfaceShader = ShadersBuilder.buildSurfaceShader(gl);
        this._surfaceShader.u["uMVPMatrix"].value = this._mvpMatrix;
        {
            var vert = [
                +.5, -.5, +1,
                -.5, -.5, +1,
                -.5, -.5, +0,
                +.5, -.5, +1,
                -.5, -.5, +0,
                +.5, -.5, +0,
                +.5, +.5, +1,
                +.5, -.5, +1,
                +.5, -.5, +0,
                +.5, +.5, +1,
                +.5, -.5, +0,
                +.5, +.5, +0,
                +.5, +.5, +1,
                -.5, +.5, +0,
                -.5, +.5, +1,
                -.5, +.5, +0,
                +.5, +.5, +1,
                +.5, +.5, +0,
                -.5, -.5, +1,
                -.5, +.5, +1,
                -.5, -.5, +0,
                -.5, -.5, +0,
                -.5, +.5, +1,
                -.5, +.5, +0,
            ];
            var id = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, id);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert), gl.STATIC_DRAW);
            this._vertices = id;
        }
        {
            var norm = [
                0, -1,
                0, -1,
                0, -1,
                0, -1,
                0, -1,
                0, -1,
                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,
                +1, 0,
                0, +1,
                0, +1,
                0, +1,
                0, +1,
                0, +1,
                0, +1,
                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,
                -1, 0,
            ];
            var id = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, id);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);
            this._normals = id;
        }
    };
    Viewer3D.prototype.updateSpecular = function () {
        this._sidesShader.u["uSpecular"].value = this.specular;
        this._surfaceShader.u["uSpecular"].value = this.specular;
    };
    Viewer3D.prototype.updateCaustics = function () {
        this._sidesShader.u["uShowCaustics"].value = this.caustics;
        this._surfaceShader.u["uShowCaustics"].value = this.caustics;
    };
    Viewer3D.prototype.updateFresnel = function () {
        this._sidesShader.u["uFresnel"].value = this.fresnel;
        this._surfaceShader.u["uFresnel"].value = this.fresnel;
    };
    Viewer3D.prototype.updateAmplitude = function () {
        var amplitude = 5 * this.amplitude;
        this._sidesShader.u["uAmplitude"].value = amplitude;
        this._surfaceShader.u["uAmplitude"].value = amplitude;
    };
    Viewer3D.prototype.updateWaterLevel = function () {
        this._sidesShader.u["uWaterLevel"].value = this.waterLevel;
        this._surfaceShader.u["uWaterLevel"].value = this.waterLevel;
        this._camera.focusPoint = [0, 0, this.waterLevel - .5];
        this.updateMVPMatrix();
    };
    Viewer3D.prototype.updateOpacity = function () {
        this._sidesShader.u["uOpacity"].value = this.opacity;
        this._surfaceShader.u["uOpacity"].value = this.opacity;
    };
    Viewer3D.prototype.updateEta = function () {
        this._sidesShader.u["uEta"].value = this.eta;
        this._surfaceShader.u["uEta"].value = this.eta;
        var F0 = (1 - this.eta) / (1 + this.eta);
        F0 = F0 * F0;
        this._sidesShader.u["uF0"].value = F0;
        this._surfaceShader.u["uF0"].value = F0;
    };
    return Viewer3D;
}(viewer_1.default));
exports.default = Viewer3D;


/***/ }),

/***/ "./src/ts/viewer/viewerCommon.ts":
/*!***************************************!*\
  !*** ./src/ts/viewer/viewerCommon.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ../gl-utils/gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var caustics_1 = __importDefault(__webpack_require__(/*! ./caustics */ "./src/ts/viewer/caustics.ts"));
var ViewerCommon = (function (_super) {
    __extends(ViewerCommon, _super);
    function ViewerCommon(gl, causticsRes, tileTexPath) {
        var _this = this;
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';
            return n && (n & (n - 1)) === 0;
        }
        _this = _super.call(this, gl) || this;
        _this._caustics = new caustics_1.default(gl, causticsRes, causticsRes);
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
            }
            else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        tileImg.src = tileTexPath;
        return _this;
    }
    ViewerCommon.prototype.freeGLResources = function () {
        var gl = _super.prototype.gl.call(this);
        this._caustics.freeGLResources();
        this._caustics = null;
        gl.deleteTexture(this._tileTexture);
        this._tileTexture = null;
    };
    Object.defineProperty(ViewerCommon.prototype, "caustics", {
        get: function () {
            return this._caustics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerCommon.prototype, "tileTexture", {
        get: function () {
            return this._tileTexture;
        },
        enumerable: true,
        configurable: true
    });
    return ViewerCommon;
}(gl_resource_1.default));
exports.default = ViewerCommon;


/***/ }),

/***/ "./src/ts/water-shaders.ts":
/*!*********************************!*\
  !*** ./src/ts/water-shaders.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shader_1 = __importDefault(__webpack_require__(/*! ./gl-utils/shader */ "./src/ts/gl-utils/shader.ts"));
var vbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/vbo */ "./src/ts/gl-utils/vbo.ts"));
var encodeDecodeStr = "const float HEIGHT_RANGE = 1.0;\nconst float VEL_RANGE = 0.25;\n\nstruct Cell {\n    float h; //height\n    float v; //velocity\n};\n\n/* Decodes a float value (16 bits in [0,1])\n * from a 2D value (2x8bits in [0,1]x[0,1]) */\nfloat decode16bit(vec2 v)\n{\n    const vec2 weights = 255.0 * vec2(256.0, 1.0) / (256.0*256.0 - 1.0);\n    return dot(weights, v);\n}\n\n/* Encodes a float value (16 bits in [0,1])\n * into a 2D value (2x8bits in [0,1]x[0,1]) */\nvec2 encode16bit(float f)\n{\n    const vec2 base = (256.0*256.0 - 1.0) / vec2(256.0, 1.0);\n    return floor(mod(f * base, 256.0)) / 255.0;\n}\n\nfloat decode(vec2 v, float range)\n{\n    return (2.0 * decode16bit(v) - 1.0) * range;\n}\n\nvec2 encode(float value, float range)\n{\n    return encode16bit(0.5 * value / range + 0.5);\n}\n\nfloat decodeHeight(vec4 texel)\n{\n    return decode(texel.rg, HEIGHT_RANGE);\n}\nvec2 encodeHeight(float h)\n{\n    return encode(h, HEIGHT_RANGE);\n}\n\nvec3 decodeNormal(vec4 texel, float amplitude)\n{\n    vec3 result = 2.0 * texel.rgb - 1.0;\n    return normalize(result * vec3(amplitude, amplitude, 1));\n}\nvec4 encodeNormal(vec3 n)\n{\n    return vec4(0.5 * n + 0.5, 1);\n}\n\nfloat decodeVelocity(vec4 texel)\n{\n    return decode(texel.ba, VEL_RANGE);\n}\nvec2 encodeVelocity(float h)\n{\n    return encode(h, VEL_RANGE);\n}\n\nCell decodeCell(vec4 texel)\n{\n    return Cell(decodeHeight(texel), decodeVelocity(texel));\n}\nvec4 encodeCell(Cell cell)\n{\n    return vec4(encodeHeight(cell.h), encodeVelocity(cell.v));\n}";
exports.encodeDecodeStr = encodeDecodeStr;
var fullscreenVert = "attribute vec2 aCorner; //{0,1}x{0,1}\n\nvarying vec2 sampleCoords;\n\nvoid main(void) {\n    sampleCoords = aCorner;\n    gl_Position = vec4(2.0*aCorner - 1.0, 0.0, 1.0);\n}";
var touchFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec2 uCoords;\nuniform vec2 uSize;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    Cell cell = decodeCell(texture2D(uWater, sampleCoords));\n\n    float dist = length((sampleCoords - uCoords) / uSize);\n    dist = clamp(dist, 0.0, 1.0);\n\n    cell.h = mix(-0.6*HEIGHT_RANGE, cell.h, smoothstep(0.0, 1.0, dist));\n    cell.v *= step(1.0, dist);\n\n    gl_FragColor = encodeCell(cell);\n}";
var updateFrag = "precision mediump float;\n\nuniform sampler2D uPrevWater;\n\nuniform float uDt;\nuniform vec2 uTexelSize;\n\nuniform float uC; //surface tension\nuniform float uK; // vertical spring's stiffness\nuniform float uF; //friction\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\nvoid main(void) {\n    Cell cell = decodeCell(texture2D(uPrevWater, sampleCoords));\n\n    float neighbours = decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(uTexelSize.x, 0))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(uTexelSize.x, 0))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords + vec2(0, uTexelSize.y))) +\n        decodeHeight(texture2D(uPrevWater, sampleCoords - vec2(0, uTexelSize.y)));\n    neighbours *= 0.25;\n\n    /* Update velocity */\n    cell.v += -uDt * uK * cell.h; //vertical spring\n    cell.v += uDt * uC * (neighbours - cell.h); //surface tension\n    cell.v *= uF; //attenuation\n\n    /* Update position */\n    cell.h += uDt * cell.v;\n\n    gl_FragColor = encodeCell(cell);\n}";
var normalsFrag = "precision mediump float;\n\nuniform sampler2D uWater;\n\nuniform vec2 uTexelSize;\n\nvarying vec2 sampleCoords;\n\n___ENCODE_DECODE___\n\n/* Returns the normal, assuming the amplitude is 1. */\nvec3 computeNormal(vec2 coords)\n{\n    float dZx = decodeHeight(texture2D(uWater, coords + vec2(uTexelSize.x, 0))) -\n                decodeHeight(texture2D(uWater, coords - vec2(uTexelSize.x, 0)));\n    \n    float dZy = decodeHeight(texture2D(uWater, coords + vec2(0, uTexelSize.y))) -\n                decodeHeight(texture2D(uWater, coords - vec2(0, uTexelSize.y)));\n    \n    vec3 normal = cross(vec3(uTexelSize.x, 0, dZx), vec3(0, uTexelSize.y, dZy));\n    normal.xy *= 0.4 * HEIGHT_RANGE;\n\n    return normalize(normal);\n}\n\nvoid main(void) {\n    vec3 normal = computeNormal(sampleCoords);\n\n    gl_FragColor = encodeNormal(normal);\n}";
function buildTouchShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = touchFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new shader_1.default(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = vbo_1.default.createQuad(gl, 0, 0, 1, 1);
    return shader;
}
exports.buildTouchShader = buildTouchShader;
function buildUpdateShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = updateFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new shader_1.default(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = vbo_1.default.createQuad(gl, 0, 0, 1, 1);
    return shader;
}
exports.buildUpdateShader = buildUpdateShader;
function buildNormalsShader(gl) {
    var vertSrc = fullscreenVert;
    var fragSrc = normalsFrag.replace(/___ENCODE_DECODE___/g, encodeDecodeStr);
    var shader = new shader_1.default(gl, vertSrc, fragSrc);
    shader.a["aCorner"].VBO = vbo_1.default.createQuad(gl, 0, 0, 1, 1);
    return shader;
}
exports.buildNormalsShader = buildNormalsShader;


/***/ }),

/***/ "./src/ts/water.ts":
/*!*************************!*\
  !*** ./src/ts/water.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-utils/gl-resource */ "./src/ts/gl-utils/gl-resource.ts"));
var fbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/fbo */ "./src/ts/gl-utils/fbo.ts"));
var ShaderBuilder = __importStar(__webpack_require__(/*! ./water-shaders */ "./src/ts/water-shaders.ts"));
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(gl, w, h) {
        var _this = _super.call(this, gl) || this;
        _this._FBO = new fbo_1.default(gl, w, h);
        _this._touchShader = ShaderBuilder.buildTouchShader(gl);
        _this._updateShader = ShaderBuilder.buildUpdateShader(gl);
        _this._normalsShader = ShaderBuilder.buildNormalsShader(gl);
        _this.surfaceTension = 20.0;
        _this.springStiffness = 0.1;
        _this.dispersion = 0.999;
        _this.rain = true;
        _this.reset(w, h);
        return _this;
    }
    Water.prototype.freeGLResources = function () {
        if (this._FBO) {
            this._FBO.freeGLResources();
        }
        this.freeTextures();
        this.freeShaders();
    };
    Water.prototype.freeTextures = function () {
        var gl = _super.prototype.gl.call(this);
        if (this._normalsTex) {
            gl.deleteTexture(this._normalsTex);
        }
        if (this._heightmapsTex) {
            gl.deleteTexture(this._heightmapsTex[0]);
            gl.deleteTexture(this._heightmapsTex[1]);
        }
    };
    Water.prototype.freeShaders = function () {
        if (this._touchShader) {
            this._touchShader.freeGLResources();
        }
        if (this._updateShader) {
            this._updateShader.freeGLResources();
        }
    };
    Water.prototype.update = function (dt) {
        var gl = this.gl();
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
    };
    Water.prototype.computeNormals = function () {
        var gl = this.gl();
        var shader = this._normalsShader;
        shader.u["uWater"].value = this.currHeightmap;
        this._FBO.bind([this._normalsTex]);
        shader.use();
        shader.bindUniformsAndAttributes();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    Water.prototype.touch = function (coordX, coordY, radius) {
        var gl = this.gl();
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
    };
    Object.defineProperty(Water.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "surfaceTension", {
        get: function () {
            return this._surfaceTension;
        },
        set: function (c) {
            this._surfaceTension = c;
            this._updateShader.u["uC"].value = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "springStiffness", {
        get: function () {
            return this._springStiffness;
        },
        set: function (k) {
            this._springStiffness = k;
            this._updateShader.u["uK"].value = k;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "dispersion", {
        get: function () {
            return this._dispersion;
        },
        set: function (f) {
            this._dispersion = f;
            this._updateShader.u["uF"].value = f;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "heightmap", {
        get: function () {
            return this._heightmapsTex[this._currIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "normalmap", {
        get: function () {
            return this._normalsTex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "currHeightmap", {
        get: function () {
            return this._heightmapsTex[this._currIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Water.prototype, "nextHeightmap", {
        get: function () {
            return this._heightmapsTex[(this._currIndex + 1) % 2];
        },
        enumerable: true,
        configurable: true
    });
    Water.prototype.switchHeightmaps = function () {
        this._currIndex = (this._currIndex + 1) % 2;
    };
    Water.prototype.reset = function (w, h) {
        this.freeTextures();
        var gl = _super.prototype.gl.call(this);
        this._width = w;
        this._height = h;
        this._FBO.width = w;
        this._FBO.height = h;
        this._updateShader.u["uTexelSize"].value = [1 / w, 1 / h];
        this._normalsShader.u["uTexelSize"].value = [1 / w, 1 / h];
        var uintTexels = new Array(4 * w * h);
        for (var i = 0; i < uintTexels.length; ++i) {
            uintTexels[i] = 127;
        }
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
            var texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.UNSIGNED_BYTE, uintData);
            textures.push(texture);
        }
        for (var _i = 0, textures_1 = textures; _i < textures_1.length; _i++) {
            var iT = textures_1[_i];
            gl.bindTexture(gl.TEXTURE_2D, iT);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
        }
        this._normalsTex = textures[2];
        this._heightmapsTex = [textures[0], textures[1]];
        this._currIndex = 0;
        this.computeNormals();
    };
    return Water;
}(gl_resource_1.default));
exports.default = Water;


/***/ })

/******/ });