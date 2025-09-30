import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  FlatList,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from '../../../constants/colors.config';
import SvgIcon from '../../../shared/Svg';

const {width} = Dimensions.get('window');

interface JobPost {
  id: string;
  title: string;
  salary: string;
  location: string;
  type: string;
  postedTime: string;
  isUrgent: boolean;
  applicants: number;
}

interface Recruiter {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  followers: number;
  following: number;
  activeJobs: number;
  responseRate: number;
  location: string;
  tags: string[];
  isFollowing: boolean;
  isVerified: boolean;
  lastActive: string;
  livePosts: JobPost[];
}

const RecruitersFollow = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Suggested');
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState<Recruiter[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [headerAnimation] = useState(new Animated.Value(0));
  const [cardAnimations] = useState(new Animated.Value(0));

  const categories = ['Suggested', 'Following', 'Tech', 'Trending', 'All'];

  const dummyRecruiters: Recruiter[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Technical Recruiter',
      company: 'TechCorp Solutions',
      avatar: 'https://via.placeholder.com/60',
      followers: 1240,
      following: 320,
      activeJobs: 8,
      responseRate: 95,
      location: 'Bangalore, Karnataka',
      tags: ['React Native', 'JavaScript', 'Mobile Development'],
      isFollowing: false,
      isVerified: true,
      lastActive: '2 hours ago',
      livePosts: [
        {
          id: 'job1',
          title: 'Senior React Native Developer',
          salary: '₹15-25L',
          location: 'Bangalore',
          type: 'Full-time',
          postedTime: '2h ago',
          isUrgent: true,
          applicants: 24,
        },
        {
          id: 'job2',
          title: 'Mobile App Developer',
          salary: '₹12-18L',
          location: 'Remote',
          type: 'Contract',
          postedTime: '5h ago',
          isUrgent: false,
          applicants: 18,
        },
      ],
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Head of AI Recruitment',
      company: 'DataVision Labs',
      avatar: 'https://via.placeholder.com/60',
      followers: 2100,
      following: 450,
      activeJobs: 12,
      responseRate: 88,
      location: 'Hyderabad, Telangana',
      tags: ['AI/ML', 'Python', 'Data Science'],
      isFollowing: true,
      isVerified: true,
      lastActive: '1 hour ago',
      livePosts: [
        {
          id: 'job3',
          title: 'AI/ML Engineer',
          salary: '₹20-35L',
          location: 'Hyderabad',
          type: 'Full-time',
          postedTime: '1h ago',
          isUrgent: true,
          applicants: 31,
        },
        {
          id: 'job4',
          title: 'Data Scientist',
          salary: '₹18-28L',
          location: 'Pune',
          type: 'Full-time',
          postedTime: '3h ago',
          isUrgent: false,
          applicants: 22,
        },
        {
          id: 'job5',
          title: 'Python Developer',
          salary: '₹12-20L',
          location: 'Remote',
          type: 'Full-time',
          postedTime: '6h ago',
          isUrgent: false,
          applicants: 15,
        },
      ],
    },
    {
      id: '3',
      name: 'Priya Sharma',
      title: 'DevOps Talent Acquisition',
      company: 'CloudVision',
      avatar: 'https://via.placeholder.com/60',
      followers: 890,
      following: 180,
      activeJobs: 5,
      responseRate: 92,
      location: 'Mumbai, Maharashtra',
      tags: ['DevOps', 'AWS', 'Cloud Computing'],
      isFollowing: false,
      isVerified: true,
      lastActive: '30 minutes ago',
      livePosts: [
        {
          id: 'job6',
          title: 'DevOps Engineer',
          salary: '₹16-24L',
          location: 'Mumbai',
          type: 'Full-time',
          postedTime: '30min ago',
          isUrgent: true,
          applicants: 19,
        },
        {
          id: 'job7',
          title: 'Cloud Architect',
          salary: '₹25-40L',
          location: 'Bangalore',
          type: 'Full-time',
          postedTime: '2h ago',
          isUrgent: false,
          applicants: 12,
        },
      ],
    },
    {
      id: '4',
      name: 'Lisa Anderson',
      title: 'Frontend Recruitment Lead',
      company: 'WebCraft Studios',
      avatar: 'https://via.placeholder.com/60',
      followers: 1500,
      following: 280,
      activeJobs: 7,
      responseRate: 85,
      location: 'Chennai, Tamil Nadu',
      tags: ['Frontend', 'React', 'UI/UX'],
      isFollowing: false,
      isVerified: false,
      lastActive: '4 hours ago',
      livePosts: [
        {
          id: 'job8',
          title: 'Frontend Developer',
          salary: '₹10-16L',
          location: 'Chennai',
          type: 'Full-time',
          postedTime: '1h ago',
          isUrgent: false,
          applicants: 28,
        },
        {
          id: 'job9',
          title: 'UI/UX Designer',
          salary: '₹8-14L',
          location: 'Remote',
          type: 'Contract',
          postedTime: '4h ago',
          isUrgent: false,
          applicants: 35,
        },
      ],
    },
    {
      id: '5',
      name: 'Raj Kumar',
      title: 'Backend Talent Partner',
      company: 'ServerTech Inc',
      avatar: 'https://via.placeholder.com/60',
      followers: 760,
      following: 150,
      activeJobs: 9,
      responseRate: 90,
      location: 'Pune, Maharashtra',
      tags: ['Backend', 'Node.js', 'API Development'],
      isFollowing: true,
      isVerified: true,
      lastActive: '6 hours ago',
      livePosts: [
        {
          id: 'job10',
          title: 'Backend Developer',
          salary: '₹14-22L',
          location: 'Pune',
          type: 'Full-time',
          postedTime: '1h ago',
          isUrgent: true,
          applicants: 21,
        },
        {
          id: 'job11',
          title: 'Node.js Developer',
          salary: '₹12-18L',
          location: 'Remote',
          type: 'Full-time',
          postedTime: '3h ago',
          isUrgent: false,
          applicants: 16,
        },
      ],
    },
  ];

  useEffect(() => {
    setRecruiters(dummyRecruiters);
    setFilteredRecruiters(dummyRecruiters);
    
    // Animate header on mount
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animate cards with stagger effect
    Animated.timing(cardAnimations, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    filterRecruiters(text, selectedCategory);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterRecruiters(searchTerm, category);
  };

  const filterRecruiters = (search: string, category: string) => {
    let filtered = recruiters;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(recruiter =>
        recruiter.name.toLowerCase().includes(search.toLowerCase()) ||
        recruiter.company.toLowerCase().includes(search.toLowerCase()) ||
        recruiter.title.toLowerCase().includes(search.toLowerCase()) ||
        recruiter.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply category filter
    if (category !== 'All') {
      switch (category) {
        case 'Following':
          filtered = filtered.filter(recruiter => recruiter.isFollowing);
          break;
        case 'Suggested':
          filtered = filtered.filter(recruiter => !recruiter.isFollowing && recruiter.responseRate > 85);
          break;
        case 'Tech':
          filtered = filtered.filter(recruiter => 
            recruiter.tags.some(tag => 
              ['React', 'JavaScript', 'Python', 'AI/ML', 'DevOps', 'Node.js'].includes(tag)
            )
          );
          break;
        case 'Trending':
          filtered = filtered.filter(recruiter => recruiter.followers > 1000);
          break;
      }
    }

    setFilteredRecruiters(filtered);
  };

  const handleFollowToggle = (recruiterId: string) => {
    const updatedRecruiters = recruiters.map(recruiter => {
      if (recruiter.id === recruiterId) {
        return {
          ...recruiter,
          isFollowing: !recruiter.isFollowing,
          followers: recruiter.isFollowing ? recruiter.followers - 1 : recruiter.followers + 1,
        };
      }
      return recruiter;
    });

    setRecruiters(updatedRecruiters);
    filterRecruiters(searchTerm, selectedCategory);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const RecruiterCard = ({item, index}: {item: Recruiter; index: number}) => {
    const [cardAnimation] = useState(new Animated.Value(0));
    const [pulseAnimation] = useState(new Animated.Value(1));

    useEffect(() => {
      // Staggered card animation
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start();

      // Pulse animation for active recruiters
      if (item.lastActive.includes('minutes') || item.lastActive.includes('1 hour')) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnimation, {
              toValue: 1.05,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnimation, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }
    }, []);

    const cardTransform = {
      opacity: cardAnimation,
      transform: [
        {
          translateY: cardAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
        {
          scale: pulseAnimation,
        },
      ],
    };

    return (
      <Animated.View style={[styles.recruiterCard, cardTransform]}>
        {/* Trending Badge */}
        {item.followers > 1000 && (
          <View style={styles.trendingBadge}>
            <Text style={styles.trendingText}>🔥 Trending</Text>
          </View>
        )}

        {/* Premium Glow Effect */}
        {item.responseRate > 90 && (
          <View style={styles.premiumGlow} />
        )}

        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            {/* Active Pulse Ring */}
            {(item.lastActive.includes('minutes') || item.lastActive.includes('1 hour')) && (
              <View style={styles.activePulse} />
            )}
            {item.isVerified && (
              <View style={styles.verifiedBadge}>
                <SvgIcon name="check" width={12} height={12} strokeColor="#fff" />
              </View>
            )}
          </View>
          
          <View style={styles.recruiterInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.recruiterName}>{item.name}</Text>
              <View style={[
                styles.lastActiveContainer,
                (item.lastActive.includes('minutes') || item.lastActive.includes('1 hour')) && styles.activeNow
              ]}>
                <View style={styles.statusDot} />
                <Text style={styles.lastActive}>{item.lastActive}</Text>
              </View>
            </View>
            <Text style={styles.recruiterTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <View style={styles.locationRow}>
              <SvgIcon name="location" width={14} height={14} strokeColor={AppColors.AppButtonBackground} />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
        </View>

        {/* Response Rate Highlight */}
        <View style={styles.responseRateHighlight}>
          <View style={[
            styles.responseRateBar,
            {width: `${item.responseRate}%`}
          ]} />
          <Text style={styles.responseRateText}>{item.responseRate}% Response Rate</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <SvgIcon name="userGroup" width={16} height={16} strokeColor={AppColors.AppButtonBackground} />
            </View>
            <Text style={styles.statNumber}>{item.followers > 1000 ? `${(item.followers/1000).toFixed(1)}k` : item.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <SvgIcon name="briefcase" width={16} height={16} strokeColor={AppColors.AppButtonBackground} />
            </View>
            <Text style={styles.statNumber}>{item.activeJobs}</Text>
            <Text style={styles.statLabel}>Active Jobs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <SvgIcon name="check" width={16} height={16} strokeColor={AppColors.AppButtonBackground} />
            </View>
            <Text style={[
              styles.statNumber,
              item.responseRate > 90 && styles.excellentRate
            ]}>{item.responseRate}%</Text>
            <Text style={styles.statLabel}>Response</Text>
          </View>
        </View>

        {/* Tags with Enhanced Design */}
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[
              styles.tag,
              index === 0 && styles.primaryTag
            ]}>
              <Text style={[
                styles.tagText,
                index === 0 && styles.primaryTagText
              ]}>{tag}</Text>
            </View>
          ))}
          {item.tags.length > 3 && (
            <View style={styles.moreTagsIndicator}>
              <Text style={styles.moreTagsText}>+{item.tags.length - 3}</Text>
            </View>
          )}
        </View>

        {/* Live Job Posts Section */}
        <View style={styles.livePostsSection}>
          <View style={styles.livePostsHeader}>
            <View style={styles.livePostsTitle}>
              <View style={styles.liveDot} />
              <Text style={styles.livePostsText}>Live Job Posts</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All ({item.livePosts.length})</Text>
              <SvgIcon name="arrowRight" width={14} height={14} strokeColor={AppColors.AppButtonBackground} />
            </TouchableOpacity>
          </View>

          {/* Job Posts List */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.jobPostsContainer}
          >
            {item.livePosts.slice(0, 3).map((job, jobIndex) => (
              <TouchableOpacity 
                key={job.id} 
                style={styles.jobPostCard}
                onPress={() => console.log('Job pressed:', job.title)}
              >
                {job.isUrgent && (
                  <View style={styles.urgentTag}>
                    <Text style={styles.urgentTagText}>🔥 URGENT</Text>
                  </View>
                )}
                
                <Text style={styles.jobTitle} numberOfLines={2}>{job.title}</Text>
                <Text style={styles.jobSalary}>{job.salary}</Text>
                
                <View style={styles.jobDetails}>
                  <View style={styles.jobDetailItem}>
                    <SvgIcon name="location" width={12} height={12} strokeColor="#666" />
                    <Text style={styles.jobDetailText}>{job.location}</Text>
                  </View>
                  <View style={styles.jobDetailItem}>
                    <SvgIcon name="briefcase" width={12} height={12} strokeColor="#666" />
                    <Text style={styles.jobDetailText}>{job.type}</Text>
                  </View>
                </View>
                
                <View style={styles.jobFooter}>
                  <Text style={styles.jobPostedTime}>{job.postedTime}</Text>
                  <Text style={styles.jobApplicants}>{job.applicants} applied</Text>
                </View>
                
                <TouchableOpacity style={styles.quickApplyButton}>
                  <Text style={styles.quickApplyText}>Quick Apply</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Enhanced Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.messageButton}>
            <SvgIcon name="messageCircle" width={18} height={18} strokeColor={AppColors.AppButtonBackground} />
            <Text style={styles.messageText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.followButton,
              item.isFollowing && styles.followingButton
            ]}
            onPress={() => handleFollowToggle(item.id)}
          >
            {!item.isFollowing && (
              <SvgIcon name="userAdd" width={16} height={16} strokeColor="#fff" />
            )}
            <Text style={[
              styles.followButtonText,
              item.isFollowing && styles.followingButtonText
            ]}>
              {item.isFollowing ? '✓ Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={AppColors.AppButtonBackground} barStyle="light-content" />
      
      {/* Enhanced Header with Animation */}
      <Animated.View style={[
        styles.header,
        {
          opacity: headerAnimation,
          transform: [
            {
              translateY: headerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              }),
            },
          ],
        }
      ]}>
        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Top Recruiters</Text>
              <Text style={styles.headerSubtitle}>Connect • Network • Grow</Text>
            </View>
            <View style={styles.headerStats}>
              <Text style={styles.headerStatsNumber}>{filteredRecruiters.length}</Text>
              <Text style={styles.headerStatsLabel}>Active</Text>
            </View>
          </View>
          
          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{recruiters.filter(r => r.isFollowing).length}</Text>
              <Text style={styles.quickStatLabel}>Following</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{recruiters.filter(r => r.responseRate > 90).length}</Text>
              <Text style={styles.quickStatLabel}>Top Rated</Text>
            </View>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatNumber}>{recruiters.filter(r => r.lastActive.includes('minutes')).length}</Text>
              <Text style={styles.quickStatLabel}>Online Now</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SvgIcon name="search" width={22} height={22} strokeColor={AppColors.AppButtonBackground} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recruiters, companies, skills..."
            placeholderTextColor="#999"
            value={searchTerm}
            onChangeText={handleSearch}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <SvgIcon name="close" width={20} height={20} strokeColor="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategorySelect(category)}
              activeOpacity={0.8}
            >
              {/* Button Background Layer */}
              <View style={[
                styles.categoryButtonInner,
                selectedCategory === category && styles.selectedCategoryButtonInner
              ]}>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}>
                  {category}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Enhanced Recruiters List */}
      <FlatList
        data={filteredRecruiters}
        renderItem={({item, index}) => <RecruiterCard item={item} index={index} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={AppColors.AppButtonBackground}
            colors={[AppColors.AppButtonBackground]}
          />
        }
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    position: 'relative',
    paddingBottom: 30,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: AppColors.AppButtonBackground,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    zIndex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: AppColors.White,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: AppColors.White,
    opacity: 0.9,
    fontWeight: '500',
  },
  headerStats: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerStatsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.White,
  },
  headerStatsLabel: {
    fontSize: 12,
    color: AppColors.White,
    opacity: 0.9,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 16,
    marginHorizontal: 10,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.White,
    marginBottom: 2,
  },
  quickStatLabel: {
    fontSize: 11,
    color: AppColors.White,
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: -15,
    marginBottom: 20,
    zIndex: 2,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.White,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  categoriesContainer: {
    marginBottom: 30,
    backgroundColor: '#F8F9FA',
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: '#2C3E50',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#2C3E50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 0,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    transform: [{scale: 1.05}],
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  categoryButtonInner: {
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    minHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButtonInner: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 8,
  },
  recruiterCard: {
    position: 'relative',
    backgroundColor: AppColors.White,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.08)',
    overflow: 'hidden',
  },
  trendingBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  trendingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: AppColors.White,
  },
  premiumGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: AppColors.AppButtonBackground,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: AppColors.AppBackground,
    borderWidth: 4,
    borderColor: AppColors.White,
  },
  activePulse: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: '#10B981',
    top: -4,
    left: -4,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: AppColors.AppButtonBackground,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: AppColors.White,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  recruiterInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recruiterName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1a1a1a',
    flex: 1,
    lineHeight: 26,
  },
  lastActiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeNow: {
    backgroundColor: '#E8F5E8',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  lastActive: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '700',
  },
  recruiterTitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
    fontWeight: '500',
  },
  company: {
    fontSize: 15,
    fontWeight: '700',
    color: AppColors.AppButtonBackground,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  responseRateHighlight: {
    position: 'relative',
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  responseRateBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: AppColors.AppButtonBackground,
    opacity: 0.1,
    borderRadius: 12,
  },
  responseRateText: {
    fontSize: 13,
    fontWeight: '700',
    color: AppColors.AppButtonBackground,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: '#f8f9ff',
    borderRadius: 16,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    backgroundColor: AppColors.White,
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: AppColors.AppButtonBackground,
    marginBottom: 4,
  },
  excellentRate: {
    color: '#10B981',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: '#f0f0ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.2)',
  },
  primaryTag: {
    backgroundColor: AppColors.AppButtonBackground,
    borderColor: AppColors.AppButtonBackground,
  },
  tagText: {
    fontSize: 11,
    color: AppColors.AppButtonBackground,
    fontWeight: '700',
  },
  primaryTagText: {
    color: AppColors.White,
  },
  moreTagsIndicator: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreTagsText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 18,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: AppColors.AppButtonBackground,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '800',
    color: AppColors.AppButtonBackground,
    marginLeft: 8,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.AppButtonBackground,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 18,
    minWidth: 120,
    justifyContent: 'center',
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  followingButton: {
    backgroundColor: '#E8F5E8',
    borderWidth: 2,
    borderColor: '#10B981',
    shadowColor: '#10B981',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: AppColors.White,
    marginLeft: 6,
  },
  followingButtonText: {
    color: '#10B981',
    fontWeight: '800',
    marginLeft: 0,
  },

  // Live Posts Styles
  livePostsSection: {
    marginBottom: 20,
    backgroundColor: '#f8f9ff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.1)',
  },
  livePostsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  livePostsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  livePostsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '600',
    color: AppColors.AppButtonBackground,
    marginRight: 4,
  },
  jobPostsContainer: {
    marginVertical: 8,
  },
  jobPostCard: {
    backgroundColor: AppColors.White,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  urgentTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 1,
  },
  urgentTagText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: AppColors.White,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 16,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: '800',
    color: AppColors.AppButtonBackground,
    marginBottom: 8,
  },
  jobDetails: {
    marginBottom: 8,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  jobDetailText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobPostedTime: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  jobApplicants: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  quickApplyButton: {
    backgroundColor: AppColors.AppButtonBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickApplyText: {
    fontSize: 11,
    fontWeight: '700',
    color: AppColors.White,
  },
});

export default RecruitersFollow;
