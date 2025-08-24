import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontFamily } from '../constants/fonts';

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
          <View style={[
            styles.radioCircle,
            selectedValue === option.value && styles.selectedCircle
          ]}>
            {selectedValue === option.value && <View style={styles.selectedDot} />}
          </View>
          <Text style={[
            styles.optionLabel,
            selectedValue === option.value && styles.selectedLabel
          ]}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 4,
  },
  groupLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedCircle: {
    borderColor: '#6D28D9',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#6D28D9',
  },
  optionLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontFamily: FontFamily.Inter.Medium,
  },
  selectedLabel: {
    color: '#6D28D9',
    fontWeight: '600',
  },
});
