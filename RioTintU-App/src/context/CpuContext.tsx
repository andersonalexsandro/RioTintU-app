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
import { MobileFileManager } from '../uitls/mobileFileManager';
import { WebFileManager } from '../uitls/webFileManager';
import { NodeFileReader } from '../RioTintU-VM/ts/src/nodeFileReader';
import { FileManager } from '../RioTintU-VM/ts/src/assembler/fileManager';
import { Assembler } from '../RioTintU-VM/ts/src/assembler/assembler';
'../RioTintU-VM/ts/src/assembler/assembled'
 '../RioTintU-VM/ts/src/assembler/assembly'

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
  assembler: Assembler;
}

const CPUContext = createContext<CPUContextProps | null>(null);

function detectEnvironment(): "mobile" | "web" | "node" {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return "mobile";
  } else if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return "web";
  } else {
    return "node";
  }
}

export const CPUProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cpuComponents = useMemo(() => {
    const environment = detectEnvironment();

    let fileManager: FileManager | null = null;

    switch (environment) {
      case "mobile":
        fileManager = new MobileFileManager('./assembly', './assembled');
        break;
      case "web":
        fileManager = new WebFileManager('web-assembly', 'web-assembled');
        break;
      case "node":
        fileManager = new NodeFileReader('./src/assembler/assembly', './src/assembler/assembled');
        break;
      default:
        throw new Error('Unsupported environment');
    }

    if (!fileManager) {
      throw new Error('FileManager is required');
    }

    return RioTintUInit(fileManager);
  }, []);

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
