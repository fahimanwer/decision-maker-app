import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { GlassCard } from './GlassCard';

export interface GlassInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const GlassInput: React.FC<GlassInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  variant = 'default',
  size = 'medium',
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getContainerStyle = () => [
    styles.container,
    containerStyle,
  ];

  const getGlassCardStyle = (): ViewStyle => ({
    ...styles.glassCard,
    ...styles[size],
    ...styles[variant],
    ...(isFocused && styles.focused),
    ...(error && styles.error),
  });

  const getInputStyle = () => [
    styles.input,
    styles[`${size}Input` as keyof typeof styles],
    inputStyle,
  ];

  const getLabelStyle = () => [
    styles.label,
    styles[`${size}Label` as keyof typeof styles],
    labelStyle,
  ];

  const getErrorStyle = () => [
    styles.errorText,
    errorStyle,
  ];

  const getGlassIntensity = () => {
    if (isFocused) return 30;
    if (error) return 25;
    return 20;
  };

  const getGlassTint = () => {
    if (error) return 'light' as const;
    if (isFocused) return 'default' as const;
    return 'dark' as const;
  };

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>{label}</Text>
      )}
      
      <GlassCard
        intensity={getGlassIntensity()}
        tint={getGlassTint()}
        borderRadius={size === 'small' ? 8 : size === 'medium' ? 12 : 16}
        style={getGlassCardStyle()}
      >
        <TextInput
          {...textInputProps}
          style={getInputStyle()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        />
      </GlassCard>
      
      {error && (
        <Text style={getErrorStyle()}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  },
  
  // Size variants
  small: {
    minHeight: 36,
  },
  medium: {
    minHeight: 48,
  },
  large: {
    minHeight: 56,
  },
  
  // Variant styles
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  // States
  focused: {
    borderColor: 'rgba(0, 122, 255, 0.5)',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  error: {
    borderColor: 'rgba(255, 59, 48, 0.5)',
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
  },
  
  // Input styles
  input: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  smallInput: {
    fontSize: 14,
  },
  mediumInput: {
    fontSize: 16,
  },
  largeInput: {
    fontSize: 18,
  },
  
  // Label styles
  label: {
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  smallLabel: {
    fontSize: 12,
  },
  mediumLabel: {
    fontSize: 14,
  },
  largeLabel: {
    fontSize: 16,
  },
  
  // Error text
  errorText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
});