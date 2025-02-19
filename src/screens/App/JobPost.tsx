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

const JobPostScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [bottomSheet, setBottomSheet] = useState(false);

  const handleSearch = (term: string) => {
    console.log('Search term:', term);
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
        <BottomSheetComponent
          open={bottomSheet}
          setOpen={setBottomSheet}
          customComponent={<View />}
        />
        <ScrollView></ScrollView>
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
});

export const JobPost = JobPostScreen;
