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

export const CandidateDashboard: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const {user, tokens} = useSelector((state: any) => state.app.data);
  console.log(user, 'user');
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
            }}>
            <SvgIcon
              name="bell"
              width={30}
              height={30}
              strokeColor={AppColors.AppButtonBackground}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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

      <View style={styles.bannerContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.bannerText}>
            🚀 Live Job Application Session: Apply Now! (9 AM–12 PM)
          </Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeRemaining}</Text>
            <Text style={styles.timerLabel}>Time Remaining</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.jobsLink}>
          <Text style={styles.linkText}>Jump to Open Jobs ➔</Text>
        </TouchableOpacity>
      </View>
      {/* <FeaturedJobListings isLoggedIn={true} /> */}
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
});
