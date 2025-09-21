import * as React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {useSelector} from 'react-redux';
import {AppColors} from '../../constants/colors.config';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

const {width} = Dimensions.get('window');

interface ActiveJob {
  id: string;
  title: string;
  applications: number;
  views: number;
  timeRemaining: string;
  status: 'active' | 'expiring_soon';
}

const HomeScreen: React.FC = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const navigation = useNavigation<any>();

  // Mock data for active 24-hour job posts
  const activeJobs: ActiveJob[] = [
    {
      id: '1',
      title: 'Senior React Developer',
      applications: 12,
      views: 45,
      timeRemaining: '18h 32m',
      status: 'active',
    },
    {
      id: '2',
      title: 'UX/UI Designer',
      applications: 8,
      views: 32,
      timeRemaining: '12h 15m',
      status: 'active',
    },
    {
      id: '3',
      title: 'Product Manager',
      applications: 15,
      views: 67,
      timeRemaining: '6h 45m',
      status: 'expiring_soon',
    },
  ];

  const stats = [
    {title: 'Active Jobs', value: 3, icon: 'briefcase', color: '#4CAF50'},
    {title: 'Total Applications', value: 35, icon: 'file', color: '#2196F3'},
    {title: 'Jobs Expiring Soon', value: 1, icon: 'clock', color: '#FF9800'},
    {title: 'Profile Views', value: 144, icon: 'eye', color: '#9C27B0'},
  ];

  const navigateToAddPost = () => {
    navigation.navigate('Addpost');
  };

  const navigateToJobDetails = (jobId: string) => {
    // Navigate to job details/applications
    console.log('Navigate to job:', jobId);
  };

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1729824186570-4d4aede00043?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || 'Recruiter'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <SvgIcon
            name="bell"
            width={24}
            height={24}
            strokeColor={AppColors.AppButtonBackground}
          />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>🚀 Your Job Portal Dashboard</Text>
            <Text style={styles.heroSubtitle}>
              Manage your 24-hour job posts and connect with top talent
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={navigateToAddPost}>
              <Text style={styles.primaryButtonText}>+ Post New Job</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>{activeJobs.length}</Text>
              <Text style={styles.heroStatLabel}>Active Jobs</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>
                {activeJobs.reduce((sum, job) => sum + job.applications, 0)}
              </Text>
              <Text style={styles.heroStatLabel}>Applications</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNumber}>
                {activeJobs.reduce((sum, job) => sum + job.views, 0)}
              </Text>
              <Text style={styles.heroStatLabel}>Profile Views</Text>
            </View>
          </View>
        </View>

        {/* Active Jobs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Active Job Posts (24h)</Text>
            <Text style={styles.sectionSubtitle}>Jobs expiring soon need attention</Text>
          </View>

          {activeJobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              style={[
                styles.jobCard,
                job.status === 'expiring_soon' && styles.expiringSoonCard,
              ]}
              onPress={() => navigateToJobDetails(job.id)}
            >
              <View style={styles.jobCardHeader}>
                <View style={styles.jobTitleContainer}>
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  {job.status === 'expiring_soon' && (
                    <View style={styles.expiringBadge}>
                      <Text style={styles.expiringText}>⚠️ Expiring Soon</Text>
                    </View>
                  )}
                </View>
                <View style={styles.timeRemaining}>
                  <SvgIcon name="clock" width={16} height={16} strokeColor="#FF6B35" />
                  <Text style={styles.timeText}>{job.timeRemaining}</Text>
                </View>
              </View>

              <View style={styles.jobStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{job.applications}</Text>
                  <Text style={styles.statLabel}>Applications</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{job.views}</Text>
                  <Text style={styles.statLabel}>Views</Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Performance Overview</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={[styles.statCard, {borderLeftColor: stat.color}]}>
                <View style={[styles.statIcon, {backgroundColor: stat.color + '20'}]}>
                  <SvgIcon
                    name={stat.icon}
                    width={24}
                    height={24}
                    strokeColor={stat.color}
                  />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={navigateToAddPost}>
              <SvgIcon name="plus" width={24} height={24} strokeColor="#fff" />
              <Text style={styles.actionButtonText}>Post Job</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
              <SvgIcon name="applications" width={24} height={24} strokeColor="#fff" />
              <Text style={styles.actionButtonText}>View Apps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={makeCall}>
              <SvgIcon name="phone" width={24} height={24} strokeColor="#fff" />
              <Text style={styles.actionButtonText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
              <SvgIcon name="setting" width={24} height={24} strokeColor="#fff" />
              <Text style={styles.actionButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  userName: {
    fontSize: 18,
    color: '#212529',
    fontWeight: '700',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContainer: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: AppColors.AppButtonBackground,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroContent: {
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#e8f4fd',
    lineHeight: 20,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: AppColors.AppButtonBackground,
    fontSize: 16,
    fontWeight: '600',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroStat: {
    alignItems: 'center',
    flex: 1,
  },
  heroStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#e8f4fd',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  expiringSoonCard: {
    borderColor: '#FF6B35',
    borderWidth: 2,
  },
  jobCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  expiringBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  expiringText: {
    fontSize: 12,
    color: '#856404',
    fontWeight: '600',
  },
  timeRemaining: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
    marginLeft: 4,
  },
  jobStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
  viewButton: {
    backgroundColor: AppColors.AppButtonBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: (width - 48) / 2,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: AppColors.AppButtonBackground,
    width: (width - 48) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});

export const Home = HomeScreen;
