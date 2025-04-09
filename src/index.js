import { RioTintUInit } from "./RioTintU-VM/ts/build/main.js";
import { renderRam } from "./components/ram/ram.js";

const {
    ram,
    cpu,
    rom,
    registers,
    flags,
    pc,
    numberDisplay,
    screen,
    memoryMapper,
    assembler
} = RioTintUInit();

// função que carrega dinamicamente o HTML
async function loadRamComponent() {
    const response = await fetch('./components/ram/ram.html');
    const html = await response.text();

    document.getElementById('ram-placeholder').innerHTML = html;

    renderRam(ram);
}

document.addEventListener('DOMContentLoaded', loadRamComponent);

export {
    ram,
    cpu,
    rom,
    registers,
    flags,
    pc,
    numberDisplay,
    screen,
    memoryMapper,
    assembler
};