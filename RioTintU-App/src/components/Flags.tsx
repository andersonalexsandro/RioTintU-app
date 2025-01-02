import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useCPU } from "../context/CpuContext";

export function Flags() {
  // Obtém as flags do estado global
  const { state } = useCPU();
  const { flags } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flags:</Text>
      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>COUT:</Text>
            <Text style={styles.orange}>{flags.getCout() ? "True" : "False"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>!COUT:</Text>
            <Text style={styles.orange}>{!flags.getCout() ? "True" : "False"}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>ZERO:</Text>
            <Text style={styles.orange}>{flags.getZero() ? "True" : "False"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>!ZERO:</Text>
            <Text style={styles.orange}>{!flags.getZero() ? "True" : "False"}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>MSB:</Text>
            <Text style={styles.orange}>{flags.getMsb() ? "True" : "False"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>!MSB:</Text>
            <Text style={styles.orange}>{!flags.getMsb() ? "True" : "False"}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.text}>EVEN:</Text>
            <Text style={styles.orange}>{flags.getEven() ? "True" : "False"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>!EVEN:</Text>
            <Text style={styles.orange}>{!flags.getEven() ? "True" : "False"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    width: '100%',
    height: 100,
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
  },
  orange: {
    fontSize: 15,
    color: '#CF7235',
    fontWeight: 'bold',
  },
});

export default Flags;
