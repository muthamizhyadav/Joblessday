import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomNavBar from '../components/customNavBar';
import {Home, Jobs, Profile, Settings} from '../screens/App';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        name="Jobs"
        component={Jobs}
        options={{animation: 'fade', lazy: true}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{animation: 'fade', lazy: true}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{animation: 'fade', lazy: true}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
