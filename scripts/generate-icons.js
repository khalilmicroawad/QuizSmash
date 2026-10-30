import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

function createPNG(width, height, isMaskable = false) {
  // RGBA buffer
  const buffer = Buffer.alloc(width * height * 4);

  const cx = width / 2;
  const cy = height / 2;
  const r = width * (isMaskable ? 0.48 : 0.42);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Squircle or circle background
      const qx = Math.abs(dx) / (width * 0.46);
      const qy = Math.abs(dy) / (height * 0.46);
      const inSquircle = (Math.pow(qx, 4) + Math.pow(qy, 4)) <= 1.0;

      // Indigo to violet gradient
      const gradT = (x + y) / (width + height);
      const rVal = Math.round(79 + (124 - 79) * gradT);
      const gVal = Math.round(70 + (58 - 70) * gradT);
      const bVal = Math.round(229 + (237 - 229) * gradT);

      // Lightning bolt geometric check (approx polygon)
      // Normalized coordinates -0.5 to 0.5
      const nx = (x - cx) / (width * 0.65);
      const ny = (y - cy) / (height * 0.65);

      // Points roughly: Top (0.1, -0.45) -> Mid-left (-0.3, 0.05) -> Mid-center (-0.05, 0.05) -> Bottom (-0.15, 0.45) -> Mid-right (0.35, -0.05) -> Mid-center2 (0.05, -0.05)
      let inBolt = false;
      if (ny >= -0.45 && ny <= 0.45 && nx >= -0.4 && nx <= 0.4) {
        if (ny < 0.05 && ny >= -0.45) {
          // upper segment
          const leftBound = -0.3 + (ny - 0.05) * (-0.4 / -0.5);
          const rightBound = 0.15 + (ny - 0.05) * (-0.1 / -0.5);
          if (nx >= leftBound && nx <= rightBound + 0.15) {
            inBolt = true;
          }
        }
        if (ny >= -0.05 && ny <= 0.45) {
          // lower segment
          const leftBound = -0.15 + (ny - 0.45) * (-0.2 / -0.5);
          const rightBound = 0.35 + (ny - 0.45) * (-0.3 / -0.5);
          if (nx >= leftBound - 0.05 && nx <= rightBound) {
            inBolt = true;
          }
        }
      }

      if (inBolt) {
        // Golden / White bolt
        buffer[idx] = 251;     // R
        buffer[idx + 1] = 191; // G
        buffer[idx + 2] = 36;  // B
        buffer[idx + 3] = 255; // A
      } else if (isMaskable || inSquircle) {
        buffer[idx] = rVal;
        buffer[idx + 1] = gVal;
        buffer[idx + 2] = bVal;
        buffer[idx + 3] = 255;
      } else {
        // Transparent outside rounded corners
        buffer[idx] = 0;
        buffer[idx + 1] = 0;
        buffer[idx + 2] = 0;
        buffer[idx + 3] = 0;
      }
    }
  }

  // Encode PNG using pure Node.js
  const rowSize = width * 4;
  const filtered = Buffer.alloc((rowSize + 1) * height);
  for (let y = 0; y < height; y++) {
    filtered[y * (rowSize + 1)] = 0; // Filter type: None
    buffer.copy(filtered, y * (rowSize + 1) + 1, y * rowSize, (y + 1) * rowSize);
  }

  const compressedData = zlib.deflateSync(filtered);

  // PNG Signature
  const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  function makeChunk(type, data) {
    const chunkLen = data.length;
    const buf = Buffer.alloc(chunkLen + 12);
    buf.writeUInt32BE(chunkLen, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, chunkLen + 8));
    buf.writeUInt32BE(crc, chunkLen + 8);
    return buf;
  }

  // Precomputed CRC32 table
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngSig, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, false));

console.log('Successfully generated PWA PNG icons in /public:');
console.log(' - pwa-192x192.png');
console.log(' - pwa-512x512.png');
console.log(' - pwa-maskable-512x512.png');
console.log(' - apple-touch-icon.png');
