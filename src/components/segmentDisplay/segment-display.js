// segment-display.js

const rows = 9;
const columns = 5;
const pixelSize = 8;
const spacerWidth = 2;

const pixelOnSrc = './assets/redstone_lamp_on.png';
const pixelOffSrc = './assets/redstone_lamp.png';

let pixelOn = null;
let pixelOff = null;
let imagesLoaded = false;

const digitPatterns = {
  0: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ],
  1: [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0
  ],
  2: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0
  ],
  3: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ],
  4: [
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0
  ],
  5: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ],
  6: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ],
  7: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0
  ],
  8: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ],
  9: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0
  ]
};
// Função para carregar as imagens uma única vez
function loadImages() {
  return new Promise((resolve, reject) => {
    pixelOn = new Image();
    pixelOff = new Image();
    
    let loadedCount = 0;

    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        imagesLoaded = true;
        resolve();
      }
    };

    pixelOn.onload = checkLoaded;
    pixelOff.onload = checkLoaded;

    pixelOn.onerror = () => reject(new Error('Failed to load pixelOn image'));
    pixelOff.onerror = () => reject(new Error('Failed to load pixelOff image'));

    pixelOn.src = pixelOnSrc;
    pixelOff.src = pixelOffSrc;
  });
}

export async function renderSegmentDisplay(canvas, value, nDigits) {
  if (!imagesLoaded) {
    await loadImages(); // Garante que as imagens foram carregadas antes de desenhar
  }

  const ctx = canvas.getContext('2d');
  const pcString = String(value).padStart(nDigits, '0');
  const digits = pcString.split('').map(Number);

  const digitWidth = columns * pixelSize;
  const digitHeight = rows * pixelSize;
  const totalWidth = digits.length * digitWidth + (digits.length - 1) * spacerWidth;
  const totalHeight = digitHeight;

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  digits.forEach((digit, digitIndex) => {
    const pattern = digitPatterns[digit];
    const offsetX = digitIndex * (digitWidth + spacerWidth);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const pixelValue = pattern[row * columns + col];
        const x = offsetX + col * pixelSize;
        const y = row * pixelSize;
        ctx.drawImage(pixelValue ? pixelOn : pixelOff, x, y, pixelSize, pixelSize);
      }
    }
  });
}
