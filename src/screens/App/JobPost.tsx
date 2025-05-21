import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {AppColors} from '../../constants/colors.config';
import SearchBar from '../../shared/searchInput';
import BottomSheetComponent from '../../shared/bottomSheet';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {useFetchJobPostMutation} from '../../api/api';
import NumberFormatter from '../../shared/numberFormat';
import {Image} from 'react-native';

interface JobPostCardProps {
  industry: string;
  role: string;
  department: string;
  salaryfrom: number;
  salaryto: number;
  designation: string;
  active: boolean;
  _id: string;
}

const JobPostScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [bottomSheet, setBottomSheet] = useState(false);
  const [fetchJobPostRequest, fetchjobPostResponse] = useFetchJobPostMutation();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [posts, setPosts] = useState<JobPostCardProps>();
  const route = useRoute();
  const isNew = route.params;

  const [hasFetched, setHasFetched] = useState(false);
  const handleSearch = (term: string) => {
    console.log('Search term:', term);
  };

  const fetchJobPosts = () => {
    fetchJobPostRequest({
      pageNo,
      pageSize,
    });
  };

  React.useEffect(() => {
    fetchJobPosts();
  }, [pageNo, isNew]);

  React.useEffect(() => {
    console.log(fetchjobPostResponse, 'fetchjobPostResponse');
    if (fetchjobPostResponse?.isSuccess) {
      setPosts(fetchjobPostResponse?.data);
    }
  }, [fetchjobPostResponse]);

  const renderFooter = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <View style={{height: 30}} />
        {fetchjobPostResponse?.isLoading && (
          <ActivityIndicator size="large" color="blue" />
        )}
      </View>
    );
  };

  const JobPostCard: React.FC<JobPostCardProps> = ({
    industry,
    role,
    department,
    salaryfrom,
    salaryto,
    designation,
    active,
    _id,
  }) => (
    <View style={styles.card} key={_id}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Industry:</Text>
          <Text style={styles.text}>{industry}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.text}>{role}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.text}>{department}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Designation:</Text>
          <Text style={styles.text}>{designation}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Salary:</Text>
          <Text style={styles.text}>
            <NumberFormatter
              value={salaryfrom}
              symbol="₹"
              thousandSeparator=","
            />{' '}
            -{' '}
            <NumberFormatter
              value={salaryto}
              symbol="₹"
              thousandSeparator=","
            />
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Status:</Text>
          <TouchableOpacity
            style={[
              styles.batch,
              active ? styles.activeBackground : styles.inactiveBackground,
            ]}>
            <Text style={[active ? styles.activeText : styles.inactiveText]}>
              {active ? 'Active' : 'Inactive'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.br}></View>
      <View style={styles.cardBottom}>
        <View style={styles.application}>
          <SvgIcon name="applications" strokeColor="#552bac" />
          <Text style={styles.applicationText}>Applications : 1000</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
          <TouchableOpacity>
            <SvgIcon name="edit" strokeColor="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgIcon name="delet" strokeColor="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  // );

  const renderItem = ({item}) => (
    <JobPostCard
      key={item?._id}
      industry={item.industry}
      role={item.role}
      department={item.department}
      salaryfrom={item.salaryfrom}
      salaryto={item.salaryto}
      designation={item.designation}
      active={item.active}
      _id={''}
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
                margin: 10,
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
              }}>
              Job Posts
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Addpost')}
              style={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                margin: 10,
                borderRadius: 5,
              }}>
              <SvgIcon
                name="plus"
                width={30}
                height={30}
                strokeColor={AppColors.AppButtonBackground}
              />
              <Text
                style={{
                  color: AppColors.AppButtonBackground,
                  fontSize: 16,
                  fontWeight: 800,
                  paddingRight: 5,
                }}>
                Create
              </Text>
            </TouchableOpacity>
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
              placeholder="search job post"
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
        {posts?.length > 0 ? (
          <FlatList
            data={posts && posts?.length > 0 ? posts : []}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{padding: 16}}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View style={{margin: 'auto'}}>
            <Image
              source={require('../../assets/images/Empty.png')}
              style={{width: 250, height: 250}}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Addpost')}
              style={{
                borderWidth: 1,
                borderColor: AppColors.headerBackground,
                paddingVertical: 5,
                borderRadius: 25,
                backgroundColor: AppColors.headerBackground,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                }}>
                + Create Job post
              </Text>
            </TouchableOpacity>
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
            <Text>Your Content Here</Text>
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
    elevation: 0,
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
    elevation: 0,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  listContainer: {
    padding: 16,
    marginBottom: 20,
  },

  textAlign: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  batch: {
    width: 70,
    padding: 4,
    borderRadius: 5,
  },
  batchText: {
    textAlign: 'center',
    fontWeight: '800',
  },
  activeBackground: {
    backgroundColor: '#cffce6',
  },
  inactiveBackground: {
    backgroundColor: '#fee2e2',
  },
  activeText: {
    color: '#047857',
    textAlign: 'center',
    fontWeight: '800',
  },
  inactiveText: {
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '800',
  },
  br: {
    marginTop: 10,
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  cardBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  application: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationText: {
    fontSize: 16,
    marginLeft: 4,
    color: '#552bac',
    fontWeight: 600,
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
    height: '60%',
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
});

export const JobPost = JobPostScreen;
