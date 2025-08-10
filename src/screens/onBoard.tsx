import {Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../constants/colors.config';
import {useState} from 'react';
import SvgIcon from '../shared/Svg';
import SharedButton from '../shared/SharedButton';
import {useNavigation} from '@react-navigation/native';
import {FontFamily} from '../constants/fonts';

const OnboardScreen = () => {
  const [selected, setSelected] = useState<number>(0);
  const OnSelect = (selectedValue: number) => {
    console.log(selectedValue, 'onPress={()=>OnSelect(1)}');
    setSelected(selectedValue);
  };
  const navigation = useNavigation<any>();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: AppColors.AppBackground,
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
            width: '90%',
            height: 300,
            margin: 'auto',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems:'center',
            gap: 10,
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '50%',
              borderCurve: 'circular',
              borderColor: AppColors.AppButtonBackground,
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: selected == 1 ? 2 : 0,
            }}
            onPress={() => navigation.navigate('Signup', {id: 1})}>
            <SvgIcon
              name="recruiter"
              height={'80%'}
              width={'100%'}
              color={AppColors.AppButtonBackground}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: selected == 1 ? AppColors.AppButtonBackground : 'black',
              }}>
              Recruiter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '50%',
              borderCurve: 'circular',
              borderColor: AppColors.AppButtonBackground,
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: selected == 2 ? 2 : 0,
            }}
            onPress={() => navigation.navigate('Signup', {id: 2})}>
            <SvgIcon
              name="jobseaker"
              height={'80%'}
              width={'100%'}
              color={AppColors.AppButtonBackground}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: selected == 2 ? AppColors.AppButtonBackground : 'black',
              }}>
              JobSeaker
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <SharedButton
        title="Continue"
        disabled={selected == 0}
        onPress={() => navigation.navigate('Signup', {id: selected})}
        style={{position: 'absolute', bottom: 30, width: '90%', height: 50}}
      /> */}

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
          onPress={() => navigation.navigate('singin')}>
          <Text
            style={{
              fontSize: 18,
              color: AppColors.AppButtonBackground,
              fontWeight: 800,
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const Onboard = OnboardScreen;
