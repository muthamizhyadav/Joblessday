// src/components/Amount.tsx

import React from 'react';
import {Text, TextStyle} from 'react-native';

interface AmountProps {
  value: number;
  style?: TextStyle;
}

const formatAmount = (value: number): string => {
  if (value >= 10000000) {
    return (value / 10000000).toFixed(2).replace(/\.00$/, '') + 'Cr';
  } else if (value >= 100000) {
    return (value / 100000).toFixed(2).replace(/\.00$/, '') + 'L';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
  } else {
    return value.toString();
  }
};

const Amount: React.FC<AmountProps> = ({value, style}) => {
  return <Text style={style}>₹{formatAmount(value)}</Text>;
};

export default Amount;
