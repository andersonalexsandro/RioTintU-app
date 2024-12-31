import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Ram } from '../components/Ram';
import { Flags } from '../components/Flags';
import Registers from '../components/Registers';
import { Code } from '../components/Code';
import { useCPU } from '../context/CpuContext';

export function Home() {
  const { rom, assembler, cpu, pc} = useCPU();
  const [codeLines, setCodeLines]  = useState<string[]>([]);
  const [compile, setCompile] = useState(false);
  const [step, setStep] = useState(false);
  const [halted, setHalted] = useState(false);

  useEffect(() =>{
    setCompile(false);
    const assembledCode = assembler.assemble(codeLines);
    assembledCode.forEach((line, index) => rom.set16(index, parseInt(line, 10)))
  }, [compile])

  useEffect(() => {
    setStep(false);
    if (halted){
      pc.jump(0)
      setHalted(false);
    }
    cpu.step()
  }, [step])

  return (
    <View style={styles.homeWrapper}>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Ram />
        <Flags />
        <Registers />
      </View>
      <View style={[styles.column, { flex: 2 }]}>
        <View>
          <Button title="Compile" onPress={() => setCompile(true)} />
          <Button title="Step" onPress={() => setStep(true)} />
          <Text style={styles.text}>PC:{pc.getCounter()}</Text>
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
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  column: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    gap: 15
  },
  text: {
    color: 'white',
  },
});
