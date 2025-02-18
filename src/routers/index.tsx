import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Forgot, NewPassword, Onboard, OTP, Signin, Signup} from '../screens';
import TabNavigator from './AppRoute';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="singin">
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="singin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
