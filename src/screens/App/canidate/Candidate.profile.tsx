import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {AppColors} from '../../../constants/colors.config';
import SvgIcon from '../../../shared/Svg';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {persistor} from '../../../store/store';
import {useFormik} from 'formik';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  CandidateExperienceSchema,
  CandidateProfileDetailSchema,
  ProfilebioSchema,
} from '../../../validations/update.profile.schema';
import SharedInput from '../../../shared/input';
import SharedButton from '../../../shared/SharedButton';
import Popup from '../../../shared/popup';
import TextArea from '../../../shared/textArea';
import KeySkillsInput from '../../../shared/keySkillInput';
import {
  useGetCandidateDetailMutation,
  useUpdateCandidateExperinceMutation,
  useUpdateCandidateProfileBioMutation,
  useUpdateCandidateProfileDetailMutation,
  useUpdateCandidateSkillsMutation,
} from '../../../api/api';
import DatePickerComponent from '../../../shared/dateTimePicker';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';

// Chart Components
import SkillsChart from '../../../components/charts/SkillsChart';
import ExperienceChart from '../../../components/charts/ExperienceChart';
import EducationProgress from '../../../components/charts/EducationProgress';
import ResumeSummary from '../../../components/resume/ResumeSummary';
import ResumeActions from '../../../components/resume/ResumeActions';

