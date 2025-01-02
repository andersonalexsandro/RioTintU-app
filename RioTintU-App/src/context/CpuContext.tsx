import React, { createContext, useReducer, useContext } from "react";
import { Assembler, CPU, Flags, MemoryMapper, NumberDisplay, ProgramCounter8, ProgramRom16, Registers, RioTintUInit, Screen } from "../RioTintU-VM/ts/src";
import { FileManager } from "../RioTintU-VM/ts/src/assembler/fileManager";
import { MobileFileManager } from "../uitls/mobileFileManager";
import { WebFileManager } from "../uitls/webFileManager";
import Ram from "../RioTintU-VM/ts/src/ram";

// Define a interface do estado
interface CPUState {
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

// Define o tipo de ação para o reducer
type CPUAction = { type: "STEP" } | { type: "RESET" };

// Cria o contexto
const CPUContext = createContext<{
  state: CPUState;
  dispatch: React.Dispatch<CPUAction>;
} | null>(null);

// Detecta o ambiente para o FileManager
function detectEnvironment(): "mobile" | "web" {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return "mobile";
  }
  return "web";
}

// Reducer para gerenciar as ações do CPU
const cpuReducer = (state: CPUState, action: CPUAction): CPUState => {
  switch (action.type) {
    case "STEP":
      state.cpu.step(); // Executa um passo da CPU
      return { ...state }; // Retorna o novo estado (imutável)
    case "RESET":
      state.pc.jump(0); // Reseta o contador do programa
      return { ...state }; // Retorna o estado atualizado
    default:
      return state;
  }
};

// Provider para gerenciar o estado global da CPU
export const CPUProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const environment = detectEnvironment();
  let fileManager: FileManager;

  if (environment === "mobile") {
    fileManager = new MobileFileManager("./assembly", "./assembled");
  } else {
    fileManager = new WebFileManager("web-assembly", "web-assembled");
  }

  const initialState = RioTintUInit(fileManager); // Inicializa os componentes da CPU
  const [state, dispatch] = useReducer(cpuReducer, initialState);

  return (
    <CPUContext.Provider value={{ state, dispatch }}>
      {children}
    </CPUContext.Provider>
  );
};

// Hook para acessar o contexto
export const useCPU = () => {
  const context = useContext(CPUContext);
  if (!context) {
    throw new Error("useCPU must be used within a CPUProvider");
  }
  return context;
};
