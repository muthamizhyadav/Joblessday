import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { AppColors } from '../../../constants/colors.config';
import SvgIcon from '../../../shared/Svg';

export const CandidateProfile: React.FC = () => {
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
    activeJobsList: [
      {id: 1, title: 'Senior React Developer', applicants: 45},
      {id: 2, title: 'DevOps Engineer', applicants: 32},
      {id: 3, title: 'Mobile Team Lead', applicants: 28},
    ],
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
      <Text style={styles.name}>{profileData.name}</Text>
      <Text style={styles.position}>{profileData.position}</Text>
      <Text style={styles.company}>{profileData.company}</Text>

      <TouchableOpacity style={styles.editButton}>
        <SvgIcon name="edit" strokeColor="#fff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
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
        <Text style={styles.contactText}>{profileData.email}</Text>
      </View>
      <View style={styles.contactItem}>
        <SvgIcon name="phone" strokeColor="#666" />
        <Text style={styles.contactText}>{profileData.phone}</Text>
      </View>
      <View style={styles.contactItem}>
        <SvgIcon name="location" strokeColor="#666" />
        <Text style={styles.contactText}>{profileData.location}</Text>
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
        <TouchableOpacity>
          <Text style={styles.editSectionText}>Edit Bio</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bioText}>{profileData.bio}</Text>
    </View>

    {/* Skills Section */}
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Areas of Expertise</Text>
      <View style={styles.skillsContainer}>
        {profileData.skills.map((skill, index) => (
          <View key={index} style={styles.skillTag}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </View>

    {/* Active Jobs */}
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Active Job Postings</Text>
        <TouchableOpacity>
          <Text style={styles.editSectionText}>View All</Text>
        </TouchableOpacity>
      </View>
      {profileData.activeJobsList.map(job => (
        <TouchableOpacity key={job.id} style={styles.jobCard}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.applicantsText}>
            {job.applicants} Applicants
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <TouchableOpacity style={styles.postJobButton}>
      <Text style={styles.postJobButtonText}>Post New Job</Text>
    </TouchableOpacity>
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
    textDecorationLine:'underline'
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
    marginBottom:100
  },
  postJobButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});