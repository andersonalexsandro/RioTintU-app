import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Ram } from "../components/Ram";
import { Flags } from "../components/Flags";
import Registers from "../components/Registers";
import { Code } from "../components/Code";
import { useCPU } from "../context/CpuContext";

export function Home() {
  const { state, dispatch } = useCPU(); // Accesses the state and dispatch from the context
  const { pc, assembler, rom } = state; // Extracts values from the global state
  const [codeLines, setCodeLines] = React.useState<string[]>([]);

  const handleStep = () => {
    dispatch({ type: "STEP" }); // Executes a CPU step and updates the components
  };

  const handleReset = () => {
    dispatch({ type: "RESET" }); // Resets the CPU state
  };

  const handleCompile = () => {
    const assembledCode = assembler.assemble(codeLines);
    const assembledNumber = assembledCode.map((binaryString) => {
      return parseInt(binaryString, 2);
    });
    for (let i = 0; i < assembledCode.length; i++) {
      rom.set16(i, assembledNumber[i]);
    }
  };

  return (
    <View style={styles.homeWrapper}>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Ram />
        <Flags />
        <Registers />
      </View>
      <View style={[styles.column, { flex: 2 }]}>
        <View>
          <Button title="Compile" onPress={handleCompile} />
          <Button title="Step" onPress={handleStep} />
          <Button title="Reset" onPress={handleReset} />
          <Text style={styles.text}>PC: {pc.getCounter()}</Text>
        </View>
      </View>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Code setCodeLines={setCodeLines} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black", 
  },
  column: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    gap: 15, 
  },
  text: {
    color: "white",
  },
});
