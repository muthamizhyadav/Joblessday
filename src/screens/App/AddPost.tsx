// import * as React from 'react';
// import {
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import SvgIcon from '../../shared/Svg';
// import {useState} from 'react';
// import {AppColors} from '../../constants/colors.config';
import SharedInput from '../../shared/input';

// Modern Input Wrapper Component - Signin Style
const SigninStyleInput: React.FC<{
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  inputType?: string;
  name?: string;
  PasswordIconChange?: () => void;
  passwordIcon?: boolean;
  containerStyle?: any;
}> = ({ placeholder, value, onChange, inputType = 'text', name = '', PasswordIconChange, passwordIcon, containerStyle = {} }) => {
  return (
    <SharedInput
      placeholder={placeholder}
      containerStyle={[styles.signinInputContainer, containerStyle]}
      inputType={inputType}
      value={value}
      onChange={onChange}
      name={name}
      PasswordIconChange={PasswordIconChange}
      passwordIcon={passwordIcon}
    />
  );
};

// Date Input Component - Looks like input but opens date picker
const DateInput: React.FC<{
  placeholder: string;
  value: string;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}> = ({ placeholder, value, onPress, error, touched }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{ position: 'relative' }}>
        <SharedInput
          placeholder={placeholder}
          value={value}
          onChange={() => {}} // Read-only, handled by date picker
          inputType="text"
          name="date"
          containerStyle={styles.signinInputContainer}
        />
        <View style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          marginTop: -10,
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>📅</Text>
        </View>
      </TouchableOpacity>
      {touched && error && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
};

// Time Input Component - Looks like input but opens time picker
const TimeInput: React.FC<{
  placeholder: string;
  value: string;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}> = ({ placeholder, value, onPress, error, touched }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{ position: 'relative' }}>
        <SharedInput
          placeholder={placeholder}
          value={value}
          onChange={() => {}} // Read-only, handled by time picker
          inputType="text"
          name="time"
          containerStyle={styles.signinInputContainer}
        />
        <View style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          marginTop: -10,
          zIndex: 1,
          pointerEvents: 'none'
        }}>
          <Text style={{ fontSize: 16, color: '#6B7280' }}>🕐</Text>
        </View>
      </TouchableOpacity>
      {touched && error && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
};
// import {Department, Industries, Roles} from '../../constants/datas';
// import SharedDropdown from '../../shared/dropDownWithSearch';
// import SharedButton from '../../shared/SharedButton';
// import Stepper from '../../shared/stepper';
// import {jobPostinitValue} from '../../validations/job.initialValues';
// import {JobPostSchema} from '../../validations';
// import {useFormik} from 'formik';
// import {useRoute} from '@react-navigation/native';
// import {
//   useCreateJobPostMutation,
//   useCreateTestForJobPostMutation,
//   usePostblindFetchMutation,
//   useUpdateJobPostMutation,
// } from '../../api/api';
// import Toast from 'react-native-toast-message';
// import BottomSheet, {BottomSheetRefProps} from './../../shared/bottomSheet';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import * as XLSX from 'xlsx';
// import RNFetchBlob from 'react-native-blob-util';
// import Radio from '../../shared/radio';
// import DatePickerComponent from '../../shared/dateTimePicker';
// import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import moment from 'moment';
// import TextArea from '../../shared/textArea';
// interface RouteParams {
//   id?: any;
//   isEdit?: any;
// }
// const AddJobPostScreen: React.FC = () => {
//   const [data] = useState(Industries);
//   const steps = ['Post creation', 'Test creation'];
//   const [createJobPostRequest, createJobPostResponse] =
//     useCreateJobPostMutation();
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [postCreationData, setPostCreationData] = useState<any>();
//   const [questionTab, setQuestionTab] = useState(2);
//   const [questionTypes] = useState(['MCQ', 'Open Questions']);
//   const [questionText, setQuestionText] = useState('');
//   const [options, setOptions] = useState<any>([{id: 1, text: ''}]);
//   const [marks, setMarks] = useState('');
//   const [correctAnswers, setCorrectAnswers] = useState<any>('');
//   const [testTitle, setTestTitle] = useState('');
//   const ref = React.useRef<BottomSheetRefProps>(null);
//   const [selectedQuestionType, setSelectedQuestionType] = useState('');
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//   const [validUploadData, setValidUploadData] = useState([]);
//   const [errorUploadData, setErrorUploadData] = useState([]);
//   const [Openquestions, setOpenQuestions] = useState(['']);
//   const navigation = useNavigation<any>();
//   const {user, tokens} = useSelector((state: any) => state.app.data);
//   const [localStartTime, setLocalStartTime] = useState<Date | null>(null);
//   const [localEndTime, setLocalEndTime] = useState<Date | null>(null);
//   const [blindfetchRequest, blindfetchResponse] = usePostblindFetchMutation();
//   const [existData, setExistData] = useState<any>(null);

