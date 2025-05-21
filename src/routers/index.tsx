import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Forgot, NewPassword, Onboard, OTP, Signin, Signup} from '../screens';
import TabNavigator from './AppRoute';
import {AddJobPost} from '../screens/App';
import { Slotcreation } from '../screens/App/Slotcreation';
import { JobdetailsScreen } from '../screens/App/canidate/jobDetails';
import { UpdateProfile } from '../screens/App/canidate/update.profile';
import { UpdateProfileRecruiter } from '../screens/App/updateProfileRecruiter';
import { CandidatedetailsScreen } from '../screens/App/candidate.detail';


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
      <Stack.Screen name="Addpost" component={AddJobPost} />
      <Stack.Screen name="slotCreation" component={Slotcreation} />
      <Stack.Screen name="jobdetail" component={JobdetailsScreen} />
      <Stack.Screen name="candidatedetail" component={CandidatedetailsScreen} />
      <Stack.Screen name="updateProfile" component={UpdateProfile} />
      <Stack.Screen name="updateProfileRecruiter" component={UpdateProfileRecruiter} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
