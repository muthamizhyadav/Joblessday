import React from 'react';
import { Text } from 'react-native';

interface NumberFormatProps {
  value: number;
  symbol?: string;
  decimalScale?: number;
  thousandSeparator?: string;
  decimalSeparator?: string;
  symbolPosition?: 'prefix' | 'suffix';
}

const NumberFormatter = ({
  value,
  symbol = '',
  decimalScale = 2,
  thousandSeparator = ',',
  decimalSeparator = '.',
  symbolPosition = 'prefix',
}: NumberFormatProps) => {
  const formatNumber = (num: number) => {
    const fixedNum = num.toFixed(decimalScale);
    const parts = fixedNum.toString().split('.');
    
    // Format integer part with thousand separators
    const integerPart = parts[0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    
    // Handle decimal part
    const decimalPart = parts[1] 
      ? decimalSeparator + parts[1].padEnd(decimalScale, '0').slice(0, decimalScale)
      : '';

    // Combine parts with symbol
    const formatted = symbolPosition === 'prefix'
      ? `${symbol}${integerPart}${decimalPart}`
      : `${integerPart}${decimalPart}${symbol}`;

    return formatted;
  };

  return (
    <Text>
      {formatNumber(value)}
    </Text>
  );
};

export default NumberFormatter;