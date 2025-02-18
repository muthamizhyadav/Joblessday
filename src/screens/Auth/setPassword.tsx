import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import SharedButton from '../../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import SvgIcon from '../../shared/Svg';
import SharedInput from '../../shared/input';
import {useFormik} from 'formik';
import {SetPasswordinitValue, SetPasswordSchema} from '../../validations';

const NewpasswordScreen: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();

  const [passwordIcon, setPasswordIcon] = React.useState(false);
  const [confirmpasswordIcon, setconfirmpasswordIcon] = React.useState(false);

  const PasswordIconChange = () => {
    setPasswordIcon(!passwordIcon);
  };

  const confirmPasswordIconChange = () => {
    setconfirmpasswordIcon(!confirmpasswordIcon);
  };

  const formik = useFormik({
    initialValues: SetPasswordinitValue,
    validationSchema: SetPasswordSchema,
    onSubmit: values => {
      Submit(values);
    },
  });

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
        keyboardShouldPersistTaps="handled">
        <SvgIcon name="password" height={imageHeight} width={imageWidth} />
        <Text style={styles.loginText}>Set new password</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="Enter new password"
            containerStyle={styles.emailInputContainer}
            inputType={!passwordIcon ? 'password' : 'text'}
            name={'password'}
            onChange={formik.handleChange('password')}
            PasswordIconChange={PasswordIconChange}
            passwordIcon={passwordIcon}
            value={formik.values.password}
          />
          <SharedInput
            placeholder="Re-Enter password"
            containerStyle={styles.emailInputContainer}
            inputType={!confirmpasswordIcon ? 'password' : 'text'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange('confirmPassword')}
            confiemPasswordIconChange={confirmPasswordIconChange}
            confirmpasswordIcon={confirmpasswordIcon}
            name={'confirmPassword'}
          />
          <SharedButton
            title="Set password"
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

export const NewPassword = NewpasswordScreen;
