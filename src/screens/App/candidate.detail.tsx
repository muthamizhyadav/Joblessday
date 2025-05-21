import * as React from 'react';
import {Text} from 'react-native';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useApplicationActionMutation,
  useGetCandidateDetailMutation,
} from '../../api/api';
import {AppColors} from '../../constants/colors.config';
import SvgIcon from '../../shared/Svg';
import {ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

export const CandidatedetailsScreen: React.FC = () => {
  const [candidateRequest, candidateResponse] = useGetCandidateDetailMutation();
  const [applicationActionRequest, applicationActionResponse] =
    useApplicationActionMutation();
  const [candidateDetail, setCandidateDetail] = React.useState<any>(null);
  const route = useRoute<any>();
  const {id, status, jobId, recruiterId} = route.params;
  const navigation = useNavigation<any>();
  console.log(status);

  React.useEffect(() => {
    if (id) {
      candidateRequest({
        id,
      });
    }
  }, [id]);

  React.useEffect(() => {
    if (candidateResponse?.isSuccess) {
      setCandidateDetail(candidateResponse?.data);
    }
  }, [candidateResponse]);

  const Section = ({title, content}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );

  const getGenderIcon = gender => {
    const normalizedGender = gender?.toLowerCase();
    switch (normalizedGender) {
      case 'male':
        return '♂️ Male';
      case 'female':
        return '♀️ Femail';
      case 'transgender':
        return '⚧️';
      default:
        return '👤';
    }
  };

  const ShortlistORReject = (status: string) => {
    applicationActionRequest({
      status: status,
      candidateId: id,
      recruiterId: recruiterId,
      jobId: jobId,
    });
  };

  React.useEffect(() => {
    if (applicationActionResponse?.isSuccess) {
      navigation.navigate('MainApp', {
        screen: 'candidates',
      });
    }
  }, [applicationActionResponse]);

  return (
    <>
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
              Candidate Details
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

        {candidateResponse?.isLoading ? (
          <ActivityIndicator
            size="large"
            color={AppColors.AppButtonBackground}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.names}>{candidateDetail?.name || '--'}</Text>
              <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📧</Text>
                  <Text style={styles.detailText}>
                    {candidateDetail?.email || 'Email not provided'}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📍</Text>
                  <Text style={styles.detailText}>
                    {candidateDetail?.city || 'Location not specified'}
                  </Text>
                </View>
              </View>
            </View>

            <Section
              title="Contact"
              content={`📞  +91 ${candidateDetail?.contact}`}
            />

            <Section
              title="Gender"
              content={getGenderIcon(candidateDetail?.gender)}
            />

            <Section
              title="Experience"
              content={`💼 ${
                candidateDetail?.employmentType !== 'fresher'
                  ? `${candidateDetail?.employmentType} Years`
                  : candidateDetail?.employmentType
              }`}
            />
            <Section
              title="Location"
              content={`📍  ${candidateDetail?.city},${candidateDetail?.state}`}
            />
            <Section
              title="Education"
              content={`🎓  ${
                candidateDetail?.educationDetails[0]?.degree
              } - ${moment(candidateDetail?.educationDetails[0]?.year).year()}`}
            />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {candidateDetail?.educationDetails[0]?.keySkill.map(
                  (item, index) => (
                    <View key={index} style={styles.skillPill}>
                      <Text style={styles.skillText}>{item}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
            <View style={styles.applyButton}>
              {status === 'applied' ? (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.shortlistButton}
                    onPress={() => ShortlistORReject('shortlisted')}>
                    {applicationActionResponse?.originalArgs?.status ==
                      'shortlisted' && applicationActionResponse?.isLoading ? (
                      <>
                        <ActivityIndicator size={'small'} color={'#FFFF'} />
                      </>
                    ) : (
                      <Text style={styles.buttonText}>Shortlist</Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => ShortlistORReject('rejected')}>
                    {applicationActionResponse?.originalArgs?.status ==
                      'rejected' && applicationActionResponse?.isLoading ? (
                      <>
                        <ActivityIndicator size={'small'} color={'#FFFF'} />
                      </>
                    ) : (
                      <Text style={styles.buttonText}>Reject</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={
                    status == 'shortlisted'
                      ? styles.shortlistedButton
                      : styles.rejectedButton
                  }>
                  <Text
                    style={
                      status == 'shortlisted'
                        ? styles.shortlistedButtonText
                        : styles.rejectedButtonText
                    }>
                   {`${status === 'rejected' ? '❌' : '✔'} ${status}`}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
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
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillPill: {
    backgroundColor: '#e0f2ff',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 14,
    color: '#0077b6',
    fontWeight: '500',
  },
  headerContainer: {
    backgroundColor: '#FFFF',
    padding: 20,
    borderRadius: 12,
    margin: 0,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 0,
  },
  names: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  detailContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailIcon: {
    fontSize: 16,
    color: '#636e72',
  },
  detailText: {
    fontSize: 16,
    color: '#636e72',
    flexShrink: 1,
  },
  applyButton: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    //   backgroundColor: AppColors.AppButtonBackground,
    padding: 0,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 0,
  },
  shortlistedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 0,
    borderWidth: 1,
    borderColor: 'green',
  },
  rejectedButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 0,
    borderWidth: 1,
    borderColor: 'red',
  },
  shortlistedButtonText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rejectedButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
    gap: 10,
  },

  shortlistButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%', // exactly half width
  },

  rejectButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '50%', // exactly half width
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
