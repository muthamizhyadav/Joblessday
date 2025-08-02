// components/CustomDropdown.tsx
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Menu, TextInput, HelperText } from 'react-native-paper';

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
            <TouchableOpacity onPress={() => setVisible(true)}>
              <TextInput
                mode="outlined"
                label={label}
                value={value}
                editable={false}
                pointerEvents="none"
                style={{ backgroundColor: '#fff' }}
              />
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
      {touched && error && <HelperText type="error">{error}</HelperText>}
    </View>
  );
};

export default CustomDropdown;
