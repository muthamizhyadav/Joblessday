import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import SharedButton from '../../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import SvgIcon from '../../shared/Svg';
import {useFormik} from 'formik';
import {SetPasswordinitValue, SetPasswordSchema} from '../../validations';

const NewpasswordScreen: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();

  const inputRefs = React.useRef<TextInput[]>([]);
  const confirmInputRefs = React.useRef<TextInput[]>([]);

  const formik = useFormik({
    initialValues: SetPasswordinitValue,
    validationSchema: SetPasswordSchema,
    onSubmit: values => {
      Submit(values);
    },
  });

  const handleInputChange = (
    text: string,
    index: number,
    isConfirm: boolean = false,
  ) => {
    const field = isConfirm ? 'confirmPin' : 'pin';
    const currentValue = formik.values[field];
    const newValue = currentValue.split('');
    newValue[index] = text;
    const updatedValue = newValue.join('');
    formik.setFieldValue(field, updatedValue);

    const refs = isConfirm ? confirmInputRefs : inputRefs;
    if (text && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: any,
    index: number,
    isConfirm: boolean = false,
  ) => {
    const field = isConfirm ? 'confirmPin' : 'pin';
    if (
      e.nativeEvent.key === 'Backspace' &&
      !formik.values[field][index] &&
      index > 0
    ) {
      const refs = isConfirm ? confirmInputRefs : inputRefs;
      refs.current[index - 1]?.focus();
    }
  };

  const Submit = (values: any) => {
    navigation.navigate('Login');
    console.log('Submitted', values);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="always">
        <SvgIcon name="password" height={imageHeight} width={imageWidth} />
        <View style={{position: 'relative',marginTop:30}}>
          <Text style={styles.sectionText}>Enter PIN</Text>
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map(index => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref!)}
                style={styles.otpInput}
                value={formik.values.pin[index] || ''}
                onChangeText={text => handleInputChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                autoFocus={index === 0}
                returnKeyType="done"
                selectTextOnFocus
              />
            ))}
          </View>
          <Text style={styles.sectionText}>Confirm PIN</Text>
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map(index => (
              <TextInput
                key={`confirm-${index}`}
                ref={ref => (confirmInputRefs.current[index] = ref!)}
                style={styles.otpInput}
                value={formik.values.confirmPin[index] || ''}
                onChangeText={text => handleInputChange(text, index, true)}
                onKeyPress={e => handleKeyPress(e, index, true)}
                keyboardType="numeric"
                maxLength={1}
                returnKeyType="done"
                selectTextOnFocus
              />
            ))}
          </View>
          <SharedButton
            title="Set PIN"
            disabled={!formik.isValid || !formik.dirty}
            onPress={formik.handleSubmit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
    paddingBottom: 20,
  },
  loginText: {
    width: '100%',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 30,
    fontWeight: '800',
    color: '#6d28d9',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
    textAlign: 'center',
  },
  emailInputContainer: {
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
  otpInputHighlight: {
    borderColor: '#6d28d9',
  },
});

export const NewPassword = NewpasswordScreen;
