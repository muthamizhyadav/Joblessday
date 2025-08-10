import { StyleSheet } from 'react-native';
import { FontFamily, FontSize } from './fonts';

export const GlobalStyles = StyleSheet.create({
  // Text styles
  headingLarge: {
    fontFamily: FontFamily.Inter.Bold,
    fontSize: FontSize['4xl'],
    lineHeight: FontSize['4xl'] * 1.2,
    fontWeight: '700',
  },
  headingMedium: {
    fontFamily: FontFamily.Inter.Bold,
    fontSize: FontSize['2xl'],
    lineHeight: FontSize['2xl'] * 1.2,
    fontWeight: '700',
  },
  headingSmall: {
    fontFamily: FontFamily.Inter.SemiBold,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * 1.2,
    fontWeight: '600',
  },
  bodyLarge: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * 1.5,
    fontWeight: '400',
  },
  bodyMedium: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * 1.5,
    fontWeight: '400',
  },
  bodySmall: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * 1.5,
    fontWeight: '400',
  },
  caption: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * 1.2,
    fontWeight: '400',
  },
  buttonTextStyle: {
    fontFamily: FontFamily.Inter.SemiBold,
    fontSize: FontSize.base,
    fontWeight: '600',
  },
  labelText: {
    fontFamily: FontFamily.Inter.Medium,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  padding: {
    padding: 16,
  },
  
  // Card styles
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Input styles
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: FontFamily.Inter.Medium,
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: FontSize.base,
    fontFamily: FontFamily.Inter.Regular,
    color: '#333',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontFamily: FontFamily.Inter.Regular,
    fontSize: FontSize.xs,
    color: '#ef4444',
    marginTop: 4,
  },
  
  // Button styles
  button: {
    backgroundColor: '#8E44AD',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonText: {
    fontFamily: FontFamily.Inter.SemiBold,
    fontSize: FontSize.base,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8E44AD',
  },
  buttonSecondaryText: {
    color: '#8E44AD',
  },
});