//   const route = useRoute();
//   const id = route?.params?.id ?? null;
//   const isEdit = route?.params?.isEdit ?? false;
//   const [updateRequest, updateResponse] = useUpdateJobPostMutation();
//   const experienceOptions = [
//     {label: 'Fresher', value: 'fresher'},
//     {label: '1-3 years', value: '1-3'},
//     {label: '3-5 years', value: '3-5'},
//     {label: '5-10 years', value: '5-10'},
//     {label: '10-15 years', value: '10-15'},
//     {label: '15+ years', value: '15+'},
//   ];

//   React.useEffect(() => {
//     if (isEdit && id) {
//       blindfetchRequest({
//         id: id,
//       });
//     }
//   }, [isEdit]);

//   React.useEffect(() => {
//     if (blindfetchResponse?.isSuccess) {
//       setExistData(blindfetchResponse.data);
//       console.log(blindfetchResponse.data, 'blindfetch');
//       formik.setFieldValue('department', blindfetchResponse.data.department);
//       formik.setFieldValue('role', blindfetchResponse.data.role);
//       formik.setFieldValue('industry', blindfetchResponse.data.industry);
//       formik.setFieldValue(
//         'worklocation',
//         blindfetchResponse.data.worklocation,
//       );
//       formik.setFieldValue('designation', blindfetchResponse.data.designation);
//       formik.setFieldValue(
//         'salaryfrom',
//         blindfetchResponse.data.salaryfrom.toString(),
//       );
//       formik.setFieldValue(
//         'salaryto',
//         blindfetchResponse.data.salaryto.toString(),
//       );
//       formik.setFieldValue(
//         'openings',
//         blindfetchResponse.data.openings.toString(),
//       );
//       formik.setFieldValue('experience', blindfetchResponse.data.experience);
//       formik.setFieldValue('description', blindfetchResponse.data.description);
//     }
//   }, [blindfetchResponse]);

//   const handleChange = (text, index) => {
//     const updated = [...Openquestions];
//     updated[index] = text;
//     setOpenQuestions(updated);
//   };

//   const handleAddMore = () => {
//     setOpenQuestions([...Openquestions, '']);
//   };

