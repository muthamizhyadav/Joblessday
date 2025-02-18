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
import {ForgotPasswordinitValue, ForgotPasswordSchema} from '../../validations';

const ForgotScreen: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();

  const formik = useFormik({
    initialValues: ForgotPasswordinitValue,
    validationSchema: ForgotPasswordSchema,
    onSubmit: values => {
      Submit(values);
    },
  });

  const Submit = (value: any) => {
    navigation.navigate('OTP');
    console.log('Submitted', value);
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <SvgIcon name="forgot" height={imageHeight} width={imageWidth} />

        <Text style={styles.loginText}>Forgot password</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="Email"
            containerStyle={styles.emailInputContainer}
            inputType="email"
            name={'email'}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
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
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  orContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  line: {
    width: '45%',
    height: 1,
    backgroundColor: '#94a3b8',
  },
  orText: {
    marginHorizontal: 15,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  googleBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 15,
  },
  googleBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  signupText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    position: 'relative',
    fontFamily: 'inter',
    flex: 1,
    gap: 2,
  },
  signup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 15,
  },
});

export const Forgot = ForgotScreen;
