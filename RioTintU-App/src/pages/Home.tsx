import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ram } from '../components/Ram';

export function Home() {

  return (
    <View style={styles.homeWrapper}>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Ram />
      </View>
      <View style={[styles.column, { flex: 2 }]}>
        <Text style={styles.text}>Coluna 2</Text>
      </View>
      <View style={[styles.column, { flex: 1.25 }]}>
        <Text style={styles.text}>Coluna 3</Text>
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
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});
