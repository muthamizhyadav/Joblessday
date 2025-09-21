// components/CustomDropdown.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Menu } from 'react-native-paper';
import SharedInput from './input';

interface Props {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const CustomDropdown = ({ label, value, options, onSelect, error, touched }: Props) => {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState<number>(0);

  return (
    <View style={{ marginBottom: 16 }}>
      <View onLayout={e => setWidth(e.nativeEvent.layout.width)}>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)} style={{ position: 'relative' }}>
              <SharedInput
                placeholder={label}
                value={value}
                onChange={() => {}} // Read-only, handled by dropdown
                inputType="text"
                name={label.toLowerCase()}
                containerStyle={{ width: '100%' }}
              />
              <View style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                marginTop: -10,
                zIndex: 1,
                pointerEvents: 'none'
              }}>
                <Text style={{ fontSize: 16, color: '#6B7280' }}>▼</Text>
              </View>
            </TouchableOpacity>
          }
          style={{ width }}
        >
          {options.map(option => (
            <Menu.Item
              key={option}
              onPress={() => {
                setVisible(false);
                onSelect(option);
              }}
              title={option}
              style={{marginTop:10}}
            />
          ))}
        </Menu>
      </View>
      {touched && error && (
        <View style={{ marginTop: 4 }}>
          <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
