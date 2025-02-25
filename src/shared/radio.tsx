import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

interface SelectProps {
  selected: boolean;
  borderColor?: string;
  selectedColor?: string;
}

const Radio: React.FC<SelectProps> = ({
  selected,
  borderColor = '#ccc',
  selectedColor = '#2196F3',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.radioContainer,
        {
          borderColor: selected ? selectedColor : borderColor,
        },
      ]}>
      {selected ? (
        <View
          style={[
            styles.selectedIndicator,
            {
              backgroundColor: selectedColor,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.selectedIndicator,
            {
              backgroundColor: borderColor,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default Radio;
