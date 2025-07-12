import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
  StyleProp,
} from 'react-native';

interface SkeletonLoaderProps {
  width: number | string;
  height?: number;
  rows?: number;
  columns?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  rows = 1,
  columns = 1,
  borderRadius = 8,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  const renderBlocks = (): React.ReactNode => {
    const blocks: React.ReactNode[] = [];

    for (let row = 0; row < rows; row++) {
      const rowItems: React.ReactNode[] = [];

      for (let col = 0; col < columns; col++) {
        rowItems.push(
          <Animated.View
            key={`block-${row}-${col}`}
            style={[
              styles.block,
              {
                width,
                height,
                borderRadius,
                opacity,
                marginRight: col !== columns - 1 ? 10 : 0,
              },
            ]}
          />
        );
      }

      blocks.push(
        <View key={`row-${row}`} style={[styles.row, style]}>
          {rowItems}
        </View>
      );
    }

    return blocks;
  };

  return <View>{renderBlocks()}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    margin:'auto'
  },
  block: {
    backgroundColor: '#e0e0e0',
  },
});

export default SkeletonLoader;
