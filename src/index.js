import { RioTintUInit } from "./RioTintU-VM/ts/build/main.js";
import { renderRam } from "./components/ram/ram.js";
import { renderFlags } from "./components/flags/flags.js";
import { renderRegisters } from "./components/registers/registers.js";

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

document.addEventListener('DOMContentLoaded', async () => {
    await loadRamComponent();
    await loadFlagsComponent();
    await loadRegistersComponent();
});