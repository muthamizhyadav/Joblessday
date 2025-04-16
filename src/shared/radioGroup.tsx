import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RadioOption = {
  label: string;
  value: string | number;
};

type RadioGroupProps = {
  options: RadioOption[];
  selectedValue: string | number;
  onValueChange: (value: string | number) => void;
  label?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
  label,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.option}
          onPress={() => onValueChange(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedValue === option.value && <View style={styles.selectedDot} />}
          </View>
          <Text style={styles.optionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    gap:5,
    marginLeft:10
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#4A90E2',
  },
  optionLabel: {
    fontSize: 15,
  },
});
