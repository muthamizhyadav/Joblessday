import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import SharedInput from '../../../shared/input';
import SharedButton from '../../../shared/SharedButton';
import RadioGroup from '../../../shared/radioGroup';
import CustomDropdown from '../../../shared/CustomDropdown';
import PDFUploader from '../../../shared/fileUpload';
import SvgIcon from '../../../shared/Svg';
import { FontFamily } from '../../../constants/fonts';
import { AppColors } from '../../../constants/colors.config';

type ExperienceLevel = 'internship' | 'fresher' | 'experienced';

interface BaseFormValues {
  name: string;
  contact: string;
  email: string;
  dateOfBirth: string;
  city: string;
  preferredLocation: string;
  linkedinUrl: string;
  githubUrl: string;
}

interface InternshipFormValues extends BaseFormValues {
  course: string;
  specialization: string;
  collegeInstitute: string;
  yearOfStudy: string;
  startYear: string;
  endYear: string;
  resume: any;
  internshipDuration: string;
  preferredWorkMode: string;
  areaOfInterest: string;
}

interface FresherFormValues extends BaseFormValues {
  keySkills: string;
  department: string;
  role: string;
  languagesKnown: string[];
}

interface ExperiencedFormValues extends FresherFormValues {
  currentSalary: string;
  companyName: string;
  designation: string;
  startDate: string;
  endDate: string;
}

type FormValues = BaseFormValues | InternshipFormValues | FresherFormValues | ExperiencedFormValues;

