import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import SearchBar from '../../../shared/searchInput';
import {AppColors} from '../../../constants/colors.config';
import SvgIcon from '../../../shared/Svg';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useFetchActiveJobsMutation} from '../../../api/api';
import Amount from '../../../shared/amount';
import TimeRange from '../../../shared/timeRange';

const {width} = Dimensions.get('window');

interface LiveJobPost {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: { min: number; max: number; currency: string };
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  expiresAt: Date;
  postedTime: string;
  remainingHours: number;
  remainingMinutes: number;
  applicants: number;
  maxApplicants: number;
  isLive: boolean;
  isExpiringSoon: boolean;
  employerName: string;
  employerTitle: string;
  responseRate: number;
  tags: string[];
  status: 'applied' | 'rejected' | 'shortlisted' | null;
  liveIndicator: 'high' | 'medium' | 'low';
}

export const CandidateJoblist: React.FC = () => {
  const navigation = useNavigation<any>();
  const [jobsLists, setJobLists] = useState<LiveJobPost[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<LiveJobPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Helper function to calculate remaining time
  const calculateRemainingTime = (expiresAt: Date) => {
    const now = new Date();
    const timeDiff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours: Math.max(0, hours), minutes: Math.max(0, minutes) };
  };

  // Live job data with 24-hour expiry concept
  const dummyJobs: LiveJobPost[] = [
    {
      id: '1',
      title: 'Senior React Native Developer',
      company: 'TechCorp Solutions',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Bangalore, Karnataka',
      salary: { min: 1200000, max: 1800000, currency: '₹' },
      type: 'Full-time',
      experience: '3-5 Years',
      description: 'LIVE JOB: Immediate hiring for React Native developer! Interview slots filling fast.',
      requirements: ['React Native', 'JavaScript/TypeScript', 'Redux', 'Git', 'RESTful APIs'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Remote Work', 'Learning Budget'],
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // 22 hours remaining
      postedTime: '2 hours ago',
      remainingHours: 22,
      remainingMinutes: 0,
      applicants: 24,
      maxApplicants: 50,
      isLive: true,
      isExpiringSoon: false,
      employerName: 'Sarah Johnson',
      employerTitle: 'Technical Recruiter',
      responseRate: 95,
      tags: ['React Native', 'Mobile', 'JavaScript'],
      status: null,
      liveIndicator: 'high',
    },
    {
      id: '2',
      title: 'AI/ML Engineer',
      company: 'DataVision Labs',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Hyderabad, Telangana',
      salary: { min: 1500000, max: 2500000, currency: '₹' },
      type: 'Full-time',
      experience: '2-4 Years',
      description: 'LIVE: AI/ML position available for 24 hours only. Quick interview process!',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science'],
      benefits: ['Stock Options', 'Health Coverage', 'Gym Membership', 'Free Meals'],
      postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours remaining
      postedTime: '4 hours ago',
      remainingHours: 20,
      remainingMinutes: 0,
      applicants: 18,
      maxApplicants: 30,
      isLive: true,
      isExpiringSoon: false,
      employerName: 'Michael Chen',
      employerTitle: 'Head of AI',
      responseRate: 88,
      tags: ['AI/ML', 'Python', 'Data Science'],
      status: 'applied',
      liveIndicator: 'high',
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'CloudVision',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Mumbai, Maharashtra',
      salary: { min: 1000000, max: 1600000, currency: '₹' },
      type: 'Remote',
      experience: '2-3 Years',
      description: 'URGENT LIVE HIRING: DevOps role expires in 2 hours! Apply immediately.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
      benefits: ['Remote Work', 'Health Insurance', 'Performance Bonus', 'Training Programs'],
      postedAt: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours remaining
      postedTime: '22 hours ago',
      remainingHours: 2,
      remainingMinutes: 15,
      applicants: 31,
      maxApplicants: 35,
      isLive: true,
      isExpiringSoon: true,
      employerName: 'Priya Sharma',
      employerTitle: 'DevOps Lead',
      responseRate: 92,
      tags: ['DevOps', 'AWS', 'Docker'],
      status: null,
      liveIndicator: 'high',
    },
    {
      id: '4',
      title: 'Frontend Developer',
      company: 'WebCraft Studios',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Chennai, Tamil Nadu',
      salary: { min: 800000, max: 1400000, currency: '₹' },
      type: 'Hybrid',
      experience: '1-3 Years',
      description: 'LIVE JOB: Frontend developer needed. 24-hour application window.',
      requirements: ['React', 'HTML/CSS', 'JavaScript', 'Responsive Design', 'Git'],
      benefits: ['Flexible Schedule', 'Health Coverage', 'Learning Allowance', 'Team Outings'],
      postedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000), // 16 hours remaining
      postedTime: '8 hours ago',
      remainingHours: 16,
      remainingMinutes: 30,
      applicants: 42,
      maxApplicants: 60,
      isLive: true,
      isExpiringSoon: false,
      employerName: 'Lisa Anderson',
      employerTitle: 'Frontend Lead',
      responseRate: 85,
      tags: ['Frontend', 'React', 'Web Development'],
      status: 'shortlisted',
      liveIndicator: 'medium',
    },
    {
      id: '5',
      title: 'Backend Developer',
      company: 'ServerTech Inc',
      companyLogo: 'https://via.placeholder.com/60',
      location: 'Pune, Maharashtra',
      salary: { min: 900000, max: 1500000, currency: '₹' },
      type: 'Full-time',
      experience: '2-4 Years',
      description: 'LIVE: Backend developer position expires in 1 hour! Limited slots available.',
      requirements: ['Node.js', 'MongoDB', 'Express.js', 'AWS', 'Microservices'],
      benefits: ['Health Insurance', 'Work from Home', 'Skill Development', 'Performance Incentives'],
      postedAt: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour remaining
      postedTime: '23 hours ago',
      remainingHours: 1,
      remainingMinutes: 5,
      applicants: 28,
      maxApplicants: 30,
      isLive: true,
      isExpiringSoon: true,
      employerName: 'Raj Kumar',
      employerTitle: 'Backend Architect',
      responseRate: 90,
      tags: ['Backend', 'Node.js', 'API Development'],
      status: null,
      liveIndicator: 'high',
    },
  ];

  const filterOptions = ['🔴 Live Now', 'All', '⚡ Expiring Soon', 'Full-time', 'Remote', 'Hybrid'];

  useEffect(() => {
    setJobLists(dummyJobs);
    setFilteredJobs(dummyJobs);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterJobs(term, selectedFilter);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    filterJobs(searchTerm, filter);
  };

  const filterJobs = (search: string, filter: string) => {
    let filtered = jobsLists;

    if (search) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (filter !== 'All') {
      if (filter === '🔴 Live Now') {
        filtered = filtered.filter(job => job.isLive);
      } else if (filter === '⚡ Expiring Soon') {
        filtered = filtered.filter(job => job.isExpiringSoon);
      } else {
        filtered = filtered.filter(job => job.type === filter);
      }
    }

    // Sort by remaining time (expiring soon first)
    filtered.sort((a, b) => {
      if (a.isExpiringSoon && !b.isExpiringSoon) return -1;
      if (!a.isExpiringSoon && b.isExpiringSoon) return 1;
      return (a.remainingHours * 60 + a.remainingMinutes) - (b.remainingHours * 60 + b.remainingMinutes);
    });

    setFilteredJobs(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string | null | undefined) => {
    switch (status) {
      case 'applied': return '#3B82F6';
      case 'shortlisted': return '#10B981';
      case 'rejected': return '#EF4444';
      default: return AppColors.AppButtonBackground;
    }
  };

  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case 'applied': return 'Applied';
      case 'shortlisted': return 'Shortlisted';
      case 'rejected': return 'Rejected';
      default: return 'Apply Now';
    }
  };

  const JobCard = ({item}: {item: LiveJobPost}) => (
    <View style={[styles.jobCard, item.isExpiringSoon && styles.expiringJobCard]}>
      {/* Live Status Banner */}
      {item.isLive && (
        <View style={[styles.liveBanner, item.isExpiringSoon && styles.expiringBanner]}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>
            {item.isExpiringSoon ? '⚡ Expiring Soon' : '🔴 Live Now'}
          </Text>
          <Text style={styles.timeRemaining}>
            {item.remainingHours}h {item.remainingMinutes}m left
          </Text>
        </View>
      )}

      {/* Company Header */}
      <View style={styles.companyHeader}>
        <Image source={{uri: item.companyLogo}} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{item.company}</Text>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <View style={styles.locationRow}>
            <SvgIcon name="location" width={14} height={14} strokeColor="#666" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.salaryContainer}>
          <Text style={styles.salary}>
            {item.salary.currency}{(item.salary.min / 100000).toFixed(1)}L - {(item.salary.max / 100000).toFixed(1)}L
          </Text>
          <Text style={styles.salaryLabel}>per annum</Text>
        </View>
      </View>

      {/* Job Details */}
      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <SvgIcon name="briefcase" width={16} height={16} strokeColor="#666" />
          <Text style={styles.detailText}>{item.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <SvgIcon name="userGroup" width={16} height={16} strokeColor="#666" />
          <Text style={styles.detailText}>{item.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <SvgIcon name="clock" width={16} height={16} strokeColor="#666" />
          <Text style={styles.detailText}>Posted {item.postedTime}</Text>
        </View>
      </View>

      {/* Job Description */}
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Skills Tags */}
      <View style={styles.skillsContainer}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{tag}</Text>
          </View>
        ))}
        {item.tags.length > 3 && (
          <View style={styles.moreSkillsTag}>
            <Text style={styles.moreSkillsText}>+{item.tags.length - 3}</Text>
          </View>
        )}
      </View>

      {/* Employer Info */}
      <View style={styles.employerInfo}>
        <View style={styles.employerDetails}>
          <View style={styles.employerNameRow}>
            <Text style={styles.employerName}>👤 {item.employerName}</Text>
            <TouchableOpacity 
              style={styles.followButton}
              onPress={() => console.log('Follow pressed for:', item.employerName)}
            >
              <Text style={styles.followButtonText}>+ Follow</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.employerTitle}>{item.employerTitle}</Text>
        </View>
        <View style={styles.responseRate}>
          <Text style={styles.responseRateText}>{item.responseRate}% response rate</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.applicantsInfo}>
          <SvgIcon name="userGroup" width={16} height={16} strokeColor="#666" />
          <Text style={styles.applicantsText}>{item.applicants} applicants</Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.applyButton, 
            {backgroundColor: item.isExpiringSoon ? '#FF4757' : '#007AFF'},
            item.status === 'rejected' && {backgroundColor: '#999'}
          ]}
          onPress={() => navigation.navigate('jobdetail', {id: item.id})}
          disabled={item.status === 'rejected'}>
          <Text style={styles.applyButtonText}>
            {item.isExpiringSoon ? 'Apply Fast!' : 'Apply Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <SvgIcon
              name="back"
              width={24}
              height={24}
              strokeColor={AppColors.White}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Job Opportunities</Text>
            <Text style={styles.headerSubtitle}>{filteredJobs.length} jobs available</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <SvgIcon name="bell" width={24} height={24} strokeColor={AppColors.White} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            onSearch={handleSearch}
            style={styles.searchBar}
            placeholder="Search jobs, companies, locations..."
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}>
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.activeFilterTab
              ]}
              onPress={() => handleFilterSelect(filter)}>
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({item}) => <JobCard item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[AppColors.AppButtonBackground]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../../assets/images/Empty.png')}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No jobs found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filters to find more opportunities
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{height: 20}} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  header: {
    backgroundColor: AppColors.AppButtonBackground,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.White,
  },
  headerSubtitle: {
    fontSize: 14,
    color: AppColors.White,
    opacity: 0.8,
    marginTop: 2,
  },
  notificationButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
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
  searchContainer: {
    paddingHorizontal: 20,
  },
  searchBar: {
    width: '100%',
  },

  // Filter Styles
  filterContainer: {
    backgroundColor: AppColors.White,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  filterScrollContainer: {
    paddingHorizontal: 20,
  },
  filterTab: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  activeFilterTab: {
    backgroundColor: AppColors.AppButtonBackground,
    borderColor: AppColors.AppButtonBackground,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: AppColors.White,
  },

  // Job Card Styles
  listContainer: {
    padding: 16,
  },
  jobCard: {
    backgroundColor: AppColors.White,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  urgentBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FF4757',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: AppColors.White,
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    lineHeight: 24,
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
  salaryContainer: {
    alignItems: 'flex-end',
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  salaryLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: 'rgba(105, 75, 195, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 10,
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
  },
  moreSkillsTag: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  moreSkillsText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  employerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  employerDetails: {
    flex: 1,
  },
  employerNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  employerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  employerTitle: {
    fontSize: 10,
    color: '#666',
  },
  responseRate: {
    alignItems: 'flex-end',
  },
  responseRateText: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '600',
  },
  followButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  followButtonText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#fff',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicantsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  applyButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  applyButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: AppColors.White,
  },

  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },

  // Live Job Styles
  expiringJobCard: {
    borderWidth: 2,
    borderColor: '#FF4757',
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  liveBanner: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    borderRadius: 8,
  },
  expiringBanner: {
    backgroundColor: '#FF4757',
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  timeRemaining: {
    fontSize: 11,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.9,
  },
});
