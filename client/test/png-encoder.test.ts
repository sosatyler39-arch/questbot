import { test } from 'node:test';
import assert from 'node:assert/strict';
import { inflateSync } from 'node:zlib';
import { encodePng, rawScanlines } from '../src/main/png-encoder.js';

test('encodePng starts with the standard 8-byte PNG signature', () => {
  const png = encodePng(2, 2, () => [0, 0, 0, 255]);
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
});

test('encodePng IHDR chunk encodes width, height, 8-bit RGBA color type', () => {
  const png = encodePng(16, 9, () => [0, 0, 0, 0]);
  // IHDR chunk starts right after the 8-byte signature + 4-byte length + 4-byte type "IHDR".
  const ihdrData = png.subarray(8 + 8, 8 + 8 + 13);
  assert.equal(ihdrData.readUInt32BE(0), 16); // width
  assert.equal(ihdrData.readUInt32BE(4), 9); // height
  assert.equal(ihdrData[8], 8); // bit depth
  assert.equal(ihdrData[9], 6); // color type 6 = RGBA
});

test('encodePng round-trips through zlib: decompressed scanlines match the source pixels', () => {
  const width = 3;
  const height = 2;
  const pixelAt = (x: number, y: number): readonly [number, number, number, number] => [x * 10, y * 10, 5, 255];
  const png = encodePng(width, height, pixelAt);

  // IDAT chunk: length(4) + type(4) + data + crc(4), located right after
  // the 8-byte signature + the always-25-byte IHDR chunk (4 length + 4
  // type + 13 data + 4 crc).
  const idatStart = 8 + 25;
  const idatLength = png.readUInt32BE(idatStart);
  const idatData = png.subarray(idatStart + 8, idatStart + 8 + idatLength);
  const decompressed = inflateSync(idatData);

  assert.deepEqual(decompressed, rawScanlines(width, height, pixelAt));
});