const EditUploadComponents = ({onClose}) => {
  const {user} = useSelector((state: any) => state.app.data);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [request, response] = useUpdateCandidateProfileDetailMutation();
  const UpdateProfileFormik = useFormik({
    initialValues: {
      name: user?.name ?? '',
      headline: user?.headline ?? '',
      contact: user?.contact ?? '',
      email: user?.email ?? '',
      city: user?.city ?? '',
      state: user?.state ?? '',
    },
    validationSchema: CandidateProfileDetailSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('id', user?._id);
      formData.append('name', values.name);
      formData.append('city', values.city);
      formData.append('state', values.state);
      formData.append('headline', values.headline);
      formData.append('contact', values.contact);

      if (imageUri) {
        const filename = imageUri.split('/').pop() || `photo.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append('image', {
          uri: imageUri,
          name: filename,
          type: type,
        } as any);
      }
      console.log(formData, 'LPLP');

      request({id:user._id, data: formData});
    },
  });

  useEffect(() => {
    if (response?.isSuccess) {
      onClose();
    }
  }, [response?.isSuccess]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setImageUri(response.assets[0].uri || null);
        }
      },
    );
  };

  return (
    <View style={{minWidth:'100%'}}>
      <TouchableOpacity style={styles.squareBox} onPress={pickImage}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <SvgIcon
              name="upload"
              width={24}
              height={24}
              strokeColor={AppColors.headerBackground}
            />
            <Text style={styles.label}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={{marginTop: 10}}>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Name:</Text>
        <SharedInput
          inputType="default"
          name={'name'}
          value={UpdateProfileFormik.values.name}
          onChange={UpdateProfileFormik.handleChange('name')}
        />
      </View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Headline:</Text>
        <SharedInput
          inputType="default"
          name={'headline'}
          value={UpdateProfileFormik.values.headline}
          onChange={UpdateProfileFormik.handleChange('headline')}
        />
      </View>

      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Contact:</Text>
        <SharedInput
          inputType="default"
          name={'contact'}
          value={UpdateProfileFormik?.values.contact}
          onChange={UpdateProfileFormik.handleChange('contact')}
        />
      </View>

      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Email:</Text>
        <SharedInput
          inputType="default"
          name={'email'}
          value={UpdateProfileFormik?.values.email}
          onChange={UpdateProfileFormik.handleChange('email')}
        />
      </View>

      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>State:</Text>
        <SharedInput
          inputType="default"
          name={'state'}
          value={UpdateProfileFormik?.values.state}
          onChange={UpdateProfileFormik.handleChange('state')}
        />
      </View>

      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>city:</Text>
        <SharedInput
          inputType="default"
          name={'city'}
          value={UpdateProfileFormik?.values.city}
          onChange={UpdateProfileFormik.handleChange('city')}
        />
      </View>

      <View>
        <SharedButton
          onPress={UpdateProfileFormik.handleSubmit}
          title="Submit"
          isLoading={response?.isLoading}
        />
      </View>
    </View>
  );
};

const UpdateBio = ({onClose}) => {
  const {user, token} = useSelector((state: any) => state.app.data);
  const [request, response] = useUpdateCandidateProfileBioMutation();
  const UpdateBioFormik = useFormik({
    initialValues: {
      bio: user?.bio ?? '',
    },
    validationSchema: ProfilebioSchema,
    onSubmit: values => {
      request({
        id: user._id,
        bio: values.bio,
      });
    },
  });

  useEffect(() => {
    if (response?.isSuccess) {
      onClose();
    }
  }, [response?.isSuccess]);

  return (
    <View>
      <View>
        <TextArea
          onChangeText={UpdateBioFormik.handleChange('bio')}
          numberOfLines={5}
          value={UpdateBioFormik.values.bio}
          placeholder="Describe about you"
        />
      </View>
      <View>
        <SharedButton
          onPress={UpdateBioFormik.handleSubmit}
          title="Submit"
          isLoading={response?.isLoading}
        />
      </View>
    </View>
  );
};

const UpdateExpertise = ({onClose, user}) => {
  const [existingSkill, setExistingSkills] = useState<any[]>(
    user.educationDetails[0].keySkill ?? [],
  );
  const [request, response] = useUpdateCandidateSkillsMutation();

  const [skills, setSkills] = React.useState<any>(
    user.educationDetails[0].keySkill ?? [],
  );
  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
  };

  const handleSubmit = () => {
    const combinedSkills = Array.from(new Set([...existingSkill, ...skills]));
    const updatedEducationDetails = user.educationDetails.map((edu, index) => {
      if (index === 0) {
        return {
          ...edu,
          keySkill: combinedSkills,
        };
      }
      return edu;
    });
    request({
      id: user?._id,
      educationDetails: updatedEducationDetails,
    });
  };

  useEffect(() => {
    if (response?.isSuccess) {
      onClose();
    }
  }, [response?.isSuccess]);

  return (
    <View>
      <KeySkillsInput
        onSkillsChange={handleSkillsChange}
        style={{borderColor: 'gray'}}
      />
      <View style={{marginTop: 10}}>
        <SharedButton
          onPress={handleSubmit}
          title="Submit"
          isLoading={response?.isLoading}
        />
      </View>
    </View>
  );
};

const AddExperience = ({onClose, user}) => {
  const [existingExperience, setExistingExperience] = useState<any[]>(
    user.employmentDetails ?? [],
  );
  const [request, response] = useUpdateCandidateExperinceMutation();

  const UpdateExperienceFormik = useFormik({
    initialValues: {
      CompanyName: '',
      role: '',
      fromDate: '',
      toDate: '',
    },
    validationSchema: CandidateExperienceSchema,
    onSubmit: values => {
      const from = moment(values.fromDate);
      const to = moment(values.toDate);
      const months = to.diff(from, 'months', true);
      const years = months / 12;
      const experience = Number(years.toFixed(1));

      const newExperience = {
        CompanyName: values.CompanyName,
        role: values.role,
        fromDate: values.fromDate,
        toDate: values.toDate,
        experience: experience,
      };
      const updatedExperience = [...existingExperience, newExperience];
      request({
        id: user?._id,
        employmentDetails: updatedExperience,
      });
    },
  });

  const selectDateTime = (type: string, value: any) => {
    console.log(type, value);
    if (type == 'fromDate') {
      UpdateExperienceFormik.setFieldValue('fromDate', value);
    } else if (type == 'toDate') {
      UpdateExperienceFormik.setFieldValue('toDate', value);
    }
  };

  useEffect(() => {
    if (response?.isSuccess) {
      onClose();
    }
  }, [response?.isSuccess]);

  return (
    <View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Company Name:</Text>
        <SharedInput
          inputType="default"
          name={'CompanyName'}
          value={UpdateExperienceFormik?.values.CompanyName}
          onChange={UpdateExperienceFormik.handleChange('CompanyName')}
          placeholder="Company name"
        />
      </View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Role:</Text>
        <SharedInput
          inputType="default"
          name={'role'}
          value={UpdateExperienceFormik?.values.role}
          onChange={UpdateExperienceFormik.handleChange('role')}
          placeholder="Role"
        />
      </View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Start Date:</Text>
        <DatePickerComponent
          label="Pick a Date"
          mode="date"
          value={
            UpdateExperienceFormik.values.fromDate
              ? new Date(UpdateExperienceFormik.values.fromDate)
              : null
          }
          onChange={(val: Date) =>
            selectDateTime('fromDate', val.toISOString())
          }
          placeholder="Select Slot Date"
        />
      </View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>End Date:</Text>
        <DatePickerComponent
          label="Pick a Date"
          mode="date"
          value={
            UpdateExperienceFormik.values.toDate
              ? new Date(UpdateExperienceFormik.values.toDate)
              : null
          }
          onChange={(val: Date) => selectDateTime('toDate', val.toISOString())}
          placeholder="Select Slot Date"
        />
      </View>
      <View style={{marginTop: 10}}>
        <SharedButton
          onPress={UpdateExperienceFormik?.handleSubmit}
          title="Submit"
          isLoading={response?.isLoading}
          disabled={
            !UpdateExperienceFormik.isValid || !UpdateExperienceFormik.dirty
          }
        />
      </View>
    </View>
  );
};

export const CandidateProfile: React.FC = () => {
  const navigation = useNavigation<any>();
  const CandidateDetails = useSelector((state: any) => state.app.data);
  const [popupVisibleBio, setPopupVisibleBio] = useState(false);
  const [popupVisibleExpertise, setPopupVisibleExpertise] = useState(false);
  const [popupVisibleProfile, setPopupVisibleProfile] = useState(false);
  const [popupVisibleExperience, setPopupVisibleExperience] = useState(false);
  const [viewMode, setViewMode] = useState<'profile' | 'resume'>('resume');

  const [candidateRequest, candidateResponse] = useGetCandidateDetailMutation();
  const [id, setId] = useState(CandidateDetails?.user?._id);
  const [user, setUser] = useState<any>(null);
  const [readyToReload, SetreadyToReload] = useState(false);

  const Logout = async () => {
    await persistor.purge();
    navigation.navigate('singin');
  };

  const downloadResumeAsPDF = () => {
    Alert.alert(
      'Download Resume',
      'Resume download functionality will be implemented soon.',
      [{ text: 'OK' }]
    );
  };

  const shareProfile = () => {
    Alert.alert(
      'Share Profile',
      'Profile sharing functionality will be implemented soon.',
      [{ text: 'OK' }]
    );
  };

  const getAllSkills = () => {
    if (!user?.educationDetails || user.educationDetails.length === 0) {
      // Return dummy skills if no data
      return ['React Native', 'JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'Git', 'UI/UX Design'];
    }
    return user.educationDetails.reduce((skills: string[], edu: any) => {
      if (edu.keySkill) {
        return [...skills, ...edu.keySkill];
      }
      return skills;
    }, []);
  };

  const getDummyExperienceData = () => {
    if (user?.employmentDetails && user.employmentDetails.length > 0) {
      return user.employmentDetails;
    }
    // Return dummy experience data
    return [
      {
        CompanyName: 'Tech Solutions Inc',
        role: 'Frontend Developer',
        fromDate: '2022-01-01',
        toDate: '2024-06-01',
        experience: 2.5
      },
      {
        CompanyName: 'Digital Agency',
        role: 'Mobile Developer',
        fromDate: '2021-06-01',
        toDate: '2021-12-31',
        experience: 0.6
      },
      {
        CompanyName: 'StartupXYZ',
        role: 'Junior Developer',
        fromDate: '2020-08-01',
        toDate: '2021-05-31',
        experience: 0.8
      }
    ];
  };

  const getDummyEducationData = () => {
    if (user?.educationDetails && user.educationDetails.length > 0) {
      return user.educationDetails;
    }
    // Return dummy education data
    return [
      {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        year: '2020-05-01',
        grade: '85%',
        keySkill: ['Programming', 'Data Structures', 'Algorithms', 'Web Development']
      },
      {
        degree: '12th Grade',
        institution: 'Modern High School',
        year: '2016-05-01',
        grade: '92%',
        keySkill: ['Mathematics', 'Physics', 'Chemistry']
      }
    ];
  };

  useEffect(() => {
    if (id) {
      candidateRequest({id});
    }
  }, []);

  useEffect(() => {
    if (candidateResponse?.isSuccess) {
      setUser(candidateResponse?.data);
      console.log(candidateResponse?.data);
    }
  }, [candidateResponse]);

  useEffect(() => {
    if (
      readyToReload &&
      !popupVisibleBio &&
      !popupVisibleExpertise &&
      !popupVisibleProfile &&
      !popupVisibleExperience
    ) {
      candidateRequest({id});
    }
  }, [
    popupVisibleBio,
    popupVisibleExpertise,
    popupVisibleProfile,
    readyToReload,
    popupVisibleExperience,
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {candidateResponse.isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size={'large'}
            color={AppColors.headerBackground}
          />
          <Text style={styles.loadingText}>Loading your profile...</Text>
        </View>
      ) : (
        user && (
          <View style={styles.profileContainer}>
            {/* Header Section with Mode Toggle */}
            <Animatable.View animation="slideInDown" duration={600} style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
                  <SvgIcon name="power" strokeColor="red" width={16} height={16} />
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
                
                <View style={styles.modeToggle}>
                  <TouchableOpacity
                    style={[styles.modeButton, viewMode === 'resume' && styles.activeModeButton]}
                    onPress={() => setViewMode('resume')}
                  >
                    <Text style={[styles.modeButtonText, viewMode === 'resume' && styles.activeModeButtonText]}>
                      Resume
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modeButton, viewMode === 'profile' && styles.activeModeButton]}
                    onPress={() => setViewMode('profile')}
                  >
                    <Text style={[styles.modeButtonText, viewMode === 'profile' && styles.activeModeButtonText]}>
                      Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.profileHeaderContent}>
                <Image
                  source={
                    user?.profileImage
                      ? {uri: user.profileImage}
                      : require('../../../assets/images/person.jpg')
                  }
                  style={styles.profileImage}
                  resizeMode="cover"
                />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.position}>{user.headline ?? 'Professional'}</Text>

                {/* Contact Info - Compact */}
                <View style={styles.compactContactInfo}>
                  <View style={styles.contactChip}>
                    <SvgIcon name="email" strokeColor="#666" width={14} height={14} />
                    <Text style={styles.contactChipText}>{user.email}</Text>
                  </View>
                  <View style={styles.contactChip}>
                    <SvgIcon name="phone" strokeColor="#666" width={14} height={14} />
                    <Text style={styles.contactChipText}>{user.contact}</Text>
                  </View>
                  <View style={styles.contactChip}>
                    <SvgIcon name="location" strokeColor="#666" width={14} height={14} />
                    <Text style={styles.contactChipText}>{`${user.city}, ${user.state}`}</Text>
                  </View>
                </View>
              </View>
            </Animatable.View>

            {viewMode === 'resume' ? (
              // Resume View with Charts and Analytics
              <View style={styles.resumeView}>
                {/* Resume Actions */}
                <ResumeActions
                  onDownloadResume={downloadResumeAsPDF}
                  onShareResume={shareProfile}
                  onEditProfile={() => {
                    setPopupVisibleProfile(true);
                    SetreadyToReload(true);
                  }}
                  candidateName={user.name}
                />

                {/* Professional Summary */}
                <ResumeSummary 
                  user={{
                    ...user,
                    educationDetails: getDummyEducationData(),
                    employmentDetails: getDummyExperienceData()
                  }} 
                />

                {/* Skills Chart */}
                <SkillsChart skills={getAllSkills()} />

                {/* Experience Chart */}
                <ExperienceChart experiences={getDummyExperienceData()} />

                {/* Education Progress */}
                <EducationProgress educationDetails={getDummyEducationData()} />

                {/* Bio Section */}
                {user?.bio && (
                  <Animatable.View animation="fadeInUp" duration={800} style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Professional Summary</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setPopupVisibleBio(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="edit" strokeColor={AppColors.headerBackground} width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.bioText}>{user.bio}</Text>
                  </Animatable.View>
                )}

                {/* Add sections prompts for empty data */}
                {(!user.bio || getAllSkills().length === 0 || !user.employmentDetails || user.employmentDetails.length === 0) && (
                  <Animatable.View animation="pulse" iterationCount="infinite" duration={2000} style={styles.prompts}>
                    <Text style={styles.promptTitle}>Complete Your Resume</Text>
                    
                    {!user.bio && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleBio(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Professional Summary</Text>
                      </TouchableOpacity>
                    )}

                    {getAllSkills().length === 0 && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleExpertise(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Skills & Expertise</Text>
                      </TouchableOpacity>
                    )}

                    {(!user.employmentDetails || user.employmentDetails.length === 0) && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleExperience(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Work Experience</Text>
                      </TouchableOpacity>
                    )}
                  </Animatable.View>
                )}

                {/* Bio Section */}
                {user?.bio && (
                  <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Professional Summary</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setPopupVisibleBio(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="edit" strokeColor={AppColors.headerBackground} width={20} height={20} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.bioText}>{user.bio}</Text>
                  </View>
                )}

                {/* Add sections prompts for empty data */}
                {(!user.bio || getAllSkills().length === 0 || !user.employmentDetails || user.employmentDetails.length === 0) && (
                  <View style={styles.prompts}>
                    <Text style={styles.promptTitle}>Complete Your Resume</Text>
                    
                    {!user.bio && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleBio(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Professional Summary</Text>
                      </TouchableOpacity>
                    )}

                    {getAllSkills().length === 0 && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleExpertise(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Skills & Expertise</Text>
                      </TouchableOpacity>
                    )}

                    {(!user.employmentDetails || user.employmentDetails.length === 0) && (
                      <TouchableOpacity
                        style={styles.promptButton}
                        onPress={() => {
                          setPopupVisibleExperience(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="add" strokeColor={AppColors.AppButtonBackground} width={16} height={16} />
                        <Text style={styles.promptButtonText}>Add Work Experience</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            ) : (
              // Traditional Profile View
              <View style={styles.profileView}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setPopupVisibleProfile(true);
                    SetreadyToReload(true);
                  }}>
                  <SvgIcon name="edit" strokeColor="#fff" />
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>

                {/* Bio Section */}
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>About Me</Text>
                    {user?.bio && (
                      <TouchableOpacity
                        onPress={() => {
                          setPopupVisibleBio(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="edit" strokeColor={AppColors.headerBackground} width={20} height={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {user?.bio ? (
                    <Text style={styles.bioText}>{user.bio}</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setPopupVisibleBio(true);
                        SetreadyToReload(true);
                      }}>
                      <Text style={styles.addPromptText}>+ Add Your Bio</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Skills Section */}
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    {getAllSkills().length > 0 && (
                      <TouchableOpacity
                        onPress={() => {
                          setPopupVisibleExpertise(true);
                          SetreadyToReload(true);
                        }}>
                        <SvgIcon name="edit" strokeColor={AppColors.headerBackground} width={20} height={20} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.skillsContainer}>
                    {getAllSkills().length > 0 ? (
                      getAllSkills().map((skill, index) => (
                        <View key={index} style={styles.skillTag}>
                          <Text style={styles.skillText}>{skill}</Text>
                        </View>
                      ))
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setPopupVisibleExpertise(true);
                          SetreadyToReload(true);
                        }}>
                        <Text style={styles.addPromptText}>+ Add Expertise</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {/* Experience Section */}
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setPopupVisibleExperience(true);
                        SetreadyToReload(true);
                      }}>
                      <Text style={styles.addButtonText}>+ Add</Text>
                    </TouchableOpacity>
                  </View>
                  {user?.employmentDetails && user.employmentDetails?.length > 0 ? (
                    user.employmentDetails.map((job, index) => (
                      <View key={index} style={styles.jobCard}>
                        <Text style={styles.jobTitle}>{job.CompanyName}</Text>
                        <Text style={styles.jobRole}>{job.role}</Text>
                        <Text style={styles.applicantsText}>{job.experience} Years</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.emptyText}>Click add to add Experiences</Text>
                  )}
                </View>
              </View>
            )}
          </View>
        )
      )}
      <Popup
        visible={popupVisibleProfile}
        onClose={() => setPopupVisibleProfile(false)}
        title="Update Your Profile">
        <EditUploadComponents onClose={() => setPopupVisibleProfile(false)} />
      </Popup>

      <Popup
        visible={popupVisibleBio}
        onClose={() => setPopupVisibleBio(false)}
        title="Update Your Bio Data">
        <UpdateBio onClose={() => setPopupVisibleBio(false)} />
      </Popup>

      <Popup
        visible={popupVisibleExpertise}
        onClose={() => setPopupVisibleExpertise(false)}
        title="Update Your Key Skills">
        <UpdateExpertise
          onClose={() => setPopupVisibleExpertise(false)}
          user={user}
        />
      </Popup>

      <Popup
        visible={popupVisibleExperience}
        onClose={() => setPopupVisibleExperience(false)}
        title="Add Your Experience">
        <AddExperience
          onClose={() => setPopupVisibleExperience(false)}
          user={user}
        />
      </Popup>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  loadingContainer: {
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  profileContainer: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffebee',
    backgroundColor: '#ffebee',
  },
  logoutText: {
    color: 'red',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 2,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  activeModeButton: {
    backgroundColor: AppColors.AppButtonBackground,
  },
  modeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeModeButtonText: {
    color: '#fff',
  },
  profileHeaderContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: AppColors.AppBackground,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  position: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    fontWeight: '500',
  },
  compactContactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  contactChipText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#555',
  },
  resumeView: {
    paddingHorizontal: 15,
  },
  profileView: {
    paddingHorizontal: 15,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.AppButtonBackground,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  bioText: {
    lineHeight: 24,
    color: '#555',
    fontSize: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 4,
  },
  skillText: {
    color: AppColors.AppButtonBackground,
    fontSize: 13,
    fontWeight: '500',
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.AppButtonBackground,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  jobRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  applicantsText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  addPromptText: {
    color: AppColors.AppButtonBackground,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: AppColors.headerBackground,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: '500',
    color: AppColors.headerBackground,
    paddingVertical: 15,
  },
  prompts: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  promptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: AppColors.AppBackground,
  },
  promptButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: AppColors.AppButtonBackground,
    fontWeight: '500',
  },
  // Original styles for modals
  squareBox: {
    width: '100%',
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    margin: 'auto',
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  fileName: {
    marginTop: 6,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
