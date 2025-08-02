import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  TextInput,
  Button,
  RadioButton,
  Chip,
  Portal,
  Modal,
  List,
  Divider,
  ProgressBar,
  Surface,
  IconButton,
  Avatar,
  useTheme,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {DocumentPickerResponse} from 'react-native-document-picker';
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
import {Country, State, City} from 'country-state-city';
import SvgIcon from '../../../shared/Svg';
import {AppColors} from '../../../constants/colors.config';
import DocumentPicker from 'react-native-document-picker';

const {width} = Dimensions.get('window');

type UpdateProfileRouteParams = {
  id: string;
  stepper: string;
};

const experienceOptions = [
  {label: 'Fresher', value: 'fresher'},
  {label: '1 year', value: '1'},
  {label: '2 years', value: '2'},
  {label: '3 years', value: '3'},
  {label: '4 years', value: '4'},
  {label: '5 years', value: '5'},
  {label: '6 years', value: '6'},
  {label: '7 years', value: '7'},
  {label: '8 years', value: '8'},
  {label: '9 years', value: '9'},
  {label: '10+ years', value: '10'},
];

const UpdateProfileScreen: React.FC<{
  route: {params: UpdateProfileRouteParams};
}> = ({route}) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  // State variables
  const [skills, setSkills] = React.useState<string[]>([]);
  const [file, setFile] = React.useState<DocumentPickerResponse | null>(null);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [cities, setCities] = React.useState<any>([]);
  const [selectedState, setSelectedState] = React.useState('');
  const [States, setStates] = React.useState<any>([]);
  const [newSkill, setNewSkill] = React.useState('');

  // Modal states
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [datePickerMode, setDatePickerMode] = React.useState<
    'dob' | 'graduation' | 'startDate' | 'endDate'
  >('dob');
  const [showStateModal, setShowStateModal] = React.useState(false);
  const [showCityModal, setShowCityModal] = React.useState(false);
  const [showExperienceModal, setShowExperienceModal] = React.useState(false);

  const registrationData = useSelector((state: any) => state.app.data);

  // API mutations
  const [createBasicDetailRequest, createBasicDetailResponse] =
    useUpdateCandidateProfileMutation();
  const [createEducationDetailRequest, createEducationDetailResponse] =
    useUpdateCandidateProfileEducationMutation();
  const [createEmploymentDetailRequest, createEmploymentDetailResponse] =
    useUpdateCandidateProfileEmploymentMutation();

  const stepLabels = ['Basic Details', 'Education', 'Employment'];
  const indianStates = State.getStatesOfCountry('IN');

  // Initialize states
  React.useEffect(() => {
    const formattedStates = indianStates.map((state, index) => ({
      id: index + 1,
      value: state.isoCode,
      label: state.name,
    }));
    setStates(formattedStates);
  }, []);

  React.useEffect(() => {
    if (route?.params?.stepper) {
      setCurrentPosition(parseInt(route.params.stepper));
    }
  }, [route]);

  // Handlers
  const handleStateChange = (stateValue: string) => {
    const selectedStateFull = States.find(key => key.value === stateValue);
    if (!selectedStateFull) return;

    Basicformik.setFieldValue('state', selectedStateFull.label);
    setSelectedState(selectedStateFull.value);

    const citiesOfState = City.getCitiesOfState('IN', stateValue);
    const formattedCities = citiesOfState.map((city, index) => ({
      id: index + 1,
      value: city.name,
      label: city.name,
    }));
    setCities(formattedCities);
    setShowStateModal(false);
  };

  const handleCityChange = (city: string) => {
    const selectedCityFullName = cities.find(key => key.value === city)?.label;
    Basicformik.setFieldValue('city', selectedCityFullName);
    setShowCityModal(false);
  };

  const handleExperienceChange = (value: string) => {
    Basicformik.setFieldValue('employmentType', value);
    setShowExperienceModal(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      Educationformik.setFieldValue('educationDetails.keySkill', [
        ...skills,
        newSkill.trim(),
      ]);
      setSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleUploadPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(res[0]);
      Educationformik.setFieldValue('resume', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        console.error(err);
      }
    }
  };

  const openDatePicker = (
    mode: 'dob' | 'graduation' | 'startDate' | 'endDate',
  ) => {
    setDatePickerMode(mode);
    setShowDatePicker(true);
  };

  const handleDateConfirm = (date: Date) => {
    switch (datePickerMode) {
      case 'dob':
        Basicformik.setFieldValue('DOB', date.toISOString());
        break;
      case 'graduation':
        Educationformik.setFieldValue(
          'educationDetails.year',
          date.toISOString(),
        );
        break;
      case 'startDate':
        Employmentformik.setFieldValue(
          'employmentDetails.startDate',
          date.toISOString(),
        );
        break;
      case 'endDate':
        Employmentformik.setFieldValue(
          'employmentDetails.endDate',
          date.toISOString(),
        );
        break;
    }
    setShowDatePicker(false);
  };

  // Formik configurations
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
        city: values.city,
        headline: values.headline,
        state: values.state,
      });
    },
  });

  const Educationformik = useFormik({
    initialValues: EducationDetailsinitialValues,
    validationSchema: EducationDetailSchema,
    onSubmit: values => {
      const requestData = {
        educationDetails: {
          ...values.educationDetails,
          keySkill: skills,
        },
        id: route.params.id,
        stepper: 2,
      };

      createEducationDetailRequest(requestData);
      console.log('Request data:', requestData);
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
    console.log(Educationformik.values, 'Educationformik');
  }, [Educationformik]);

  // Effect hooks for API responses
  React.useEffect(() => {
    if (createBasicDetailResponse?.isSuccess) {
      setCurrentPosition(createBasicDetailResponse?.data?.stepper);
    } else if (createBasicDetailResponse?.isError) {
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
      // navigation.navigate('MainApp');
      setCurrentPosition(createBasicDetailResponse?.data?.stepper);
    } else if (createEducationDetailResponse?.isError) {
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
      navigation.navigate('singin');
    } else if (createEmploymentDetailResponse?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Employment Detail submit failed',
        text2: createEmploymentDetailResponse?.error?.data?.message,
      });
    }
  }, [createEmploymentDetailResponse]);

  // Step components
  const BasicDetails = () => (
    <Card style={styles.stepCard}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.stepTitle}>
          Basic Information
        </Text>
        <Text variant="bodyMedium" style={styles.stepSubtitle}>
          Tell us about yourself
        </Text>

        <TextInput
          label="Full Name"
          value={Basicformik.values.fullName}
          onChangeText={Basicformik.handleChange('fullName')}
          mode="outlined"
          style={styles.input}
          error={Basicformik.touched.fullName && !!Basicformik.errors.fullName}
        />

        <TextInput
          label="Profile Headline"
          value={Basicformik.values.headline}
          onChangeText={Basicformik.handleChange('headline')}
          mode="outlined"
          style={styles.input}
          placeholder="e.g., Software Engineer"
          error={Basicformik.touched.headline && !!Basicformik.errors.headline}
        />

        <TextInput
          label="Contact Number"
          value={Basicformik.values.contact}
          onChangeText={Basicformik.handleChange('contact')}
          mode="outlined"
          style={styles.input}
          keyboardType="phone-pad"
          error={Basicformik.touched.contact && !!Basicformik.errors.contact}
        />

        <Surface style={styles.datePickerSurface}>
          <Text variant="bodyMedium" style={styles.dateLabel}>
            Date of Birth
          </Text>
          <Button
            mode="outlined"
            onPress={() => openDatePicker('dob')}
            icon="calendar"
            style={styles.dateButton}>
            {Basicformik.values.DOB
              ? new Date(Basicformik.values.DOB).toLocaleDateString()
              : 'Select Date of Birth'}
          </Button>
        </Surface>

        <Surface style={styles.dropdownSurface}>
          <Text variant="bodyMedium" style={styles.dropdownLabel}>
            State
          </Text>
          <Button
            mode="outlined"
            onPress={() => setShowStateModal(true)}
            icon="map-marker"
            style={styles.dropdownButton}>
            {Basicformik.values.state || 'Select State'}
          </Button>
        </Surface>

        <Surface style={styles.dropdownSurface}>
          <Text variant="bodyMedium" style={styles.dropdownLabel}>
            City
          </Text>
          <Button
            mode="outlined"
            onPress={() => setShowCityModal(true)}
            icon="city"
            style={styles.dropdownButton}
            disabled={!selectedState}>
            {Basicformik.values.city || 'Select City'}
          </Button>
        </Surface>

        <Surface style={styles.radioSurface}>
          <Text variant="bodyMedium" style={styles.radioLabel}>
            Gender
          </Text>
          <RadioButton.Group
            onValueChange={value => Basicformik.setFieldValue('gender', value)}
            value={Basicformik.values.gender}>
            <View style={styles.radioRow}>
              <View style={styles.radioItem}>
                <RadioButton value="male" />
                <Text>Male</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="female" />
                <Text>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </Surface>

        <Surface style={styles.dropdownSurface}>
          <Text variant="bodyMedium" style={styles.dropdownLabel}>
            Experience
          </Text>
          <Button
            mode="outlined"
            onPress={() => setShowExperienceModal(true)}
            icon="briefcase"
            style={styles.dropdownButton}>
            {experienceOptions.find(
              opt => opt.value === Basicformik.values.employmentType,
            )?.label || 'Select Experience'}
          </Button>
        </Surface>

        <TextInput
          label="Address"
          value={Basicformik.values.address}
          onChangeText={Basicformik.handleChange('address')}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={3}
          error={Basicformik.touched.address && !!Basicformik.errors.address}
        />

        <Button
          mode="contained"
          onPress={Basicformik.handleSubmit}
          loading={createBasicDetailResponse?.isLoading}
          disabled={
            !Basicformik.isValid ||
            !Basicformik.dirty ||
            createBasicDetailResponse?.isLoading
          }
          style={styles.submitButton}>
          Continue
        </Button>
      </Card.Content>
    </Card>
  );

  const EducationDetails = () => (
    <Card style={styles.stepCard}>
      <Card.Content style={{elevation: 0}}>
        <Text variant="headlineSmall" style={styles.stepTitle}>
          Education Details
        </Text>
        <Text variant="bodyMedium" style={styles.stepSubtitle}>
          Share your educational background
        </Text>

        <TextInput
          label="Degree"
          value={Educationformik.values.educationDetails.degree}
          onChangeText={value =>
            Educationformik.setFieldValue('educationDetails.degree', value)
          }
          mode="outlined"
          style={styles.input}
          error={
            Educationformik.touched.educationDetails?.degree &&
            !!Educationformik.errors.educationDetails?.degree
          }
        />

        <TextInput
          label="Institution Name"
          value={Educationformik.values.educationDetails.institution}
          onChangeText={value =>
            Educationformik.setFieldValue('educationDetails.institution', value)
          }
          mode="outlined"
          style={styles.input}
          error={
            Educationformik.touched.educationDetails?.institution &&
            !!Educationformik.errors.educationDetails?.institution
          }
        />

        <TextInput
          label="Grade/Percentage"
          value={Educationformik.values.educationDetails.grade}
          onChangeText={value =>
            Educationformik.setFieldValue('educationDetails.grade', value)
          }
          mode="outlined"
          style={styles.input}
          error={
            Educationformik.touched.educationDetails?.grade &&
            !!Educationformik.errors.educationDetails?.grade
          }
        />

        <Surface style={styles.datePickerSurface}>
          <Text variant="bodyMedium" style={styles.dateLabel}>
            Year of Graduation
          </Text>
          <Button
            mode="outlined"
            onPress={() => openDatePicker('graduation')}
            style={styles.dateButton}>
            {Educationformik.values.educationDetails.year
              ? new Date(
                  Educationformik.values.educationDetails.year,
                ).getFullYear()
              : 'Select Year'}
            <SvgIcon
              name="calendor"
              width={20}
              height={20}
              strokeColor={AppColors.AppButtonBackground}
            />
          </Button>
        </Surface>

        <Surface style={styles.skillsSurface}>
          <Text variant="bodyMedium" style={styles.skillsLabel}>
            Key Skills
          </Text>
          <View style={styles.skillsInputRow}>
            <TextInput
              value={newSkill}
              onChangeText={setNewSkill}
              mode="outlined"
              style={styles.skillInput}
              placeholder="Add a skill"
              onSubmitEditing={addSkill}
            />
            <TouchableOpacity onPress={addSkill} style={styles.addSkillButton}>
              <Text
                style={{
                  color: AppColors.AppButtonBackground,
                  fontSize: 16,
                  fontWeight: 700,
                }}>
                + Add
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              // <Chip
              //   key={index}
              //   onClose={() => removeSkill(skill)}
              //   style={styles.skillChip}>
              //   {skill}
              // </Chip>
              <View style={styles.chipContainer}>
                <Text style={styles.chipText}>{skill}</Text>
                <TouchableOpacity
                  onPress={() => removeSkill(skill)}
                  style={styles.closeButton}>
                  <SvgIcon
                    name="close"
                    width={16}
                    height={16}
                    strokeColor="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Surface>

        <Surface style={styles.fileSurface}>
          <Text variant="bodyMedium" style={styles.fileLabel}>
            Resume (PDF)
          </Text>
          <Button
            mode="outlined"
            onPress={handleUploadPress}
            style={styles.fileButton}>
            <SvgIcon
              name="upload"
              width={22}
              height={22}
              strokeColor={AppColors.AppButtonBackground}
            />
            {'Upload Resume'}
          </Button>
          {file && (
            <Text variant="bodySmall" style={styles.fileInfo}>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Text>
          )}
        </Surface>

        <Button
          mode="contained"
          onPress={Educationformik.handleSubmit}
          loading={createEducationDetailResponse?.isLoading}
          disabled={
            !Educationformik.isValid ||
            !Educationformik.dirty ||
            createEducationDetailResponse?.isLoading
          }
          style={styles.submitButton}>
          Continue
        </Button>
      </Card.Content>
    </Card>
  );

  const EmploymentDetails = () => (
    <Card style={styles.stepCard}>
      <Card.Content>
        <Text variant="headlineSmall" style={styles.stepTitle}>
          Employment Details
        </Text>
        <Text variant="bodyMedium" style={styles.stepSubtitle}>
          Share your work experience
        </Text>

        <TextInput
          label="Company Name"
          value={Employmentformik.values.employmentDetails.company}
          onChangeText={value =>
            Employmentformik.setFieldValue('employmentDetails.company', value)
          }
          mode="outlined"
          style={styles.input}
          error={
            Employmentformik.touched.employmentDetails?.company &&
            !!Employmentformik.errors.employmentDetails?.company
          }
        />

        <TextInput
          label="Job Title"
          value={Employmentformik.values.employmentDetails.jobTitle}
          onChangeText={value =>
            Employmentformik.setFieldValue('employmentDetails.jobTitle', value)
          }
          mode="outlined"
          style={styles.input}
          error={
            Employmentformik.touched.employmentDetails?.jobTitle &&
            !!Employmentformik.errors.employmentDetails?.jobTitle
          }
        />

        <View style={styles.dateRow}>
          <Surface style={[styles.datePickerSurface, styles.halfWidth]}>
            <Text variant="bodyMedium" style={styles.dateLabel}>
              Start Date
            </Text>
            <Button
              mode="outlined"
              onPress={() => openDatePicker('startDate')}
              icon="calendar"
              style={styles.dateButton}>
              {Employmentformik.values.employmentDetails.startDate
                ? new Date(
                    Employmentformik.values.employmentDetails.startDate,
                  ).toLocaleDateString()
                : 'Start Date'}
            </Button>
          </Surface>

          <Surface style={[styles.datePickerSurface, styles.halfWidth]}>
            <Text variant="bodyMedium" style={styles.dateLabel}>
              End Date
            </Text>
            <Button
              mode="outlined"
              onPress={() => openDatePicker('endDate')}
              icon="calendar"
              style={styles.dateButton}>
              {Employmentformik.values.employmentDetails.endDate
                ? new Date(
                    Employmentformik.values.employmentDetails.endDate,
                  ).toLocaleDateString()
                : 'End Date'}
            </Button>
          </Surface>
        </View>

        <TextInput
          label="Responsibilities"
          value={Employmentformik.values.employmentDetails.responsibility}
          onChangeText={value =>
            Employmentformik.setFieldValue(
              'employmentDetails.responsibility',
              value,
            )
          }
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={4}
          error={
            Employmentformik.touched.employmentDetails?.responsibility &&
            !!Employmentformik.errors.employmentDetails?.responsibility
          }
        />

        <Button
          mode="contained"
          onPress={Employmentformik.handleSubmit}
          loading={createEmploymentDetailResponse?.isLoading}
          disabled={
            !Employmentformik.isValid ||
            !Employmentformik.dirty ||
            createEmploymentDetailResponse?.isLoading
          }
          style={styles.submitButton}>
          Complete Profile
        </Button>
      </Card.Content>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return BasicDetails();
      case 1:
        return EducationDetails();
      case 2:
        return EmploymentDetails();
      default:
        return BasicDetails();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        {/* <Appbar.BackAction /> */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingRight: 20}}>
          <SvgIcon
            name="back"
            width={30}
            height={30}
            strokeColor={AppColors.AppButtonBackground}
          />
        </TouchableOpacity>
        <Appbar.Content title="Update Profile" />
      </Appbar.Header>

      <Surface style={styles.progressContainer}>
        <Text variant="bodyMedium" style={styles.progressText}>
          Step {currentPosition + 1} of {stepLabels.length}:{' '}
          {stepLabels[currentPosition]}
        </Text>
        <ProgressBar
          progress={(currentPosition + 1) / stepLabels.length}
          style={styles.progressBar}
        />
      </Surface>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Modals */}
      <Portal>
        <Modal
          visible={showStateModal}
          onDismiss={() => setShowStateModal(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Select State
          </Text>
          <ScrollView style={styles.modalScrollView}>
            {States.map(state => (
              <List.Item
                key={state.id}
                title={state.label}
                onPress={() => handleStateChange(state.value)}
                style={styles.listItem}
              />
            ))}
          </ScrollView>
        </Modal>

        <Modal
          visible={showCityModal}
          onDismiss={() => setShowCityModal(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Select City
          </Text>
          <ScrollView style={styles.modalScrollView}>
            {cities.map(city => (
              <List.Item
                key={city.id}
                title={city.label}
                onPress={() => handleCityChange(city.value)}
                style={styles.listItem}
              />
            ))}
          </ScrollView>
        </Modal>

        <Modal
          visible={showExperienceModal}
          onDismiss={() => setShowExperienceModal(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Select Experience
          </Text>
          <ScrollView style={styles.modalScrollView}>
            {experienceOptions.map(option => (
              <List.Item
                key={option.value}
                title={option.label}
                onPress={() => handleExperienceChange(option.value)}
                style={styles.listItem}
              />
            ))}
          </ScrollView>
        </Modal>

        <DatePicker
          modal
          open={showDatePicker}
          date={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={() => setShowDatePicker(false)}
          mode="date"
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    elevation: 0,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    margin: 16,
    // borderRadius: 12,
  },
  progressText: {
    marginBottom: 8,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stepCard: {
    marginBottom: 100,
    // borderRadius: 10,
    elevation: 0,
  },
  stepTitle: {
    marginBottom: 8,
    fontWeight: '700',
  },
  stepSubtitle: {
    marginBottom: 24,
    // opacity: 0.7,
  },
  input: {
    marginBottom: 16,
  },
  datePickerSurface: {
    padding: 16,
    marginBottom: 16,
    // borderRadius: 12,
    // elevation: 1,
  },
  dateLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  dateButton: {
    justifyContent: 'flex-start',
  },
  dropdownSurface: {
    padding: 16,
    marginBottom: 16,
    // borderRadius: 12,
    // elevation: 1,
  },
  dropdownLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  dropdownButton: {
    justifyContent: 'flex-start',
  },
  radioSurface: {
    padding: 16,
    marginBottom: 16,
    // borderRadius: 12,
    // elevation: 1,
  },
  radioLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  skillsSurface: {
    padding: 16,
    marginBottom: 16,
    // borderRadius: 12,
    // elevation: 1,
  },
  skillsLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  skillsInputRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 1,
  },
  skillInput: {
    flex: 1,
    marginRight: 8,
  },
  addSkillButton: {
    margin: 0,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillChip: {
    margin: 4,
  },
  fileSurface: {
    padding: 16,
    marginBottom: 16,
    // borderRadius: 12,
    // elevation: 1,
  },
  fileLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  fileButton: {
    justifyContent: 'flex-start',
  },
  fileInfo: {
    marginTop: 8,
    // opacity: 0.7,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    // borderRadius: 16,
    maxHeight: '80%',
    // elevation: 5,
  },
  modalTitle: {
    padding: 20,
    paddingBottom: 10,
    fontWeight: '700',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  listItem: {
    paddingHorizontal: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 2,
  },
  chipText: {
    fontSize: 14,
    color: '#FFFF',
    marginRight: 6,
  },
  closeButton: {
    padding: 2,
  },
});

export const UpdateProfile = UpdateProfileScreen;
