import {Text, TouchableOpacity, View} from 'react-native';
import {AppColors} from '../constants/colors.config';
import {useState} from 'react';
import SvgIcon from '../shared/Svg';
import SharedButton from '../shared/SharedButton';

const OnboardScreen = () => {
  const [selected, setSelected] = useState<number>(0);
  const OnSelect = (selectedValue: number) => {
    console.log(selectedValue, 'onPress={()=>OnSelect(1)}');
    setSelected(selectedValue);
  };

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
            fontWeight: 800,
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
            onPress={() => OnSelect(1)}>
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
            onPress={() => OnSelect(2)}>
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
      <SharedButton
        title="Get Started"
        disabled={selected == 0}
        onPress={() => console.log('clicked')}
        style={{position: 'absolute', bottom: 30, width: '90%', height: 50}}
      />
    </View>
  );
};

export const Onboard = OnboardScreen;
