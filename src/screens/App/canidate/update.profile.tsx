import * as React from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../../shared/Svg';
import {AppColors} from '../../../constants/colors.config';
import SharedInput from '../../../shared/input';
import DatePickerComponent from '../../../shared/dateTimePicker';
import RadioGroup from '../../../shared/radioGroup';
import TextArea from '../../../shared/textArea';
import KeySkillsInput from '../../../shared/keySkillInput';
import PDFUploader from '../../../shared/fileUpload';
import {DocumentPickerResponse} from 'react-native-document-picker';
import SharedButton from '../../../shared/SharedButton';
import StepIndicator from 'react-native-step-indicator';
import {customStyles} from '../../../constants/datas';
import {useFormik} from 'formik';
import {
  BasicDetailsInitValue,
  EducationDetailsinitialValues,
  EmployerDetailsinitialValues,
} from '../../../validations/update.profile.initial';
import {
  BasicDetailSchema,
  EducationDetailSchema,
  EmploymentDetailSchema,
} from '../../../validations/update.profile.schema';
import {useSelector} from 'react-redux';
import {
  useUpdateCandidateProfileEducationMutation,
  useUpdateCandidateProfileEmploymentMutation,
  useUpdateCandidateProfileMutation,
} from '../../../api/api';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

type UpdateProfileRouteParams = {
  id: string;
  stepper: string;
};

