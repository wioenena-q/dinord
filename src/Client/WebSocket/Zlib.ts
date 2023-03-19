import { constants as ZLIB_CONSTANTS, inflate } from 'node:zlib';

export class Zlib {
  private arrayBuffer: Uint8Array = new Uint8Array(0);
  public state = ZlibState.NOT_INITIALIZED;
  public static readonly ZLIB_SUFFIX = [0x00, 0x00, 0xff, 0xff];

  public decompress(data: Uint8Array) {
    return new Promise<null | Uint8Array>((resolve, reject) => {
      this.arrayBuffer = new Uint8Array(
        [
          ...new Uint8Array(this.arrayBuffer),
          ...data,
        ],
      );

      if (
        data.byteLength < 4 ||
        Zlib.ZLIB_SUFFIX.every((v, i) => data.at(-(4 - i)) !== v)
      ) {
        this.state = ZlibState.PENDING_DECOMPRESS;
        resolve(null);
      }

      inflate(this.arrayBuffer, {
        chunkSize: 1024 * 1024,
        flush: ZLIB_CONSTANTS.Z_SYNC_FLUSH,
        finishFlush: ZLIB_CONSTANTS.Z_SYNC_FLUSH,
      }, (err: Error | null, chunk: Uint8Array) => {
        if (err) return reject(err);
        this.arrayBuffer = new Uint8Array();
        this.state = ZlibState.DECOMPRESSED;
        resolve(chunk);
      });
    });
  }
}

export const enum ZlibState {
  NOT_INITIALIZED,
  PENDING_DECOMPRESS,
  DECOMPRESSED,
}
