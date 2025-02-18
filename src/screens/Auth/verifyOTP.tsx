import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableHighlight,
} from 'react-native';
import SharedButton from '../../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import SvgIcon from '../../shared/Svg';
import SharedInput from '../../shared/input';
import {useFormik} from 'formik';
import {OTPinitValue, OTPSchema} from '../../validations';

const OTPScreen: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();

  const formik = useFormik({
    initialValues: OTPinitValue,
    validationSchema: OTPSchema,
    onSubmit: values => {
      Submit(values);
    },
  });

  const Submit = (value: any) => {
    console.log('Submitted', value);
    navigation.navigate('NewPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <SvgIcon name="otp" height={imageHeight} width={imageWidth} />

        <Text style={styles.loginText}>Verify OTP</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="OTP"
            containerStyle={styles.emailInputContainer}
            inputType="numeric"
            name={'OTP'}
            value={formik.values.OTP}
            onChange={formik.handleChange('OTP')}
          />
          <SharedButton
            title="Send OTP"
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
  emailInputContainer: {
    width: '100%',
  },
});

export const OTP = OTPScreen;
