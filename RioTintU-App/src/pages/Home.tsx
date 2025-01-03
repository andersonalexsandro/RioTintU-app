import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ram } from "../components/Ram";
import { Flags } from "../components/Flags";
import Registers from "../components/Registers";
import { Code } from "../components/Code";
import { useCPU } from "../context/CpuContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RioTintUClockTick = 48;

export function Home() {
  const { state, dispatch } = useCPU();
  const { pc, assembler, rom } = state;
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [ticksPerSecond, setTicksPerSecond] = useState<number>(20);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      const instructionTime = (RioTintUClockTick * 2) / ticksPerSecond * 1000;
      interval = setInterval(() => {
        dispatch({ type: "STEP" });
      }, instructionTime);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, ticksPerSecond, dispatch]);

  const handleStep = () => {
    if (isRunning){
      setIsRunning((false));
      return;
    }
    dispatch({ type: "STEP" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
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
              <Icon name="code-braces" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Icon name="restart" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStep}>
              <Icon name="step-forward" size={24} color="white" />
            </TouchableOpacity>
            {isRunning ? (
              <TouchableOpacity style={styles.button} onPress={handleStop}>
                <Icon name="pause" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleStart}>
                <Icon name="play" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.tickInputWrapper}>
            <Text style={styles.text}>Ticks Per Second:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={ticksPerSecond.toString()}
              onChangeText={(value) => {
                const numericValue = parseInt(value, 10);
                setTicksPerSecond(numericValue > 0 ? numericValue : 0);
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
    fontSize: 18,
  },
  buttonsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    gap: 14,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#b3591e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  tickInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
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
