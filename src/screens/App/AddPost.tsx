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

const AddJobPostScreen: React.FC = () => {
  const [data] = useState(Industries);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const steps = ['Post creation', 'Test creation'];
  const [currentStep, setCurrentStep] = useState<number>(0);
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
  };

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
            isLoading={false}
            disabled={!formik.isValid || !formik.dirty}
            onPress={() => formik.handleSubmit()}
          />
        </ScrollView>
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
});
export const AddJobPost = AddJobPostScreen;
