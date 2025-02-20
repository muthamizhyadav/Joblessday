import React, {useMemo, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import SvgIcon from './Svg';

// Define the props interface
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  inputType: string;
  value?: string;
  onChange?: any;
  name: any;
  PasswordIconChange?: () => void;
  passwordIcon?: boolean;
  confiemPasswordIconChange?: () => void;
  confirmpasswordIcon?: boolean;
  height?:number
}

const SharedInput: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  errorStyle,
  inputType,
  value,
  onChange,
  name,
  PasswordIconChange,
  confiemPasswordIconChange,
  passwordIcon,
  confirmpasswordIcon,
  height,
  ...rest
}) => {
  const getInputProps = (): TextInputProps => {
    switch (inputType) {
      case 'password':
        return {
          secureTextEntry: true,
          autoCapitalize: 'none',
          keyboardType: 'default',
        };
      case 'email':
        return {
          autoCapitalize: 'none',
          keyboardType: 'email-address',
        };
      case 'numeric':
        return {
          keyboardType: 'numeric',
        };
      default:
        return {
          keyboardType: 'default',
        };
    }
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[{...styles.input, height:height}, error ? styles.inputError : null]}
        placeholderTextColor="#999"
        {...getInputProps()}
        {...rest}
        value={value}
        onChangeText={text => {
          onChange(text);
        }}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
      {name == 'password' ? (
        <TouchableOpacity
          onPress={PasswordIconChange}
          style={{position: 'absolute', right: 10, marginTop: 8}}>
          <SvgIcon
            name={passwordIcon ? 'eye' : 'eyeclose'}
            height={24}
            width={24}
            strokeColor="gray"
          />
        </TouchableOpacity>
      ) : name == 'confirmPassword' ? (
        <TouchableOpacity
          onPress={confiemPasswordIconChange}
          style={{position: 'absolute', right: 10, marginTop: 8}}>
          <SvgIcon
            name={confirmpasswordIcon ? 'eye' : 'eyeclose'}
            height={24}
            width={24}
            strokeColor="gray"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default SharedInput;
