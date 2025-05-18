import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
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

export const CandidateJoblist: React.FC = () => {
  const navigation = useNavigation<any>();
  const [jobsLists, setJobLists] = useState([]);

  const handleSearch = (term: string) => {
    console.log('Search term:', term);
  };

  const [fetchJobsRequest, fetchJobsResponse] = useFetchActiveJobsMutation();

  useEffect(() => {
    fetchJobsRequest({});
  }, []);

  useEffect(() => {
    if (fetchJobsResponse?.isSuccess) {
      setJobLists(fetchJobsResponse?.data);
      console.log(fetchJobsResponse?.data, 'DATA');
    }
  }, [fetchJobsResponse]);

  const jobsData = [
    {
      id: '2',
      jobTitle: 'Product Manager',
      salary: '$100k - $130k',
      openings: 2,
      slotStart: '10:00 AM',
      slotEnd: '6:00 PM',
      experience: '2-5 years',
      jobType: 'Full-time',
      location: 'Remote',
      isUnlocked: false,
    },
    {
      id: '3',
      jobTitle: 'Frontend Developer',
      salary: '$70k - $90k',
      openings: 3,
      slotStart: '9:00 AM',
      slotEnd: '5:00 PM',
      experience: '1-3 years',
      jobType: 'Full-time',
      location: 'San Francisco, CA',
      isUnlocked: true,
    },
    {
      id: '4',
      jobTitle: 'Backend Developer',
      salary: '$80k - $100k',
      openings: 2,
      slotStart: '11:00 AM',
      slotEnd: '7:00 PM',
      experience: '3-5 years',
      jobType: 'Full-time',
      location: 'New York, NY',
    },
    {
      id: '5',
      jobTitle: 'UX/UI Designer',
      salary: '$60k - $85k',
      openings: 1,
      slotStart: '10:00 AM',
      slotEnd: '6:00 PM',
      experience: '2-4 years',
      jobType: 'Part-time',
      location: 'Remote',
    },
    {
      id: '6',
      jobTitle: 'Data Scientist',
      salary: '$110k - $140k',
      openings: 2,
      slotStart: '9:30 AM',
      slotEnd: '5:30 PM',
      experience: '4-6 years',
      jobType: 'Full-time',
      location: 'Austin, TX',
    },
    {
      id: '7',
      jobTitle: 'QA Engineer',
      salary: '$65k - $90k',
      openings: 2,
      slotStart: '8:00 AM',
      slotEnd: '4:00 PM',
      experience: '2-5 years',
      jobType: 'Full-time',
      location: 'Remote',
    },
    {
      id: '8',
      jobTitle: 'DevOps Engineer',
      salary: '$95k - $120k',
      openings: 1,
      slotStart: '10:00 AM',
      slotEnd: '6:00 PM',
      experience: '3-6 years',
      jobType: 'Full-time',
      location: 'Seattle, WA',
    },
    {
      id: '9',
      jobTitle: 'Mobile App Developer',
      salary: '$75k - $100k',
      openings: 2,
      slotStart: '9:00 AM',
      slotEnd: '5:00 PM',
      experience: '2-4 years',
      jobType: 'Contract',
      location: 'Remote',
    },
    {
      id: '10',
      jobTitle: 'Technical Writer',
      salary: '$50k - $70k',
      openings: 1,
      slotStart: '10:00 AM',
      slotEnd: '4:00 PM',
      experience: '1-3 years',
      jobType: 'Part-time',
      location: 'Remote',
    },
    {
      id: '11',
      jobTitle: 'HR Manager',
      salary: '$80k - $105k',
      openings: 1,
      slotStart: '9:00 AM',
      slotEnd: '5:00 PM',
      experience: '5-8 years',
      jobType: 'Full-time',
      location: 'Chicago, IL',
    },
    {
      id: '12',
      jobTitle: 'Business Analyst',
      salary: '$70k - $95k',
      openings: 2,
      slotStart: '10:00 AM',
      slotEnd: '6:00 PM',
      experience: '3-5 years',
      jobType: 'Full-time',
      location: 'Remote',
    },
  ];
  const handlePurchase = (jobId: any) => {
    console.log('Purchase slot for job:', jobId);
  };

  const JobCard = ({item}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{'📁' + item.role}</Text>
        <Text style={styles.salary}>
          <Amount value={item.salaryfrom} /> <Text>-</Text>{' '}
          <Amount value={item.salaryto} />
        </Text>
      </View>

      {/* New Experience and Job Type Row */}
      <View style={styles.row}>
        <Text style={styles.label}>
          {'👤'} <Text style={styles.value}> {item.experience ?? '--'} Years</Text>
        </Text>
        <Text style={styles.label}>
          {'⏰'}:{' '}
          <Text style={styles.value}>{item.jobType ?? 'Full Time'}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          {'👥'} Openings:{' '}
          <Text style={styles.value}>{item.openings ?? '--'}</Text>
        </Text>
        <Text style={styles.label}>
          {'🗓️'}:
          <Text style={styles.value}>
            <TimeRange startTime={item?.startTime} endTime={item?.endTime} />
          </Text>
        </Text>
      </View>

      <View style={styles.br}></View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 5,
          }}>
          <SvgIcon name="candidate" width={20} height={20} strokeColor="gray" />
          <Text style={{color: 'gray'}}>Applications : 200</Text>
        </View>
        {item ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('jobdetail')}
            style={{
              backgroundColor: '#d1fae5',
              marginTop: 5,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#065f46', fontWeight: '800'}}>
              View & Apply
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: AppColors.AppButtonBackground,
              marginTop: 5,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 6,
            }}>
            <Text style={{color: AppColors.White}}> {'🔓'} Unlock Slot</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
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
              margin: 10,
              fontSize: 20,
              color: 'white',
              fontWeight: 600,
            }}>
            Today Job Posts
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              margin: 10,
              borderRadius: 5,
            }}></TouchableOpacity>
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
            placeholder="search jobs"
          />
          <TouchableOpacity
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
      {fetchJobsResponse?.isLoading ? (
        <ActivityIndicator size="large" color={AppColors.AppButtonBackground} />
      ) : fetchJobsResponse?.isSuccess && jobsLists?.length > 0 ? (
        <FlatList
          data={jobsLists}
          keyExtractor={item => item._id}
          renderItem={({item}) => <JobCard item={item} />}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={<View style={{height: 30}} />}
        />
      ) : (
        <View style={{margin: 'auto'}}>
          <Image
            source={require('../../../assets/images/Empty.png')}
            style={{width: 250, height: 250}}
          />
          <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>
            No job posts found. Please check back later.
          </Text>
        </View>
      )}
    </View>
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
    elevation: 0,
    // shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listContainer: {
    padding: 16,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 2,
  },
  salary: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2ecc71',
    flex: 1,
    textAlign: 'right',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontWeight: '500',
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  br: {width: '100%', height: 1, backgroundColor: '#94a3b8'},
});
