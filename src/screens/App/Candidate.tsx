import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SearchBar from '../../shared/searchInput';
import SvgIcon from '../../shared/Svg';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../constants/colors.config';
import {FlatList} from 'react-native-gesture-handler';

interface CandidateCardProps {
  name: string;
  match: string;
  title: string;
  location: string;
  experience: string;
  skills: any[];
  status: boolean;
}
const candidates = [
  {
    name: 'Michael Chen',
    title: 'Lead UX Designer',
    location: 'San Francisco, CA',
    experience: '10 years',
    skills: ['Sketch', 'User Flows', 'Interaction Design', 'HTML/CSS'],
    status: 'Open to opportunities',
    match: '95%',
  },
  {
    name: 'Emma Wilson',
    title: 'UX Researcher',
    location: 'Austin, TX',
    experience: '6 years',
    skills: [
      'User Interviews',
      'Data Analysis',
      'Usability Testing',
      'Survey Design',
    ],
    status: 'Actively looking',
    match: '89%',
  },
  {
    name: 'James Rodriguez',
    title: 'Product Designer',
    location: 'Chicago, IL',
    experience: '7 years',
    skills: ['Adobe XD', 'Design Systems', 'Motion Design', 'Frontend Basics'],
    status: 'Open to opportunities',
    match: '91%',
  },
  {
    name: 'Priya Patel',
    title: 'UI/UX Developer',
    location: 'Seattle, WA',
    experience: '9 years',
    skills: ['React', 'JavaScript', 'Responsive Design', 'Accessibility'],
    status: 'Not looking',
    match: '87%',
  },
  {
    name: 'David Kim',
    title: 'Interaction Designer',
    location: 'Boston, MA',
    experience: '5 years',
    skills: [
      'After Effects',
      'Microinteractions',
      'Wireframing',
      'User Testing',
    ],
    status: 'Actively looking',
    match: '93%',
  },
  {
    name: 'Linda Martinez',
    title: 'UX Strategist',
    location: 'Los Angeles, CA',
    experience: '12 years',
    skills: [
      'Service Design',
      'CX Strategy',
      'Workshop Facilitation',
      'Journey Mapping',
    ],
    status: 'Open to opportunities',
    match: '96%',
  },
  {
    name: 'Ahmed Ali',
    title: 'Visual Designer',
    location: 'Miami, FL',
    experience: '4 years',
    skills: ['Branding', 'Illustration', 'Typography', 'Adobe Creative Suite'],
    status: 'Actively looking',
    match: '85%',
  },
  {
    name: 'Sophia Lee',
    title: 'UX Content Specialist',
    location: 'Denver, CO',
    experience: '5 years',
    skills: [
      'Content Strategy',
      'Copywriting',
      'Information Architecture',
      'SEO',
    ],
    status: 'Not looking',
    match: '88%',
  },
  {
    name: 'Daniel Nguyen',
    title: 'Mobile App Designer',
    location: 'Atlanta, GA',
    experience: '6 years',
    skills: [
      'iOS/Android Design',
      'Flutter',
      'UI Animation',
      'User-Centered Design',
    ],
    status: 'Actively looking',
    match: '94%',
  },
  {
    name: 'Olivia Smith',
    title: 'UX/UI Instructor',
    location: 'Remote',
    experience: '10 years',
    skills: [
      'Mentoring',
      'Curriculum Development',
      'Design Thinking',
      'Portfolio Reviews',
    ],
    status: 'Open to opportunities',
    match: '90%',
  },
];

const CandidateScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [bottomSheet, setBottomSheet] = React.useState(false);
  const handleSearch = (term: string) => {
    console.log('Search term:', term);
  };

  const CandidateCard: React.FC<CandidateCardProps> = ({
    name,
    match,
    title,
    location,
    experience,
    skills,
    status,
  }) => {
    return (
      <View style={styles.card}>
        {/* Header Row */}
        <View style={styles.Cardheader}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.match}>{match} Matches</Text>
        </View>

        {/* Position Details */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.location}>📍 {location}</Text>
          <Text style={styles.experience}>⏳ {experience}</Text>
        </View>

        {/* Skills Chips */}
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        {/* Status Indicator */}
        {/* <View
      style={[
        styles.status,
        {backgroundColor: statusColor[status]?.bg},
      ]}>
      <Text
        style={[
          styles.statusText,
          {color: statusColor[status]?.text},
        ]}>
        {status}
      </Text>
    </View> */}
      </View>
    );
  };

  const renderItem = ({item}) => (
    <CandidateCard
      name={item.name}
      match={item.match}
      title={item.title}
      location={item.location}
      experience={item.experience}
      skills={item.skills}
      status={item.status}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={{backgroundColor: 'white', margin: 10, borderRadius: 5}}>
              <SvgIcon
                name="back"
                width={30}
                height={30}
                strokeColor={AppColors.AppButtonBackground}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 15,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}>
              Candidates
            </Text>
            <TouchableOpacity></TouchableOpacity>
          </View>
          <View
            style={{
              width: '90%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <SearchBar
              onSearch={handleSearch}
              style={{width: '91%'}}
              placeholder="search Candidates"
            />
            <TouchableOpacity
              onPress={() => setBottomSheet(true)}
              style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                height: 50,
                width: 50,
                justifyContent: 'center',
              }}>
              <SvgIcon
                name="filter"
                width={30}
                height={30}
                strokeColor={AppColors.AppButtonBackground}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={candidates}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          contentContainerStyle={{padding: 16}}
          ListFooterComponent={<View style={{height: 30}} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: AppColors.AppButtonBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    margin: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Cardheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
  },
  match: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  title: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  location: {
    color: '#616161',
    fontSize: 14,
  },
  experience: {
    color: '#616161',
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  skill: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skillText: {
    fontSize: 12,
    color: '#424242',
  },
  status: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export const Candidate = CandidateScreen;
