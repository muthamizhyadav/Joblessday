import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {AppColors} from '../../constants/colors.config';
import SvgIcon from '../../shared/Svg';
import {Text} from 'react-native';
import {ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {companyDetailSchema} from '../../validations/update.profile.schema';
import {companyDetailinitValue} from '../../validations/update.profile.initial';
import SharedInput from '../../shared/input';
import {Country, State, City} from 'country-state-city';
import SharedDropdown from '../../shared/dropDownWithSearch';
import SharedButton from '../../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useUpdateCandidateProfileEmploymentMutation} from '../../api/api';

const UpdateCompanyScreen: React.FC = () => {
  const indianStates = State.getStatesOfCountry('IN');
  const [cities, setCities] = React.useState<any>([]);
  const [selectedState, setSelectedState] = React.useState('');
  const [States, setStates] = React.useState<any>([]);
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [id, setId] = React.useState<any>(route.params?.id);
  const [createEmploymentDetailRequest, createEmploymentDetailResponse] =
    useUpdateCandidateProfileEmploymentMutation();
  React.useEffect(() => {
    const States = indianStates.map((state, index) => ({
      id: index + 1,
      value: state.isoCode,
      label: state.name,
    }));
    setStates(States);
  }, []);

  const handleChangeCity = (city: string) => {
    const selectedCityFullName = cities.find(key => key.value === city)?.label;
    formik.setFieldValue('city', selectedCityFullName);
  };

  const formik = useFormik({
    initialValues: companyDetailinitValue,
    validationSchema: companyDetailSchema,
    onSubmit: values => {
      submitCompanyDetails(values);
    },
  });

  const submitCompanyDetails = (value: any) => {
    createEmploymentDetailRequest({
      employmentDetails: value,
      id: id,
      stepper: 1,
    });
  };

  const handleChangeState = (stateValue: string) => {
    const selectedStateFull = States.find(key => key.value === stateValue);

    if (!selectedStateFull) return;

    // Set in Formik
    formik.setFieldValue('state', selectedStateFull.label);
    // Update selectedState properly
    setSelectedState(selectedStateFull.value);

    const citiesOfState = City.getCitiesOfState('IN', stateValue);
    const formattedCities = citiesOfState.map((city, index) => ({
      id: index + 1,
      value: city.name,
      label: city.name,
    }));

    setCities(formattedCities);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('singin');
    }
  };

  React.useEffect(() => {
    if (createEmploymentDetailResponse?.isSuccess) {
      navigation.navigate('singin');
    }
  }, [createEmploymentDetailResponse?.isSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={handleBack}
            style={{backgroundColor: 'white', margin: 10, borderRadius: 5}}>
            <SvgIcon
              name="back"
              width={30}
              height={30}
              strokeColor={AppColors.headerBackground}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 600,
              height: '100%',
              marginTop: 15,
            }}>
            Company Registration
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
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container1}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Company Name:
          </Text>
          <SharedInput
            inputType="text"
            name={'companyName'}
            style={styles.input}
            placeholder=""
            value={formik.values.companyName}
            onChange={formik.handleChange('companyName')}
          />
        </View>
        <View style={styles.container1}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Recruiter Name:
          </Text>
          <SharedInput
            inputType="text"
            name={'recruiterName'}
            style={styles.input}
            placeholder=""
            value={formik.values.recruiterName}
            onChange={formik.handleChange('recruiterName')}
          />
        </View>
        <View style={styles.container1}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Recruiter Designation:
          </Text>
          <SharedInput
            inputType="text"
            name={'recruiterDesignation'}
            style={styles.input}
            placeholder=""
            value={formik.values.recruiterDesignation}
            onChange={formik.handleChange('recruiterDesignation')}
          />
        </View>
        <View style={styles.container1}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Select State:
          </Text>
          <SharedDropdown
            onChange={value => handleChangeState(value)}
            value={selectedState}
            data={States}
            placeholder=""
            searchOptions={true}
            searchPlaceHolder="Search state"
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Select City:
          </Text>
          <SharedDropdown
            onChange={value => handleChangeCity(value)}
            value={formik.values.city}
            data={cities}
            placeholder=""
            searchOptions={true}
            searchPlaceHolder="Search city"
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Select industry:
          </Text>
          <SharedDropdown
            onChange={value => handleChangeCity(value)}
            value={formik.values.city}
            data={cities}
            placeholder=""
            searchOptions={true}
            searchPlaceHolder="Search city"
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Employee Count:
          </Text>
          <SharedInput
            inputType="numeric"
            name={'employeeCount'}
            style={styles.input}
            placeholder=""
            value={formik.values.employeeCount}
            onChange={formik.handleChange('employeeCount')}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            GST:
          </Text>
          <SharedInput
            inputType="numeric"
            name={'gst'}
            style={styles.input}
            placeholder=""
            value={formik.values.gst}
            onChange={formik.handleChange('gst')}
          />
        </View>
        <View style={{marginTop: 15}}>
          <Text style={{paddingLeft: 5, paddingBottom: 4, fontSize: 18}}>
            Company website URL:
          </Text>
          <SharedInput
            inputType="text"
            name={'companysiteURL'}
            style={styles.input}
            placeholder=""
            value={formik.values.companysiteURL}
            onChange={formik.handleChange('companysiteURL')}
          />
        </View>
        <SharedButton
          title="Submit"
          disabled={
            !formik.isValid ||
            !formik.dirty ||
            createEmploymentDetailResponse?.isLoading
          }
          onPress={formik.handleSubmit}
          isLoading={createEmploymentDetailResponse?.isLoading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.AppBackground,
    
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.headerBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  container1: {flex: 1},
  content: {marginTop: 50, alignItems: 'center'},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: '#d6d3d1',
  },
});

export const UpdateProfileRecruiter = UpdateCompanyScreen;
