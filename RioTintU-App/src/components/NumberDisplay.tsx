import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Substitua pelo caminho da sua imagem PNG
const PixelOn = require('../../assets/redstone_lamp_on.png');
const PixelOff = require('../../assets/redstone_lamp.png');

// Definição dos padrões de pixels para cada dígito de 0 a 9
const digitPatterns: { [key: number]: number[] } = {
  0: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  1: [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
  ],
  // Adicione os padrões para 2 a 9
};

export function NumberDisplay({ value, nDigites }: { value: number; nDigites: number }) {
  const rows = 9;
  const columns = 5;
  const pcString = String(value).padStart(nDigites, '0');
  const digits = pcString.split("").map((digit) => Number(digit));

  const renderPixels = (digit: number) => {
    const pattern = digitPatterns[digit];
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const startIndex = row * columns;
      const rowPixels = pattern.slice(startIndex, startIndex + columns);

      grid.push(
        <View key={row} style={styles.row}>
          {rowPixels.map((pixel, colIndex) => (
            <Image
              key={`${row}-${colIndex}`}
              source={pixel ? PixelOn : PixelOff}
              style={styles.pixel}
            />
          ))}
        </View>
      );
    }

    return grid;
  };

  return (
    <View style={styles.digitsContainer}>
      {digits.map((digit, index) => (
        <View key={index} style={styles.digit}>
          {renderPixels(digit)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  digitsContainer: {
    flexDirection: 'row', // Coloca os dígitos lado a lado
    justifyContent: 'center',
    alignItems: 'center',
  },
  digit: {
    marginHorizontal: 5, // Espaçamento entre os dígitos
  },
  row: {
    flexDirection: 'row',
  },
  pixel: {
    width: 10,
    height: 10,
  },
});

export default NumberDisplay;
