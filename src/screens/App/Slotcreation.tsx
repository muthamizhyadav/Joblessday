import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppColors} from '../../constants/colors.config';
import SvgIcon from '../../shared/Svg';
import {useCreateSlotMutation, useFetchJobPostMutation} from '../../api/api';
import DropdownComponent from 'react-native-element-dropdown/lib/typescript/components/Dropdown';
import {Roles} from '../../constants/datas';
import SharedDropdown from '../../shared/dropDownWithSearch';
import DatePickerComponent from '../../shared/dateTimePicker';
import SharedButton from '../../shared/SharedButton';
import {useFormik} from 'formik';
import {SlotInitValue} from '../../validations/job.initialValues';
import {SlotSchema} from '../../validations';
import {useNavigation} from '@react-navigation/native';

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
const SlotCreationScreen: React.FC = () => {
  const [fetchJobPostRequest, fetchjobPostResponse] = useFetchJobPostMutation();
  const [pageNo, setPageNo] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const [posts, setPosts] = React.useState<JobPostCardProps>();
  const [selectedValue, setSelectedValue] = React.useState<any>(null);
  const [dateOnly, setDateOnly] = React.useState<Date | null>(null);
  const [timeOnly, setTimeOnly] = React.useState<Date | null>(null);
  const [createSlotRequest, createSlotResponse] = useCreateSlotMutation();
  const navigation = useNavigation<any>();

  //   useCreateSlotMutation
  const fetchJobPosts = () => {
    fetchJobPostRequest({
      pageNo,
      pageSize,
    });
  };

  React.useEffect(() => {
    fetchJobPosts();
  }, [pageNo]);

  React.useEffect(() => {
    console.log(fetchjobPostResponse, 'fetchjobPostResponse');
    if (fetchjobPostResponse?.isSuccess) {
      let tempArray: any[] = [];
      if (
        fetchjobPostResponse?.data &&
        fetchjobPostResponse?.data?.length > 0
      ) {
        fetchjobPostResponse?.data?.map((item: any, ind: any) => {
          let keychanges = {id: item._id, value: item?.role, label: item?.role};
          tempArray.push(keychanges);
        });
      }
      setPosts(tempArray);
    }
  }, [fetchjobPostResponse]);

  const changePostSelect = (data: any) => {
    console.log(data);

    formik.setFieldValue('postId', data.id);
  };

  const selectDateTime = (type: string, value: string) => {
    console.log(type, value);
    if (type == 'date') {
      formik.setFieldValue('date', value);
    } else if (type == 'startTime') {
      formik.setFieldValue('startTime', value);
    } else if (type == 'endTime') {
      formik.setFieldValue('endTime', value);
    }
    console.log(formik.values);
  };

  const formik = useFormik({
    initialValues: SlotInitValue,
    validationSchema: SlotSchema,
    onSubmit: values => {
      submit(values);
    },
  });

  const submit = async (value: any) => {
    console.log(value);
    createSlotRequest(value);
  };

  React.useEffect(() => {
    if (createSlotResponse?.isSuccess) {
      formik.resetForm();
      navigation.navigate('MainApp');
    }
  }, [createSlotResponse]);

  const renderFooter = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <View style={{height: 30}} />
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  };

  return (
    <View>
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
                fontSize: 20,
                color: 'white',
                fontWeight: 600,
                paddingLeft: 50,
              }}>
              create job slot
            </Text>
          </View>
        </View>
        {fetchjobPostResponse?.isLoading ? (
          renderFooter()
        ) : (
          <View style={{marginTop: 25}}>
            <View style={styles.forms}>
              {/* <Text>Select Department :</Text> */}
              <SharedDropdown
                onChange={(selectedValue: any) =>
                  changePostSelect(selectedValue)
                }
                value={selectedValue}
                data={posts}
                placeholder="Select Job post"
                searchOptions={true}
                searchPlaceHolder="Search Roles"
                objectsend
              />
            </View>
            <View style={styles.forms}>
              <DatePickerComponent
                label="Pick a Date"
                mode="date"
                value={formik.values.date ? new Date(formik.values.date) : null}
                onChange={(val: Date) =>
                  selectDateTime('date', val.toISOString())
                }
                placeholder="Select Slot Date"
              />
            </View>

            <View style={styles.forms}>
              <DatePickerComponent
                mode="time"
                value={
                  formik.values.startTime
                    ? new Date(formik.values.startTime)
                    : null
                }
                onChange={(val: Date) =>
                  selectDateTime('startTime', val.toISOString())
                }
                placeholder="Select Start Time"
              />
            </View>

            <View style={styles.forms}>
              <DatePickerComponent
                mode="time"
                value={
                  formik.values.endTime ? new Date(formik.values.endTime) : null
                }
                onChange={(val: Date) =>
                  selectDateTime('endTime', val.toISOString())
                }
                placeholder="Select End Time"
              />
            </View>
            <View style={styles.forms}>
              <SharedButton
                onPress={formik.handleSubmit}
                title="Create Slot"
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  createSlotResponse?.isLoading
                }
                isLoading={createSlotResponse?.isLoading}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f5',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: AppColors.AppButtonBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
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
  forms: {
    marginHorizontal: 15,
    // marginBottom: 5,
  },
});

export const Slotcreation = SlotCreationScreen;
