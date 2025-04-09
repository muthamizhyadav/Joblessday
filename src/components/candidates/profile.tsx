import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  useColorScheme 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Type definitions
interface Skill {
  id: number;
  name: string;
}

interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  duration: string;
}

interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

interface CandidateProfileProps {
  name: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

const CandidateProfiles: React.FC<CandidateProfileProps> = ({
  name,
  skills,
  experience,
  education,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  // Dynamic styles
  const containerStyle = {
    backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#2D2D2D' : '#FFFFFF',
    shadowColor: isDarkMode ? '#000' : '#A0A0A0',
  };

  return (
    <ScrollView 
      style={[styles.container, containerStyle]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Card */}
      <View style={[styles.headerCard, cardStyle]}>
        <Icon name="person" size={28} color="#4A90E2" />
        <Text style={[styles.name, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
          {name}
        </Text>
      </View>

      {/* Skills Card */}
      <View style={[styles.card, cardStyle]}>
        <View style={styles.sectionHeader}>
          <Icon name="code" size={20} color="#4A90E2" />
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
            Skills
          </Text>
        </View>
        <View style={styles.skillsContainer}>
          {skills.map(skill => (
            <View key={skill.id} style={styles.skillPill}>
              <Text style={styles.skillText}>{skill.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Experience Card */}
      <View style={[styles.card, cardStyle]}>
        <View style={styles.sectionHeader}>
          <Icon name="work" size={20} color="#4A90E2" />
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
            Experience
          </Text>
        </View>
        {experience.map(exp => (
          <View key={exp.id} style={styles.experienceItem}>
            <View style={styles.bulletPoint} />
            <View style={styles.experienceDetails}>
              <Text style={[styles.jobTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
                {exp.jobTitle}
              </Text>
              <Text style={[styles.company, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>
                {exp.company}
              </Text>
              <Text style={[styles.duration, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>
                {exp.duration}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Education Card */}
      <View style={[styles.card, cardStyle]}>
        <View style={styles.sectionHeader}>
          <Icon name="school" size={20} color="#4A90E2" />
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
            Education
          </Text>
        </View>
        {education.map(edu => (
          <View key={edu.id} style={styles.educationItem}>
            <Text style={[styles.degree, { color: isDarkMode ? '#FFF' : '#1A1A1A' }]}>
              {edu.degree}
            </Text>
            <Text style={[styles.institution, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>
              {edu.institution}
            </Text>
            <Text style={[styles.educationYear, { color: isDarkMode ? '#B0B0B0' : '#666' }]}>
              {edu.year}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  headerCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    backgroundColor: '#E8F1FF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  skillText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  experienceItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginTop: 8,
    marginRight: 12,
  },
  experienceDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
  },
  educationItem: {
    marginBottom: 16,
  },
  degree: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  institution: {
    fontSize: 14,
    marginBottom: 2,
  },
  educationYear: {
    fontSize: 12,
  },
});

export default CandidateProfiles;