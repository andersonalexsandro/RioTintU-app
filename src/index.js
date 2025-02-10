import { RioTintUInit } from "./RioTintU-VM/ts/build/main.js"

const {
    cpu,
    ram,
    rom,
    registers,
    flags,
    pc,
    numberDisplay,
    screen,
    memoryMapper,
    assembler
} = RioTintUInit();

console.log("Hello World")
console.log(ram);