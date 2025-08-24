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
import { FontFamily } from '../constants/fonts';

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
  height?: number;
  inputStyle?: any;
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
  inputStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputProps = (): TextInputProps => {
    switch (inputType) {
      // case 'password':
      //   return {
      //     secureTextEntry: true,
      //     autoCapitalize: 'none',
      //     keyboardType: 'default',
      //   };
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

  const getInputStyle = () => {
    let style = {...styles.input};
    if (error) {
      style = {...style, ...styles.inputError};
    } else if (isFocused) {
      style = {...style, ...styles.inputFocused};
    }
    if (inputStyle || rest?.style) {
      style = {...style, ...(inputStyle || rest?.style)};
    }
    return style;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        style={[
          getInputStyle(),
          (name === 'password' || name === 'confirmPassword') && {paddingRight: 50}
        ]}
        placeholderTextColor="#9CA3AF"
        {...getInputProps()}
        {...rest}
        value={value}
        onChangeText={text => {
          onChange(text);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
      {name == 'password' ? (
        <TouchableOpacity
          onPress={PasswordIconChange}
          style={{
            position: 'absolute', 
            right: 16, 
            top: '50%',
            marginTop: -12,
            zIndex: 1
          }}>
          <SvgIcon
            name={passwordIcon ? 'eye' : 'eyeclose'}
            height={24}
            width={24}
            strokeColor="#6B7280"
          />
        </TouchableOpacity>
      ) : name == 'confirmPassword' ? (
        <TouchableOpacity
          onPress={confiemPasswordIconChange}
          style={{
            position: 'absolute', 
            right: 16, 
            top: '50%',
            marginTop: -12,
            zIndex: 1
          }}>
          <SvgIcon
            name={confirmpasswordIcon ? 'eye' : 'eyeclose'}
            height={24}
            width={24}
            strokeColor="#6B7280"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    fontFamily: FontFamily.Inter.Medium,
  },
  input: {
    height: 56,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    fontFamily: FontFamily.Inter.Regular,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 0  ,
  },
  inputFocused: {
    borderColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  error: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
    marginLeft: 4,
    fontFamily: FontFamily.Inter.Regular,
  },
});

export default SharedInput;
