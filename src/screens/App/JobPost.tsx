import * as React from 'react';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
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
import {useDeleteJobPostMutation, useFetchJobPostMutation} from '../../api/api';
import NumberFormatter from '../../shared/numberFormat';
import {Image} from 'react-native';
import Popup from '../../shared/popup';
import {Button} from 'react-native';

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
  const [deletePostRequest, deletePostResponse] = useDeleteJobPostMutation();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [posts, setPosts] = useState<JobPostCardProps>();
  const [popupVisible, setPopupVisible] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [refreshing, setRefreshing] = useState(false);

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
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchJobPosts();
    } finally {
      setRefreshing(false);
    }
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

  const handleEditChange = (id: string) => {
    navigation.navigate('Addpost', {id, isEdit: true});
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleDelete = () => {
    deletePostRequest({
      id: deleteId,
    });
  };

  const DeleteWarning = () => {
    return (
      <View style={{width: '100%'}}>
        <View style={{margin: 'auto'}}>
          <SvgIcon name="warning" strokeColor="orange" width={80} height={80} />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: AppColors.headerBackground,
            fontWeight: '700',
            fontSize: 20,
          }}>
          Are you sure you want to delete this post?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            {deletePostResponse?.isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.deleteText}>Delete</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  React.useEffect(() => {
    if (deletePostResponse?.isSuccess) {
      setPopupVisible(false);
      fetchJobPosts();
    }
  }, [deletePostResponse]);

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
    <TouchableWithoutFeedback onPress={() => navigation.navigate('jobdetail', {id: _id})}>
      <View style={styles.card}>
        <View style={styles.cardGlow}></View>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <SvgIcon name="job" width={24} height={24} strokeColor={AppColors.AppButtonBackground} />
            <Text style={styles.cardTitle}>{role}</Text>
          </View>
          <View style={[styles.statusBadge, active ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={[styles.statusText, active ? styles.activeText : styles.inactiveText]}>
              {active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <SvgIcon name="industry" width={18} height={18} strokeColor="#64748b" />
              </View>
              <Text style={styles.infoLabel}>Industry</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{industry}</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <SvgIcon name="department" width={18} height={18} strokeColor="#64748b" />
              </View>
              <Text style={styles.infoLabel}>Department</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{department}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <SvgIcon name="designation" width={18} height={18} strokeColor="#64748b" />
              </View>
              <Text style={styles.infoLabel}>Designation</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">{designation}</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <SvgIcon name="salary" width={18} height={18} strokeColor="#64748b" />
              </View>
              <Text style={styles.infoLabel}>Salary Range</Text>
              <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="tail">
                ₹{salaryfrom.toLocaleString()} - ₹{salaryto.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.applicationsContainer}>
            <SvgIcon name="applications" width={18} height={18} strokeColor={AppColors.AppButtonBackground} />
            <Text style={styles.applicationsText}>1,250 Applications</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={() => handleEditChange(_id)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteActionButton]} onPress={() => (setPopupVisible(true), setDeleteId(_id))}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
      _id={item?._id}
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
              width: '95%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: 'auto',
            }}>
            <SearchBar
              onSearch={handleSearch}
              style={{width: '100%', margin: 'auto'}}
              placeholder="search job post"
            />
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
        {posts?.length > 0 ? (
          <FlatList
            data={posts && posts?.length > 0 ? posts : []}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{padding: 16}}
            ListFooterComponent={renderFooter}
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
      <Popup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        title="Warning">
        <DeleteWarning />
      </Popup>
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
    backgroundColor: '#c9brr9',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: AppColors.AppButtonBackground,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(105, 75, 195, 0.15)',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 2,
    right: 2,
    height: 8,
    backgroundColor: AppColors.AppButtonBackground,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
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
  activeBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#22c55e',
  },
  inactiveBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeText: {
    color: '#4ade80',
  },
  inactiveText: {
    color: '#f87171',
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
  editButton: {
    backgroundColor: '#e5e7eb',
    borderColor: '#9ca3af',
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deleteActionButton: {
    backgroundColor: '#fecaca',
    borderColor: '#f87171',
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#dc2626',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const JobPost = JobPostScreen;
