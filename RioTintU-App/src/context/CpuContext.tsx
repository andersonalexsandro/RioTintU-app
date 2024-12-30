import React, { createContext, useContext, useMemo } from 'react';
import { RioTintUInit } from '../RioTintU-VM/ts/src';
import CPU from '../RioTintU-VM/ts/src/cpu';
import Ram from '../RioTintU-VM/ts/src/ram';
import ProgramRom16 from '../RioTintU-VM/ts/src/programRom16';
import { Registers } from '../RioTintU-VM/ts/src/registers';
import { Flags } from '../RioTintU-VM/ts/src/flags';
import { ProgramCounter8 } from '../RioTintU-VM/ts/src/programCounter8';
import NumberDisplay from '../RioTintU-VM/ts/src/numberDisplay';
import MemoryMapper from '../RioTintU-VM/ts/src/memoryMapper';
import Screen from '../RioTintU-VM/ts/src/screen';

interface CPUContextProps {
  cpu: CPU;
  ram: Ram;
  rom: ProgramRom16;
  registers: Registers;
  flags: Flags;
  pc: ProgramCounter8;
  numberDisplay: NumberDisplay;
  screen: Screen;
  memoryMapper: MemoryMapper;
}

const CPUContext = createContext<CPUContextProps | null>(null);

export const CPUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cpuComponents = useMemo(() => RioTintUInit(), []);
  
  return (
    <CPUContext.Provider value={cpuComponents}>
      {children}
    </CPUContext.Provider>
  );
};

export const useCPU = () => {
  const context = useContext(CPUContext);
  if (!context) {
    throw new Error('useCPU must be used within a CPUProvider');
  }
  return context;
};
