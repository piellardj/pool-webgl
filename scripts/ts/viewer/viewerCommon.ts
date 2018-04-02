import GLResource from "../gl-utils/gl-resource";
import Caustics from "./caustics";

class ViewerCommon extends GLResource {
    private _caustics: Caustics;

    private _tileTexture: WebGLTexture;

    constructor(gl: WebGLRenderingContext, causticsRes: number, tileTexPath: string) {
        function isPowerOf2(n) {
            if (typeof n !== 'number')
                return 'Not a number';

            return n && (n & (n - 1)) === 0;
        }

        super(gl);

        /* Create caustics */
        this._caustics = new Caustics(gl, causticsRes, causticsRes);

        /* Create tile texture. Default texture is blue 1x1 texture. */
        this._tileTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._tileTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        const tileImg = new Image();
        const tileTexture = this._tileTexture;
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
    }

    public freeGLResources(): void {
        const gl = super.gl; //shortcut

        this._caustics.freeGLResources();
        this._caustics = null;

        gl.deleteTexture(this._tileTexture);
        this._tileTexture = null;
    }

    get caustics(): Caustics {
        return this._caustics;
    }

    get tileTexture(): WebGLTexture {
        return this._tileTexture;
    }
}

export default ViewerCommon;