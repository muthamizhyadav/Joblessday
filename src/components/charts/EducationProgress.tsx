import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { AppColors } from '../../constants/colors.config';
import moment from 'moment';

interface EducationProgressProps {
  educationDetails: Array<{
    degree: string;
    institution: string;
    year: string;
    grade: string;
    keySkill?: string[];
  }>;
}

const EducationProgress: React.FC<EducationProgressProps> = ({ educationDetails }) => {
  
  const getEducationLevel = (degree: string): number => {
    const degreeLevel = {
      '10th': 1,
      '12th': 2,
      'diploma': 2.5,
      'undergraduate': 3,
      'ug': 3,
      'bachelor': 3,
      'postgraduate': 4,
      'pg': 4,
      'master': 4,
      'phd': 5,
      'doctorate': 5,
    };

    const lowerDegree = degree.toLowerCase();
    for (const [key, level] of Object.entries(degreeLevel)) {
      if (lowerDegree.includes(key)) {
        return level;
      }
    }
    return 2; // Default level
  };

  const getGradePercentage = (grade: string): number => {
    // Extract percentage or convert GPA to percentage
    const numericGrade = parseFloat(grade.replace(/[^\d.]/g, ''));
    
    if (grade.toLowerCase().includes('gpa') || numericGrade <= 10) {
      // Convert GPA to percentage (assuming 4.0 scale)
      return Math.min((numericGrade / 10) * 100, 100);
    } else if (numericGrade <= 100) {
      return numericGrade;
    }
    return 75; // Default grade
  };

  const educationLevels = [
    { name: '10th Grade', level: 1, color: '#FF6B6B' },
    { name: '12th Grade', level: 2, color: '#4ECDC4' },
    { name: 'Diploma', level: 2.5, color: '#45B7D1' },
    { name: 'Undergraduate', level: 3, color: '#96CEB4' },
    { name: 'Postgraduate', level: 4, color: AppColors.AppButtonBackground },
    { name: 'PhD/Doctorate', level: 5, color: '#8E44AD' },
  ];

  const maxLevel = Math.max(...educationDetails.map(edu => getEducationLevel(edu.degree)), 0);

  if (educationDetails.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No education data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Education & Qualifications</Text>
        <Text style={styles.subtitle}>{educationDetails.length} qualification{educationDetails.length !== 1 ? 's' : ''}</Text>
      </View>
      
      {/* Modern Education Timeline */}
      <View style={styles.timelineContainer}>
        <Text style={styles.sectionTitle}>Academic Journey</Text>
        {educationLevels
          .filter(level => level.level <= maxLevel)
          .map((level, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineIndicator}>
                <View 
                  style={[styles.timelineDot, { 
                    backgroundColor: level.level <= maxLevel ? level.color : '#E0E0E0' 
                  }]} 
                />
                {index < educationLevels.filter(l => l.level <= maxLevel).length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.levelName}>{level.name}</Text>
                <View style={styles.progressContainer}>
                  <Progress.Bar
                    progress={level.level <= maxLevel ? 1 : 0}
                    width={null}
                    height={6}
                    color={level.color}
                    unfilledColor="#F0F0F0"
                    borderWidth={0}
                    style={styles.progressBar}
                  />
                </View>
              </View>
            </View>
          ))}
      </View>

      {/* Individual Education Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Qualifications</Text>
        {educationDetails.map((edu, index) => {
          const gradePercentage = getGradePercentage(edu.grade);
          const level = getEducationLevel(edu.degree);
          const levelInfo = educationLevels.find(l => l.level === level) || educationLevels[2];
          
          return (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <View style={styles.gradeContainer}>
                  <Text style={styles.gradeText}>{edu.grade}</Text>
                </View>
              </View>
              
              <Text style={styles.institution}>{edu.institution}</Text>
              <Text style={styles.year}>
                {moment(edu.year).isValid() ? moment(edu.year).format('YYYY') : edu.year}
              </Text>
              
              {/* Grade Progress Bar */}
              <View style={styles.gradeProgress}>
                <Text style={styles.gradeLabel}>Performance</Text>
                <Progress.Bar
                  progress={gradePercentage / 100}
                  width={null}
                  height={10}
                  color={
                    gradePercentage >= 85 ? '#4CAF50' :
                    gradePercentage >= 70 ? '#FF9800' :
                    gradePercentage >= 60 ? '#FFC107' : '#F44336'
                  }
                  unfilledColor="#E0E0E0"
                  borderWidth={0}
                  style={styles.gradeProgressBar}
                />
                <Text style={styles.gradePercentage}>{gradePercentage.toFixed(1)}%</Text>
              </View>

              {/* Skills from education */}
              {edu.keySkill && edu.keySkill.length > 0 && (
                <View style={styles.skillsContainer}>
                  <Text style={styles.skillsTitle}>Skills Acquired:</Text>
                  <View style={styles.skillsWrapper}>
                    {edu.keySkill.slice(0, 3).map((skill, skillIndex) => (
                      <View key={skillIndex} style={styles.skillBadge}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                    {edu.keySkill.length > 3 && (
                      <Text style={styles.moreSkills}>+{edu.keySkill.length - 3} more</Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  journeyContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  levelItem: {
    marginBottom: 15,
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  levelName: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  levelIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressBar: {
    borderRadius: 4,
  },
  detailsContainer: {
    marginTop: 10,
  },
  educationItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.AppButtonBackground,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  degree: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  gradeContainer: {
    backgroundColor: AppColors.AppBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  institution: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontWeight: '500',
  },
  year: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  gradeProgress: {
    marginBottom: 10,
  },
  gradeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  gradeProgressBar: {
    borderRadius: 5,
    marginBottom: 5,
  },
  gradePercentage: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillsTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  skillsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  skillBadge: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 4,
  },
  skillText: {
    color: AppColors.AppButtonBackground,
    fontSize: 10,
    fontWeight: '500',
  },
  moreSkills: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timelineContainer: {
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineIndicator: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 10,
  },
  progressContainer: {
    marginTop: 8,
  },
});

export default EducationProgress;
