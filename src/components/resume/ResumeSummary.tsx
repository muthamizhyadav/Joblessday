import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppColors } from '../../constants/colors.config';
import SvgIcon from '../../shared/Svg';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

interface ResumeSummaryProps {
  user: {
    name: string;
    headline?: string;
    email: string;
    contact: string;
    city: string;
    state: string;
    bio?: string;
    educationDetails?: Array<{
      degree: string;
      institution: string;
      year: string;
      grade: string;
      keySkill?: string[];
    }>;
    employmentDetails?: Array<{
      CompanyName: string;
      role: string;
      fromDate: string;
      toDate: string;
      experience: number;
    }>;
  };
}

const ResumeSummary: React.FC<ResumeSummaryProps> = ({ user }) => {
  
  const getTotalExperience = () => {
    if (!user.employmentDetails || user.employmentDetails.length === 0) return 0;
    return user.employmentDetails.reduce((sum, exp) => sum + (exp.experience || 0), 0);
  };

  const getAllSkills = () => {
    if (!user.educationDetails || user.educationDetails.length === 0) return [];
    return user.educationDetails.reduce((skills, edu) => {
      if (edu.keySkill) {
        return [...skills, ...edu.keySkill];
      }
      return skills;
    }, [] as string[]);
  };

  const getLatestEducation = () => {
    if (!user.educationDetails || user.educationDetails.length === 0) return null;
    return user.educationDetails.sort((a, b) => 
      new Date(b.year).getTime() - new Date(a.year).getTime()
    )[0];
  };

  const getLatestJob = () => {
    if (!user.employmentDetails || user.employmentDetails.length === 0) return null;
    return user.employmentDetails.sort((a, b) => 
      new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime()
    )[0];
  };

  const totalExperience = getTotalExperience();
  const allSkills = getAllSkills();
  const latestEducation = getLatestEducation();
  const latestJob = getLatestJob();

  return (
    <Animatable.View animation="fadeInLeft" duration={800} style={styles.container}>
      <Text style={styles.title}>Professional Summary</Text>
      
      <View style={styles.summaryGrid}>
        {/* Experience Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <SvgIcon name="briefcase" strokeColor={AppColors.AppButtonBackground} width={24} height={24} />
            <Text style={styles.cardTitle}>Experience</Text>
          </View>
          <Text style={styles.cardValue}>
            {totalExperience > 0 ? `${totalExperience.toFixed(1)} years` : 'Fresher'}
          </Text>
          {latestJob && (
            <Text style={styles.cardSubtext}>
              {latestJob.role} at {latestJob.CompanyName}
            </Text>
          )}
        </View>

        {/* Education Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <SvgIcon name="education" strokeColor={AppColors.AppButtonBackground} width={24} height={24} />
            <Text style={styles.cardTitle}>Education</Text>
          </View>
          {latestEducation ? (
            <>
              <Text style={styles.cardValue}>{latestEducation.degree}</Text>
              <Text style={styles.cardSubtext}>
                {latestEducation.institution} ({moment(latestEducation.year).format('YYYY')})
              </Text>
            </>
          ) : (
            <Text style={styles.cardValue}>Not specified</Text>
          )}
        </View>

        {/* Skills Summary */}
        <View style={[styles.summaryCard, styles.skillsCard]}>
          <View style={styles.cardHeader}>
            <SvgIcon name="setting" strokeColor={AppColors.AppButtonBackground} width={24} height={24} />
            <Text style={styles.cardTitle}>Skills</Text>
          </View>
          <Text style={styles.cardValue}>{allSkills.length} Skills</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.skillsScroll}
          >
            {allSkills.slice(0, 5).map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillChipText}>{skill}</Text>
              </View>
            ))}
            {allSkills.length > 5 && (
              <View style={styles.moreSkillsChip}>
                <Text style={styles.moreSkillsText}>+{allSkills.length - 5}</Text>
              </View>
            )}
          </ScrollView>
        </View>

        {/* Location Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <SvgIcon name="location" strokeColor={AppColors.AppButtonBackground} width={24} height={24} />
            <Text style={styles.cardTitle}>Location</Text>
          </View>
          <Text style={styles.cardValue}>{user.city}</Text>
          <Text style={styles.cardSubtext}>{user.state}</Text>
        </View>
      </View>

      {/* Bio Section */}
      {user.bio && (
        <View style={styles.bioContainer}>
          <Text style={styles.bioTitle}>About</Text>
          <Text style={styles.bioText} numberOfLines={4}>
            {user.bio}
          </Text>
        </View>
      )}

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.employmentDetails?.length || 0}</Text>
          <Text style={styles.statLabel}>Companies</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.educationDetails?.length || 0}</Text>
          <Text style={styles.statLabel}>Qualifications</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{allSkills.length}</Text>
          <Text style={styles.statLabel}>Total Skills</Text>
        </View>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.AppButtonBackground,
  },
  skillsCard: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
  },
  skillsScroll: {
    marginTop: 8,
  },
  skillChip: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  skillChipText: {
    color: AppColors.AppButtonBackground,
    fontSize: 11,
    fontWeight: '500',
  },
  moreSkillsChip: {
    backgroundColor: '#e9ecef',
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  moreSkillsText: {
    color: '#666',
    fontSize: 11,
    fontWeight: '500',
  },
  bioContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppColors.AppBackground,
    borderRadius: 12,
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
});

export default ResumeSummary;
