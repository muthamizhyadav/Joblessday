import * as React from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {useSelector} from 'react-redux';
import {AppColors} from '../../constants/colors.config';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  applications: number;
  status: 'active' | 'closed';
}

interface Interview {
  id: number;
  candidateName: string;
  jobTitle: string;
  interviewTime: string;
  status: 'Confirmed' | 'Pending';
}

interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  availableSlots: number;
  duration: number;
}

const HomeScreen: React.FC = () => {
  const {user, tokens} = useSelector((state: any) => state.app.data);
  const navigation = useNavigation<any>();
  console.log(user, 'user');

  const stats = [
    {title: 'Jobs Posted Today', value: 12, icon: 'briefcase'},
    {title: 'Total Applications Today', value: 45, icon: 'file'},
    {title: 'Interviews Scheduled', value: 8, icon: 'clock'},
    {title: 'Applications Awaiting Review', value: 23, icon: 'email'},
  ];

  const slotCreationNavigation = () => {
    console.log('DD');
    navigation.navigate('Addpost');
  };

  const interviews: Interview[] = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior UX Designer',
      interviewTime: 'Today, 2:30 PM',
      status: 'Confirmed',
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Mobile Developer',
      interviewTime: 'Tomorrow, 10:00 AM',
      status: 'Pending',
    },
    {
      id: 3,
      candidateName: 'Emma Williams',
      jobTitle: 'Product Manager',
      interviewTime: 'Fri, 11:30 AM',
      status: 'Confirmed',
    },
  ];

  const renderStatusIndicator = (status: 'Confirmed' | 'Pending') => (
    <View
      style={[
        styles.statusIndicator,
        status === 'Confirmed' ? styles.statusConfirmed : styles.statusPending,
      ]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );

  const QuickStat = ({title, value, icon}) => (
    <View style={styles.statContainer}>
      <View style={styles.iconContainer}>
        <SvgIcon
          name={icon}
          width={30}
          height={30}
          strokeColor={AppColors.AppButtonBackground}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );
  const makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${8778010278}`;
    } else {
      phoneNumber = `telprompt:${8778010278}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <View style={styles.headerSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            paddingLeft: 10,
          }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 20, color: '#333', fontWeight: 600}}>
              Hi {user?.name}!
            </Text>
            <Text style={{fontSize: 14, color: '#666'}}>Good morning</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            paddingLeft: 10,
          }}>
          <View style={{position: 'relative'}}>
            <TouchableOpacity style={{paddingRight: 10}}>
              <SvgIcon
                name="bell"
                width={30}
                height={30}
                strokeColor={AppColors.AppButtonBackground}
              />
              <Text
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: 'red',
                  borderRadius: 50,
                  position: 'absolute',
                  top: 0,
                  right: 15,
                }}></Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.bannerSlot}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hello, Recruiter 👋</Text>
            {/* <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View> */}
          </View>

          <View style={styles.jobSummary}>
            {/* <View style={styles.summaryHeader}>
              <Text style={styles.jobTitle}>Open Job Slots: 3</Text>
              <SvgIcon name="clock" strokeColor="#fff" height={20} width={20} />
            </View>
            <Text style={styles.jobTime}>⏳ 10:00 AM – 5:00 PM </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '60%'}]} />
            </View> */}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <SvgIcon
                name="briefcase"
                width={20}
                height={20}
                strokeColor="#fff"
              />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Jobs Today</Text>
            </View>
            <View style={styles.statCard}>
              <SvgIcon
                name="candidate"
                width={20}
                height={20}
                strokeColor="#fff"
              />
              <Text style={styles.statNumber}>21</Text>
              <Text style={styles.statLabel}>Applicants</Text>
            </View>
            <View style={styles.statCard}>
              <SvgIcon
                name="calendor"
                width={20}
                height={20}
                strokeColor="#fff"
              />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Interviews</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={slotCreationNavigation}>
            <Text style={styles.createButtonText}> + Create New Job Slot</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.gridContainer}>
            {stats.map((stat, index) => (
              <QuickStat
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </View>
        </View>

        <View style={styles.container3}>
          <Text style={styles.sectionTitle3}>Upcoming Interviews</Text>
          <ScrollView>
            {interviews.map(interview => (
              <View key={interview.id} style={styles.interviewItem}>
                <View style={styles.leftContainer}>
                  <Text style={styles.candidateName}>
                    {interview.candidateName}
                  </Text>
                  <Text style={styles.jobTitle}>{interview.jobTitle}</Text>
                  <View style={styles.timeStatusContainer}>
                    <SvgIcon
                      name="clock"
                      width={20}
                      height={20}
                      strokeColor="gray"
                    />
                    <Text style={styles.interviewTime}>
                      {interview.interviewTime}
                    </Text>
                    {renderStatusIndicator(interview.status)}
                  </View>
                </View>

                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={makeCall}>
                    <SvgIcon
                      name="phone"
                      width={20}
                      height={20}
                      strokeColor={AppColors.AppButtonBackground}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    marginTop: 1,
    height: 60,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bannerSlot: {
    width: '95%',
    margin: 'auto',
    minHeight: 200,
    padding: 16,
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 10,
    marginTop: 10,
  },
  greeting: {
    color: AppColors.White,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  jobSummary: {
    marginBottom: 16,
  },
  jobTitle: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: '500',
  },
  jobTime: {
    color: AppColors.White,
    fontSize: 14,
    marginTop: 2,
    marginBottom: 4,
  },
  countdown: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    backgroundColor: '#ffffff20',
    padding: 10,
    borderRadius: 8,
    width: '30%',
    alignItems: 'center',
  },
  statNumber: {
    color: AppColors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: AppColors.White,
    fontSize: 12,
  },
  createButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  createButtonText: {
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  notificationBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00FFAA',
  },
  container2: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statContainer: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a2a2a',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },

  container3: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
    marginBottom: 80,
  },
  sectionTitle3: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  interviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  leftContainer: {
    flex: 1,
    marginRight: 12,
  },
  candidateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  jobTitle2: {
    fontSize: 14,
    color: '#666',
  },
  timeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  interviewTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  statusIndicator: {
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  statusConfirmed: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  callButton: {
    padding: 8,
    marginBottom: 8,
  },
  rescheduleButton: {
    borderWidth: 1,
    borderColor: AppColors.AppButtonBackground,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  rescheduleText: {
    color: AppColors.AppButtonBackground,
    fontSize: 12,
    fontWeight: '600',
  },
});

export const Home = HomeScreen;