const UpdateProfileScreen: React.FC<{
  route: {params: UpdateProfileRouteParams};
}> = ({route}) => {
  const [skills, setSkills] = React.useState<any>([]);
  const [file, setFile] = React.useState<DocumentPickerResponse | null>(null);
  const registrationData = useSelector((state: any) => state.app.data);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [createBasicDetailRequest, createBasicDetailResponse] =
    useUpdateCandidateProfileMutation();
  const [createEducationDetailRequest, createEducationDetailResponse] =
    useUpdateCandidateProfileEducationMutation();
  const [createEmploymentDetailRequest, createEmploymentDetailResponse] =
    useUpdateCandidateProfileEmploymentMutation();
  const labels = ['Basic Details', 'Education', 'Employment'];
  const navigation = useNavigation<any>();

  const handleFileSelect = (selectedFile: DocumentPickerResponse) => {
    setFile(selectedFile);
  };

  console.log(route.params);

  React.useEffect(() => {
    if (route?.params?.stepper) {
      setCurrentPosition(route?.params?.stepper);
    }
  }, [route]);

  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
    console.log('Skills from child:', updatedSkills);
  };

  const Basicformik = useFormik({
    initialValues: BasicDetailsInitValue,
    validationSchema: BasicDetailSchema,
    onSubmit: values => {
      createBasicDetailRequest({
        stepper: 1,
        address: values.address,
        contact: values.contact,
        DOB: values.DOB,
        employmentType: values.employmentType,
        fullName: values.fullName,
        gender: values.gender,
        id: route.params.id,
      });
    },
  });

  const Educationformik = useFormik({
    initialValues: EducationDetailsinitialValues,
    validationSchema: EducationDetailSchema,
    onSubmit: values => {
      let data = [];
      data.push(values.educationDetails);
      createEducationDetailRequest({
        educationDetails: data,
        id: route.params.id,
        stepper: 2,
      });
    },
  });

  const Employmentformik = useFormik({
    initialValues: EmployerDetailsinitialValues,
    validationSchema: EmploymentDetailSchema,
    onSubmit: values => {
      let data = [];
      data.push(values.employmentDetails);
      createEmploymentDetailRequest({
        employmentDetails: data,
        id: route.params.id,
        stepper: 3,
      });
    },
  });

  React.useEffect(() => {
    Educationformik.setFieldValue('educationDetails.keySkill', skills);
  }, [skills]);

  React.useEffect(() => {
    if (createBasicDetailResponse?.isSuccess) {
      setCurrentPosition(createBasicDetailResponse?.data?.stepper);
    } else if (createBasicDetailResponse?.isError) {
      console.log(createBasicDetailResponse?.error, 'message');

      Toast.show({
        type: 'error',
        text1: 'Basic Detail submit failed',
        text2: createBasicDetailResponse?.error?.data?.message,
      });
    }
  }, [createBasicDetailResponse]);

  React.useEffect(() => {
    if (createEducationDetailResponse?.isSuccess) {
      setCurrentPosition(createEducationDetailResponse?.data?.stepper);
    } else if (createEducationDetailResponse?.isError) {
      console.log(createEducationDetailResponse?.error, 'message');
      Toast.show({
        type: 'error',
        text1: 'Education Detail submit failed',
        text2: createEducationDetailResponse?.error?.data?.message,
      });
    }
  }, [createEducationDetailResponse]);

  React.useEffect(() => {
    if (createEmploymentDetailResponse?.isSuccess) {
      setCurrentPosition(createEmploymentDetailResponse?.data?.stepper);
      navigation.navigate('MainApp');
    } else if (createEmploymentDetailResponse?.isError) {
      console.log(createEmploymentDetailResponse?.error, 'message');
      Toast.show({
        type: 'error',
        text1: 'Employment Detail submit failed',
        text2: createEmploymentDetailResponse?.error?.data?.message,
      });
    }
  }, [createEmploymentDetailResponse]);

  const BasicDetails = () => {
    return (
      <View style={styles.basicFormStyle}>
        <View>
          <SharedInput
            inputType="text"
            name={'fullName'}
            style={styles.input}
            placeholder="Enter Full Name"
            value={Basicformik.values.fullName}
            onChange={Basicformik.handleChange('fullName')}
          />
        </View>
        <View>
          <SharedInput
            inputType="numeric"
            name={'contact'}
            style={styles.input}
            placeholder="Enter Contact number"
            value={Basicformik.values.contact}
            onChange={Basicformik.handleChange('contact')}
          />
        </View>
        <View>
          <DatePickerComponent
            label="Pick a Date"
            mode="date"
            value={
              Basicformik.values.DOB ? new Date(Basicformik.values.DOB) : null
            }
            onChange={(val: Date) =>
              Basicformik.setFieldValue('DOB', val.toISOString())
            }
            placeholder="Select Date Of Birth"
          />
        </View>
        <View>
          <Text style={{fontSize: 14, fontWeight: '600', paddingLeft: 10}}>
            Select Gender:
          </Text>
          <RadioGroup
            label="Gender"
            selectedValue={Basicformik.values.gender}
            onValueChange={(val: any) =>
              Basicformik.setFieldValue('gender', val)
            }
            options={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
          />
        </View>
        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 14, fontWeight: '600', paddingLeft: 10}}>
            Are you a Fresher or Experienced?:
          </Text>
          <RadioGroup
            label="Emp Type"
            selectedValue={Basicformik.values.employmentType}
            onValueChange={(val: any) =>
              Basicformik.setFieldValue('employmentType', val)
            }
            options={[
              {label: 'Fresher', value: 'fresher'},
              {label: 'Experienced', value: 'experienced'},
            ]}
          />
        </View>
        <View>
          <TextArea
            label="Candidate Bio"
            value={Basicformik.values.address}
            onChangeText={(val: any) =>
              Basicformik.setFieldValue('address', val)
            }
            placeholder="Enter Your Address"
            style={{backgroundColor: 'white', borderColor: 'white'}}
          />
        </View>

        <SharedButton
          title="Submit"
          onPress={Basicformik.handleSubmit}
          disabled={
            !Basicformik.isValid ||
            !Basicformik.dirty ||
            createBasicDetailResponse?.isLoading
          }
          style={{marginBottom: 30}}
          isLoading={createBasicDetailResponse?.isLoading}
        />
      </View>
    );
  };

  const EducationDetails = () => {
    return (
      <View style={styles.basicFormStyle}>
        <View>
          <SharedInput
            inputType="text"
            name={'educationDetails.degree'}
            style={styles.input}
            placeholder="Enter Degree"
            value={Educationformik.values.educationDetails.degree}
            onChange={(e: string) =>
              Educationformik.setFieldValue('educationDetails.degree', e)
            }
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'educationDetails.institution'}
            style={styles.input}
            placeholder="Enter Institution Name"
            value={Educationformik.values.educationDetails.institution}
            onChange={(e: string) =>
              Educationformik.setFieldValue('educationDetails.institution', e)
            }
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'educationDetails.grade'}
            style={styles.input}
            placeholder="Enter Grade/Percentage"
            value={Educationformik.values.educationDetails.grade}
            onChange={(e: string) =>
              Educationformik.setFieldValue('educationDetails.grade', e)
            }
          />
        </View>
        <View>
          <DatePickerComponent
            label="Pick a Date"
            mode="date"
            placeholder="Year of passing"
            value={
              Educationformik.values.educationDetails.year
                ? new Date(Educationformik.values.educationDetails.year)
                : null
            }
            onChange={(val: Date) =>
              Educationformik.setFieldValue(
                'educationDetails.year',
                val.toISOString(),
              )
            }
          />
        </View>
        <View>
          <KeySkillsInput onSkillsChange={handleSkillsChange} />
        </View>
        <View style={{marginBottom: 20}}>
          <PDFUploader onFileSelect={handleFileSelect} label="Resume (.pdf)" />
          {file && (
            <Text style={{marginTop: 10}}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Text>
          )}
        </View>
        <SharedButton
          title="Submit"
          onPress={Educationformik.handleSubmit}
          disabled={
            !Educationformik.isValid ||
            !Educationformik.dirty ||
            createEducationDetailResponse?.isLoading
          }
          style={{marginBottom: 30}}
          isLoading={createEducationDetailResponse?.isLoading}
        />
      </View>
    );
  };

  const EmploymentDetails = () => {
    return (
      <View style={styles.basicFormStyle}>
        <View>
          <SharedInput
            inputType="text"
            name={'company'}
            style={styles.input}
            placeholder="Company Name"
            value={Employmentformik.values.employmentDetails.company}
            onChange={(e: string) =>
              Employmentformik.setFieldValue('employmentDetails.company', e)
            }
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'jobTitle'}
            style={styles.input}
            placeholder="Job Title"
            value={Employmentformik.values.employmentDetails.jobTitle}
            onChange={(e: string) =>
              Employmentformik.setFieldValue('employmentDetails.jobTitle', e)
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%'}}>
            <DatePickerComponent
              label="Pick a Date"
              mode="date"
              placeholder="Start Date"
              value={
                Employmentformik.values.employmentDetails.startDate
                  ? new Date(
                      Employmentformik.values.employmentDetails.startDate,
                    )
                  : null
              }
              onChange={(val: Date) =>
                Employmentformik.setFieldValue(
                  'employmentDetails.startDate',
                  val.toISOString(),
                )
              }
            />
          </View>
          <View style={{width: '48%'}}>
            <DatePickerComponent
              label="Pick a Date"
              mode="date"
              value={
                Employmentformik.values.employmentDetails.endDate
                  ? new Date(Employmentformik.values.employmentDetails.endDate)
                  : null
              }
              onChange={(val: Date) =>
                Employmentformik.setFieldValue(
                  'employmentDetails.endDate',
                  val.toISOString(),
                )
              }
              placeholder="End Date"
            />
          </View>
        </View>
        <View>
          <TextArea
            label="Candidate Bio"
            value={Employmentformik.values.employmentDetails.responsibility}
            onChangeText={(val: any) =>
              Employmentformik.setFieldValue(
                'employmentDetails.responsibility',
                val,
              )
            }
            placeholder="Responsibilities"
            style={{backgroundColor: 'white', borderColor: 'white'}}
          />
        </View>
        <SharedButton
          title="Submit"
          onPress={Employmentformik.handleSubmit}
          disabled={
            !Employmentformik.isValid ||
            !Employmentformik.dirty ||
            createEducationDetailResponse?.isLoading
          }
          style={{marginBottom: 30}}
          isLoading={createEducationDetailResponse?.isLoading}
        />
      </View>
    );
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return BasicDetails();
      case 1:
        return EducationDetails();
      case 2:
        return EmploymentDetails();
      default:
        return null;
    }
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
              strokeColor={AppColors.headerBackground}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 600,
              height: '100%',
              marginTop: 15,
            }}>
            Update your Profile
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              margin: 10,
              borderRadius: 5,
            }}></TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container1}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={labels.length}
            renderStepIndicator={({position, stepStatus}) => {
              switch (position) {
                case 0:
                  return (
                    <SvgIcon
                      name="profile"
                      strokeColor={
                        stepStatus === 'finished'
                          ? '#fff'
                          : AppColors.headerBackground
                      }
                      width={22}
                      height={22}
                    />
                  );
                case 1:
                  return (
                    <SvgIcon
                      name="education"
                      strokeColor={
                        stepStatus === 'finished'
                          ? '#fff'
                          : AppColors.headerBackground
                      }
                      width={22}
                      height={22}
                    />
                  );
                case 2:
                  return (
                    <SvgIcon
                      name="employment"
                      strokeColor={
                        stepStatus === 'finished'
                          ? '#fff'
                          : AppColors.headerBackground
                      }
                      width={22}
                      height={22}
                    />
                  );
                default:
                  return null;
              }
            }}
          />
          <View style={styles.content}>{renderStepContent()}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.AppBackground,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.headerBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  basicFormStyle: {
    width: '100%',
  },
  header1: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  company: {
    fontSize: 18,
    color: '#333',
    marginBottom: 3,
  },
  location: {
    fontSize: 16,
    color: '#666',
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 0,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '600',
  },
  jobType: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: '#444',
  },
  link: {
    color: '#2196F3',
    fontSize: 16,
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  applyButton: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    backgroundColor: AppColors.AppButtonBackground,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container1: {flex: 1},
  content: {marginTop: 50, alignItems: 'center'},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export const UpdateProfile = UpdateProfileScreen;
