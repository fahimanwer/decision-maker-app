import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GlassInput } from '../GlassInput';

describe('GlassInput', () => {
  it('renders without label and error', () => {
    const { getByTestId } = render(
      <GlassInput testID="glass-input" />
    );
    
    expect(getByTestId('glass-input')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(
      <GlassInput label="Test Label" />
    );
    
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with error message', () => {
    const { getByText } = render(
      <GlassInput error="Test Error" />
    );
    
    expect(getByText('Test Error')).toBeTruthy();
  });

  it('handles focus and blur events', () => {
    const mockOnFocus = jest.fn();
    const mockOnBlur = jest.fn();
    
    const { getByTestId } = render(
      <GlassInput 
        testID="glass-input"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );
    
    const input = getByTestId('glass-input');
    
    fireEvent(input, 'focus');
    expect(mockOnFocus).toHaveBeenCalledTimes(1);
    
    fireEvent(input, 'blur');
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('handles text change', () => {
    const mockOnChangeText = jest.fn();
    
    const { getByTestId } = render(
      <GlassInput 
        testID="glass-input"
        onChangeText={mockOnChangeText}
      />
    );
    
    const input = getByTestId('glass-input');
    fireEvent.changeText(input, 'test text');
    
    expect(mockOnChangeText).toHaveBeenCalledWith('test text');
  });

  it('applies different size variants', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach((size, index) => {
      const { getByTestId } = render(
        <GlassInput 
          size={size}
          testID={`glass-input-${index}`}
        />
      );
      
      expect(getByTestId(`glass-input-${index}`)).toBeTruthy();
    });
  });

  it('applies different variants', () => {
    const variants = ['default', 'outlined', 'filled'] as const;
    
    variants.forEach((variant, index) => {
      const { getByTestId } = render(
        <GlassInput 
          variant={variant}
          testID={`glass-input-${index}`}
        />
      );
      
      expect(getByTestId(`glass-input-${index}`)).toBeTruthy();
    });
  });

  it('applies placeholder text', () => {
    const { getByPlaceholderText } = render(
      <GlassInput placeholder="Enter text here" />
    );
    
    expect(getByPlaceholderText('Enter text here')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const containerStyle = { marginTop: 20 };
    const inputStyle = { fontSize: 20 };
    const labelStyle = { color: 'red' };
    const errorStyle = { fontSize: 10 };
    
    const { getByText, getByTestId } = render(
      <GlassInput 
        label="Test Label"
        error="Test Error"
        containerStyle={containerStyle}
        inputStyle={inputStyle}
        labelStyle={labelStyle}
        errorStyle={errorStyle}
        testID="glass-input"
      />
    );
    
    expect(getByText('Test Label')).toBeTruthy();
    expect(getByText('Test Error')).toBeTruthy();
    expect(getByTestId('glass-input')).toBeTruthy();
  });

  it('passes through TextInput props', () => {
    const { getByTestId } = render(
      <GlassInput 
        testID="glass-input"
        multiline
        numberOfLines={4}
        maxLength={100}
        keyboardType="numeric"
      />
    );
    
    expect(getByTestId('glass-input')).toBeTruthy();
  });

  it('handles secure text entry', () => {
    const { getByTestId } = render(
      <GlassInput 
        testID="glass-input"
        secureTextEntry
      />
    );
    
    expect(getByTestId('glass-input')).toBeTruthy();
  });
});