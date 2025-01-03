import React from 'react';
import { Text, View, StyleSheet } from "react-native";
import { useCPU } from "../context/CpuContext";

/**
 * Componente Flags
 * Exibe o estado das flags do CPU em colunas organizadas.
 */
export function Flags() {
  const { state } = useCPU();
  const { flags } = state;

  /**
   * Renderiza uma linha de flag com seu valor verdadeiro e invertido.
   * @param {string} label - Nome da flag.
   * @param {boolean} value - Valor atual da flag.
   */
  const renderFlagRow = (label: string, value: boolean) => (
    <View style={styles.row}>
      <Text style={styles.text}>{label}:</Text>
      <Text style={styles.orange}>{value ? " True" : " False"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flags:</Text>
      <View style={styles.columnsContainer}>
        <View style={styles.column}>
          {renderFlagRow("COUT", flags.getCout())}
          {renderFlagRow("!COUT", !flags.getCout())}
        </View>
        <View style={styles.column}>
          {renderFlagRow("ZERO", flags.getZero())}
          {renderFlagRow("!ZERO", !flags.getZero())}
        </View>
        <View style={styles.column}>
          {renderFlagRow("MSB", flags.getMsb())}
          {renderFlagRow("!MSB", !flags.getMsb())}
        </View>
        <View style={styles.column}>
          {renderFlagRow("EVEN", flags.getEven())}
          {renderFlagRow("!EVEN", !flags.getEven())}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    width: '100%',
    height: '11%',
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  orange: {
    fontSize: 18,
    color: '#CF7235',
    fontWeight: 'bold',
  },
});

export default Flags;
