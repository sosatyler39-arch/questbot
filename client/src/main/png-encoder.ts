import { deflateSync } from 'node:zlib';

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// Table-free CRC-32 (PNG's per-chunk checksum) — a 16x16 icon is a few
// hundred bytes, not worth a 256-entry lookup table for speed.
function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crc]);
}

function ihdr(width: number, height: number): Buffer {
  const data = Buffer.alloc(13);
  data.writeUInt32BE(width, 0);
  data.writeUInt32BE(height, 4);
  data[8] = 8; // bit depth
  data[9] = 6; // color type 6 = RGBA
  data[10] = 0; // compression method
  data[11] = 0; // filter method
  data[12] = 0; // interlace method
  return chunk('IHDR', data);
}

export type PixelFn = (x: number, y: number) => readonly [number, number, number, number];

// Builds the uncompressed scanline data PNG expects: one filter-type byte
// (0 = "None") followed by width*4 RGBA bytes, per row.
export function rawScanlines(width: number, height: number, pixelAt: PixelFn): Buffer {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelAt(x, y);
      const px = rowStart + 1 + x * 4;
      raw[px] = r;
      raw[px + 1] = g;
      raw[px + 2] = b;
      raw[px + 3] = a;
    }
  }
  return raw;
}

// Minimal PNG encoder — no image library is available in this project, and
// Electron's nativeImage.createFromBitmap() has an officially undocumented,
// platform-dependent pixel format (checked electronjs.org directly), too
// unreliable to hand-code against. PNG's own format is public and stable,
// and Node's built-in zlib handles the genuinely hard part (DEFLATE
// compression) — the only pieces written by hand are chunk framing and
// CRC-32, both small and covered by the tests above.
export function encodePng(width: number, height: number, pixelAt: PixelFn): Buffer {
  const idat = chunk('IDAT', deflateSync(rawScanlines(width, height, pixelAt)));
  const iend = chunk('IEND', Buffer.alloc(0));
  return Buffer.concat([SIGNATURE, ihdr(width, height), idat, iend]);
}
