import { type Buffer, inflate, ZLIB_CONSTANTS } from '../../deps.ts';

export class Zlib {
  private arrayBuffer = new Uint8Array(0).buffer as ArrayBuffer;
  public state = ZlibState.NOT_INITIALIZED;
  public static readonly ZLIB_SUFFIX = [0x00, 0x00, 0xff, 0xff];

  public decompress(data: Uint8Array) {
    return new Promise<null | Buffer>((resolve, reject) => {
      this.arrayBuffer = new Uint8Array(
        [
          ...new Uint8Array(this.arrayBuffer),
          ...data,
        ],
      ).buffer;

      if (
        data.byteLength < 4 ||
        Zlib.ZLIB_SUFFIX.every((v, i) => data.at(-(4 - i)) !== v)
      ) {
        this.state = ZlibState.PENDING_DECOMPRESS;
        resolve(null);
      }

      inflate(new Uint8Array(this.arrayBuffer), {
        chunkSize: 1024 * 1024,
        flush: ZLIB_CONSTANTS.Z_SYNC_FLUSH,
        finishFlush: ZLIB_CONSTANTS.Z_SYNC_FLUSH,
      }, (err: Error | null, chunk: Buffer) => {
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
