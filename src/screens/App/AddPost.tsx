import * as React from 'react';
import {
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgIcon from '../../shared/Svg';
import {useState} from 'react';
import {AppColors} from '../../constants/colors.config';
import SharedInput from '../../shared/input';
import {Department, Industries, Roles} from '../../constants/datas';
import SharedDropdown from '../../shared/dropDownWithSearch';
import SharedButton from '../../shared/SharedButton';
import Stepper from '../../shared/stepper';
import {jobPostinitValue} from '../../validations/job.initialValues';
import {JobPostSchema} from '../../validations';
import {useFormik} from 'formik';
import {useCreateJobPostMutation} from '../../api/api';
import Toast from 'react-native-toast-message';
import BottomSheet, {BottomSheetRefProps} from './../../shared/bottomSheet';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';
import RNFetchBlob from 'react-native-blob-util';
import Radio from '../../shared/radio';

const AddJobPostScreen: React.FC = () => {
  const [data] = useState(Industries);
  const steps = ['Post creation', 'Test creation'];
  const [createJobPostRequest, createJobPostResponse] =
    useCreateJobPostMutation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [postCreationData, setPostCreationData] = useState<any>();
  const [questionTab, setQuestionTab] = useState(1);
  const [questionTypes] = useState(['MCQ', 'True/False', 'Short Answer']);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<any>([{id: 1, text: ''}]);
  const [marks, setMarks] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState<any>('');
  const [testTitle, setTestTitle] = useState('');
  const ref = React.useRef<BottomSheetRefProps>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState('');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [validUploadData, setValidUploadData] = useState([]);
  const [errorUploadData, setErrorUploadData] = useState([]);
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const onPress = React.useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const formik = useFormik({
    initialValues: jobPostinitValue,
    validationSchema: JobPostSchema,
    onSubmit: values => {
      submit(values);
    },
  });

  const submit = (data: any) => {
    console.log(data);
    createJobPostRequest(data);
  };

  React.useEffect(() => {
    console.log(createJobPostResponse);
    if (createJobPostResponse?.isSuccess) {
      setCurrentStep(createJobPostResponse?.data?.step ?? 0);
      setPostCreationData(createJobPostResponse?.data);
      Toast.show({
        type: 'success',
        text1: 'Job post has been created!',
      });
    } else if (createJobPostResponse?.isError) {
      Toast.show({
        type: 'error',
        text1: 'Job post creation failed try again',
      });
    }
  }, [createJobPostResponse?.isSuccess, createJobPostResponse?.isError]);

  const changeQuestionTab = (selected: number) => {
    setQuestionTab(selected);
  };

  const addOption = () => {
    setOptions([...options, {id: options.length + 1, text: ''}]);
  };

  const removeOption = (id: any) => {
    setOptions(options.filter((opt: any) => opt.id !== id));
  };

  const updateOption = (id: any, text: any) => {
    setOptions(
      options.map((opt: any) => (opt.id === id ? {...opt, text} : opt)),
    );
  };

  const Preview = () => {
    const selectedOptions = options.filter((e: any) => e.text);

    const datas = {
      question: questionText,
      options: selectedOptions,
      marks: marks,
      testTitle: testTitle,
    };

    if (!datas?.testTitle) {
      Toast.show({
        type: 'error',
        text1: 'Enter Test Title',
      });
    } else if (!datas?.marks) {
      Toast.show({
        type: 'error',
        text1: 'Enter total marks Title',
      });
    } else if (!questionText) {
      Toast.show({
        type: 'error',
        text1: 'Enter Valid Question',
      });
    } else if (selectedOptions.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Set Options',
      });
    } else {
      onPress();
    }
  };

  React.useEffect(() => {
    console.log(testTitle, 'testTitle');
  }, [testTitle]);

  const downloadFile = async () => {
    try {
      const fileName = 'questions.xlsx';

      const filePath = Platform.select({
        ios: `${RNFS.MainBundlePath}/${fileName}`,
        android: `${RNFS.DocumentDirectoryPath}/${fileName}`,
      }) as string;

      if (Platform.OS === 'android') {
        await RNFS.copyFileAssets(fileName, filePath);
      }

      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        Toast.show({type: 'error', text1: 'Error', text2: 'File not found'});
        return;
      }

      if (Platform.OS === 'android' && Platform.Version >= 29) {
        const destinationPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
        const base64Data = await RNFS.readFile(filePath, 'base64');
        await RNFetchBlob.fs.writeFile(destinationPath, base64Data, 'base64');
        RNFetchBlob.android.addCompleteDownload({
          title: 'Download Complete',
          description: `File saved: ${destinationPath}`,
          mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          path: destinationPath,
          showNotification: true,
        });

        Toast.show({
          type: 'success',
          text1: 'Download Complete',
          text2: `Saved to: ${destinationPath}`,
        });
        return;
      }

      if (Platform.OS === 'android' && Platform.Version < 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toast.show({type: 'error', text1: 'Permission Denied'});
          return;
        }
      }

      const destinationPath = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`;
      await RNFS.copyFile(filePath, destinationPath);

      RNFetchBlob.android.addCompleteDownload({
        title: 'Download Complete',
        description: `File saved: ${destinationPath}`,
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        path: destinationPath,
        showNotification: true,
      });

      Toast.show({
        type: 'success',
        text1: 'Download Complete',
        text2: `Saved to: ${destinationPath}`,
      });
    } catch (error: any) {
      console.error('Download Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Failed: ${error.message}`,
      });
    }
  };

  const formatKeysToLowerCase = (data: any) => {
    return data.map((item: any) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [key.toLowerCase(), value]),
      ),
    );
  };

  const validateKeys = (data: any) => {
    const requiredKeywords = ['answer', 'question', 'option'];
    const validData: any = [];
    const errorData: any = [];

    data.forEach((item: any) => {
      const keys = Object.keys(item);
      const isValid = keys.every(key =>
        requiredKeywords.some(kw => key.includes(kw)),
      );

      if (isValid) {
        validData.push(item);
      } else {
        errorData.push(item);
      }
    });

    return {validData, errorData};
  };

  const handleFileUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.csv,
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
      });
      if (res?.length > 0) {
        const fileUri = res[0].uri;
        const fileContent = await RNFS.readFile(fileUri, 'base64');
        const workbook = XLSX.read(fileContent, {type: 'base64'});
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const lowerCaseConversion = formatKeysToLowerCase(sheetData);
        const {validData, errorData} = validateKeys(lowerCaseConversion);
        if (errorData.length > 0) {
          Toast.show({
            type: 'error',
            text1: `${errorData?.length} Invalid data`,
          });
        } else if (validData.length > 0) {
          console.log(validData.length, 'validData.length');
          Toast.show({
            type: 'success',
            text1: `${validData.length} records uploaded successfully. ${errorData.length} records contain errors.`,
          });
        }
        setValidUploadData(validData);
      }
      setSelectedFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picker');
      } else {
        console.log('Error selecting file: ', err);
      }
    }
  };

  const submitQuestion = () => {
    console.log('question');
  };

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
            Create Job Posts
          </Text>
          <TouchableOpacity style={{marginRight: 10, alignSelf: 'center'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textDecorationLine: 'underline',
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <ScrollView>
        {currentStep == 0 ? (
          <ScrollView
            style={{
              width: '90%',
              margin: 'auto',
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}>
            <View style={styles.forms}>
              <Text>Select Industries :</Text>
              <SharedDropdown
                onChange={value => {
                  formik.setFieldValue('industry', value),
                    console.log(value, 'value');
                }}
                value={formik.values.industry}
                data={data}
                placeholder="Select Industries"
                searchOptions={true}
                searchPlaceHolder="Search Industries"
              />
            </View>

            <View style={styles.forms}>
              <Text>Select Role :</Text>
              <SharedDropdown
                onChange={value => formik.setFieldValue('role', value)}
                value={formik.values.role}
                data={Roles}
                placeholder="Select Role"
                searchOptions={true}
                searchPlaceHolder="Search Roles"
              />
            </View>

            <View style={styles.forms}>
              <Text>Select Department :</Text>
              <SharedDropdown
                onChange={value => formik.setFieldValue('department', value)}
                value={formik.values.department}
                data={Department}
                placeholder="Select Department"
                searchOptions={true}
                searchPlaceHolder="Search Department"
              />
            </View>

            <View style={styles.forms}>
              <Text>Designation :</Text>
              <SharedInput
                inputType="text"
                name={'designation'}
                placeholder="Designations"
                onChange={formik.handleChange('designation')}
                value={formik.values.designation}
              />
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '46%'}}>
                <Text>Salary from :</Text>
                <SharedInput
                  inputType="numeric"
                  name={'salaryfrom'}
                  placeholder="From salary"
                  onChange={formik.handleChange('salaryfrom')}
                  value={formik.values.salaryfrom}
                />
              </View>
              <View style={{width: '46%'}}>
                <Text>salary to :</Text>
                <SharedInput
                  inputType="numeric"
                  name={'salaryto'}
                  placeholder="To salary"
                  onChange={formik.handleChange('salaryto')}
                  value={formik.values.salaryto}
                />
              </View>
            </View>

            <View style={styles.forms}>
              <Text>Work Locations :</Text>
              <SharedInput
                inputType="text"
                name={'worklocation'}
                placeholder="Work location"
                onChange={formik.handleChange('worklocation')}
                value={formik.values.worklocation}
              />
            </View>
            <SharedButton
              title="Submit"
              isLoading={createJobPostResponse?.isLoading}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                createJobPostResponse?.isLoading
              }
              onPress={() => formik.handleSubmit()}
            />
          </ScrollView>
        ) : (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: 24, marginBottom: 5}}>
              Test Information :
            </Text>
            <View>
              <Text>Test Title :</Text>
              <SharedInput
                name={'testTitle'}
                inputType="text"
                placeholder="Test Title"
                onChange={setTestTitle}
              />
            </View>
            <View>
              <Text>Total Mark:</Text>
              <SharedInput
                name={'testTitle'}
                inputType="numeric"
                placeholder="Total mark"
                onChange={setMarks}
              />
            </View>
            <Text style={{fontSize: 24, marginBottom: 2}}>
              Question Upload :
            </Text>
            <View style={styles.questionTab}>
              <TouchableOpacity
                onPress={() => changeQuestionTab(1)}
                style={{
                  width: '50%',
                  backgroundColor:
                    questionTab == 1
                      ? AppColors.AppButtonBackground
                      : AppColors.AppBackground,
                  margin: questionTab == 1 ? 3 : 0,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                <SvgIcon
                  name="plus"
                  width={20}
                  height={20}
                  strokeColor={
                    questionTab == 1
                      ? AppColors.AppTextColor
                      : AppColors.AppButtonBackground
                  }
                />
                <Text
                  style={{
                    color:
                      questionTab == 1
                        ? AppColors.AppTextColor
                        : AppColors.AppButtonBackground,
                    fontSize: 16,
                    fontWeight: questionTab == 1 ? 800 : 600,
                  }}>
                  Add Questions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changeQuestionTab(2)}
                style={{
                  width: '48.5%',
                  backgroundColor:
                    questionTab == 2
                      ? AppColors.AppButtonBackground
                      : AppColors.AppBackground,
                  margin: questionTab == 2 ? 2 : 0,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}>
                <SvgIcon
                  name="upload"
                  width={20}
                  height={20}
                  strokeColor={
                    questionTab == 2
                      ? AppColors.AppTextColor
                      : AppColors.AppButtonBackground
                  }
                />
                <Text
                  style={{
                    color:
                      questionTab == 2
                        ? AppColors.AppTextColor
                        : AppColors.AppButtonBackground,
                    fontSize: 16,
                    fontWeight: questionTab == 2 ? 800 : 600,
                  }}>
                  Upload Questions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {questionTab == 1 && currentStep == 1 ? (
          <View style={{width: '90%', alignSelf: 'center', marginTop: 5}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
              Select Question Type:
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                marginLeft: 5,
              }}>
              {questionTypes &&
                questionTypes.map((item, ind) => (
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      backgroundColor:
                        selectedQuestionType == item
                          ? AppColors.AppButtonBackground
                          : '#ede9fe',
                      borderRadius: 40,
                      borderWidth: 1,
                      borderColor: AppColors.AppButtonBackground,
                      paddingHorizontal: 20,
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 3,
                    }}
                    key={ind}
                    onPress={() => setSelectedQuestionType(item)}>
                    {selectedQuestionType == item ? (
                      <SvgIcon
                        name="tick"
                        width={18}
                        height={15}
                        strokeColor="white"
                      />
                    ) : null}
                    <Text
                      style={{
                        textAlign: 'center',
                        color:
                          selectedQuestionType == item
                            ? AppColors.AppTextColor
                            : '',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
            {selectedQuestionType && (
              <>
                <View>
                  <Text style={{fontSize: 16, marginTop: 10}}>Question:</Text>
                  <SharedInput
                    placeholder="Enter question text"
                    value={questionText}
                    onChange={setQuestionText}
                    inputType="text"
                    name={'question'}
                  />
                  <Text style={{fontSize: 16}}>Options:</Text>
                  {selectedQuestionType !== 'Short Answer'
                    ? options.map((item: any, ind: any) => (
                        <View
                          key={ind}
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                          }}>
                          <SharedInput
                            placeholder={`Option ${ind + 1}`}
                            inputType="text"
                            name={`option${ind + 1}`}
                            value={item?.text}
                            containerStyle={{width: '70%'}}
                            onChange={(text: any) =>
                              updateOption(item.id, text)
                            }
                          />
                          {item.text ? (
                            <>
                              <TouchableOpacity
                                style={{
                                  width: 50,
                                  height: 40,
                                }}
                                onPress={addOption}>
                                <Text
                                  style={{
                                    color: '#7e22ce',
                                    fontWeight: 800,
                                    paddingLeft: 10,
                                  }}>
                                  + Add
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  width: 50,
                                  height: 40,
                                  margin: 10,
                                }}
                                onPress={() => removeOption(item.id)}>
                                <SvgIcon
                                  name="close"
                                  strokeColor={'red'}
                                  height={20}
                                  width={20}
                                />
                              </TouchableOpacity>
                            </>
                          ) : null}
                        </View>
                      ))
                    : null}
                </View>
                <SharedButton
                  onPress={Preview}
                  title="Preview and Submit"
                  style={{marginBottom: 10}}
                />
              </>
            )}
          </View>
        ) : currentStep == 1 ? (
          <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
            <TouchableOpacity
              style={styles.downloadText}
              onPress={downloadFile}>
              <SvgIcon
                width={20}
                height={20}
                name="download"
                strokeColor={AppColors.AppButtonBackground}
              />
              <Text
                style={{
                  color: AppColors.AppButtonBackground,
                  fontWeight: 'bold',
                }}>
                Click here to download sample file
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleFileUpload}>
              <Text style={styles.uploadText}>
                {selectedFile
                  ? `Selected: ${selectedFile.name}`
                  : 'Tap to Upload File'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
      <>
        <BottomSheet ref={ref}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingTop: 5,
              }}>
              Total Mark : {marks}
            </Text>

            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#475569'}}>
              Question:
            </Text>
            <Text style={{paddingLeft: 15, fontSize: 18, color: '#64748b'}}>
              {questionText}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '800',
                marginTop: 15,
                marginBottom: 10,
              }}>
              Options :
            </Text>
            <Text style={{fontSize: 16}}>
              (Select any one as the correct answer.)
            </Text>
            {options &&
              options.map((item: any, ind: number) => (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    margin: 10,
                  }}
                  key={ind}>
                  <TouchableOpacity
                    style={{
                      borderColor:
                        item.text == correctAnswers
                          ? AppColors.AppButtonBackground
                          : '#94a3b8',
                      borderWidth: 1,
                      minWidth: '50%',
                      width: 'auto',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 6,
                      borderRadius: 4,
                      backgroundColor:
                        item.text == correctAnswers
                          ? AppColors.AppBackground
                          : 'transparent',
                    }}
                    onPress={() => setCorrectAnswers(item.text)}>
                    <Radio
                      selected={item.text == correctAnswers}
                      borderColor="#64748b"
                      selectedColor={AppColors.AppButtonBackground}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: item.text == correctAnswers ? 700 : 600,
                        padding: 4,
                        color:
                          item.text == correctAnswers
                            ? AppColors.AppButtonBackground
                            : '',
                      }}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
            <SharedButton
              onPress={submitQuestion}
              title="Submit"
              isLoading={false}
              disabled={!correctAnswers}
            />
          </View>
        </BottomSheet>
      </>
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
    height: 60,
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
  forms: {
    marginBottom: 10,
  },
  questionTab: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    borderWidth: 1,
    borderColor: AppColors.AppButtonBackground,
    borderRadius: 10,
    backgroundColor: AppColors.AppBackground,
  },
  uploadBox: {
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: AppColors.AppButtonBackground,
    borderStyle: 'dotted',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ede9fe',
  },
  uploadText: {
    color: '#666',
    fontSize: 16,
  },
  downloadText: {
    margin: 'auto',
    marginTop: 10,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
});
export const AddJobPost = AddJobPostScreen;
