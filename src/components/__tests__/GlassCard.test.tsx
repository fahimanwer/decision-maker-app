import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GlassCard } from '../GlassCard';

describe('GlassCard', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <GlassCard>
        <Text>Test Content</Text>
      </GlassCard>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies default props correctly', () => {
    const { getByTestId } = render(
      <GlassCard testID="glass-card">
        <Text>Content</Text>
      </GlassCard>
    );
    
    const glassCard = getByTestId('glass-card');
    expect(glassCard).toBeTruthy();
  });

  it('applies custom intensity and tint props', () => {
    const { getByTestId } = render(
      <GlassCard 
        intensity={50} 
        tint="light" 
        testID="glass-card"
      >
        <Text>Content</Text>
      </GlassCard>
    );
    
    const glassCard = getByTestId('glass-card');
    expect(glassCard).toBeTruthy();
  });

  it('applies custom border radius', () => {
    const { getByTestId } = render(
      <GlassCard 
        borderRadius={24} 
        testID="glass-card"
      >
        <Text>Content</Text>
      </GlassCard>
    );
    
    const glassCard = getByTestId('glass-card');
    expect(glassCard).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <GlassCard 
        style={customStyle} 
        testID="glass-card"
      >
        <Text>Content</Text>
      </GlassCard>
    );
    
    const glassCard = getByTestId('glass-card');
    expect(glassCard).toBeTruthy();
  });

  it('handles different tint values', () => {
    const tints = ['light', 'dark', 'default'] as const;
    
    tints.forEach((tint, index) => {
      const { getByTestId } = render(
        <GlassCard 
          tint={tint} 
          testID={`glass-card-${index}`}
        >
          <Text>Content {index}</Text>
        </GlassCard>
      );
      
      expect(getByTestId(`glass-card-${index}`)).toBeTruthy();
    });
  });
});