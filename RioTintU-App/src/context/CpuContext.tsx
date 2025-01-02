import React, { createContext, useReducer, useContext } from "react";
import { Assembler, CPU, Flags, MemoryMapper, NumberDisplay, ProgramCounter8, ProgramRom16, Registers, RioTintUInit, Screen } from "../RioTintU-VM/ts/src";
import { FileManager } from "../RioTintU-VM/ts/src/assembler/fileManager";
import { MobileFileManager } from "../uitls/mobileFileManager";
import { WebFileManager } from "../uitls/webFileManager";
import Ram from "../RioTintU-VM/ts/src/ram";

// Define the state interface
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

// Define the action type for the reducer
type CPUAction = { type: "STEP" } | { type: "RESET" };

// Create the context
const CPUContext = createContext<{
  state: CPUState;
  dispatch: React.Dispatch<CPUAction>;
} | null>(null);

// Detect the environment for FileManager
function detectEnvironment(): "mobile" | "web" {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    return "mobile";
  }
  return "web";
}

// Reducer to manage CPU actions
const cpuReducer = (state: CPUState, action: CPUAction): CPUState => {
  switch (action.type) {
    case "STEP":
      state.cpu.step(); // Executes one CPU step
      return { ...state }; // Returns the new state (immutable)
    case "RESET":
      state.pc.jump(0); // Resets the program counter
      return { ...state }; // Returns the updated state
    default:
      return state;
  }
};

// Provider to manage the global state of the CPU
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

  const initialState = RioTintUInit(fileManager);
  const [state, dispatch] = useReducer(cpuReducer, initialState);

  return (
    <CPUContext.Provider value={{ state, dispatch }}>
      {children}
    </CPUContext.Provider>
  );
};

// Hook to access the context
export const useCPU = () => {
  const context = useContext(CPUContext);
  if (!context) {
    throw new Error("useCPU must be used within a CPUProvider");
  }
  return context;
};
