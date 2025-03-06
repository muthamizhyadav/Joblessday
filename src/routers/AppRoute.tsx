import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomNavBar from '../components/customNavBar';
import {
  AddJobPost,
  Home,
  JobPost,
  Jobs,
  Profile,
  Settings,
} from '../screens/App';
import {useSelector} from 'react-redux';
import { Candidate } from '../screens/App/Candidate';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const Role = user.role;
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomNavBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{animation: 'fade', lazy: true}}
      />
      <Tab.Screen
        name="candidates"
        component={Candidate}
        options={{animation: 'fade', lazy: true}}
      />
      {Role == 'recruiter' ? (
        <Tab.Screen
          name="Job Posts"
          component={JobPost}
          options={{animation: 'fade', lazy: true}}
        />
      ) : (
        <Tab.Screen
          name="Jobs"
          component={Jobs}
          options={{animation: 'fade', lazy: true}}
        />
      )}
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{animation: 'fade', lazy: true}}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{animation: 'fade', lazy: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
