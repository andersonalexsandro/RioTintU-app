import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const PixelOn = require('../../assets/redstone_lamp_on.png');
const PixelOff = require('../../assets/redstone_lamp.png');

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
  2: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
  ],
  3: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  4: [
    0, 0, 0, 0, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
  ],
  5: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  6: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    1, 0, 0, 0, 0,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  7: [
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 0,
  ],
  8: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ],
  9: [
    0, 1, 1, 1, 0,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    1, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
    0, 1, 1, 1, 0,
  ]
};

export function NumberDisplay({ value, nDigites }: { value: number; nDigites: number }) {
  const rows = 9;
  const columns = 5;
  const pcString = String(value).padStart(nDigites, "0");
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

  const renderSpacer = () => {
    return (
      <View style={styles.digit}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <View key={`spacer-${rowIndex}`} style={styles.row}>
            <Image source={PixelOff} style={styles.pixel} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.digitsContainer}>
      {digits.map((digit, index) => (
        <React.Fragment key={index}>
          <View style={styles.digit}>{renderPixels(digit)}</View>
          {index < digits.length - 1 && renderSpacer()}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  digitsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  digit: {
  },
  row: {
    flexDirection: "row",
  },
  pixel: {
    width: 8,
    height: 8,
  },
});

export default NumberDisplay;
