import { RioTintUInit } from "./RioTintU-VM/ts/build/main.js";
import { renderRam } from "./components/ram/ram.js";
import { renderFlags } from "./components/flags/flags.js";
import { renderRegisters } from "./components/registers/registers.js";
import { renderRom } from "./components/rom/rom.js";
import { renderPC } from "./components/pc/pc.js";
import { renderNumberDisplay } from "./components/numberDisplay/numberDisplay.js";

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

async function loadRamComponent() {
    const response = await fetch('./components/ram/ram.html');
    const html = await response.text();

    document.getElementById('ram-placeholder').innerHTML = html;
    renderRam(ram);
}

async function loadFlagsComponent() {
    const response = await fetch('./components/flags/flags.html');
    const html = await response.text();

    document.getElementById('flags-placeholder').innerHTML = html;
    renderFlags(flags);
}

async function loadRegistersComponent() {
    const response = await fetch('./components/registers/registers.html');
    const html = await response.text();

    document.getElementById('registers-placeholder').innerHTML = html;
    renderRegisters(registers);
}

async function loadRomComponent() {
    const response = await fetch('./components/rom/rom.html');
    const html = await response.text();

    document.getElementById('rom-placeholder').innerHTML = html;
    renderRom();
}

async function loadPCComponent() {
    const response = await fetch('./components/pc/pc.html');
    const html = await response.text();

    document.getElementById('pc-placeholder').innerHTML = html;

    requestAnimationFrame(() => {
        renderPC(pc.counter || 0);
    });
}

async function loadNumberDisplayComponent() {
    const response = await fetch('./components/numberDisplay/numberDisplay.html');
    const html = await response.text();

    document.getElementById('number-display-placeholder').innerHTML = html;

    requestAnimationFrame(() => {
        renderNumberDisplay(0); // Inicializa o display com 0
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadRamComponent();
    await loadFlagsComponent();
    await loadRegistersComponent();
    await loadRomComponent();
    await loadPCComponent();
    await loadNumberDisplayComponent();
});