//   const [createQuestionsRequest, CreateQuestionResponse] =
//     useCreateTestForJobPostMutation();
//   const [selected, setSelected] = useState<string | null>(null);

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const onPress = React.useCallback(() => {
//     const isActive = ref?.current?.isActive();
//     if (isActive) {
//       ref?.current?.scrollTo(0);
//     } else {
//       ref?.current?.scrollTo(-200);
//     }
//   }, []);

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const formik = useFormik({
//     initialValues: jobPostinitValue,
//     validationSchema: JobPostSchema,
//     onSubmit: values => {
//       submit(values);
//     },
//   });

//   const submit = (data: any) => {
//     console.log(data);
//     if (isEdit) {
//       updateRequest({data: data, id: id});
//     } else {
//       createJobPostRequest(data);
//     }
//   };

//   React.useEffect(() => {
//     console.log(createJobPostResponse);
//     if (createJobPostResponse?.isSuccess) {
//       navigation.navigate('MainApp', {
//         screen: 'Job Posts',
//         params: {new: true},
//       });

//       Toast.show({
//         type: 'success',
//         text1: 'Job post has been created!',
//       });
//     } else if (createJobPostResponse?.isError) {
//       Toast.show({
//         type: 'error',
//         text1: 'Job post creation failed try again',
//       });
//     }
//   }, [createJobPostResponse?.isSuccess, createJobPostResponse?.isError]);

//   React.useEffect(() => {
//     console.log(updateResponse, 'updateResponse');
//     if (updateResponse?.isSuccess) {
//       navigation.navigate('MainApp', {
//         screen: 'Job Posts',
//         params: {new: true},
//       });

//       Toast.show({
//         type: 'success',
//         text1: 'Job post has been created!',
//       });
//     } else if (updateResponse?.isError) {
//       Toast.show({
//         type: 'error',
//         text1: 'Job post creation failed try again',
//       });
//     }
//   }, [updateResponse?.isSuccess, updateResponse?.isError]);

//   const addOption = () => {
//     setOptions([...options, {id: options.length + 1, text: ''}]);
//   };

//   const removeOption = (id: any) => {
//     setOptions(options.filter((opt: any) => opt.id !== id));
//   };

//   const updateOption = (id: any, text: any) => {
//     setOptions(
//       options.map((opt: any) => (opt.id === id ? {...opt, text} : opt)),
//     );
//   };

//   const Preview = () => {
//     if (selectedQuestionType == 'MCQ') {
//     } else {
//     }
//   };

//   const downloadFile = async () => {
//     try {
//       const fileName = 'questions.xlsx';

//       const filePath = Platform.select({
//         ios: `${RNFS.MainBundlePath}/${fileName}`,
//         android: `${RNFS.DocumentDirectoryPath}/${fileName}`,
//       }) as string;

//       if (Platform.OS === 'android') {
//         await RNFS.copyFileAssets(fileName, filePath);
//       }

//       const fileExists = await RNFS.exists(filePath);
//       if (!fileExists) {
//         Toast.show({type: 'error', text1: 'Error', text2: 'File not found'});
//         return;
//       }

//       if (Platform.OS === 'android' && Platform.Version >= 29) {
//         const destinationPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
//         const base64Data = await RNFS.readFile(filePath, 'base64');
//         await RNFetchBlob.fs.writeFile(destinationPath, base64Data, 'base64');
//         RNFetchBlob.android.addCompleteDownload({
//           title: 'Download Complete',
//           description: `File saved: ${destinationPath}`,
//           mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//           path: destinationPath,
//           showNotification: true,
//         });

//         Toast.show({
//           type: 'success',
//           text1: 'Download Complete',
//           text2: `Saved to: ${destinationPath}`,
//         });
//         return;
//       }

//       if (Platform.OS === 'android' && Platform.Version < 29) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Toast.show({type: 'error', text1: 'Permission Denied'});
//           return;
//         }
//       }

//       const destinationPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
//       await RNFS.copyFile(filePath, destinationPath);

//       RNFetchBlob.android.addCompleteDownload({
//         title: 'Download Complete',
//         description: `File saved: ${destinationPath}`,
//         mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         path: destinationPath,
//         showNotification: true,
//       });

//       Toast.show({
//         type: 'success',
//         text1: 'Download Complete',
//         text2: `Saved to: ${destinationPath}`,
//       });
//     } catch (error: any) {
//       console.error('Download Error:', error);
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: `Failed: ${error.message}`,
//       });
//     }
//   };

//   const formatKeysToLowerCase = (data: any) => {
//     return data.map((item: any) =>
//       Object.fromEntries(
//         Object.entries(item).map(([key, value]) => [key.toLowerCase(), value]),
//       ),
//     );
//   };

//   const validateKeys = (data: any) => {
//     const requiredKeywords = ['answer', 'question', 'option'];
//     const validData: any = [];
//     const errorData: any = [];

//     data.forEach((item: any) => {
//       const keys = Object.keys(item);
//       const isValid = keys.every(key =>
//         requiredKeywords.some(kw => key.includes(kw)),
//       );

//       if (isValid) {
//         validData.push(item);
//       } else {
//         errorData.push(item);
//       }
//     });
//     return {validData, errorData};
//   };

//   const handleFileUpload = async () => {
//     if (!testTitle) {
//       Toast.show({
//         type: 'error',
//         text1: 'Enter Test Title',
//       });
//     } else if (!marks) {
//       Toast.show({
//         type: 'error',
//         text1: 'Enter total marks Title',
//       });
//     } else {
//       try {
//         const res = await DocumentPicker.pick({
//           type: [
//             DocumentPicker.types.csv,
//             'application/vnd.ms-excel',
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//           ],
//         });
//         if (res?.length > 0) {
//           const fileUri = res[0].uri;
//           const fileContent = await RNFS.readFile(fileUri, 'base64');
//           const workbook = XLSX.read(fileContent, {type: 'base64'});
//           const sheetName = workbook.SheetNames[0];
//           const sheetData = XLSX.utils.sheet_to_json(
//             workbook.Sheets[sheetName],
//           );
//           const lowerCaseConversion = formatKeysToLowerCase(sheetData);
//           const {validData, errorData} = validateKeys(lowerCaseConversion);
//           if (errorData.length > 0) {
//             Toast.show({
//               type: 'error',
//               text1: `${errorData?.length} Invalid data`,
//             });
//           } else if (validData.length > 0) {
//             console.log(validData.length, 'validData.length');
//             Toast.show({
//               type: 'success',
//               text1: `${validData.length} records uploaded successfully. ${errorData.length} records contain errors.`,
//             });
//           }
//           setValidUploadData(validData);
//         }
//         setSelectedFile(res[0]);
//       } catch (err) {
//         if (DocumentPicker.isCancel(err)) {
//           console.log('User canceled file picker');
//         } else {
//           console.log('Error selecting file: ', err);
//         }
//       }
//     }
//   };

//   const submitQuestion = () => {
//     console.log(validUploadData, 'question');
//     const data = {
//       id: createJobPostResponse?.data?._id,
//       test: validUploadData,
//     };
//     console.log(data, 'fddata');
//   };

//   const selectDateTime = (type: string, value: any) => {
//     console.log(type, value);
//     if (type == 'date') {
//       formik.setFieldValue('date', value);
//     } else if (type == 'startTime') {
//       formik.setFieldValue('startTime', value);
//       setLocalStartTime(value);
//     } else if (type == 'endTime') {
//       formik.setFieldValue('endTime', value);
//     }
//     console.log(formik.values);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerContent}>
//           <TouchableOpacity
//             style={{backgroundColor: 'white', margin: 10, borderRadius: 5}}>
//             <SvgIcon
//               name="back"
//               width={30}
//               height={30}
//               strokeColor={AppColors.AppButtonBackground}
//             />
//           </TouchableOpacity>
//           <Text
//             style={{
//               margin: 10,
//               fontSize: 20,
//               color: 'white',
//               fontWeight: 600,
//             }}>
//             {isEdit ? 'Edit Job Posts' : 'Create Job Posts'}
//           </Text>
//           <TouchableOpacity style={{marginRight: 10, alignSelf: 'center'}}>
//             {/* <Text
//                 style={{
//                   color: 'white',
//                   fontSize: 18,
//                   textDecorationLine: 'underline',
//                 }}>
//                 Skip
//               </Text> */}
//           </TouchableOpacity>
//         </View>
//       </View>
//       {/* <Stepper
//         steps={steps}
//         currentStep={currentStep}
//         onNext={handleNext}
//         onPrevious={handlePrevious}
//       /> */}
//       <ScrollView>
//         {currentStep == 0 ? (
//           <>
//             {blindfetchResponse?.isLoading ? (
//               <ActivityIndicator
//                 size={'large'}
//                 color={AppColors.headerBackground}
//               />
//             ) : (
//               <ScrollView
//                 style={{
//                   width: '90%',
//                   margin: 'auto',
//                   marginTop: 25,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: 5,
//                 }}>
//                 <View style={styles.forms}>
//                   <Text>Select Industries :</Text>
//                   <SharedDropdown
//                     onChange={value => {
//                       formik.setFieldValue('industry', value),
//                         console.log(value, 'value');
//                     }}
//                     value={formik.values.industry}
//                     data={data}
//                     placeholder="Select Industries"
//                     searchOptions={true}
//                     searchPlaceHolder="Search Industries"
//                   />
//                 </View>

//                 <View style={styles.forms}>
//                   <Text>Select Role :</Text>
//                   <SharedDropdown
//                     onChange={value => formik.setFieldValue('role', value)}
//                     value={formik.values.role}
//                     data={Roles}
//                     placeholder="Select Role"
//                     searchOptions={true}
//                     searchPlaceHolder="Search Roles"
//                   />
//                 </View>

//                 <View style={styles.forms}>
//                   <Text>Select Department :</Text>
//                   <SharedDropdown
//                     onChange={value =>
//                       formik.setFieldValue('department', value)
//                     }
//                     value={formik.values.department}
//                     data={Department}
//                     placeholder="Select Department"
//                     searchOptions={true}
//                     searchPlaceHolder="Search Department"
//                   />
//                 </View>

//                 <View style={styles.forms}>
//                   <Text>Designation :</Text>
//                   <SharedInput
//                     inputType="text"
//                     name={'designation'}
//                     placeholder="Designations"
//                     onChange={formik.handleChange('designation')}
//                     value={formik.values.designation}
//                   />
//                 </View>
//                 <View style={styles.forms}>
//                   <Text>Select Experience :</Text>
//                   <SharedDropdown
//                     onChange={value => {
//                       formik.setFieldValue('experience', value),
//                         console.log(value, 'value');
//                     }}
//                     value={formik.values.experience}
//                     data={experienceOptions}
//                     searchOptions={false}
//                   />
//                 </View>

//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <View style={{width: '46%'}}>
//                     <Text>Salary from :</Text>
//                     <SharedInput
//                       inputType="numeric"
//                       name={'salaryfrom'}
//                       placeholder="From salary"
//                       onChange={formik.handleChange('salaryfrom')}
//                       value={formik.values.salaryfrom}
//                     />
//                   </View>
//                   <View style={{width: '46%'}}>
//                     <Text>salary to :</Text>
//                     <SharedInput
//                       inputType="numeric"
//                       name={'salaryto'}
//                       placeholder="To salary"
//                       onChange={formik.handleChange('salaryto')}
//                       value={formik.values.salaryto}
//                     />
//                   </View>
//                 </View>

//                 <View>
//                   <Text>Work Locations :</Text>
//                   <SharedInput
//                     inputType="text"
//                     name={'worklocation'}
//                     placeholder="Work location"
//                     onChange={formik.handleChange('worklocation')}
//                     value={formik.values.worklocation}
//                   />
//                 </View>
//                 <View style={styles.forms}>
//                   <Text>Openings :</Text>
//                   <SharedInput
//                     inputType="numeric"
//                     name={'openings'}
//                     placeholder="No of openings"
//                     onChange={formik.handleChange('openings')}
//                     value={formik.values.openings}
//                   />
//                 </View>
//                 <View>
//                   <Text>Slot date :</Text>
//                   <DatePickerComponent
//                     label="Pick a Date"
//                     mode="date"
//                     value={
//                       formik.values.date ? new Date(formik.values.date) : null
//                     }
//                     onChange={(val: Date) =>
//                       selectDateTime('date', val.toISOString())
//                     }
//                     placeholder="Select Slot Date"
//                   />
//                 </View>

//                 <View>
//                   <Text>Slot start time :</Text>
//                   <DatePickerComponent
//                     mode="time"
//                     value={
//                       formik.values.startTime
//                         ? moment(formik.values.startTime).toDate()
//                         : null
//                     }
//                     onChange={(val: Date) =>
//                       selectDateTime('startTime', val.toISOString())
//                     }
//                     placeholder="Select Start Time"
//                   />
//                 </View>

//                 <View style={styles.forms}>
//                   <Text>Slot end time :</Text>

//                   <DatePickerComponent
//                     mode="time"
//                     value={
//                       formik.values.endTime
//                         ? moment(formik.values.endTime).toDate()
//                         : null
//                     }
//                     onChange={(val: Date) =>
//                       selectDateTime('endTime', val.toISOString())
//                     }
//                     placeholder="Select End Time"
//                   />
//                 </View>
//                 <View style={styles.forms}>
//                   <Text>Job Description :</Text>
//                   <TextArea
//                     onChangeText={formik.handleChange('description')}
//                     value={formik.values.description}
//                     numberOfLines={5}
//                     placeholder="Write job description"
//                   />
//                 </View>
//                 <SharedButton
//                   title="Submit"
//                   isLoading={
//                     createJobPostResponse?.isLoading ||
//                     updateResponse?.isLoading
//                   }
//                   disabled={
//                     !formik.isValid ||
//                     !formik.dirty ||
//                     createJobPostResponse?.isLoading ||
//                     updateResponse?.isLoading
//                   }
//                   onPress={() => formik.handleSubmit()}
//                   style={{marginBottom: 10}}
//                 />
//               </ScrollView>
//             )}
//           </>
//         ) : // <View style={{width: '90%', alignSelf: 'center'}}>
//         //   <Text style={{fontSize: 24, marginBottom: 5}}>
//         //     Test Information :
//         //   </Text>
//         //   <View>
//         //     <Text>Test Title :</Text>
//         //     <SharedInput
//         //       name={'testTitle'}
//         //       inputType="text"
//         //       placeholder="Test Title"
//         //       onChange={setTestTitle}
//         //     />
//         //   </View>
//         //   <View>
//         //     <Text>Total Mark:</Text>
//         //     <SharedInput
//         //       name={'testTitle'}
//         //       inputType="numeric"
//         //       placeholder="Total mark"
//         //       onChange={setMarks}
//         //     />
//         //   </View>
//         //   <Text style={{fontSize: 24, marginBottom: 2}}>
//         //     Question Upload :
//         //   </Text>
//         //   <View style={styles.questionTab}>
//         //     <TouchableOpacity
//         //       onPress={() => changeQuestionTab(1)}
//         //       style={{
//         //         width: '50%',
//         //         backgroundColor:
//         //           questionTab == 1
//         //             ? AppColors.AppButtonBackground
//         //             : AppColors.AppBackground,
//         //         margin: questionTab == 1 ? 3 : 0,
//         //         borderRadius: 10,
//         //         display: 'flex',
//         //         flexDirection: 'row',
//         //         alignItems: 'center',
//         //         justifyContent: 'center',
//         //         gap: 4,
//         //       }}>
//         //       <SvgIcon
//         //         name="plus"
//         //         width={20}
//         //         height={20}
//         //         strokeColor={
//         //           questionTab == 1
//         //             ? AppColors.AppTextColor
//         //             : AppColors.AppButtonBackground
//         //         }
//         //       />
//         //       <Text
//         //         style={{
//         //           color:
//         //             questionTab == 1
//         //               ? AppColors.AppTextColor
//         //               : AppColors.AppButtonBackground,
//         //           fontSize: 16,
//         //           fontWeight: questionTab == 1 ? 800 : 600,
//         //         }}>
//         //         Add Questions
//         //       </Text>
//         //     </TouchableOpacity>
//         //     <TouchableOpacity
//         //       onPress={() => changeQuestionTab(2)}
//         //       style={{
//         //         width: '48.5%',
//         //         backgroundColor:
//         //           questionTab == 2
//         //             ? AppColors.AppButtonBackground
//         //             : AppColors.AppBackground,
//         //         margin: questionTab == 2 ? 2 : 0,
//         //         borderRadius: 10,
//         //         display: 'flex',
//         //         flexDirection: 'row',
//         //         alignItems: 'center',
//         //         justifyContent: 'center',
//         //         gap: 4,
//         //       }}>
//         //       <SvgIcon
//         //         name="upload"
//         //         width={20}
//         //         height={20}
//         //         strokeColor={
//         //           questionTab == 2
//         //             ? AppColors.AppTextColor
//         //             : AppColors.AppButtonBackground
//         //         }
//         //       />
//         //       <Text
//         //         style={{
//         //           color:
//         //             questionTab == 2
//         //               ? AppColors.AppTextColor
//         //               : AppColors.AppButtonBackground,
//         //           fontSize: 16,
//         //           fontWeight: questionTab == 2 ? 800 : 600,
//         //         }}>
//         //         Upload Questions
//         //       </Text>
//         //     </TouchableOpacity>
//         //   </View>
//         // </View>
//         null}
//         {currentStep == 1 ? (
//           <View style={{width: '90%', alignSelf: 'center', marginTop: 5}}>
//             {/* <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
//               Select Question Type:
//             </Text> */}
//             {/* <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 gap: 4,
//                 marginLeft: 5,
//               }}>
//               {questionTypes &&
//                 questionTypes.map((item, ind) => (
//                   <TouchableOpacity
//                     style={{
//                       padding: 8,
//                       backgroundColor:
//                         selectedQuestionType == item
//                           ? AppColors.AppButtonBackground
//                           : '#ede9fe',
//                       borderRadius: 40,
//                       borderWidth: 1,
//                       borderColor: AppColors.AppButtonBackground,
//                       paddingHorizontal: 20,
//                       display: 'flex',
//                       flexDirection: 'row',
//                       gap: 3,
//                     }}
//                     key={ind}
//                     onPress={() => setSelectedQuestionType(item)}>
//                     {selectedQuestionType == item ? (
//                       <SvgIcon
//                         name="tick"
//                         width={18}
//                         height={15}
//                         strokeColor="white"
//                       />
//                     ) : null}
//                     <Text
//                       style={{
//                         textAlign: 'center',
//                         color:
//                           selectedQuestionType == item
//                             ? AppColors.AppTextColor
//                             : '',
//                       }}>
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//             </View> */}
//             <>
//               {/* <View>
//                     <Text style={{fontSize: 16, marginTop: 10}}>Question:</Text>
//                     <SharedInput
//                       placeholder="Enter question text"
//                       value={questionText}
//                       onChange={setQuestionText}
//                       inputType="text"
//                       name={'question'}
//                     />
//                     <Text style={{fontSize: 16}}>Options:</Text>
//                     {options.map((item: any, ind: any) => (
//                       <View
//                         key={ind}
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'row',
//                           width: '100%',
//                           alignItems: 'center',
//                         }}>
//                         <SharedInput
//                           placeholder={`Option ${ind + 1}`}
//                           inputType="text"
//                           name={`option${ind + 1}`}
//                           value={item?.text}
//                           containerStyle={{width: '70%'}}
//                           onChange={(text: any) => updateOption(item.id, text)}
//                         />
//                         {item.text ? (
//                           <>
//                             <TouchableOpacity
//                               style={{
//                                 width: 50,
//                                 height: 40,
//                               }}
//                               onPress={addOption}>
//                               <Text
//                                 style={{
//                                   color: '#7e22ce',
//                                   fontWeight: 800,
//                                   paddingLeft: 10,
//                                 }}>
//                                 + Add
//                               </Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                               style={{
//                                 width: 50,
//                                 height: 40,
//                                 margin: 10,
//                               }}
//                               onPress={() => removeOption(item.id)}>
//                               <SvgIcon
//                                 name="close"
//                                 strokeColor={'red'}
//                                 height={20}
//                                 width={20}
//                               />
//                             </TouchableOpacity>
//                           </>
//                         ) : null}
//                       </View>
//                     ))}
//                   </View> */}

//               {/* <View style={{width: '100%', marginTop: 10}}>
//                     {Openquestions.map((q, index) => (
//                       <TextInput
//                         key={index}
//                         value={q}
//                         onChangeText={text => handleChange(text, index)}
//                         placeholder={`Question ${index + 1}`}
//                         style={{
//                           borderWidth: 1,
//                           borderColor: '#ccc',
//                           borderRadius: 5,
//                           padding: 10,
//                           marginBottom: 10,
//                         }}
//                       />
//                       <View
//                         style={{
//                           marginTop: 10,
//                           display: 'flex',
//                           // flexDirection: 'row',
//                           // alignItems: 'center',
//                           justifyContent: 'space-between',
//                         }}>
//                         <SharedInput
//                           key={index}
//                           placeholder="Enter question text"
//                           onChange={e => handleChange(e, index)}
//                           inputType="text"
//                           name={'question'}
//                         />
//                         {index === Openquestions.length - 1 &&
//                           q.trim() !== '' && (
//                             <TouchableOpacity
//                               style={{
//                                 // width: '50%',
//                                 height: 40,
//                               }}
//                               onPress={handleAddMore}>
//                               <Text
//                                 style={{
//                                   color: '#7e22ce',
//                                   fontWeight: 800,
//                                   paddingLeft: 10,
//                                 }}>
//                                 + Add
//                               </Text>
//                             </TouchableOpacity>
//                           )}
//                       </View>
//                     ))}
//                   </View> */}
//               <SharedButton
//                 onPress={Preview}
//                 title="Preview and Submit"
//                 style={{marginBottom: 10}}
//               />
//             </>
//           </View>
//         ) : questionTab == 2 ? (
//           <View></View>
//         ) : null}
//       </ScrollView>
//       <>
//         <BottomSheet ref={ref}>
//           <View style={{width: '90%', alignSelf: 'center'}}>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 paddingTop: 5,
//               }}>
//               Total Mark : {marks}
//             </Text>

//             <Text style={{fontSize: 20, fontWeight: 'bold', color: '#475569'}}>
//               Question:
//             </Text>
//             <Text style={{paddingLeft: 15, fontSize: 18, color: '#64748b'}}>
//               {questionText}
//             </Text>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: '800',
//                 marginTop: 15,
//                 marginBottom: 10,
//               }}>
//               Options :
//             </Text>
//             {options &&
//               options.map((item: any, ind: number) => (
//                 <View
//                   style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     gap: 5,
//                     margin: 10,
//                   }}
//                   key={ind}>
//                   <TouchableOpacity
//                     style={{
//                       borderColor:
//                         item.text == correctAnswers
//                           ? AppColors.AppButtonBackground
//                           : '#94a3b8',
//                       borderWidth: 1,
//                       minWidth: '50%',
//                       width: 'auto',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       padding: 6,
//                       borderRadius: 4,
//                       backgroundColor:
//                         item.text == correctAnswers
//                           ? AppColors.AppBackground
//                           : 'transparent',
//                     }}
//                     onPress={() => setCorrectAnswers(item.text)}>
//                     {/* <Radio
//                       selected={item.text == correctAnswers}
//                       borderColor="#64748b"
//                       selectedColor={AppColors.AppButtonBackground}
//                     /> */}
//                     <Text
//                       style={{
//                         fontSize: 16,
//                         fontWeight: item.text == correctAnswers ? 700 : 600,
//                         padding: 4,
//                         color:
//                           item.text == correctAnswers
//                             ? AppColors.AppButtonBackground
//                             : '',
//                       }}>
//                       {item.text}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               ))}
//           </View>
//           <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
//             <SharedButton
//               onPress={submitQuestion}
//               title="Submit"
//               isLoading={false}
//               disabled={!correctAnswers}
//             />
//           </View>
//         </BottomSheet>
//       </>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//   },
//   header: {
//     width: '100%',
//     height: 60,
//     backgroundColor: AppColors.AppButtonBackground,
//     borderBottomRightRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   headerContent: {
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   forms: {
//     marginBottom: 10,
//   },
//   questionTab: {
//     display: 'flex',
//     flexDirection: 'row',
//     height: 50,
//     borderWidth: 1,
//     borderColor: AppColors.AppButtonBackground,
//     borderRadius: 10,
//     backgroundColor: AppColors.AppBackground,
//   },
//   uploadBox: {
//     width: '100%',
//     height: 120,
//     borderWidth: 2,
//     borderColor: AppColors.AppButtonBackground,
//     borderStyle: 'dotted',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ede9fe',
//   },
//   uploadText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   downloadText: {
//     margin: 'auto',
//     marginTop: 10,
//     marginBottom: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     gap: 4,
//   },
// });

// export const AddJobPost = AddJobPostScreen;
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Text,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import SvgIcon from '../../shared/Svg';
import {AppColors} from '../../constants/colors.config';
import CustomDropdown from '../../shared/CustomDropdown';
import {useCreateJobPostMutation} from '../../api/api';
import {useNavigation} from '@react-navigation/native';

const JobPostSchema = Yup.object().shape({
  industry: Yup.string().required('Industry is Required'),
  role: Yup.string().required('Role Required'),
  department: Yup.string().required('Department Required'),
  designation: Yup.string().required('Designation Required'),
  salaryfrom: Yup.number().required('Salary From Required'),
  salaryto: Yup.number().required('Salary To Required'),
  worklocation: Yup.string().required('Work Location required'),
  date: Yup.date().required('Date Required'),
  startTime: Yup.date().required('Start Time Required'),
  endTime: Yup.date().required('End Time Required'),
  openings: Yup.number().required('Enter No of openings'),
  experience: Yup.string().required('Experience is required'),
  description: Yup.string().required('Description is required'),
});

export const AddJobPost = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openStartTime, setOpenStartTime] = useState(false);
  const [openEndTime, setOpenEndTime] = useState(false);
  const [createJobPostRequest, createJobPostResponse] =
    useCreateJobPostMutation();
  const dropdownOptions = {
    industry: ['IT', 'Finance', 'Education', 'Marketing'],
    role: ['Developer', 'Manager', 'Analyst'],
    department: ['HR', 'Tech', 'Sales'],
  };
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (createJobPostResponse?.isSuccess) {
      navigation.navigate('MainApp', {
        screen: 'Job Posts',
        params: {new: true},
      });
    }
  }, [createJobPostResponse, navigation]);

  const initialValues = {
    industry: '',
    role: '',
    department: '',
    designation: '',
    salaryfrom: '',
    salaryto: '',
    worklocation: '',
    date: '',
    startTime: '',
    endTime: '',
    openings: '',
    experience: '',
    description: '',
  };

  const handleFormSubmit = (values: any) => {
    console.log('Job Post Submitted:', values);
    createJobPostRequest(values);
  };

  return (
    <>
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
          <Text style={styles.headerText}>Create a Job Post</Text>
          <TouchableOpacity />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={JobPostSchema}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <CustomDropdown
                label="Industry"
                value={values.industry}
                options={dropdownOptions.industry}
                onSelect={val => setFieldValue('industry', val)}
                error={errors.industry}
                touched={touched.industry}
              />
              <CustomDropdown
                label="Role"
                value={values.role}
                options={dropdownOptions.role}
                onSelect={val => setFieldValue('role', val)}
                error={errors.role}
                touched={touched.role}
              />
              <CustomDropdown
                label="Department"
                value={values.department}
                options={dropdownOptions.department}
                onSelect={val => setFieldValue('department', val)}
                error={errors.department}
                touched={touched.department}
              />

              {/* Text Inputs */}
              {[
                {label: 'Designation', name: 'designation'},
                {label: 'Work Location', name: 'worklocation'},
                {label: 'Experience', name: 'experience'},
                {label: 'Description', name: 'description', multiline: true},
              ].map(field => (
                <View key={field.name} style={styles.inputWrapper}>
                  <SigninStyleInput
                    placeholder={field.label}
                    value={values[field.name]}
                    onChange={handleChange(field.name)}
                    inputType={field.multiline ? 'text' : 'text'}
                    name={field.name}
                  />
                  {touched[field.name] && errors[field.name] && (
                    <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors[field.name]}</Text>
                  )}
                </View>
              ))}

              {/* Salary */}
              <View style={styles.row}>
                <View style={styles.inputHalf}>
                  <SigninStyleInput
                    placeholder="Salary From"
                    value={values.salaryfrom}
                    onChange={handleChange('salaryfrom')}
                    inputType="numeric"
                    name="salaryfrom"
                  />
                  {touched.salaryfrom && errors.salaryfrom && (
                    <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.salaryfrom}</Text>
                  )}
                </View>
                <View style={styles.inputHalf}>
                  <SigninStyleInput
                    placeholder="Salary To"
                    value={values.salaryto}
                    onChange={handleChange('salaryto')}
                    inputType="numeric"
                    name="salaryto"
                  />
                  {touched.salaryto && errors.salaryto && (
                    <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.salaryto}</Text>
                  )}
                </View>
              </View>

              {/* Openings */}
              <SigninStyleInput
                placeholder="Openings"
                value={values.openings.toString()}
                onChange={handleChange('openings')}
                inputType="numeric"
                name="openings"
              />
              {touched.openings && errors.openings && (
                <Text style={{color: 'red', fontSize: 12, marginTop: 4}}>{errors.openings}</Text>
              )}

              {/* Date Picker */}
              <DateInput
                placeholder="Select Job Date"
                value={values.date ? new Date(values.date).toDateString() : ''}
                onPress={() => setOpenDate(true)}
                error={errors.date}
                touched={touched.date}
              />
              <DatePicker
                modal
                mode="date"
                open={openDate}
                date={values.date ? new Date(values.date) : new Date()}
                onConfirm={date => {
                  setOpenDate(false);
                  setFieldValue('date', date.toISOString());
                }}
                onCancel={() => setOpenDate(false)}
              />

              {/* Time Pickers */}
              <TimeInput
                placeholder="Select Start Time"
                value={values.startTime ? new Date(values.startTime).toLocaleTimeString() : ''}
                onPress={() => setOpenStartTime(true)}
                error={errors.startTime}
                touched={touched.startTime}
              />
              <DatePicker
                modal
                mode="time"
                open={openStartTime}
                date={
                  values.startTime ? new Date(values.startTime) : new Date()
                }
                onConfirm={time => {
                  setOpenStartTime(false);
                  setFieldValue('startTime', time.toISOString());
                }}
                onCancel={() => setOpenStartTime(false)}
              />

              <TimeInput
                placeholder="Select End Time"
                value={values.endTime ? new Date(values.endTime).toLocaleTimeString() : ''}
                onPress={() => setOpenEndTime(true)}
                error={errors.endTime}
                touched={touched.endTime}
              />
              <DatePicker
                modal
                mode="time"
                open={openEndTime}
                date={values.endTime ? new Date(values.endTime) : new Date()}
                onConfirm={time => {
                  setOpenEndTime(false);
                  setFieldValue('endTime', time.toISOString());
                }}
                onCancel={() => setOpenEndTime(false)}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitBtn}
                disabled={createJobPostResponse?.isLoading}
                labelStyle={{borderRadius: 5}}>
                {createJobPostResponse?.isLoading ? (
                  <ActivityIndicator size={'small'} color={'white'} />
                ) : (
                  ' Post Job'
                )}
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  pickerBtn: {
    marginBottom: 12,
    borderRadius: 5,
    textAlign: 'left',
  },
  pickerLabel: {
    textAlign: 'left',
  },
  submitBtn: {
    marginTop: 20,
    paddingVertical: 6,
    borderRadius: 5,
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: AppColors.AppButtonBackground,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    marginTop: 15,
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  signinInputContainer: {
    width: '100%',
  },
  modernInputContainer: {
    marginBottom: 20,
  },
  modernInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  modernInputWrapper: {
    position: 'relative',
  },
  modernInputField: {
    marginBottom: 0,
  },
  modernInputStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
