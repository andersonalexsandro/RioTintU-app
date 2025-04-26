// Configurações principais
const rows = 9;
const columns = 5;
const pixelSize = 8; // Tamanho de cada pixel
const spacerWidth = 2; // Espaço entre dígitos

const pixelOnSrc = '/src/assets/redstone_lamp_on.png';
const pixelOffSrc = '/src/assets/redstone_lamp.png';

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

export function renderSegmentDisplay(canvas, value, nDigits) {
  const ctx = canvas.getContext('2d');

  const pcString = String(value).padStart(nDigits, '0');
  const digits = pcString.split('').map(Number);

  const digitWidth = columns * pixelSize;
  const digitHeight = rows * pixelSize;
  const totalWidth = digits.length * digitWidth + (digits.length - 1) * spacerWidth;
  const totalHeight = digitHeight;

  canvas.width = totalWidth;
  canvas.height = totalHeight;

  const pixelOn = new Image();
  const pixelOff = new Image();
  pixelOn.src = pixelOnSrc;
  pixelOff.src = pixelOffSrc;

  pixelOff.onload = () => {
      pixelOn.onload = () => {
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
      };
  };

  pixelOff.onerror = () => {
      console.error('Failed to load pixelOff image:', pixelOffSrc);
  };

  pixelOn.onerror = () => {
      console.error('Failed to load pixelOn image:', pixelOnSrc);
  };
}