const EmploymentDetails: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { experienceLevel } = route.params || { experienceLevel: 'fresher' };
  
  const [gender, setGender] = useState('');
  const [graduateLevel, setGraduateLevel] = useState('');
  const [currentlyPursuing, setCurrentlyPursuing] = useState(false);
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [internshipDuration, setInternshipDuration] = useState('');
  const [preferredWorkMode, setPreferredWorkMode] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [resume, setResume] = useState<any>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const graduateOptions = [
    { label: '12th', value: '12th' },
    { label: 'Diploma', value: 'diploma' },
    { label: 'UG', value: 'undergraduate' },
    { label: 'PG', value: 'postgraduate' },
  ];

  const yearOfStudyOptions = [
    '1st Year',
    '2nd Year', 
    '3rd Year',
    '4th Year',
    'Final Year'
  ];

  const internshipDurationOptions = [
    { label: '1 Month', value: '1_month' },
    { label: '3 Months', value: '3_months' },
    { label: '6 Months', value: '6_months' }
  ];

  const workModeOptions = [
    { label: 'On-site', value: 'onsite' },
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' }
  ];

  const areaOfInterestOptions = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Cybersecurity',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Digital Marketing',
    'Business Analytics',
    'Project Management',
    'Quality Assurance',
    'Database Management',
    'Network Administration',
    'Game Development',
    'Blockchain',
    'IoT Development',
    'Other'
  ];

  const indianLanguages = [
    'English','Tamil', 'Malayalam', 'Telugu',  'Kannada', 'Hindi', 'Bengali','Marathi',  'Gujarati', 'Urdu',
     'Odia', 'Punjabi', 'Assamese', 'Maithili', 'Sanskrit',
    'Konkani', 'Nepali', 'Manipuri', 'Sindhi', 'Kashmiri', 'Santali', 'Dogri',
    'Bodo', 'Sinhala', 'Mizo', 'Khasi', 'Garo', 'Tripuri',
  ];

  const getInitialValues = (): any => {
    const baseValues = {
      name: '',
      contact: '',
      email: '',
      dateOfBirth: '',
      city: '',
      preferredLocation: '',
      linkedinUrl: '',
      githubUrl: '',
    };

    if (experienceLevel === 'internship') {
      return {
        ...baseValues,
        course: '',
        specialization: '',
        collegeInstitute: '',
        yearOfStudy: '',
        startYear: '',
        endYear: '',
        resume: null,
        internshipDuration: '',
        preferredWorkMode: '',
        areaOfInterest: '',
      };
    }

    if (experienceLevel === 'fresher') {
      return {
        ...baseValues,
        keySkills: '',
        department: '',
        role: '',
        languagesKnown: [],
      };
    }

    if (experienceLevel === 'experienced') {
      return {
        ...baseValues,
        keySkills: '',
        department: '',
        role: '',
        languagesKnown: [],
        currentSalary: '',
        companyName: '',
        designation: '',
        startDate: '',
        endDate: '',
      };
    }

    return baseValues;
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => {
      const updated = prev.includes(language) 
        ? prev.filter(lang => lang !== language)
        : [...prev, language];
      formik.setFieldValue('languagesKnown', updated);
      return updated;
    });
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: values => {
      const formData = {
        ...values,
        gender,
        experienceLevel,
        resume,
        ...(experienceLevel === 'internship' && {
          graduateLevel,
          currentlyPursuing,
          yearOfStudy,
          internshipDuration,
          preferredWorkMode,
          areaOfInterest,
        }),
      };
      console.log('Employment Details Submitted:', formData);
      // Handle form submission here
    },
  });

  const renderCommonFields = () => (
    <>
      <SharedInput
        placeholder="Full Name"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange('name')}
      />
      
      <SharedInput
        placeholder="Contact Number"
        containerStyle={styles.inputContainer}
        inputType="numeric"
        name="contact"
        value={formik.values.contact}
        onChange={formik.handleChange('contact')}
      />
      
      <SharedInput
        placeholder="Email Address"
        containerStyle={styles.inputContainer}
        inputType="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange('email')}
      />

      <SharedInput
        placeholder="Date of Birth (DD/MM/YYYY)"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="dateOfBirth"
        value={formik.values.dateOfBirth}
        onChange={formik.handleChange('dateOfBirth')}
      />

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Gender</Text>
        <RadioGroup
          options={genderOptions}
          selectedValue={gender}
          onValueChange={(value) => setGender(value as string)}
        />
      </View>

      <SharedInput
        placeholder="City"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange('city')}
      />
      
      <SharedInput
        placeholder="Preferred Location"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="preferredLocation"
        value={formik.values.preferredLocation}
        onChange={formik.handleChange('preferredLocation')}
      />

  // ...existing code...
    </>
  );

  const renderInternshipFields = () => (
    <>
      <Text style={styles.sectionTitle}>Education Details</Text>
      
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Graduate Level</Text>
        <RadioGroup
          options={graduateOptions}
          selectedValue={graduateLevel}
          onValueChange={(value) => setGraduateLevel(value as string)}
        />
      </View>

      <SharedInput
        placeholder="Course"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="course"
        value={formik.values.course}
        onChange={formik.handleChange('course')}
      />
      
      <SharedInput
        placeholder="Specialization"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="specialization"
        value={formik.values.specialization}
        onChange={formik.handleChange('specialization')}
      />

      <SharedInput
        placeholder="College / Institute Name"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="collegeInstitute"
        value={formik.values.collegeInstitute}
        onChange={formik.handleChange('collegeInstitute')}
      />

      <View style={styles.dropdownContainer}>
        <Text style={styles.radioLabel}>Year of Study</Text>
        <CustomDropdown
          label="Select Year of Study"
          value={yearOfStudy}
          options={yearOfStudyOptions}
          onSelect={setYearOfStudy}
        />
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setCurrentlyPursuing(!currentlyPursuing)}>
        <View style={[styles.checkbox, currentlyPursuing && styles.checkboxSelected]}>
          {currentlyPursuing && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>Currently pursuing final year</Text>
      </TouchableOpacity>

      <View style={styles.dateRow}>
        <SharedInput
          placeholder="Start Year"
          containerStyle={styles.halfWidthInput}
          inputType="numeric"
          name="startYear"
          value={formik.values.startYear}
          onChange={formik.handleChange('startYear')}
        />
        <SharedInput
          placeholder="End Year"
          containerStyle={styles.halfWidthInput}
          inputType="numeric"
          name="endYear"
          value={formik.values.endYear}
          onChange={formik.handleChange('endYear')}
        />
      </View>

      <Text style={styles.sectionTitle}>Internship Preferences</Text>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Internship Duration</Text>
        <RadioGroup
          options={internshipDurationOptions}
          selectedValue={internshipDuration}
          onValueChange={(value) => setInternshipDuration(value as string)}
        />
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Preferred Work Mode</Text>
        <RadioGroup
          options={workModeOptions}
          selectedValue={preferredWorkMode}
          onValueChange={(value) => setPreferredWorkMode(value as string)}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.radioLabel}>Area of Interest</Text>
        <CustomDropdown
          label="Select Area of Interest"
          value={areaOfInterest}
          options={areaOfInterestOptions}
          onSelect={setAreaOfInterest}
        />
      </View>

      <View style={styles.uploadContainer}>
        <Text style={styles.radioLabel}>Resume Upload</Text>
        <PDFUploader 
          onFileSelect={(file) => {
            setResume(file);
            formik.setFieldValue('resume', file);
          }}
          label={resume ? resume.name : "Upload Resume (PDF)"}
        />
        {resume && (
          <Text style={styles.fileName}>Selected: {resume.name}</Text>
        )}
      </View>
    </>
  );

  const renderFresherFields = () => (
    <>
      {/* Education Details Section */}
      <Text style={styles.sectionTitle}>Education Details</Text>
      <SharedInput
        placeholder="Course"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="course"
        value={formik.values.course}
        onChange={formik.handleChange('course')}
      />
      <SharedInput
        placeholder="Specialization"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="specialization"
        value={formik.values.specialization}
        onChange={formik.handleChange('specialization')}
      />
      <SharedInput
        placeholder="College/Institute"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="collegeInstitute"
        value={formik.values.collegeInstitute}
        onChange={formik.handleChange('collegeInstitute')}
      />
      <SharedInput
        placeholder="Completion Year of Study"
        containerStyle={styles.inputContainer}
        inputType="numeric"
        name="yearOfStudy"
        value={formik.values.yearOfStudy}
        onChange={formik.handleChange('yearOfStudy')}
      />
  // ...existing code...
      {/* Employment Detail Section */}
      <Text style={styles.sectionTitle}>Employment Detail</Text>
      <SharedInput
        placeholder="Key Skills"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="keySkills"
        value={formik.values.keySkills}
        onChange={formik.handleChange('keySkills')}
      />
      <SharedInput
        placeholder="Department"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange('department')}
      />
      <SharedInput
        placeholder="Role"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange('role')}
      />
      <View style={styles.languagesContainer}>
        <Text style={styles.radioLabel}>Languages Known</Text>
        <View style={styles.languageBatchContainer}>
          {indianLanguages.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageBatch,
                selectedLanguages.includes(language) && styles.selectedLanguageBatch
              ]}
              onPress={() => toggleLanguage(language)}
            >
              <Text style={[
                styles.languageBatchText,
                selectedLanguages.includes(language) && styles.selectedLanguageBatchText
              ]}>
                <Text style={{fontWeight: 'bold', marginRight: 8}}></Text>{language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <SharedInput
        placeholder="LinkedIn Profile URL"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="linkedinUrl"
        value={formik.values.linkedinUrl}
        onChange={formik.handleChange('linkedinUrl')}
      />
      <SharedInput
        placeholder="GitHub Profile URL"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="githubUrl"
        value={formik.values.githubUrl}
        onChange={formik.handleChange('githubUrl')}
      />

      {/* Resume Upload Section (moved to last) */}
      <View style={styles.uploadContainer}>
        <Text style={styles.radioLabel}>Resume Upload</Text>
        <PDFUploader 
          onFileSelect={(file) => {
            setResume(file);
            formik.setFieldValue('resume', file);
          }}
          label={resume ? resume.name : "Upload Resume (PDF)"}
        />
        {resume && (
          <Text style={styles.fileName}>Selected: {resume.name}</Text>
        )}
      </View>
    </>
  );


  type PrevCompany = {
    companyName: string;
    designation: string;
    startDate: string;
    endDate: string;
  };

  const [prevCompanies, setPrevCompanies] = useState<PrevCompany[]>([
    { companyName: '', designation: '', startDate: '', endDate: '' }
  ]);

  const handlePrevCompanyChange = (idx: number, field: keyof PrevCompany, value: string) => {
    setPrevCompanies(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const addPrevCompany = () => {
    setPrevCompanies(prev => ([...prev, { companyName: '', designation: '', startDate: '', endDate: '' }]));
  };

  const removePrevCompany = (idx: number) => {
    setPrevCompanies(prev => prev.filter((_, i) => i !== idx));
  };

  const renderExperiencedFields = () => (
    <>
      {/* Employment Detail Section (reuse fresher, add experienced fields) */}


      {/* Languages Known before Employment Detail title */}
      <View style={styles.languagesContainer}>
        <Text style={styles.radioLabel}>Languages Known</Text>
        <View style={styles.languageBatchContainer}>
          {indianLanguages.map((language) => (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageBatch,
                selectedLanguages.includes(language) && styles.selectedLanguageBatch
              ]}
              onPress={() => toggleLanguage(language)}
            >
              <Text style={[
                styles.languageBatchText,
                selectedLanguages.includes(language) && styles.selectedLanguageBatchText
              ]}>
                <Text style={{fontWeight: 'bold', marginRight: 8}}></Text>{language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Employment Detail</Text>

      <SharedInput
        placeholder="Key Skills"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="keySkills"
        value={formik.values.keySkills}
        onChange={formik.handleChange('keySkills')}
      />
      <SharedInput
        placeholder="Department"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange('department')}
      />
      <SharedInput
        placeholder="Role"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange('role')}
      />

      <SharedInput
        placeholder="Designation"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="designation"
        value={formik.values.designation}
        onChange={formik.handleChange('designation')}
      />
      <SharedInput
        placeholder="Current Salary"
        containerStyle={styles.inputContainer}
        inputType="numeric"
        name="currentSalary"
        value={formik.values.currentSalary}
        onChange={formik.handleChange('currentSalary')}
      />
      <SharedInput
        placeholder="Notice Period (in days)"
        containerStyle={styles.inputContainer}
        inputType="numeric"
        name="noticePeriod"
        value={formik.values.noticePeriod}
        onChange={formik.handleChange('noticePeriod')}
      />

      {/* Previous Company Details */}
      <Text style={styles.sectionTitle}>Previous Company Details</Text>
      {prevCompanies.map((company, idx) => (
        <View key={idx} style={{ marginBottom: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12 }}>
          <SharedInput
            placeholder="Company Name"
            containerStyle={styles.inputContainer}
            inputType="text"
            name={`prevCompanyName_${idx}`}
            value={company.companyName}
            onChange={(val: string) => handlePrevCompanyChange(idx, 'companyName', val)}
          />
          <SharedInput
            placeholder="Designation"
            containerStyle={styles.inputContainer}
            inputType="text"
            name={`prevDesignation_${idx}`}
            value={company.designation}
            onChange={(val: string) => handlePrevCompanyChange(idx, 'designation', val)}
          />
          <SharedInput
            placeholder="Start Date"
            containerStyle={styles.inputContainer}
            inputType="text"
            name={`prevStartDate_${idx}`}
            value={company.startDate}
            onChange={(val: string) => handlePrevCompanyChange(idx, 'startDate', val)}
          />
          <SharedInput
            placeholder="End Date"
            containerStyle={styles.inputContainer}
            inputType="text"
            name={`prevEndDate_${idx}`}
            value={company.endDate}
            onChange={(val: string) => handlePrevCompanyChange(idx, 'endDate', val)}
          />
          {prevCompanies.length > 1 && (
            <TouchableOpacity onPress={() => removePrevCompany(idx)} style={{ alignSelf: 'flex-end', marginTop: 4 }}>
              <Text style={{ color: 'red' }}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={addPrevCompany} style={{ alignSelf: 'flex-start', marginBottom: 16 }}>
        <Text style={{ color: AppColors.AppButtonBackground, fontWeight: 'bold' }}>+ Add Previous Company</Text>
      </TouchableOpacity>

      {/* LinkedIn, GitHub, Resume Upload at last */}
      <SharedInput
        placeholder="LinkedIn Profile URL"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="linkedinUrl"
        value={formik.values.linkedinUrl}
        onChange={formik.handleChange('linkedinUrl')}
      />
      <SharedInput
        placeholder="GitHub Profile URL"
        containerStyle={styles.inputContainer}
        inputType="text"
        name="githubUrl"
        value={formik.values.githubUrl}
        onChange={formik.handleChange('githubUrl')}
      />
      <View style={styles.uploadContainer}>
        <Text style={styles.radioLabel}>Resume Upload</Text>
        <PDFUploader 
          onFileSelect={(file) => {
            setResume(file);
            formik.setFieldValue('resume', file);
          }}
          label={resume ? resume.name : "Upload Resume (PDF)"}
        />
        {resume && (
          <Text style={styles.fileName}>Selected: {resume.name}</Text>
        )}
      </View>
    </>
  );

  const renderExperienceSpecificFields = () => {
    switch (experienceLevel) {
      case 'internship':
        return renderInternshipFields();
      case 'fresher':
        return renderFresherFields();
      case 'experienced':
        return renderExperiencedFields();
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (experienceLevel) {
      case 'internship':
        return 'Internship Profile';
      case 'fresher':
        return 'Fresher Profile';
      case 'experienced':
        return 'Experienced Profile';
      default:
        return 'Profile Details';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <SvgIcon name="back-arrow" height={24} width={24} color={AppColors.AppButtonBackground} />
        </TouchableOpacity>

        <Text style={styles.title}>{getTitle()}</Text>

        <View style={styles.formContainer}>
          {renderCommonFields()}
          {renderExperienceSpecificFields()}

          <SharedButton
            title="Save Details"
            onPress={formik.handleSubmit}
            disabled={!formik.values.name || !formik.values.email || !gender}
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
  scrollContainer: {
    paddingBottom: 30,
  },
  backButton: {
    marginTop: 50,
    marginLeft: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: AppColors.AppButtonBackground,
    fontFamily: FontFamily.Inter.Bold,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: FontFamily.Inter.Medium,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: AppColors.AppButtonBackground,
    fontFamily: FontFamily.Inter.Bold,
    marginTop: 20,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: AppColors.AppButtonBackground,
    borderColor: AppColors.AppButtonBackground,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#374151',
    fontFamily: FontFamily.Inter.Medium,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  halfWidthInput: {
    flex: 1,
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  uploadContainer: {
    marginBottom: 20,
  },
  fileName: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: FontFamily.Inter.Regular,
    marginTop: 8,
    fontStyle: 'italic',
  },
  languagesContainer: {
    marginBottom: 20,
  },
  languageBatchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  languageBatch: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
  },
  selectedLanguageBatch: {
    backgroundColor: AppColors.AppButtonBackground,
    borderColor: AppColors.AppButtonBackground,
  },
  languageBatchText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: FontFamily.Inter.Medium,
  },
  selectedLanguageBatchText: {
    color: '#FFFFFF',
  },
});

export default EmploymentDetails;
