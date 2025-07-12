import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
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

      request({id:user._id, formData});
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
    <View>
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

  const [candidateRequest, candidateResponse] = useGetCandidateDetailMutation();
  const [id, setId] = useState(CandidateDetails?.user?._id);
  const [user, setUser] = useState<any>(null);
  const [readyToReload, SetreadyToReload] = useState(false);

  const Logout = async () => {
    await persistor.purge();
    navigation.navigate('singin');
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
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={{margin: 'auto'}}>
        {candidateResponse.isLoading ? (
          <View style={{height: '100%', marginTop: '100%'}}>
            <ActivityIndicator
              size={'large'}
              color={AppColors.headerBackground}
            />
          </View>
        ) : (
          user && (
            <View style={{marginBottom: 50}}>
              <View style={styles.header}>
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
                <Text style={styles.position}>{user.headline ?? 'N / A'}</Text>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setPopupVisibleProfile(true), SetreadyToReload(true);
                  }}>
                  <SvgIcon name="edit" strokeColor="#fff" />
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={{position: 'absolute', right: 10, top: 10}}>
                <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
                  <SvgIcon
                    name="power"
                    strokeColor="red"
                    width={14}
                    height={14}
                  />
                  <Text style={{color: 'red'}}>Logout</Text>
                </TouchableOpacity>
              </View>

              {/* Stats Section */}
              {/* <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {profileData.candidates}
                  </Text>
                  <Text style={styles.statLabel}>Applied</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {profileData.activeJobs}
                  </Text>
                  <Text style={styles.statLabel}>Response</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{profileData.hired}</Text>
                  <Text style={styles.statLabel}>Shortlisted</Text>
                </View>
              </View> */}

              {/* Contact Info */}
              <View style={styles.sectionContainer}>
                <View style={styles.contactItem}>
                  <SvgIcon name="email" strokeColor="#666" />
                  <Text style={styles.contactText}>{user.email ?? 'N/A'}</Text>
                </View>
                <View style={styles.contactItem}>
                  <SvgIcon name="phone" strokeColor="#666" />
                  <Text style={styles.contactText}>
                    {user.contact ?? 'N/A'}
                  </Text>
                </View>
                <View style={styles.contactItem}>
                  <SvgIcon name="location" strokeColor="#666" />
                  <Text
                    style={
                      styles.contactText
                    }>{`${user.city} , ${user.state}`}</Text>
                </View>
              </View>

              {/* Bio Section */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>About Me</Text>

                  {user?.bio && (
                    <TouchableOpacity
                      onPress={() => {
                        setPopupVisibleBio(true), SetreadyToReload(true);
                      }}>
                      <SvgIcon
                        name="edit"
                        strokeColor={AppColors.headerBackground}
                        width={20}
                        height={20}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {user?.bio ? (
                  <Text style={styles.bioText}>{user.bio}</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setPopupVisibleBio(true), SetreadyToReload(true);
                    }}>
                    <Text
                      style={{
                        color: AppColors.AppButtonBackground,
                        fontWeight: '500',
                        textAlign: 'center',
                        fontSize: 18,
                      }}>
                      + Add Your Bio
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Skills Section */}
              <View style={styles.sectionContainer}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  {user.educationDetails?.length > 0 &&
                  user.educationDetails?.[0].keySkill?.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setPopupVisibleExpertise(true), SetreadyToReload(true);
                      }}>
                      <SvgIcon
                        name="edit"
                        strokeColor={AppColors.headerBackground}
                        width={20}
                        height={20}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <View style={styles.skillsContainer}>
                  {user.educationDetails?.length > 0 &&
                  user.educationDetails?.[0].keySkill?.length > 0 ? (
                    user.educationDetails[0].keySkill.map((skill, index) => (
                      <View key={index} style={styles.skillTag}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))
                  ) : (
                    <TouchableOpacity
                      style={{margin: 'auto'}}
                      onPress={() => {
                        setPopupVisibleExpertise(true), SetreadyToReload(true);
                      }}>
                      <Text
                        style={{
                          color: AppColors.AppButtonBackground,
                          fontWeight: '500',
                          textAlign: 'center',
                          fontSize: 18,
                        }}>
                        + Add Expertise
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Active Jobs */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setPopupVisibleExperience(true), SetreadyToReload(true);
                    }}>
                    <Text
                      style={{
                        display: 'flex',
                        fontSize: 16,
                        color: AppColors.headerBackground,
                        fontWeight: '600',
                        flexDirection: 'row',
                        textAlign: 'center',
                      }}>
                      + Add
                    </Text>
                  </TouchableOpacity>
                </View>
                {user?.employmentDetails &&
                user.employmentDetails?.length > 0 ? (
                  user.employmentDetails.map(job => (
                    <TouchableOpacity key={job.id} style={styles.jobCard}>
                      <Text style={styles.jobTitle} key={job.fromDate}>
                        {job.CompanyName}
                      </Text>
                      <Text style={styles.applicantsText}>
                        {job.experience} Years
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '500',
                      color: AppColors.headerBackground,
                    }}>
                    Click add to add Experiences
                  </Text>
                )}
              </View>
            </View>
          )
        )}
      </View>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  position: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  company: {
    fontSize: 16,
    color: AppColors.AppButtonBackground,
    marginBottom: 15,
    fontWeight: 700,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.AppButtonBackground,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editSectionText: {
    color: AppColors.AppButtonBackground,
    fontWeight: '500',
    textDecorationLine: 'underline',
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
    lineHeight: 22,
    color: '#444',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillTag: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  skillText: {
    color: AppColors.AppButtonBackground,
    fontSize: 14,
  },
  jobCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  applicantsText: {
    color: '#666',
    fontSize: 14,
  },
  postJobButton: {
    backgroundColor: AppColors.AppButtonBackground,
    padding: 16,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 100,
  },
  postJobButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: 'red',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    borderRadius: 25,
  },
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
