import { renderSegmentDisplay } from "../segmentDisplay/segment-display.js";

let numberDisplayCanvas = null;

export function renderNumberDisplay(initialValue = 0) {
    numberDisplayCanvas = document.getElementById('number-display');
    updateNumberDisplay(initialValue);
}

export function updateNumberDisplay(value) {
    if (value < 0 || value > 9999) {
        console.warn('Number Display value must be between 0 and 9999');
        value = 0;
    }

    renderSegmentDisplay(numberDisplayCanvas, value, 4);
}