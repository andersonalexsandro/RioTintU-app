const pixelOnSrc = '/src/assets/redstone_lamp_on.png';
const pixelOffSrc = '/src/assets/redstone_lamp.png';

let pixelOn = null;
let pixelOff = null;
let imagesLoaded = false;

async function loadImages() {
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

export async function renderScreen(screenInstance) {
    const canvas = document.getElementById('screen-display');
    const ctx = canvas.getContext('2d');

    const width = screenInstance.getWidth();   // Número de pixels horizontais
    const height = screenInstance.getHeight(); // Número de pixels verticais
    const screenData = screenInstance.getScreen();

    const parent = canvas.parentElement;
    const parentSize = Math.min(parent.clientWidth, parent.clientHeight); // Pega o menor lado

    // Cada pixel vai ter esse tamanho, proporcional ao espaço disponível
    const pixelSize = Math.floor(parentSize / Math.max(width, height));

    // Redimensiona o canvas
    canvas.width = pixelSize * width;
    canvas.height = pixelSize * height;

    if (!imagesLoaded) {
        await loadImages(); // Aguarda carregar as imagens
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            const value = screenData[index];

            const pixelImage = value > 0 ? pixelOn : pixelOff;
            ctx.drawImage(pixelImage, x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
}

export function updateScreen(screenInstance) {
    renderScreen(screenInstance);
}
