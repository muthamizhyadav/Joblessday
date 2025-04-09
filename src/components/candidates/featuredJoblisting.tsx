import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  ListRenderItem,
} from 'react-native';

// Type definitions
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: RoleType;
  experience: ExperienceLevel;
  requirements: string[];
  skills: string[];
}

enum RoleType {
  ALL = 'All',
  FULL_TIME = 'Full-time',
  CONTRACT = 'Contract',
}

enum ExperienceLevel {
  ALL = 'All',
  JUNIOR = 'Junior',
  MID = 'Mid',
  SENIOR = 'Senior',
}

interface FeaturedJobListingsProps {
  isLoggedIn: boolean;
}

interface FilterButtonProps<T> {
  value: T;
  currentValue: T;
  label: string;
  onPress: (value: T) => void;
}

// Main component
const FeaturedJobListings: React.FC<FeaturedJobListingsProps> = ({
  isLoggedIn,
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(RoleType.ALL);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel>(
    ExperienceLevel.ALL,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data with proper typing
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior React Native Developer',
      company: 'Tech Corp Inc',
      location: 'Remote',
      type: RoleType.FULL_TIME,
      experience: ExperienceLevel.SENIOR,
      requirements: [
        '5+ years experience',
        'Mobile app portfolio',
        'Immediate start',
      ],
      skills: ['React Native', 'Redux', 'TypeScript'],
    },
    {
      id: '2',
      title: 'Junior Mobile Developer',
      company: 'StartUp Hub',
      location: 'New York, NY',
      type: RoleType.CONTRACT,
      experience: ExperienceLevel.JUNIOR,
      requirements: ['1+ years experience', 'Computer Science degree'],
      skills: ['JavaScript', 'React'],
    },
  ]);

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const handleQuickApply = (jobId: string) => {
    if (!isLoggedIn) {
      // Navigate to login screen
      return;
    }
    setAppliedJobs(prev => [...prev, jobId]);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === RoleType.ALL || job.type === selectedRole;
    const matchesExperience =
      selectedExperience === ExperienceLevel.ALL ||
      job.experience === selectedExperience;
    return matchesSearch && matchesRole && matchesExperience;
  });

  const JobCard: ListRenderItem<Job> = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.location}>{item.location}</Text>

      <View style={styles.requirementsContainer}>
        {item.requirements.map((req, index) => (
          <Text key={index} style={styles.requirement}>
            {req}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.applyButton,
          appliedJobs.includes(item.id) && styles.appliedButton,
        ]}
        onPress={() => handleQuickApply(item.id)}
        disabled={appliedJobs.includes(item.id)}>
        <Text style={styles.buttonText}>
          {appliedJobs.includes(item.id) ? 'Applied ✓' : 'Quick Apply'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FilterGroup
          label="Role Type:"
          values={Object.values(RoleType)}
          selectedValue={selectedRole}
          onValueChange={setSelectedRole}
        />

        <FilterGroup
          label="Experience:"
          values={Object.values(ExperienceLevel)}
          selectedValue={selectedExperience}
          onValueChange={setSelectedExperience}
        />
      </ScrollView>

      <FlatList
        data={filteredJobs}
        renderItem={JobCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Reusable Filter Group component
const FilterGroup: React.FC<{
  label: string;
  values: string[];
  selectedValue: string;
  onValueChange: (value: any) => void;
}> = ({label, values, selectedValue, onValueChange}) => (
  <View style={styles.filterGroup}>
    <Text style={styles.filterLabel}>{label}</Text>
    {values.map(value => (
      <TouchableOpacity
        key={value}
        style={[
          styles.filterButton,
          selectedValue === value && styles.selectedFilter,
        ]}
        onPress={() => onValueChange(value)}>
        <Text style={styles.filterButtonText}>{value}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Styles remain mostly the same as previous JS version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 12,
  },
  requirementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  requirement: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  applyButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  filterLabel: {
    marginRight: 8,
    color: '#666',
  },
  filterButton: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
  },
  selectedFilter: {
    backgroundColor: '#2196F3',
  },
  filterButtonText: {
    color: '#333',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: 200,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listContent: {
    paddingBottom: 32,
  },
});

export {FeaturedJobListings, RoleType, ExperienceLevel};
export type {Job};
