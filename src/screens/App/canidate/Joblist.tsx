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
  const [refreshing, setRefreshing] = useState(false);

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

  const handlePurchase = (jobId: any) => {
    console.log('Purchase slot for job:', jobId);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
    console.log('ASASAS');
  };

  const JobCard = ({item}) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{'📁' + item.designation}</Text>
        <Text style={styles.salary}>
          <Amount value={item.salaryfrom} /> <Text>-</Text>{' '}
          <Amount value={item.salaryto} />
        </Text>
      </View>

      {/* New Experience and Job Type Row */}
      <View style={styles.row}>
        <Text style={styles.label}>
          {'👤'}{' '}
          <Text style={styles.value}> {item.experience ?? '--'} Years</Text>
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
          <Text style={{color: 'gray'}}>
            Applications : {item?.applicationCount}
          </Text>
        </View>
        {item ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('jobdetail', {id: item?._id})}
            style={{
              backgroundColor:
                item?.status != null ? '#d1fae5' : AppColors.headerBackground,
              marginTop: 5,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
            }}
            disabled={item?.status !== null}>
            <SvgIcon name="dick" strokeColor="#065f46" width={14} height={14} />
            {item?.status == null ? (
              <Text style={{color: '#FFFF', fontWeight: '800'}}>
                View & Apply
              </Text>
            ) : (
              <Text style={{color: '#065f46', fontWeight: '800'}}>
                {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
              </Text>
            )}
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
          refreshing={refreshing}
          onRefresh={onRefresh}
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
