import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GlassCard, GlassButton, GlassInput } from './index';

export const GlassDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glass Components Demo</Text>
      
      <GlassCard style={styles.card}>
        <Text style={styles.cardText}>This is a GlassCard component</Text>
      </GlassCard>

      <GlassInput
        label="Test Input"
        placeholder="Enter some text..."
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
      />

      <GlassButton
        onPress={() => setButtonPressed(!buttonPressed)}
        variant="primary"
        size="medium"
        style={styles.button}
      >
        {buttonPressed ? 'Button Pressed!' : 'Press Me'}
      </GlassButton>

      <GlassButton
        onPress={() => console.log('Secondary button pressed')}
        variant="secondary"
        size="small"
      >
        Secondary Button
      </GlassButton>

      <GlassButton
        onPress={() => console.log('Accent button pressed')}
        variant="accent"
        size="large"
      >
        Accent Button
      </GlassButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
});