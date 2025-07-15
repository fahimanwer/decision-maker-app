import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { GlassButton } from '../GlassButton';
import * as Haptics from 'expo-haptics';

// Mock haptics
jest.mock('expo-haptics');
const mockHaptics = Haptics as jest.Mocked<typeof Haptics>;

describe('GlassButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders text children correctly', () => {
    const { getByText } = render(
      <GlassButton onPress={() => {}}>
        Test Button
      </GlassButton>
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <GlassButton onPress={mockOnPress}>
        Test Button
      </GlassButton>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback by default', async () => {
    mockHaptics.impactAsync.mockResolvedValue();
    const { getByText } = render(
      <GlassButton onPress={() => {}}>
        Test Button
      </GlassButton>
    );
    
    fireEvent.press(getByText('Test Button'));
    
    await waitFor(() => {
      expect(mockHaptics.impactAsync).toHaveBeenCalledWith(
        Haptics.ImpactFeedbackStyle.Medium
      );
    });
  });

  it('does not trigger haptic feedback when disabled', async () => {
    const { getByText } = render(
      <GlassButton onPress={() => {}} hapticFeedback={false}>
        Test Button
      </GlassButton>
    );
    
    fireEvent.press(getByText('Test Button'));
    
    await waitFor(() => {
      expect(mockHaptics.impactAsync).not.toHaveBeenCalled();
    });
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <GlassButton onPress={mockOnPress} disabled>
        Test Button
      </GlassButton>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies different size variants', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach((size, index) => {
      const { getByText } = render(
        <GlassButton onPress={() => {}} size={size}>
          Button {index}
        </GlassButton>
      );
      
      expect(getByText(`Button ${index}`)).toBeTruthy();
    });
  });

  it('applies different color variants', () => {
    const variants = ['primary', 'secondary', 'accent'] as const;
    
    variants.forEach((variant, index) => {
      const { getByText } = render(
        <GlassButton onPress={() => {}} variant={variant}>
          Button {index}
        </GlassButton>
      );
      
      expect(getByText(`Button ${index}`)).toBeTruthy();
    });
  });

  it('renders custom React node children', () => {
    const { getByTestId } = render(
      <GlassButton onPress={() => {}}>
        <div testID="custom-child">Custom Content</div>
      </GlassButton>
    );
    
    expect(getByTestId('custom-child')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <GlassButton 
        onPress={() => {}} 
        style={customStyle}
        testID="glass-button"
      >
        Test Button
      </GlassButton>
    );
    
    expect(getByTestId('glass-button')).toBeTruthy();
  });
});