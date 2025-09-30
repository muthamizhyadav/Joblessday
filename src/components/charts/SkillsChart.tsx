import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AppColors } from '../../constants/colors.config';

interface SkillsChartProps {
  skills: string[];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ skills }) => {
  const screenWidth = Dimensions.get('window').width;
  
  // Create pie chart data from skills
  const skillCategories = {
    'Technical': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'HTML', 'CSS', 'SQL', 'MongoDB', 'Git'],
    'Design': ['UI/UX', 'Figma', 'Photoshop', 'Illustrator', 'Sketch', 'Adobe XD'],
    'Management': ['Project Management', 'Team Leadership', 'Agile', 'Scrum', 'Planning'],
    'Communication': ['Presentation', 'Writing', 'Public Speaking', 'Documentation'],
    'Other': []
  };

  const categorizeSkills = () => {
    const categorized = {
      'Technical': 0,
      'Design': 0,
      'Management': 0,
      'Communication': 0,
      'Other': 0
    };

    skills.forEach(skill => {
      let categorized_flag = false;
      Object.entries(skillCategories).forEach(([category, categorySkills]) => {
        if (categorySkills.some(catSkill => 
          skill.toLowerCase().includes(catSkill.toLowerCase()) || 
          catSkill.toLowerCase().includes(skill.toLowerCase())
        )) {
          categorized[category]++;
          categorized_flag = true;
        }
      });
      if (!categorized_flag) {
        categorized['Other']++;
      }
    });

    return Object.entries(categorized)
      .filter(([_, count]) => count > 0)
      .map(([name, count], index) => ({
        name,
        count,
        color: [
          AppColors.AppButtonBackground,
          '#FF6B6B',
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4'
        ][index % 5],
        legendFontColor: '#333',
        legendFontSize: 12,
      }));
  };

  const chartData = categorizeSkills();

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  if (skills.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No skills data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Skills & Expertise</Text>
        <Text style={styles.subtitle}>{skills.length} skills total</Text>
      </View>
      
      {/* Modern Card-based Skills Display */}
      <View style={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <View key={index} style={[styles.skillCard, { 
            backgroundColor: [
              '#E8F4FD', '#FFF3E0', '#F3E5F5', '#E8F5E8', '#FFEBEE',
              '#F1F8E9', '#E3F2FD', '#FCE4EC', '#FFFDE7'
            ][index % 9]
          }]}>
            <View style={[styles.skillIcon, {
              backgroundColor: [
                AppColors.AppButtonBackground, '#FF9800', '#9C27B0', '#4CAF50', '#F44336',
                '#8BC34A', '#2196F3', '#E91E63', '#FFEB3B'
              ][index % 9]
            }]} />
            <Text style={styles.skillCardText}>{skill}</Text>
            <View style={styles.skillLevel}>
              <View style={[styles.skillLevelBar, { 
                width: `${Math.floor(Math.random() * 40) + 60}%`,
                backgroundColor: [
                  AppColors.AppButtonBackground, '#FF9800', '#9C27B0', '#4CAF50', '#F44336',
                  '#8BC34A', '#2196F3', '#E91E63', '#FFEB3B'
                ][index % 9]
              }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Category Overview */}
      {chartData.length > 0 && (
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Skill Categories</Text>
          <View style={styles.categoryGrid}>
            {chartData.map((category, index) => (
              <View key={index} style={styles.categoryCard}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]} />
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} skills</Text>
                </View>
                <View style={styles.categoryProgress}>
                  <View 
                    style={[
                      styles.categoryProgressBar, 
                      { 
                        width: `${(category.count / skills.length) * 100}%`,
                        backgroundColor: category.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Skills Statistics */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{skills.length}</Text>
          <Text style={styles.statLabel}>Total Skills</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{chartData.length}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {chartData.find(cat => cat.name === 'Technical')?.count || 0}
          </Text>
          <Text style={styles.statLabel}>Technical</Text>
        </View>
      </View>
    </View>
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
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  skillCard: {
    width: '48%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  skillIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  skillCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  skillLevel: {
    height: 3,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillLevelBar: {
    height: '100%',
    borderRadius: 2,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  categoryGrid: {
    gap: 10,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  categoryProgress: {
    width: 60,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  categoryProgressBar: {
    height: '100%',
    borderRadius: 2,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 15,
  },
  statCard: {
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
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  skillBadge: {
    backgroundColor: AppColors.AppBackground,
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  skillText: {
    color: AppColors.AppButtonBackground,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SkillsChart;
