import React from 'react';
import {
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  StyleSheet,
  PressableStateCallbackType,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { GlassCard } from './GlassCard';

export interface GlassButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  hapticFeedback?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  onPress,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  hapticFeedback = true,
  style,
  textStyle,
}) => {
  const handlePress = async () => {
    if (disabled) return;
    
    if (hapticFeedback) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onPress();
  };

  const getButtonStyle = (pressed: boolean) => [
    styles.button,
    styles[size],
    styles[variant],
    pressed && styles.pressed,
    disabled && styles.disabled,
    style,
  ];

  const getTextStyle = () => [
    styles.text,
    styles[`${size}Text` as keyof typeof styles],
    styles[`${variant}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  const getGlassIntensity = () => {
    switch (variant) {
      case 'primary':
        return 25;
      case 'secondary':
        return 15;
      case 'accent':
        return 30;
      default:
        return 20;
    }
  };

  const getGlassTint = () => {
    switch (variant) {
      case 'primary':
        return 'dark' as const;
      case 'secondary':
        return 'light' as const;
      case 'accent':
        return 'default' as const;
      default:
        return 'dark' as const;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }: PressableStateCallbackType) => getButtonStyle(pressed)}
    >
      <GlassCard
        intensity={getGlassIntensity()}
        tint={getGlassTint()}
        borderRadius={size === 'small' ? 8 : size === 'medium' ? 12 : 16}
        style={styles.glassContainer}
      >
        {typeof children === 'string' ? (
          <Text style={getTextStyle()}>{children}</Text>
        ) : (
          children
        )}
      </GlassCard>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassContainer: {
    margin: 0,
  },
  
  // Size variants
  small: {
    minHeight: 36,
    paddingHorizontal: 12,
  },
  medium: {
    minHeight: 48,
    paddingHorizontal: 16,
  },
  large: {
    minHeight: 56,
    paddingHorizontal: 20,
  },
  
  // Color variants
  primary: {
    backgroundColor: 'rgba(0, 122, 255, 0.2)',
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
  secondary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  accent: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  
  // States
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  
  // Text styles
  text: {
    fontFamily: 'Inter',
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Text color variants
  primaryText: {
    color: '#007AFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  accentText: {
    color: '#FF3B30',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});