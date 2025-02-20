import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {useState} from 'react';
import {AppColors} from '../../constants/colors.config';
import SharedInput from '../../shared/input';
import {Department, Industries, Roles} from '../../constants/datas';
import SharedDropdown from '../../shared/dropDownWithSearch';
import SharedButton from '../../shared/SharedButton';
import Stepper from '../../shared/stepper';
import {jobPostinitValue} from '../../validations/job.initialValues';
import {JobPostSchema} from '../../validations';
import {useFormik} from 'formik';
import {useCreateJobPostMutation} from '../../api/api';
import Toast from 'react-native-toast-message';

const AddJobPostScreen: React.FC = () => {
  const [data] = useState(Industries);
  const steps = ['Post creation', 'Test creation'];
  const [createJobPostRequest, createJobPostResponse] =
    useCreateJobPostMutation();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [postCreationData, setPostCreationData] = useState<any>();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formik = useFormik({
    initialValues: jobPostinitValue,
    validationSchema: JobPostSchema,
    onSubmit: values => {
      submit(values);
    },
  });

  const submit = (data: any) => {
    console.log(data);
    createJobPostRequest(data);
  };

  React.useEffect(() => {
    console.log(createJobPostResponse);
    if (createJobPostResponse?.isSuccess) {
      setCurrentStep(createJobPostResponse?.data?.step ?? 0);
      setPostCreationData(createJobPostResponse?.data);
      Toast.show({
        type: 'success',
        text1: 'Job post has been created!',
      });
    } else if (createJobPostResponse?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Job post creation failed try again',
      });
    }
  }, [createJobPostResponse?.isSuccess, createJobPostResponse?.isError]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={{backgroundColor: 'white', margin: 10, borderRadius: 5}}>
            <SvgIcon
              name="back"
              width={30}
              height={30}
              strokeColor={AppColors.AppButtonBackground}
            />
          </TouchableOpacity>
          <Text
            style={{
              margin: 10,
              fontSize: 20,
              color: 'white',
              fontWeight: 600,
            }}>
            Create Job Posts
          </Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </View>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, gap: 4}}>
        {currentStep == 0 ? (
          <ScrollView
            style={{
              width: '90%',
              margin: 'auto',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}>
            <View style={styles.forms}>
              <Text>Select Industries :</Text>
              <SharedDropdown
                onChange={value => {
                  formik.setFieldValue('industry', value),
                    console.log(value, 'value');
                }}
                value={formik.values.industry}
                data={data}
                placeholder="Select Industries"
                searchOptions={true}
                searchPlaceHolder="Search Industries"
              />
            </View>

            <View style={styles.forms}>
              <Text>Select Role :</Text>
              <SharedDropdown
                onChange={value => formik.setFieldValue('role', value)}
                value={formik.values.role}
                data={Roles}
                placeholder="Select Role"
                searchOptions={true}
                searchPlaceHolder="Search Roles"
              />
            </View>

            <View style={styles.forms}>
              <Text>Select Department :</Text>
              <SharedDropdown
                onChange={value => formik.setFieldValue('department', value)}
                value={formik.values.department}
                data={Department}
                placeholder="Select Department"
                searchOptions={true}
                searchPlaceHolder="Search Department"
              />
            </View>

            <View style={styles.forms}>
              <Text>Designation :</Text>
              <SharedInput
                inputType="text"
                name={'designation'}
                placeholder="Designations"
                onChange={formik.handleChange('designation')}
                value={formik.values.designation}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '46%'}}>
                <Text>Salary from :</Text>
                <SharedInput
                  inputType="numeric"
                  name={'salaryfrom'}
                  placeholder="From salary"
                  onChange={formik.handleChange('salaryfrom')}
                  value={formik.values.salaryfrom}
                />
              </View>
              <View style={{width: '46%'}}>
                <Text>salary to :</Text>
                <SharedInput
                  inputType="numeric"
                  name={'salaryto'}
                  placeholder="To salary"
                  onChange={formik.handleChange('salaryto')}
                  value={formik.values.salaryto}
                />
              </View>
            </View>

            <View style={styles.forms}>
              <Text>Work Locations :</Text>
              <SharedInput
                inputType="text"
                name={'worklocation'}
                placeholder="Work location"
                onChange={formik.handleChange('worklocation')}
                value={formik.values.worklocation}
              />
            </View>
            <SharedButton
              title="Submit"
              isLoading={createJobPostResponse?.isLoading}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                createJobPostResponse?.isLoading
              }
              onPress={() => formik.handleSubmit()}
            />
          </ScrollView>
        ) : (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: 24, marginBottom: 5}}>
              Test Information :
            </Text>
            <View>
              <Text>Test Title :</Text>
              <SharedInput
                name={'testTitle'}
                inputType="text"
                placeholder="Test Title"
              />
            </View>
            <View>
              <Text>Total Mark:</Text>
              <SharedInput
                name={'testTitle'}
                inputType="numeric"
                placeholder="Total mark"
              />
            </View>
            <Text style={{fontSize: 24}}>Question Upload :</Text>
            <View style={styles.questionTab}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  backgroundColor: AppColors.AppButtonBackground,
                  margin: 0,
                  borderRadius: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                <SvgIcon
                  name="plus"
                  width={20}
                  height={20}
                  strokeColor="white"
                />
                <Text style={{color: AppColors.AppTextColor, fontSize: 16}}>
                  Add Question
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '50%',
                  backgroundColor: AppColors.AppButtonBackground,
                  margin: 0,
                  borderRadius: 40,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                <SvgIcon
                  name="upload"
                  width={20}
                  height={20}
                  strokeColor="white"
                />
                <Text style={{color: AppColors.AppTextColor, fontSize: 16}}>
                  Upload Question
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.AppButtonBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forms: {
    marginBottom: 10,
  },
  questionTab: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderColor: AppColors.AppBorderColor,
    borderRadius: 40,
    backgroundColor: AppColors.AppBackground,
  },
});
export const AddJobPost = AddJobPostScreen;
