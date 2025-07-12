import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SearchBar from '../../shared/searchInput';
import SvgIcon from '../../shared/Svg';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../constants/colors.config';
import {FlatList} from 'react-native-gesture-handler';
import {useAppliedCandidatesMutation} from '../../api/api';
import {Image} from 'react-native';

interface CandidateCardProps {
  name: string;
  match: string;
  title: string;
  location: string;
  experience: string;
  skills: any[];
  status: boolean;
}

interface RadioButtonProps {
  value: 'fresher' | 'experience';
  selectedValue: string;
  onValueChange: (value: 'fresher' | 'experience') => void;
}

const CandidateScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [bottomSheet, setBottomSheet] = React.useState(false);
  const [candidatesRequest, candidatesResponse] =
    useAppliedCandidatesMutation();
  const [candidates, setCandidates] = React.useState([]);
  const handleSearch = (term: string) => {
    console.log('Search term:', term);
  };
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  React.useEffect(() => {
    candidatesRequest({});
  }, []);

  React.useEffect(() => {
    if (candidatesResponse?.isSuccess) {
      console.log(candidatesResponse?.data, 'Candidat');

      setCandidates(candidatesResponse?.data);
    }
  }, [candidatesResponse]);

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'Pending':
        return '#f97316';
      case 'rejected':
        return '#dc2626';
      case 'shortlisted':
        return '#16a34a';
      default:
        return '#64748b';
    }
  };

  const CandidateCard: React.FC<any> = ({
    name,
    match,
    title,
    location,
    experience,
    skills,
    status,
    candidateId,
    jobId,
    recruiterId,
  }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('candidatedetail', {
            id: candidateId,
            status: status,
            jobId: jobId,
            recruiterId: recruiterId,
          })
        }>
        {/* Header Row */}
        <View style={styles.Cardheader}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.match, {color: getStatusColor(match)}]}>
            {match.charAt(0).toUpperCase() + match?.slice(1)}
          </Text>
        </View>

        {/* Position Details */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.location}>📍 {location}</Text>
          <Text style={styles.experience}>
            ⏳ {experience == 'fresher' ? experience : `${experience} Years`}
          </Text>
        </View>

        {/* Skills Chips */}
        <View style={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skill}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <CandidateCard
      name={item?.candidateName ?? '--'}
      match={item?.status == 'applied' ? 'Pending' : item?.status ?? '-'}
      title={item?.headLine}
      location={`${item?.city},${item?.state}`}
      experience={item.experience}
      skills={item.skills[0]?.keySkill}
      status={item.status}
      candidateId={item?.candidateId}
      jobId={item?.jobId}
      recruiterId={item?.recruiterId}
    />
  );

  const RadioButtonGroup: React.FC<RadioButtonProps> = ({
    value,
    selectedValue,
    onValueChange,
  }) => {
    return (
      <TouchableOpacity
        style={styles.radioButtonContainer}
        onPress={() => onValueChange(value)}>
        <View style={styles.radioOuter}>
          {selectedValue === value && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.label}>
          {value === 'fresher' ? 'Fresher' : 'Experience'}
        </Text>
      </TouchableOpacity>
    );
  };

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
        {candidatesResponse?.isLoading ? (
          <ActivityIndicator
            size="large"
            color={AppColors.AppButtonBackground}
          />
        ) : candidates?.length > 0 ? (
          <FlatList
            data={candidates}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            contentContainerStyle={{padding: 16}}
            ListFooterComponent={<View style={{height: 30}} />}
          />
        ) : (
          <View style={{margin: 'auto'}}>
            <Image
              source={require('../../assets/images/Empty.png')}
              style={{width: 250, height: 250}}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '700',
                color: AppColors.headerBackground,
              }}>
              Candidate not available
            </Text>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        visible={bottomSheet}
        transparent
        onRequestClose={() => setBottomSheet(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setBottomSheet(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.handle} />
            <View style={{display: 'flex', flexDirection: 'row', gap: 20}}>
              <RadioButtonGroup
                value="fresher"
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
              />
              <RadioButtonGroup
                value="experience"
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modal: {
    height: '40%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 10,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2a84fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#2a84fa',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export const Candidate = CandidateScreen;
