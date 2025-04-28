import { RioTintUInit } from "./RioTintU-VM/ts/build/main.js";
import { renderRam } from "./components/ram/ram.js";
import { renderFlags } from "./components/flags/flags.js";
import { renderRegisters } from "./components/registers/registers.js";
import { renderRom, getRomCode, highlightRomLine } from "./components/rom/rom.js";
import { renderPC } from "./components/pc/pc.js";
import { renderNumberDisplay } from "./components/numberDisplay/numberDisplay.js";
import { renderScreen, updateScreen } from "./components/screen/screen.js";

let {
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

let runInterval = null;

function renderAllComponents() {
  renderRam(ram);
  renderFlags(flags);
  renderRegisters(registers);
  renderPC(pc.counter || 0);
  renderNumberDisplay(numberDisplay.content || 0);
  updateScreen(screen);
  highlightRomLine(pc.counter || 0);
}

function handleRunClick() {
  if (runInterval) {
    clearInterval(runInterval);
    runInterval = null;
    return;
  }

  const speedInput = document.getElementById('speed-input');
  const instructionsPerSecond = parseInt(speedInput.value, 10) || 1;
  const intervalMs = 1000 / instructionsPerSecond;

  runInterval = setInterval(() => {
    try {
      cpu.step();
      renderAllComponents();
    } catch (error) {
      console.error('Error during execution:', error);
      clearInterval(runInterval);
      runInterval = null;
      alert('Error during execution. Check the console for more details.');
    }
  }, intervalMs);
}

function handleStepClick() {
  if (runInterval) {
    clearInterval(runInterval);
    runInterval = null;
  }

  try {
    cpu.step();
    renderAllComponents();
  } catch (error) {
    console.error('Error during execution:', error);
    alert('Error during execution. Check the console for more details.');
  }
}

function handleRestartClick() {
  if (runInterval) {
    clearInterval(runInterval);
    runInterval = null;
  }

  ({
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
  } = RioTintUInit());

  renderAllComponents();
}

function handleCompileClick() {
  const romCode = getRomCode();
  console.log('Compiling ROM code:', romCode);

  try {
    const compiledCode = assembler.assemble(romCode.split('\n'));

    for (let i = 0; i < compiledCode.length; i++) {
      const numericCode = parseInt(compiledCode[i], 2);
      rom.set16(i, numericCode);
      console.log(numericCode);
    }
  } catch (error) {
    console.error('Error during compilation:', error);
    alert('Error during compilation. Check the console for more details.');
  }
}

function updateRunInterval() {
  if (!runInterval) return;

  clearInterval(runInterval);

  const speedInput = document.getElementById('speed-input');
  const instructionsPerSecond = parseInt(speedInput.value, 10) || 1;
  const intervalMs = 1000 / instructionsPerSecond;

  runInterval = setInterval(() => {
    try {
      cpu.step();
      renderAllComponents();
    } catch (error) {
      console.error('Error during execution:', error);
      clearInterval(runInterval);
      runInterval = null;
      alert('Error during execution. Check the console for more details.');
    }
  }, intervalMs);
}

async function loadComponent(path, placeholderId, renderFunction) {
  const response = await fetch(path);
  const html = await response.text();
  document.getElementById(placeholderId).innerHTML = html;
  requestAnimationFrame(() => renderFunction());
}

async function loadAllComponents() {
  await loadComponent('./components/ram/ram.html', 'ram-placeholder', () => renderRam(ram));
  await loadComponent('./components/flags/flags.html', 'flags-placeholder', () => renderFlags(flags));
  await loadComponent('./components/registers/registers.html', 'registers-placeholder', () => renderRegisters(registers));
  await loadComponent('./components/rom/rom.html', 'rom-placeholder', renderRom);
  await loadComponent('./components/pc/pc.html', 'pc-placeholder', () => renderPC(pc.counter || 0));
  await loadComponent('./components/numberDisplay/numberDisplay.html', 'number-display-placeholder', () => renderNumberDisplay(numberDisplay.content || 0));
  await loadComponent('./components/screen/screen.html', 'screen-placeholder', () => renderScreen(screen));
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadAllComponents();

  document.getElementById('compile').addEventListener('click', handleCompileClick);
  document.getElementById('run').addEventListener('click', handleRunClick);
  document.getElementById('step').addEventListener('click', handleStepClick);
  document.getElementById('restart').addEventListener('click', handleRestartClick);
  document.getElementById('speed-input').addEventListener('input', updateRunInterval);
});
