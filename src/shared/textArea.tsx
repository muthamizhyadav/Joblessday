import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

type TextAreaProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  style?: TextInputProps['style'];
};

const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChangeText,
  placeholder = 'Enter text...',
  numberOfLines = 4,
  style,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textArea, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        placeholderTextColor={'gray'}
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    minHeight: 100,
  },
});
