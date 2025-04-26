import { renderSegmentDisplay } from "../segmentDisplay/segment-display.js"; 

let pcCanvas = null;

export function renderPC(initialValue = 0) {
    pcCanvas = document.getElementById('pc-display');
    updatePC(initialValue);
}

export function updatePC(value) {
    if (value < 0 || value > 255) {
        console.warn('Program Counter value must be between 0 and 255');
        value = 0;
    }

    renderSegmentDisplay(pcCanvas, value, 3);
}
