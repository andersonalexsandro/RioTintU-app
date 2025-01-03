import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ram } from "../components/Ram";
import { Flags } from "../components/Flags";
import Registers from "../components/Registers";
import { Code } from "../components/Code";
import { useCPU } from "../context/CpuContext";

const RioTintUClockTick = 48

export function Home() {
  const { state, dispatch } = useCPU(); // Accesses the state and dispatch from the context
  const { pc, assembler, rom } = state; // Extracts values from the global state
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [ticksPerSecond, setTicksPerSecond] = useState<number>(20); // Default to 20 ticks per second
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      const instructionTime = (RioTintUClockTick * 2) / ticksPerSecond * 1000; // Em milissegundos
      interval = setInterval(() => {
        dispatch({ type: "STEP" });
      }, instructionTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, ticksPerSecond, dispatch]);

  const handleStep = () => {
    dispatch({ type: "STEP" }); // Executes a single CPU step
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

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.homeWrapper}>
      {/* Left Column */}
      <View style={[styles.column, { flex: 1.25 }]}>
        <Ram />
        <Flags />
        <Registers />
      </View>

      {/* Center Column */}
      <View style={[styles.column, { flex: 2 }]}>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleCompile}>
              <Text style={styles.buttonText}>Compile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStep}>
              <Text style={styles.buttonText}>Step</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStop}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tickInputWrapper}>
            <Text style={styles.text}>Ticks Per Second:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={ticksPerSecond.toString()}
              onChangeText={(value) => {
                const numericValue = parseInt(value, 10);
                setTicksPerSecond(numericValue > 0 ? numericValue : 0); // Ensure it's a positive number
              }}
            />
          </View>
        </View>
        <Text style={styles.text}>PC: {pc.getCounter()}</Text>
      </View>

      {/* Right Column */}
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
    fontWeight: "600",
    fontSize: 18
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "space-between", // Ensure proper spacing
  },
  buttons: {
    flexDirection: "row",
    gap: 14,
  },
  button: {
    width: 100, // Define button width
    height: 40, // Define button height
    backgroundColor: "#b3591e", // Button background color
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  tickInputWrapper: {
    flexDirection: "row",
    alignItems: "center", // Align text and input vertically
    marginLeft: 20, // Add spacing from buttons
  },
  input: {
    width: 60,
    height: 40,
    marginLeft: 10,
    backgroundColor: "#b3591e",
    color: "white",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
  },
});

export default Home;
