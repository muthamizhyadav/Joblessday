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
  ToastAndroid,
} from 'react-native';
import SharedButton from '../../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import SvgIcon from '../../shared/Svg';
import SharedInput from '../../shared/input';
import {useFormik} from 'formik';
import {SignupinitValue, SignUpSchema} from '../../validations';
import {useRoute} from '@react-navigation/native';
import {useRegisterMutation} from '../../api/api';
import {RegisterRequest} from '../../api/models';
import Toast from 'react-native-toast-message';

const SignupScreen: React.FC = () => {
  const route = useRoute<any>();
  const {id} = route.params || {};
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();
  const [passwordIcon, setPasswordIcon] = React.useState(false);
  const [confirmpasswordIcon, setconfirmpasswordIcon] = React.useState(false);
  const [registerRequest, registerResponse] = useRegisterMutation();

  const PasswordIconChange = () => {
    setPasswordIcon(!passwordIcon);
  };

  const confirmPasswordIconChange = () => {
    setconfirmpasswordIcon(!confirmpasswordIcon);
  };

  const formik = useFormik({
    initialValues: SignupinitValue,
    validationSchema: SignUpSchema,
    onSubmit: values => {
      const requestData = {
        ...values,
        ...{role: id == '1' ? 'recruiter' : 'candidate'},
      };
      Submit(requestData);
    },
  });

  const Submit = (data: RegisterRequest) => {
    registerRequest(data);
  };

  React.useEffect(() => {
    if (registerResponse?.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Success! ',
        text2: 'Your account has been registered successfully.',
        position: 'top',
      });
      if (id != '1') {
        navigation.navigate('updateProfile', {
          id:registerResponse?.data?._id
        });
      } else {
        navigation.navigate('singin');
      }
    } else if (registerResponse?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: registerResponse?.error?.data?.message,
        position: 'bottom',
      });
    } else {
    }
  }, [registerResponse?.isSuccess || registerResponse?.isError]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled">
        <SvgIcon name="signup" height={imageHeight} width={imageWidth} />

        <Text style={styles.loginText}>Sign up</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="Name"
            containerStyle={styles.emailInputContainer}
            inputType="text"
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange('name')}
          />
          <SharedInput
            placeholder="Email"
            containerStyle={styles.emailInputContainer}
            inputType="email"
            name={'email'}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          <SharedInput
            placeholder="Password"
            containerStyle={{
              ...styles.emailInputContainer,
              ...{marginBottom: 1},
            }}
            inputType={!passwordIcon ? 'password' : 'text'}
            name={'password'}
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            PasswordIconChange={PasswordIconChange}
            passwordIcon={passwordIcon}
          />
          <SharedInput
            placeholder="Confirm password"
            containerStyle={{
              ...styles.emailInputContainer,
              ...{marginTop: 15},
            }}
            inputType={!passwordIcon ? 'password' : 'text'}
            name={'confirmPassword'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange('confirmPassword')}
            confiemPasswordIconChange={confirmPasswordIconChange}
            confirmpasswordIcon={confirmpasswordIcon}
          />
          <SharedButton
            title="Create your acccount"
            disabled={
              !formik.isValid || !formik.dirty || registerResponse?.isLoading
            }
            onPress={formik.handleSubmit}
            isLoading={registerResponse?.isLoading}
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

export const Signup = SignupScreen;
