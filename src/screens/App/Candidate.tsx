import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import SearchBar from '../../shared/searchInput';
import SvgIcon from '../../shared/Svg';
import {useNavigation} from '@react-navigation/native';
import {AppColors} from '../../constants/colors.config';
import {useAppliedCandidatesMutation} from '../../api/api';
import {Image} from 'react-native';
import SkeletonLoader from '../../shared/SkeletonLoader';

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
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    candidatesRequest({});
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await candidatesRequest({});
    } finally {
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    if (candidatesResponse?.isSuccess) {
      console.log(candidatesResponse?.data, 'Candidat');
      setRefreshing(false);
      setCandidates(candidatesResponse?.data);
    }
  }, [candidatesResponse]);

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'Pending':
        return '#f97316';
      case 'rejected':
        return '#dc2626';
      case 'scheduled':
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
      <TouchableWithoutFeedback onPress={() => navigation.navigate('candidatedetail', {id: candidateId})}>
        <View style={styles.card}>
          <View style={styles.cardGlow}></View>
          <View style={styles.cardHeader}>
            <View style={styles.titleContainer}>
              <SvgIcon name="user" width={24} height={24} strokeColor={AppColors.AppButtonBackground} />
              <Text style={styles.cardTitle}>{name}</Text>
            </View>
            <View style={[styles.statusBadge, match?.toLowerCase() === 'pending' ? styles.pendingBadge : match?.toLowerCase() === 'scheduled' ? styles.scheduledBadge : styles.rejectedBadge]}>
              <Text style={[styles.statusText, match?.toLowerCase() === 'pending' ? styles.pendingText : match?.toLowerCase() === 'scheduled' ? styles.scheduledText : styles.rejectedText]}>
                {match}
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <SvgIcon name="job" width={18} height={18} strokeColor="#64748b" />
                </View>
                <Text style={styles.infoLabel}>Position</Text>
                <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <SvgIcon name="location" width={18} height={18} strokeColor="#64748b" />
                </View>
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{location}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <SvgIcon name="experience" width={18} height={18} strokeColor="#64748b" />
                </View>
                <Text style={styles.infoLabel}>Experience</Text>
                <Text style={styles.infoValue}>{experience === 'fresher' ? 'Fresher' : `${experience} Years`}</Text>
              </View>
              <View style={styles.infoItem}>
                <View style={styles.iconContainer}>
                  <SvgIcon name="skills" width={18} height={18} strokeColor="#64748b" />
                </View>
                <Text style={styles.infoLabel}>Skills</Text>
                <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{skills?.slice(0, 3).join(', ')}{skills?.length > 3 ? '...' : ''}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.applicationsContainer}>
              <SvgIcon name="clock" width={18} height={18} strokeColor={AppColors.AppButtonBackground} />
              <Text style={styles.applicationsText}>Applied recently</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => navigation.navigate('candidatedetail', {id: candidateId})}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
          // <ActivityIndicator
          //   size="large"
          //   color={AppColors.AppButtonBackground}
          // />
          <SkeletonLoader
            width={'95%'}
            height={150}
            rows={10}
            borderRadius={8}
          />
        ) : candidates?.length > 0 ? (
          <FlatList
            data={candidates}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            contentContainerStyle={{padding: 16}}
            ListFooterComponent={<View style={{height: 30}} />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[AppColors.AppButtonBackground]}
                tintColor={AppColors.AppButtonBackground}
              />
            }
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
    backgroundColor: '#f3f0ff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.15)',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: AppColors.AppButtonBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
  },
  pendingBadge: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderColor: '#f97316',
  },
  scheduledBadge: {
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    borderColor: '#16a34a',
  },
  rejectedBadge: {
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    borderColor: '#dc2626',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pendingText: {
    color: '#ea580c',
  },
  scheduledText: {
    color: '#15803d',
  },
  rejectedText: {
    color: '#dc2626',
  },
  cardContent: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 12,
    maxWidth: '48%',
  },
  iconContainer: {
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  infoLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicationsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationsText: {
    fontSize: 13,
    color: AppColors.AppButtonBackground,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  viewButton: {
    backgroundColor: '#e5e7eb',
    borderColor: '#9ca3af',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  status: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
