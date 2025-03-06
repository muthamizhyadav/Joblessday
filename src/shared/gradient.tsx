import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LinearGradientProps {
  colors: string[]; // Array of colors for the gradient
  start?: { x: number; y: number }; // Gradient start position (optional)
  end?: { x: number; y: number }; // Gradient end position (optional)
  style?: ViewStyle; // Custom styles for the container
  children?: React.ReactNode; // Children components
}

// Create the LinearGradient component
const GradientView: React.FC<LinearGradientProps> = ({
  colors,
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 2.5 },
  style,
  children,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  gradient: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default GradientView;