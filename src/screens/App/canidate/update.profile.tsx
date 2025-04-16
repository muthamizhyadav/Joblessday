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

type UpdateProfileRouteParams = {
  id: string;
};

const UpdateProfileScreen: React.FC<{
  route: {params: UpdateProfileRouteParams};
}> = ({route}) => {
  const [skills, setSkills] = React.useState<any>([]);
  const [file, setFile] = React.useState<DocumentPickerResponse | null>(null);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const labels = ['Basic Details', 'Education', 'Employment'];

  const handleFileSelect = (selectedFile: DocumentPickerResponse) => {
    setFile(selectedFile);
  };
  function selectDateTime(arg0: string, arg1: string): void {
    throw new Error('Function not implemented.');
  }

  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
    console.log('Skills from child:', updatedSkills);
  };

  const BasicDetails = () => {
    return (
      <View style={styles.basicFormStyle}>
        <View>
          <SharedInput
            inputType="text"
            name={'fullName'}
            style={styles.input}
            placeholder="Enter Full Name"
          />
        </View>
        <View>
          <SharedInput
            inputType="numeric"
            name={'contact'}
            style={styles.input}
            placeholder="Enter Contact number"
          />
        </View>
        <View>
          <DatePickerComponent
            label="Pick a Date"
            mode="date"
            value={null}
            onChange={(val: Date) => selectDateTime('date', val.toISOString())}
            placeholder="Select Date Of Birth"
          />
        </View>
        <View>
          <Text style={{fontSize: 14, fontWeight: '600', paddingLeft: 10}}>
            Select Gender:
          </Text>
          <RadioGroup
            label="Gender"
            selectedValue={'male'}
            onValueChange={(val: any) => console.log(val)}
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
            label="Gender"
            selectedValue={'fresher'}
            onValueChange={(val: any) => console.log(val)}
            options={[
              {label: 'Fresher', value: 'fresher'},
              {label: 'Experienced', value: 'experienced'},
            ]}
          />
        </View>
        <View>
          <TextArea
            label="Candidate Bio"
            value={''}
            onChangeText={(val: any) => console.log(val)}
            placeholder="Enter Your Address"
            style={{backgroundColor: 'white', borderColor: 'white'}}
          />
        </View>

        <SharedButton
          title="Submit"
          onPress={() => console.log('asd')}
          disabled
          style={{marginBottom: 30}}
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
            name={'degree'}
            style={styles.input}
            placeholder="Enter Degree "
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'Institution'}
            style={styles.input}
            placeholder="Enter Institution Name"
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'grade'}
            style={styles.input}
            placeholder="Enter Grade/Percentage"
          />
        </View>
        <View>
          <DatePickerComponent
            label="Pick a Date"
            mode="date"
            value={null}
            onChange={(val: Date) => selectDateTime('date', val.toISOString())}
            placeholder="Year of passing"
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
          onPress={() => console.log('asd')}
          disabled
          style={{marginBottom: 30}}
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
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'jobTitle'}
            style={styles.input}
            placeholder="Job Title"
          />
        </View>
        <View>
          <SharedInput
            inputType="text"
            name={'grade'}
            style={styles.input}
            placeholder="Enter Grade/Percentage"
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
              value={null}
              onChange={(val: Date) =>
                selectDateTime('date', val.toISOString())
              }
              placeholder="Start Date"
            />
          </View>
          <View style={{width: '48%'}}>
            <DatePickerComponent
              label="Pick a Date"
              mode="date"
              value={null}
              onChange={(val: Date) =>
                selectDateTime('date', val.toISOString())
              }
              placeholder="End Date"
            />
          </View>
        </View>
        <View>
          <TextArea
            label="Candidate Bio"
            value={''}
            onChangeText={(val: any) => console.log(val)}
            placeholder="Responsibilities"
            style={{backgroundColor: 'white', borderColor: 'white'}}
          />
        </View>
        <SharedButton
          title="Submit"
          onPress={() => console.log('asd')}
          disabled
          style={{marginBottom: 30}}
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
