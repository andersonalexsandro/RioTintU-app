import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCPU } from '../context/CpuContext';

/**
 * Registers Component
 * Displays the CPU registers in a grid format.
 */
export function Registers() {
  const { state } = useCPU();
  const { registers } = state;
  const registerNames = registers.getRegisterNames();
  const columns = 4; // Number of columns in the grid

  /**
   * Renders a single register item.
   * @param {number} index - The index of the register.
   * @param {string} name - The name of the register.
   * @param {string} value - The formatted value of the register.
   */
  const renderRegisterItem = (index: number, name: string, value: string) => (
    <View key={`register-${index}`} style={styles.item}>
      <Text style={styles.text}>
        <Text style={styles.orange}>{name}</Text>: {value}
      </Text>
    </View>
  );

  /**
   * Renders an empty grid item.
   * @param {string} key - A unique key for the empty item.
   */
  const renderEmptyItem = (key: string) => (
    <View key={key} style={styles.item}>
      <Text style={styles.text}> </Text>
    </View>
  );

  /**
   * Generates the grid of register items.
   */
  const renderRegisters = () => {
    const totalRows = Math.ceil(registerNames.length / columns);
    const rows = [];

    for (let row = 0; row < totalRows; row++) {
      const items = [];
      for (let col = 0; col < columns; col++) {
        const index = row + col * totalRows;
        if (index < registerNames.length) {
          const name = registerNames[index];
          const value = registers.getByName(name).toString().padStart(3, '0');
          items.push(renderRegisterItem(index, name, value));
        } else {
          items.push(renderEmptyItem(`empty-${col}-${row}`));
        }
      }
      rows.push(
        <View key={`row-${row}`} style={styles.row}>
          {items}
        </View>
      );
    }

    return rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registers:</Text>
      {renderRegisters()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    width: '100%',
    maxHeight: '21%',
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    gap: 15,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
  },
  text: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  orange: {
    color: '#CF7235',
  },
});

export default Registers;
