import * as React from 'react';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native';
import {AppColors} from '../../../constants/colors.config';
import SvgIcon from '../../../shared/Svg';
import {ScrollView} from 'react-native-gesture-handler';
import {
  useApplicationActionMutation,
  useGetJobDetailMutation,
} from '../../../api/api';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export const JobdetailsScreen: React.FC = () => {
  const [getJobRequest, GetJobResponse] = useGetJobDetailMutation();
  const [jobDetail, setJobDetail] = React.useState<any>(null);
  const [applyJoobRequest, applyJoobResponse] = useApplicationActionMutation();
  const {user} = useSelector((state: any) => state.app.data);
  const route = useRoute<any>();
  const {id} = route.params;
  const navigation = useNavigation<any>();

  const job = {
    title: 'Senior React Native Developer',
    company: 'Tech Corp Inc.',
    location: 'New York, NY (Remote)',
    type: 'Full-time',
    description:
      'We are seeking an experienced React Native developer to lead our mobile team in building cutting-edge applications. You will be responsible for architecting and implementing new features, optimizing performance, and mentoring junior developers.',
    requirements: [
      '5+ years of React Native experience',
      'Proficient with Redux and Context API',
      'Experience with native iOS/Android development',
      'Strong understanding of REST APIs',
      'Familiarity with CI/CD pipelines',
    ],
    salary: '$120,000 - $150,000 per year',
    applicationInstructions:
      'Submit your resume and portfolio through our careers portal. Include "React Native Developer" in the subject line.',
    contactEmail: 'careers@techcorp.com',
    contactPhone: '+1 (555) 123-4567',
    applyLink: 'https://techcorp.com/careers',
    companyLogo: 'https://example.com/logo.png', // Replace with actual image URL
  };

  React.useEffect(() => {
    if (id) {
      getJobRequest({
        id,
      });
    }
  }, [id]);

  React.useEffect(() => {
    if (GetJobResponse?.isSuccess) {
      setJobDetail(GetJobResponse?.data[0]);
    }
  }, [GetJobResponse]);

  const applyJob = () => {
    applyJoobRequest({
      candidateId: user?._id,
      jobId: jobDetail?._id,
      recruiterId: jobDetail?.userId,
      status: 'applied',
    });
  };

  React.useEffect(() => {
    if (applyJoobResponse?.isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Applied successfully.',
      });
      navigation.navigate('MainApp', {
        screen: 'Job Posts',
      });
    }
  }, [applyJoobResponse]);

  const Section = ({title, content}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  return (
    <>
      {GetJobResponse?.isLoading ? (
        <ActivityIndicator size="large" color={AppColors.AppButtonBackground} />
      ) : (
        <View>
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
                  height: '100%',
                  marginTop: 10,
                }}>
                Job Details
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header Section */}
            <View style={styles.header1}>
              <Text style={styles.title}>{jobDetail?.designation ?? '--'}</Text>
              <Text style={styles.company}>
                {jobDetail?.Job?.employmentDetails[0]?.companyName}
              </Text>
              <Text
                style={
                  styles.location
                }>{`${jobDetail?.Job?.employmentDetails[0]?.city}, ${jobDetail?.Job?.employmentDetails[0]?.state}`}</Text>
            </View>

            {/* Company Info */}
            <View style={styles.companyContainer}>
              {/* <Image source={{uri: job.companyLogo}} style={styles.logo} /> */}
              <View style={styles.companyInfo}>
                <Text style={styles.companyName}>
                  {jobDetail?.Job?.employmentDetails[0]?.companyName}
                </Text>
                <Text style={styles.jobType}>{'Full-time'}</Text>
              </View>
            </View>

            {/* Job Details Sections */}
            <Section
              title="Job Description"
              content={
                jobDetail?.description?.length > 0
                  ? jobDetail?.description
                  : 'N/A'
              }
            />

            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {job.requirements?.map((req, index) => (
                <Text key={index} style={styles.listItem}>
                  • {req}
                </Text>
              ))}
            </View> */}

            <Section
              title="Salary Range"
              content={`₹${jobDetail?.salaryfrom} - ₹${jobDetail?.salaryto} Per month`}
            />

            <Section
              title="Experience"
              content={`${jobDetail?.experience} Years`}
            />

            <Section
              title="No of openings"
              content={`${jobDetail?.openings}`}
            />

            <Section
              title="How to Apply"
              content={`Click the "Apply Now" button to submit your application. Make sure your resume is uploaded to your profile before applying. Include "${jobDetail?.designation}" in your application subject.`}
            />

            {/* Contact Information */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recruiter Details</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${job.contactEmail}`)}>
                <Text style={styles.link}>Email: {job.contactEmail}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${job.contactPhone}`)}>
                <Text style={styles.link}>Phone: {job.contactPhone}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.applyButton} onPress={applyJob}>
            {applyJoobResponse?.isLoading ? (
              <ActivityIndicator size={'small'} color={'#FFFF'} />
            ) : (
              <Text style={styles.applyButtonText}>Apply Now</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  header1: {
    marginBottom: 20,
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
});
