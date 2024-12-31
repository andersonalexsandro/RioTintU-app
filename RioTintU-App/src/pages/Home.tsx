import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ram } from '../components/Ram';
import { Flags } from '../components/Flags';
import Registers from '../components/Registers';
import { Code } from '../components/Code';

export function Home() {

  return (
    <View style={styles.homeWrapper}>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Ram />
        <Flags />
        <Registers />
      </View>
      <View style={[styles.column, { flex: 2 }]}>
        <Text style={styles.text}>Coluna 2</Text>
      </View>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Code />
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
