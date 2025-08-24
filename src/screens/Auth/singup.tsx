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
  import RadioGroup from '../../shared/radioGroup';
  import {useFormik} from 'formik';
  import {SignupinitValue, SignUpSchema} from '../../validations';
  import {useRoute} from '@react-navigation/native';
  import {useRegisterMutation} from '../../api/api';
  import {RegisterRequest} from '../../api/models';
  import Toast from 'react-native-toast-message';
  import {useDispatch} from 'react-redux';
  import {setRegistrationData} from '../../store/slice';
  import {FontFamily} from '../../constants/fonts';

const SignupScreen: React.FC = () => {
  const route = useRoute<any>();
  const {id} = route.params || {};
  const {height, width} = useWindowDimensions();
  const imageHeight = height * 0.3;
  const imageWidth = width * 0.8;
  const navigation = useNavigation<any>();
  const [passwordIcon, setPasswordIcon] = React.useState(false);
  const [confirmpasswordIcon, setconfirmpasswordIcon] = React.useState(false);
  const [experienceLevel, setExperienceLevel] = React.useState('');
  const [registerRequest, registerResponse] = useRegisterMutation();
  const dispatch = useDispatch();

  const experienceOptions = [
        { label: 'Internship', value: 'internship' },
    { label: 'Fresher', value: 'fresher' },
    { label: 'Experienced', value: 'experienced' },
  ];

  const PasswordIconChange = () => {
    setPasswordIcon(!passwordIcon);
  };

  const confirmPasswordIconChange = () => {
    setconfirmpasswordIcon(!confirmpasswordIcon);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      email: '',
      location: '',
    },
    // validationSchema: SignUpSchema,
    onSubmit: values => {
      const requestData = {
        ...values,
        experienceLevel,
        role: id == '1' ? 'recruiter' : 'candidate',
      };
      Submit(requestData as any);
    },
  });

  const Submit = (data: RegisterRequest) => {
    registerRequest(data);
  };

  React.useEffect(() => {
    console.log(id, 'ID');

    if (registerResponse?.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Success! ',
        text2: 'Your account has been registered successfully.',
        position: 'top',
      });
      if (id != '1') {
        navigation.navigate('updateProfile', {
          id: registerResponse?.data?._id,
          stepper: 0,
        });
      } else {
        navigation.navigate('updateProfileRecruiter', {
          id: registerResponse?.data?._id,
          stepper: 0,
        });
        // navigation.navigate('singin');
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
        <View style={{paddingTop:10}}>
          <SvgIcon name="signup" height={imageHeight} width={imageWidth} />
        </View>

        <Text style={styles.loginText}>Create your account</Text>
        <View style={{position: 'relative'}}>
          <SharedInput
            placeholder="Full Name"
            containerStyle={styles.emailInputContainer}
            inputType="text"
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange('name')}
          />
          <SharedInput
            placeholder="Contact Number"
            containerStyle={styles.emailInputContainer}
            inputType="numeric"
            name={'contact'}
            value={formik.values.contact}
            onChange={formik.handleChange('contact')}
          />
          <SharedInput
            placeholder="Email Address"
            containerStyle={styles.emailInputContainer}
            inputType="email"
            name={'email'}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          <SharedInput
            placeholder="Location"
            containerStyle={styles.emailInputContainer}
            inputType="text"
            name={'location'}
            value={formik.values.location}
            onChange={formik.handleChange('location')}
          />
          
          <View style={styles.experienceContainer}>
            {/* <Text style={styles.experienceLabel}>Experience Level</Text> */}
            <RadioGroup
              options={experienceOptions}
              selectedValue={experienceLevel}
              onValueChange={(value) => setExperienceLevel(value as string)}
            />
          </View> 
          <SharedButton
            title="Submit"
            disabled={  
              !formik.values.name || 
              !formik.values.contact || 
              !formik.values.email || 
              !formik.values.location || 
              !experienceLevel ||
              registerResponse?.isLoading
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
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 32,
    fontWeight: '800',
    color: '#8971d0',
    fontFamily: FontFamily.Inter.Bold,
  },
  emailInputContainer: {
    width: '100%',
  },
  experienceContainer: {
    marginBottom: 20,
  },
  experienceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: FontFamily.Inter.Medium,
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
