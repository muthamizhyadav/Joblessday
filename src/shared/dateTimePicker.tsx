import React, {useState} from 'react';
import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import SvgIcon from './Svg';

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  label = 'Select',
  value,
  onChange,
  mode = 'date',
  placeholder = 'select',
}) => {
  const [show, setShow] = useState(false);

  const showPicker = () => setShow(true);

  const handleChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    }
  };

  const formatDisplayValue = (): string => {
    if (!value) return placeholder;
    switch (mode) {
      case 'time':
        return value.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      case 'datetime':
        return `${value.toLocaleDateString()} ${value.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      default:
        return value.toLocaleDateString();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showPicker} style={styles.dateButton}>
        <Text style={value ? styles.dateText1 : styles.dateText}>
          {formatDisplayValue()}
        </Text>
      </TouchableOpacity>
      <View style={{position: 'absolute', bottom: 10, right: 8}}>
        <SvgIcon
          name={mode == 'time' ? 'clock' : 'calendor'}
          strokeColor="#a3a3a3"
          width={20}
          height={20}
        />
      </View>
      {show && (
        <View style={{position: 'relative'}}>
          <DateTimePicker
            value={value ?? new Date()}
            mode={mode === 'datetime' ? 'date' : mode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            is24Hour={true}
          />
        </View>
      )}
    </View>
  );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  dateButton: {
    padding: 13,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  dateText: {
    color: '#a3a3a3',
  },
  dateText1: {
    color: 'black',
  },
});
