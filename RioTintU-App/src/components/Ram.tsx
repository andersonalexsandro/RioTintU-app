import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useCPU } from '../context/CpuContext';

export function Ram() {
  // Obtém a RAM do estado global do contexto
  const { state } = useCPU();
  const dataView = state.ram.getDataView();

  // Renderiza os dados da memória em um formato de tabela
  const renderDataView = () => {
    const columns = 8; // Número de colunas
    const totalRows = Math.ceil(dataView.byteLength / columns); // Calcula o número total de linhas
    const rows = [];

    for (let row = 0; row < totalRows; row++) {
      const items = [];
      for (let col = 0; col < columns; col++) {
        const index = row + col * totalRows; // Índice vertical
        if (index < dataView.byteLength) {
          const value = dataView.getUint8(index).toString().padStart(3, '0'); // Formata o valor
          const formattedIndex = index.toString().padStart(3, '0'); // Formata o índice
          items.push(
            <View key={index} style={styles.item}>
              <Text style={styles.text}>
                <Text style={styles.orange}>{formattedIndex}</Text>: {value}
              </Text>
            </View>
          );
        } else {
          // Preenche células vazias para alinhamento
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
      <Text style={styles.title}>RAM:</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {renderDataView()}
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242424',
    width: '100%',
    height: '60%',
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1,
    marginBottom: 0.5,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orange: {
    color: '#CF7235',
  },
});

// Estilo minimalista de scrollbar para plataformas web
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #444;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;
  document.head.appendChild(style);
}
