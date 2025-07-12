import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import SvgIcon from '../../../shared/Svg';
import {useSelector} from 'react-redux';
import {AppColors} from '../../../constants/colors.config';
import {FeaturedJobListings} from '../../../components/candidates/featuredJoblisting';
import SkeletonLoader from '../../../shared/SkeletonLoader';

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  applications: number;
  status: 'active' | 'closed';
}

export const CandidateDashboard: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const {user, tokens} = useSelector((state: any) => state.app.data);
  console.log(tokens, 'user');
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const endTime = new Date();
      endTime.setHours(12, 0, 0, 0); // Set to 12 PM

      if (now > endTime) {
        return '00:00:00';
      }

      const difference = endTime - now;
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0',
      )}:${String(seconds).padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {title: 'Applied jobs', value: 12, icon: 'briefcase'},
    {title: 'Slot Purchased', value: 45, icon: 'slot'},
    {title: 'Interviews Scheduled', value: 8, icon: 'clock'},
    {title: 'Responses', value: 23, icon: 'email'},
  ];

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

  const renderStatusIndicator = (status: 'Scheduled' | 'Pending') => (
    <View
      style={[
        styles.statusIndicator,
        status === 'Scheduled' ? styles.statusConfirmed : styles.statusPending,
      ]}>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );

  const interviews: Interview[] = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior UX Designer',
      interviewTime: 'Today, 2:30 PM',
      status: 'Scheduled',
    },
    {
      id: 3,
      candidateName: 'Emma Williams',
      jobTitle: 'Product Manager',
      interviewTime: 'Fri, 11:30 AM',
      status: 'Scheduled',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            paddingLeft: 10,
          }}>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 20, color: '#333', fontWeight: 600}}>
              Hi {user?.name}!
            </Text>
            <Text style={{fontSize: 14, color: '#666'}}>
              Find your dream job today
            </Text>
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
          <TouchableOpacity
            style={{
              padding: 8,
              marginRight: 5,
              borderRadius: 25,
              backgroundColor: '#e5e7eb',
              position: 'relative',
            }}>
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
                top: 10,
                right: 10,
              }}></Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/young-bearded-hindu-student-with-backpack-pastel-wall_496169-1524.jpg?t=st=1744202385~exp=1744205985~hmac=9047885fb434d93b49641aa56eaecace95751b91757723c6bd347df62384b564&w=996',
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 25,
              overflow: 'hidden',
              marginRight: 10,
            }}
          />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <Text style={styles.walletTitle}>💼 My Wallet</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>＋ Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletBalanceContainer}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>₹ 2,500</Text>
        </View>
      </View>
      {/* <SkeletonLoader width={'90%'} height={100} rows={1} columns={1} /> */}

      {/* <FeaturedJobListings isLoggedIn={true} /> */}

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
          {/* <SkeletonLoader width={'48%'} height={100} rows={2} columns={2} /> */}
        </View>
      </View>

      <View style={styles.container3}>
        <Text style={styles.sectionTitle3}>Scheduled Upcomming Interviews</Text>
        <ScrollView>
          {interviews.map(interview => (
            <View key={interview.id} style={styles.interviewItem}>
              <View style={styles.leftContainer}>
                <Text style={styles.candidateName}>
                  {interview.candidateName}
                </Text>
                <Text style={styles.jobTitle2}>{interview.jobTitle}</Text>
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
                <TouchableOpacity style={styles.callButton}>
                  <Text
                    style={{color: 'green', fontSize: 15, fontWeight: '700'}}>
                    Active
                  </Text>
                </TouchableOpacity>
                {interview?.status == 'Scheduled' ? (
                  <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Confirm</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerSection: {
    marginTop: 1,
    height: 60,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bannerContainer: {
    backgroundColor: '#ff9900',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerLabel: {
    color: 'white',
    fontSize: 12,
  },
  jobsLink: {
    alignSelf: 'flex-end',
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    marginHorizontal: 16,
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
  confirmButton: {
    backgroundColor: AppColors.AppButtonBackground,
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
  confirmText: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: '600',
  },
  walletCard: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 0,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  walletBalanceContainer: {
    marginTop: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
});
