import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Ram() {
  return (
    <View style={styles.ramView}>
      <Text style={styles.title}>Ram:</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ramView: {
    backgroundColor: '#242424',
    width: '100%',
    height: '65%',
    borderRadius: 24,
    padding: 15,
  },
  title: {
    color: '#777777',
    fontSize: 20,
    fontWeight: 'bold',
  },
});