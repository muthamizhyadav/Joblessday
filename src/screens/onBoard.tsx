import {Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {AppColors} from '../constants/colors.config';
import {useState} from 'react';
import SvgIcon from '../shared/Svg';
import SharedButton from '../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import {FontFamily} from '../constants/fonts';

const OnboardScreen = () => {
  const [selected, setSelected] = useState<number>(0);
  const OnSelect = (selectedValue: number) => {
    setSelected(selectedValue);
  };
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.AppBackground,
      }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '100%',
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 20,
              fontWeight: '800',
              fontFamily: FontFamily.Inter.Bold,
            }}>
            How would you like to continue?
          </Text>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              gap: 15,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 10,
                borderWidth: selected == 2 ? 2 : 0,
                borderColor: AppColors.AppButtonBackground,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 0,
                justifyContent: 'space-between',
              }}
              onPress={() => navigation.navigate('NewPassword', {id: 2})}>
              <SvgIcon
                name="jobseaker"
                height={100}
                width={100}
                color={AppColors.AppButtonBackground}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FontFamily.Inter.Medium,
                  color:
                    selected == 2 ? AppColors.AppButtonBackground : 'black',
                  textAlign: 'center',
                }}>
                JobSeeker
              </Text>
              <SvgIcon name="right" strokeColor="gray" width={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 12,
                padding: 10,
                borderWidth: selected == 1 ? 2 : 0,
                borderColor: AppColors.AppButtonBackground,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 0,
                justifyContent: 'space-between',
                width: '100%',
              }}
              onPress={() => navigation.navigate('Signup', {id: 1})}>
              <SvgIcon
                name="recruiter"
                height={100}
                width={100}
                color={AppColors.AppButtonBackground}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FontFamily.Inter.Medium,
                  color:
                    selected == 1 ? AppColors.AppButtonBackground : 'black',
                  textAlign: 'center',
                }}>
                Recruiter
              </Text>
              <SvgIcon name="right" strokeColor="gray" width={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            alignItems: 'center',
            bottom: 30,
            width: '90%',
            height: 50,
          }}>
          <Text style={{fontSize: 16}}>Already have an account?</Text>
          <TouchableOpacity
            style={{paddingLeft: 5}}
            // onPress={() =>
            //   navigation.navigate('employmentDetails', {
            //     experienceLevel: 'experienced',
            //   })
            // }
            onPress={() => navigation.navigate('singin')}
            >
            <Text
              style={{
                fontSize: 18,
                color: '#694bc3',
                fontWeight: 800,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export const Onboard = OnboardScreen;
