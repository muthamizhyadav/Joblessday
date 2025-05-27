import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {AppColors} from '../../constants/colors.config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {persistor} from '../../store/store';
import {useState} from 'react';
import Popup from '../../shared/popup';
import {launchImageLibrary} from 'react-native-image-picker';
import SharedInput from '../../shared/input';
import SharedButton from '../../shared/SharedButton';
import {useFormik} from 'formik';
import {
  ProfilebioSchema,
  ProfileDetailSchema,
} from '../../validations/update.profile.schema';
import TextArea from '../../shared/textArea';
import KeySkillsInput from '../../shared/keySkillInput';
import {useUpdateCandidateProfileDetailMutation} from '../../api/api';

const EditUploadComponents = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [request, response] = useUpdateCandidateProfileDetailMutation();
  
  const UpdateProfileFormik = useFormik({
    initialValues: {
      name: user?.name ?? '',
      recruiterDesignation:
        user?.employmentDetails?.[0]?.recruiterDesignation ?? '',
      companyName: user?.employmentDetails?.[0]?.companyName ?? '',
      contact: user?.contact ?? '',
      email: user?.email ?? '',
      city: user?.employmentDetails?.[0]?.city ?? '',
      state: user?.employmentDetails?.[0]?.state ?? '',
    },
    validationSchema: ProfileDetailSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('id', user?._id);
      formData.append('name', values.name);
      formData.append('recruiterDesignation', values.recruiterDesignation);
      formData.append('companyName', values.companyName);
      formData.append('contact', values.contact);
      formData.append('email', values.email);
      formData.append('city', values.city);
      formData.append('state', values.state);

      if (imageUri) {
        const filename = imageUri.split('/').pop() || `photo.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        formData.append('image', {
          uri: imageUri,
          name: filename,
          type,
        } as any);
      }
      request({id: user?._id, formData});
    },
  });
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
  1;

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
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Designation:</Text>

        <SharedInput
          inputType="default"
          name={'recruiterDesignation'}
          value={UpdateProfileFormik.values.recruiterDesignation}
          onChange={UpdateProfileFormik.handleChange('recruiterDesignation')}
        />
      </View>
      <View>
        <Text style={{paddingLeft: 5, color: '#6b7280'}}>Company:</Text>
        <SharedInput
          inputType="default"
          name={'companyName'}
          value={UpdateProfileFormik?.values.companyName}
          onChange={UpdateProfileFormik.handleChange('companyName')}
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
          isLoading={response?.isLoading}
          title="Submit"
        />
      </View>
    </View>
  );
};

const UpdateBio = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const UpdateBioFormik = useFormik({
    initialValues: {
      bio: user?.bio ?? '',
    },
    validationSchema: ProfilebioSchema,
    onSubmit: values => {
      console.log(values);
    },
  });
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
        <SharedButton onPress={UpdateBioFormik.handleSubmit} title="Submit" />
      </View>
    </View>
  );
};

const UpdateExpertise = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const [skills, setSkills] = React.useState<any>([]);
  const handleSkillsChange = (updatedSkills: string[]) => {
    setSkills(updatedSkills);
  };

  return (
    <View>
      <KeySkillsInput
        onSkillsChange={handleSkillsChange}
        style={{borderColor: 'gray'}}
      />
      <View style={{marginTop: 10}}>
        <SharedButton onPress={() => console.log('CLICKED')} title="Submit" />
      </View>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const [popupVisibleProfile, setPopupVisibleProfile] = useState(false);
  const [popupVisibleBio, setPopupVisibleBio] = useState(false);
  const [popupVisibleExpertise, setPopupVisibleExpertise] = useState(false);

  const profileData = {
    name: 'Sarah Johnson',
    position: 'Senior Talent Acquisition Specialist',
    company: 'Tech Corp Inc.',
    candidates: 245,
    activeJobs: 18,
    hired: 132,
    email: 'sarah.j@techcorp.com',
    phone: '+1 555-123-4567',
    location: 'New York, USA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    bio: 'Experienced technical recruiter specializing in software engineering roles. Passionate about connecting top talent with innovative companies.',
    skills: [
      'Tech Recruitment',
      'Candidate Sourcing',
      'Interview Coaching',
      'HR Analytics',
      'Talent Management',
    ],
  };
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const Logout = async () => {
    await persistor.purge();
    navigation.navigate('singin');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
        </Text>
        <Text style={styles.position}>
          {user?.employmentDetails?.[0]?.recruiterDesignation
            ? user.employmentDetails[0].recruiterDesignation
                .charAt(0)
                .toUpperCase() +
              user.employmentDetails[0].recruiterDesignation.slice(1)
            : ''}
        </Text>
        <Text style={styles.company}>
          {user?.employmentDetails?.[0]?.companyName
            ? user.employmentDetails[0].companyName.charAt(0).toUpperCase() +
              user.employmentDetails[0].companyName.slice(1)
            : ''}
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setPopupVisibleProfile(true)}>
          <SvgIcon name="edit" strokeColor="#fff" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', right: 10, top: 10}}>
        <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
          <SvgIcon name="power" strokeColor="red" width={14} height={14} />
          <Text style={{color: 'red'}}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.candidates}</Text>
          <Text style={styles.statLabel}>Candidates</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.activeJobs}</Text>
          <Text style={styles.statLabel}>Active Jobs</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profileData.hired}</Text>
          <Text style={styles.statLabel}>Hired</Text>
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.sectionContainer}>
        <View style={styles.contactItem}>
          <SvgIcon name="email" strokeColor="#666" />
          <Text style={styles.contactText}>{user.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <SvgIcon name="phone" strokeColor="#666" />
          <Text style={styles.contactText}>
            {user.contact ? user.contact : 'N/A'}
          </Text>
        </View>
        <View style={styles.contactItem}>
          <SvgIcon name="location" strokeColor="#666" />
          <Text style={styles.contactText}>
            {`${user?.employmentDetails?.[0]?.city} , ${user?.employmentDetails?.[0]?.state}`}
          </Text>
        </View>
        {/* <View style={styles.contactItem}>
          <SvgIcon name="link" strokeColor="#666" />
          <Text style={styles.contactText}>{profileData.linkedin}</Text>
        </View> */}
      </View>

      {/* Bio Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About Me</Text>

          <TouchableOpacity onPress={() => setPopupVisibleBio(true)}>
            <Text style={styles.editSectionText}>{`${
              user?.bio ? 'Edit Bio' : ''
            }`}</Text>
          </TouchableOpacity>
        </View>
        {user?.bio ? (
          <Text style={styles.bioText}>{user.bio}</Text>
        ) : (
          <TouchableOpacity onPress={() => setPopupVisibleBio(true)}>
            <Text
              style={{
                color: AppColors.AppButtonBackground,
                fontWeight: '500',
                textAlign: 'center',
                fontSize: 18,
              }}>
              + Add Bio
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Skills Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Areas of Expertise</Text>
        <View style={styles.skillsContainer}>
          {user.expertise && user.expertise.length > 0 ? (
            user.expertise.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))
          ) : (
            <TouchableOpacity
              style={{margin: 'auto'}}
              onPress={() => setPopupVisibleExpertise(true)}>
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

      <Popup
        visible={popupVisibleProfile}
        onClose={() => setPopupVisibleProfile(false)}
        title="Update Your Profile">
        <EditUploadComponents />
      </Popup>

      <Popup
        visible={popupVisibleBio}
        onClose={() => setPopupVisibleBio(false)}
        title="Update Your Bio Data">
        <UpdateBio />
      </Popup>

      <Popup
        visible={popupVisibleExpertise}
        onClose={() => setPopupVisibleExpertise(false)}
        title="Update Your Bio Data">
        <UpdateExpertise />
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

export const Profile = ProfileScreen;
