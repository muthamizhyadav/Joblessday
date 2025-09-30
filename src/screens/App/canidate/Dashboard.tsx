import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import SvgIcon from '../../../shared/Svg';
import {useSelector} from 'react-redux';
import {AppColors} from '../../../constants/colors.config';
import {FeaturedJobListings} from '../../../components/candidates/featuredJoblisting';
import SkeletonLoader from '../../../shared/SkeletonLoader';

const {width, height} = Dimensions.get('window');

interface LiveJobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  urgency: 'High' | 'Medium' | 'Low';
  postedMinutesAgo: number;
  applicants: number;
  matchScore: number;
  tags: string[];
  logo: string;
  isLive: boolean;
  aiRecommended: boolean;
}

interface Recruiter {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  isFollowing: boolean;
  followers: number;
  activeJobs: number;
  responseRate: number;
  lastActive: string;
}



export const CandidateDashboard: React.FC = () => {
  const [liveJobs, setLiveJobs] = useState<LiveJobPost[]>([]);
  const [followingRecruiters, setFollowingRecruiters] = useState<Recruiter[]>([]);
  const [suggestedRecruiters, setSuggestedRecruiters] = useState<Recruiter[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {user, tokens} = useSelector((state: any) => state.app.data);

  // Mock live job data with futuristic elements
  const mockLiveJobs: LiveJobPost[] = [
    {
      id: '1',
      title: 'AI/ML Engineer',
      company: 'TechNova Labs',
      location: 'Bangalore, IN',
      salary: '₹25-35L',
      type: 'Full-time',
      urgency: 'High',
      postedMinutesAgo: 2,
      applicants: 12,
      matchScore: 94,
      tags: ['Python', 'TensorFlow', 'AWS'],
      logo: 'https://via.placeholder.com/50',
      isLive: true,
      aiRecommended: true,
    },
    {
      id: '2',
      title: 'Senior React Developer',
      company: 'FutureStack',
      location: 'Remote',
      salary: '₹18-28L',
      type: 'Remote',
      urgency: 'Medium',
      postedMinutesAgo: 15,
      applicants: 34,
      matchScore: 87,
      tags: ['React', 'TypeScript', 'Node.js'],
      logo: 'https://via.placeholder.com/50',
      isLive: true,
      aiRecommended: false,
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'CloudVision',
      location: 'Mumbai, IN',
      salary: '₹20-30L',
      type: 'Full-time',
      urgency: 'High',
      postedMinutesAgo: 5,
      applicants: 8,
      matchScore: 91,
      tags: ['Docker', 'Kubernetes', 'Jenkins'],
      logo: 'https://via.placeholder.com/50',
      isLive: true,
      aiRecommended: true,
    },
  ];

  // Mock recruiter data
  const mockFollowingRecruiters: Recruiter[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Technical Recruiter',
      company: 'TechCorp Solutions',
      avatar: 'https://via.placeholder.com/60',
      isFollowing: true,
      followers: 1240,
      activeJobs: 12,
      responseRate: 89,
      lastActive: '2h ago',
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Head of Talent Acquisition',
      company: 'DataVision Labs',
      avatar: 'https://via.placeholder.com/60',
      isFollowing: true,
      followers: 856,
      activeJobs: 8,
      responseRate: 92,
      lastActive: '4h ago',
    },
    {
      id: '3',
      name: 'Priya Sharma',
      title: 'AI/ML Recruiter',
      company: 'FutureStack',
      avatar: 'https://via.placeholder.com/60',
      isFollowing: true,
      followers: 2100,
      activeJobs: 15,
      responseRate: 95,
      lastActive: '1h ago',
    },
  ];

  const mockSuggestedRecruiters: Recruiter[] = [
    {
      id: '4',
      name: 'David Wilson',
      title: 'DevOps Recruiter',
      company: 'CloudVision',
      avatar: 'https://via.placeholder.com/60',
      isFollowing: false,
      followers: 945,
      activeJobs: 6,
      responseRate: 87,
      lastActive: '3h ago',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      title: 'Frontend Specialist',
      company: 'WebCraft Studios',
      avatar: 'https://via.placeholder.com/60',
      isFollowing: false,
      followers: 1560,
      activeJobs: 9,
      responseRate: 91,
      lastActive: '5h ago',
    },
  ];

  useEffect(() => {
    setLiveJobs(mockLiveJobs);
    setFollowingRecruiters(mockFollowingRecruiters);
    setSuggestedRecruiters(mockSuggestedRecruiters);
    
    // Start pulse animation for live indicator
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => pulseAnimation.stop();
  }, []);

  const stats = [
    {title: 'Applications', value: '23', icon: 'briefcase', color: '#FF6B6B'},
    {title: 'Scheduled Interviews', value: '5', icon: 'clock', color: '#4ECDC4'},
    {title: 'Rejected', value: '8', icon: 'close', color: '#FF4757'},
    {title: 'Profile Views', value: '156', icon: 'eye', color: '#96CEB4'},
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderLiveJobCard = ({item}: {item: LiveJobPost}) => (
    <Animated.View 
      style={[
        styles.liveJobCard,
        {
          transform: [{
            translateX: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [width, 0],
            })
          }]
        }
      ]}
    >
      {item.isLive && (
        <Animated.View 
          style={[
            styles.liveIndicator,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <Text style={styles.liveText}>🔴 LIVE</Text>
        </Animated.View>
      )}
      
      {item.aiRecommended && (
        <View style={styles.aiRecommendedBadge}>
          <Text style={styles.aiText}>🤖 AI Match</Text>
        </View>
      )}

      <View style={styles.jobHeader}>
        <Image source={{uri: item.logo}} style={styles.companyLogo} />
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <View style={styles.matchScoreContainer}>
          <Text style={styles.matchScore}>{item.matchScore}%</Text>
          <Text style={styles.matchLabel}>Match</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <SvgIcon name="location" width={16} height={16} strokeColor="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <SvgIcon name="briefcase" width={16} height={16} strokeColor="#666" />
          <Text style={styles.detailText}>{item.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.salaryText}>{item.salary}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.jobFooter}>
        <View style={styles.jobMetrics}>
          <Text style={styles.postedTime}>{item.postedMinutesAgo}m ago</Text>
          <Text style={styles.applicants}>{item.applicants} applied</Text>
        </View>
        <View style={styles.interviewCost}>
          <Text style={styles.costText}>₹200 if scheduled</Text>
        </View>
      </View>
    </Animated.View>
  );



  const QuickStat = ({title, value, icon, color}) => (
    <View style={[styles.statContainer, {borderLeftColor: color}]}>
      <View style={[styles.iconContainer, {backgroundColor: color + '20'}]}>
        <SvgIcon
          name={icon}
          width={24}
          height={24}
          strokeColor={color}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Merged Header with Search */}
      <View style={styles.mergedHeaderContainer}>
        <View style={styles.headerCard}>
          {/* Top Header Section */}
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'Job Seeker'} 🚀</Text>
              <Text style={styles.subText}>AI is finding perfect matches for you</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <SvgIcon name="bell" width={24} height={24} strokeColor={AppColors.White} />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/young-bearded-hindu-student-with-backpack-pastel-wall_496169-1524.jpg?t=st=1744202385~exp=1744205985~hmac=9047885fb434d93b49641aa56eaecace95751b91757723c6bd347df62384b564&w=996',
                }}
                style={styles.profileImage}
              />
            </View>
          </View>

          {/* Following Recruiters Section */}
          <View style={styles.integratedRecruitersContainer}>
            <View style={styles.recruitersHeader}>
              <Text style={styles.recruitersTitle}>👥 Following Recruiters</Text>
              <TouchableOpacity style={styles.viewAllButtonHeader}>
                <Text style={styles.viewAllTextHeader}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.recruitersScroll}
            >
              {followingRecruiters.map((recruiter) => (
                <View key={recruiter.id} style={styles.recruiterCard}>
                  <Image source={{uri: recruiter.avatar}} style={styles.recruiterAvatar} />
                  <Text style={styles.recruiterName}>{recruiter.name}</Text>
                  <Text style={styles.recruiterTitle}>{recruiter.title}</Text>
                  <Text style={styles.recruiterCompany}>{recruiter.company}</Text>
                  <View style={styles.recruiterStats}>
                    <Text style={styles.statText}>{recruiter.activeJobs} jobs</Text>
                    <Text style={styles.statText}>{recruiter.responseRate}% response</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Wallet Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View style={styles.walletInfo}>
            <Text style={styles.walletTitle}>💳 My Wallet</Text>
            <Text style={styles.walletBalance}>₹ 2,500</Text>
            <Text style={styles.walletSubtext}>Available Balance</Text>
          </View>
          <TouchableOpacity style={styles.rechargeButton}>
            <SvgIcon name="plus" width={16} height={16} strokeColor={AppColors.White} />
            <Text style={styles.rechargeText}>Recharge</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.walletFeatures}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Pay only for scheduled interviews</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>₹200 per interview slot</Text>
          </View>
        </View>
      </View>

      {/* Live Jobs Counter */}
      <View style={styles.liveJobsCounter}>
        <Animated.View style={[styles.liveIndicatorLarge, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.liveCounterText}>🔴</Text>
        </Animated.View>
        <View style={styles.counterTextContainer}>
          <Text style={styles.liveJobsNumber}>247</Text>
          <Text style={styles.liveJobsLabel}>Live Jobs Right Now</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Application Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>📊 Application Overview</Text>
        <View style={styles.gridContainer}>
          {stats.map((stat, index) => (
            <QuickStat
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </View>
      </View>

      {/* Recommended Jobs Based on Applications */}
      <View style={styles.recommendedSection}>
        <Text style={styles.sectionTitle}>🎯 Recommended for You</Text>
        <Text style={styles.sectionSubtitle}>Based on your applications and profile</Text>
        <View style={styles.recommendedJobsList}>
          {mockLiveJobs.slice(0, 2).map((job, index) => (
            <View key={job.id} style={styles.recommendedJobCard}>
              <View style={styles.recommendedJobHeader}>
                <Image source={{uri: job.logo}} style={styles.miniCompanyLogo} />
                <View style={styles.recommendedJobInfo}>
                  <Text style={styles.recommendedJobTitle}>{job.title}</Text>
                  <Text style={styles.recommendedCompanyName}>{job.company}</Text>
                </View>
                <View style={styles.recommendedMatchScore}>
                  <Text style={styles.miniMatchScore}>{job.matchScore}%</Text>
                </View>
              </View>
              <View style={styles.recommendedJobFooter}>
                <Text style={styles.recommendedSalary}>{job.salary}</Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Suggested Recruiters */}
      <View style={styles.suggestedRecruitersSection}>
        <View style={styles.sectionHeaderWithButton}>
          <View>
            <Text style={styles.sectionTitle}>🌟 Suggested Recruiters to Follow</Text>
            <Text style={styles.sectionSubtitle}>Connect with top recruiters in your field</Text>
          </View>
          <TouchableOpacity style={styles.sectionViewAllButton}>
            <Text style={styles.sectionViewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.suggestedRecruitersList}>
          {suggestedRecruiters.map((recruiter) => (
            <View key={recruiter.id} style={styles.suggestedRecruiterCard}>
              <Image source={{uri: recruiter.avatar}} style={styles.suggestedRecruiterAvatar} />
              <View style={styles.suggestedRecruiterInfo}>
                <Text style={styles.suggestedRecruiterName}>{recruiter.name}</Text>
                <Text style={styles.suggestedRecruiterTitle}>{recruiter.title}</Text>
                <Text style={styles.suggestedRecruiterCompany}>{recruiter.company}</Text>
                <View style={styles.suggestedRecruiterStats}>
                  <Text style={styles.suggestedStatText}>{recruiter.followers} followers</Text>
                  <Text style={styles.suggestedStatText}>{recruiter.activeJobs} active jobs</Text>
                  <Text style={styles.suggestedStatText}>{recruiter.responseRate}% response rate</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Scheduled Interviews */}
      <View style={styles.interviewsSection}>
        <View style={styles.sectionHeaderWithButton}>
          <View>
            <Text style={styles.sectionTitle}>📅 Scheduled Interviews</Text>
            <Text style={styles.sectionSubtitle}>Manage your upcoming interviews</Text>
          </View>
          <TouchableOpacity style={styles.sectionViewAllButton}>
            <Text style={styles.sectionViewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interviewsList}>
          <View style={styles.interviewCard}>
            <View style={styles.interviewHeader}>
              <View style={styles.interviewInfo}>
                <Text style={styles.interviewJobTitle}>Senior React Developer</Text>
                <Text style={styles.interviewCompany}>TechCorp Solutions</Text>
                <Text style={styles.interviewDate}>Tomorrow, 2:30 PM</Text>
              </View>
              <View style={styles.interviewStatus}>
                <Text style={styles.statusBadge}>Confirmed</Text>
                <Text style={styles.interviewCharge}>₹200 charged</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.interviewCard}>
            <View style={styles.interviewHeader}>
              <View style={styles.interviewInfo}>
                <Text style={styles.interviewJobTitle}>AI/ML Engineer</Text>
                <Text style={styles.interviewCompany}>DataVision Labs</Text>
                <Text style={styles.interviewDate}>Friday, 10:00 AM</Text>
              </View>
              <View style={styles.interviewStatus}>
                <Text style={styles.statusBadge}>Pending</Text>
                <Text style={styles.interviewCharge}>₹200 on confirm</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Live Job Feed */}
      <View style={styles.liveJobsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🚀 Live Job Feed</Text>
          <TouchableOpacity style={styles.filterButton}>
            <SvgIcon name="filter" width={16} height={16} strokeColor={AppColors.AppButtonBackground} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={liveJobs}
          renderItem={renderLiveJobCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      {/* Best Time to Apply */}
      <View style={styles.bestTimeSection}>
        <Text style={styles.sectionTitle}>⚡ Best Time to Apply</Text>
        <View style={styles.bestTimeCard}>
          <View style={styles.insightIcon}>
            <Text style={styles.insightEmoji}>⚡</Text>
          </View>
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Optimal Application Window</Text>
            <Text style={styles.insightDescription}>
              Companies are 3x more likely to respond between 10 AM - 2 PM today!
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Merged Header Container
  mergedHeaderContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 20,
  },
  headerCard: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 0,
  },
  headerTop: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerLeft: {
    flex: 1,
  },
  welcomeText: {
    color: AppColors.White,
    fontSize: 14,
    opacity: 0.8,
  },
  userName: {
    color: AppColors.White,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  subText: {
    color: AppColors.White,
    fontSize: 12,
    opacity: 0.7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 12,
    marginRight: 15,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#FF4757',
    borderRadius: 4,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: AppColors.White,
  },

  // Integrated Recruiters
  integratedRecruitersContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  recruitersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recruitersTitle: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButtonHeader: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewAllTextHeader: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: '600',
  },
  recruitersScroll: {
    flexDirection: 'row',
  },
  recruiterCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 15,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  recruiterAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: AppColors.White,
  },
  recruiterName: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  recruiterTitle: {
    color: AppColors.White,
    fontSize: 10,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 2,
  },
  recruiterCompany: {
    color: AppColors.White,
    fontSize: 10,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 8,
  },
  recruiterStats: {
    alignItems: 'center',
  },
  statText: {
    color: AppColors.White,
    fontSize: 9,
    opacity: 0.8,
    marginBottom: 2,
  },

  // Live Jobs Counter
  liveJobsCounter: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  liveIndicatorLarge: {
    marginRight: 15,
  },
  liveCounterText: {
    fontSize: 24,
  },
  counterTextContainer: {
    flex: 1,
  },
  liveJobsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  liveJobsLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  viewAllButton: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  viewAllText: {
    color: AppColors.White,
    fontWeight: '600',
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  sectionHeaderWithButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sectionViewAllButton: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 5,
  },
  sectionViewAllText: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statContainer: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  iconContainer: {
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },



  // Live Jobs Section
  liveJobsSection: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  filterText: {
    color: AppColors.AppButtonBackground,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
  },

  // Live Job Cards
  liveJobCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  liveIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  liveText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  aiRecommendedBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  aiText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  matchScoreContainer: {
    alignItems: 'center',
  },
  matchScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  matchLabel: {
    fontSize: 10,
    color: '#666',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 10,
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobMetrics: {
    flex: 1,
  },
  postedTime: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  applicants: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  interviewCost: {
    alignItems: 'flex-end',
  },
  costText: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // Best Time Section
  bestTimeSection: {
    paddingHorizontal: 8,
    marginBottom: 80,
  },
  bestTimeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  insightIcon: {
    marginRight: 15,
  },
  insightEmoji: {
    fontSize: 24,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },

  // Wallet Styles
  walletCard: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  walletInfo: {
    flex: 1,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  walletBalance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
    marginBottom: 2,
  },
  walletSubtext: {
    fontSize: 12,
    color: '#666',
  },
  rechargeButton: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rechargeText: {
    color: AppColors.White,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  walletFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  featureText: {
    fontSize: 11,
    color: '#666',
    flex: 1,
  },

  // Recommended Jobs Styles
  recommendedSection: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    marginTop: -10,
  },
  recommendedJobsList: {
    gap: 12,
  },
  recommendedJobCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 0,
  },
  recommendedJobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniCompanyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  recommendedJobInfo: {
    flex: 1,
  },
  recommendedJobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  recommendedCompanyName: {
    fontSize: 12,
    color: '#666',
  },
  recommendedMatchScore: {
    alignItems: 'center',
  },
  miniMatchScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  recommendedJobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendedSalary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  applyButton: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  applyButtonText: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Interview Styles
  interviewsSection: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  interviewsList: {
    gap: 12,
  },
  interviewCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 0,
  },
  interviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  interviewInfo: {
    flex: 1,
  },
  interviewJobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  interviewCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  interviewDate: {
    fontSize: 12,
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
  },
  interviewStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    backgroundColor: AppColors.AppButtonBackground,
    color: AppColors.White,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 4,
  },
  interviewCharge: {
    fontSize: 10,
    color: '#FF6B6B',
    fontWeight: '600',
  },

  // Suggested Recruiters Styles
  suggestedRecruitersSection: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  suggestedRecruitersList: {
    gap: 12,
  },
  suggestedRecruiterCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
  },
  suggestedRecruiterAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: AppColors.AppButtonBackground,
  },
  suggestedRecruiterInfo: {
    flex: 1,
  },
  suggestedRecruiterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  suggestedRecruiterTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  suggestedRecruiterCompany: {
    fontSize: 13,
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestedRecruiterStats: {
    flexDirection: 'row',
    gap: 12,
  },
  suggestedStatText: {
    fontSize: 11,
    color: '#888',
  },
  followButton: {
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  followButtonText: {
    color: AppColors.White,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
