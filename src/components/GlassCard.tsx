import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export interface GlassCardProps {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  children: React.ReactNode;
  style?: ViewStyle;
  borderRadius?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  intensity = 20,
  tint = 'dark',
  children,
  style,
  borderRadius = 16,
}) => {
  const containerStyle = [
    styles.container,
    {
      borderRadius,
      overflow: 'hidden' as const,
    },
    style,
  ];

  const glassStyle = [
    styles.glass,
    {
      borderRadius,
    },
  ];

  return (
    <View style={containerStyle}>
      <BlurView
        intensity={intensity}
        tint={tint}
        style={glassStyle}
      >
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glass: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});