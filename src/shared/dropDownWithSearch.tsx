import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface DropdownItem {
  label: string;
  value: string;
}

interface SharedDropdownProps {
  data: DropdownItem[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  searchOptions?: boolean;
  searchPlaceHolder?: string;
  onBlur?: () => void;
  objectsend?:boolean
}

const SharedDropdown: React.FC<SharedDropdownProps> = ({
  data,
  value,
  placeholder = 'Select an option',
  onChange,
  searchOptions,
  searchPlaceHolder,
  objectsend=false,
  onBlur,
}) => {
  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={placeholder}
        onChange={item => onChange(objectsend? item:item.value)}
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        selectedTextStyle={styles.selectedText}
        placeholderStyle={styles.placeholderText}
        search={searchOptions}
        searchPlaceholder={searchPlaceHolder}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
});

export default SharedDropdown;
