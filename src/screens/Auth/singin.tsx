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
import SvgIcon from '../../shared/Svg';
import SharedInput from '../../shared/input';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import SharedButton from '../../shared/SharedButton';
import {LoginInitValue} from '../../validations/initialValues';
import {LoginInSchema} from '../../validations';
import {useDispatch} from 'react-redux';
import {setProfileData} from '../../store/slice';
import {useLoginMutation} from '../../api/api';
import Toast from 'react-native-toast-message';

const SigninScreen: React.FC = () => {
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();
  const [passwordIcon, setPasswordIcon] = React.useState(false);
  const [loginRequest, loginResponse] = useLoginMutation();
  const dispatch = useDispatch();

  const PasswordIconChange = () => {
    setPasswordIcon(!passwordIcon);
  };

  const formik = useFormik({
    initialValues: LoginInitValue,
    validationSchema: LoginInSchema,
    onSubmit: values => {
      Submit(values);
    },
  });

  const Submit = (data: any) => {
    loginRequest(data);
  };

  React.useEffect(() => {
    if (loginResponse?.isSuccess) {
      console.log(loginResponse?.data);
      if (
        loginResponse?.data?.user?.role == 'candidate' &&
        loginResponse?.data?.user?.stepper != 3
      ) {
        navigation.navigate('updateProfile', {
          id: loginResponse?.data?.user?._id,
          stepper: loginResponse?.data?.user?.stepper,
        });
      } else if (
        loginResponse?.data?.user?.role == 'recruiter' &&
        loginResponse?.data?.user?.stepper == 0
      ) {
        navigation.navigate('updateProfileRecruiter', {
          id: loginResponse?.data?.user?._id,
          stepper: loginResponse?.data?.user?.stepper,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Login successful! Redirecting to your dashboard...',
        });
        dispatch(setProfileData(loginResponse?.data));
        navigation.navigate('MainApp');
      }
    } else if (loginResponse?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: loginResponse?.error?.data?.message,
      });
    }
  }, [loginResponse?.isSuccess || loginResponse?.isError]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <SvgIcon name="signin" height={imageHeight} width={imageWidth} />
        <Text style={styles.loginText}>Sign in</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="Email"
            containerStyle={styles.emailInputContainer}
            inputType="email"
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            name={'email'}
          />
          <SharedInput
            placeholder="Password"
            containerStyle={{
              ...styles.emailInputContainer,
              ...{marginBottom: 1},
            }}
            inputType={!passwordIcon ? 'password' : 'text'}
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            name={'password'}
            PasswordIconChange={PasswordIconChange}
            passwordIcon={passwordIcon}
          />
          <TouchableHighlight style={styles.forgotPassword}>
            <Text
              style={{color: '#6d28d9', fontSize: 16, fontWeight: '700'}}
              onPress={() => navigation.navigate('Forgot')}>
              Forgot Password?
            </Text>
          </TouchableHighlight>
          <SharedButton
            title="Login"
            disabled={
              !formik.isValid || !formik.dirty || loginResponse?.isLoading
            }
            onPress={formik.handleSubmit}
            isLoading={loginResponse?.isLoading}
          />
          <View style={styles.orContainer}>
            <Text style={styles.line}></Text>
            <Text style={styles.orText}>OR</Text>
            <Text style={styles.line}></Text>
          </View>
          <TouchableHighlight style={styles.googleBTN} underlayColor="#ddd">
            <View style={styles.googleBtnContent}>
              <SvgIcon name="google" height={24} width={24} />
              <Text style={styles.googleText}>Login with Google</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.signup}>
            <View style={styles.googleBtnContent}>
              <Text style={styles.googleText}>
                Don't have an account?{' '}
                <Text
                  style={{color: '#6d28d9', fontWeight: 700}}
                  onPress={() => navigation.navigate('Onboard')}>
                  Signup
                </Text>
              </Text>
            </View>
          </TouchableHighlight>
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

export const Signin = SigninScreen;
