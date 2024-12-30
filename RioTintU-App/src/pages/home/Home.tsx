import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HomeWrapper } from './Home.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Home() {
  return (
    <HomeWrapper>
        <SafeAreaView>
            <Text>Hello World</Text>
        </SafeAreaView>
    </HomeWrapper>
  );
}