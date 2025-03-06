import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {AppColors} from '../../constants/colors.config';
import SearchBar from '../../shared/searchInput';
import BottomSheetComponent from '../../shared/bottomSheet';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

interface JobPostCardProps {
  industry: string;
  role: string;
  department: string;
  salary: string;
  designation: string;
  active: boolean;
}

const jobPosts = [
  {
    id: '1',
    industry: 'Information Technology',
    role: 'Software Engineer',
    department: 'Engineering',
    salary: '$80,000 - $100,000',
    designation: 'Senior Developer',
    active: true,
  },
  {
    id: '2',
    industry: 'Healthcare',
    role: 'Marketing Manager',
    department: 'Marketing',
    salary: '$70,000 - $90,000',
    designation: 'Team Lead',
    active: false,
  },
  {
    id: '3',
    industry: 'Finance',
    role: 'Sales Executive',
    department: 'Sales',
    salary: '$50,000 - $70,000',
    designation: 'Associate',
    active: true,
  },
  {
    id: '4',
    industry: 'Finance',
    role: 'Sales Executive',
    department: 'Sales',
    salary: '$50,000 - $70,000',
    designation: 'Associate',
    active: false,
  },
];

const JobPostScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [bottomSheet, setBottomSheet] = useState(false);

  const handleSearch = (term: string) => {
    console.log('Search term:', term);
  };

  const JobPostCard: React.FC<JobPostCardProps> = ({
    industry,
    role,
    department,
    salary,
    designation,
    active,
  }) => (
    <View style={styles.card}>
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
          <Text style={styles.text}>{salary}</Text>
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
      industry={item.industry}
      role={item.role}
      department={item.department}
      salary={item.salary}
      designation={item.designation}
      active={item.active}
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
        <FlatList
          data={jobPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{padding: 16}}
          ListFooterComponent={<View style={{height: 30}} />}
        />
        <BottomSheetComponent
          open={bottomSheet}
          setOpen={setBottomSheet}
          customComponent={<View />}
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
});

export const JobPost = JobPostScreen;
