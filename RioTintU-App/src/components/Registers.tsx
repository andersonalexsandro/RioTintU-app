import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCPU } from '../context/CpuContext';

export function Registers() {
  const { registers } = useCPU();
  const registerNames = registers.getRegisterNames();

  const renderRegisters = () => {
    const columns = 4; 
    const totalRows = Math.ceil(registerNames.length / columns);
    const rows = [];

    for (let row = 0; row < totalRows; row++) {
      const items = [];
      for (let col = 0; col < columns; col++) {
        const index = row + col * totalRows;
        if (index < registerNames.length) {
          const name = registerNames[index];
          const value = registers.getByName(name).toString().padStart(3, '0');
          items.push(
            <View key={index} style={styles.item}>
              <Text style={styles.text}>
                <Text style={styles.orange}>{name}</Text>: {value}
              </Text>
            </View>
          );
        } else {
          items.push(
            <View key={`empty-${col}-${row}`} style={styles.item}>
              <Text style={styles.text}> </Text>
            </View>
          );
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
    height: '18%',
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center', // Centraliza as linhas horizontalmente
    gap: 15,
  },
  item: {
    alignItems: 'center', // Centraliza o conteúdo dentro do item
    justifyContent: 'center',
    width: 80, // Define uma largura fixa para acomodar nomes de registradores maiores
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orange: {
    color: '#CF7235',
  },
});

export default Registers;