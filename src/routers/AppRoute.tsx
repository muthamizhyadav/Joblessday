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
import {Candidate} from '../screens/App/Candidate';
import {CandidateProfile} from '../screens/App/canidate/Candidate.profile';
import {CandidateDashboard} from '../screens/App/canidate/Dashboard';
import {CandidateJoblist} from '../screens/App/canidate/Joblist';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {user} = useSelector((state: any) => state.app.data);
  const Role = user.role;

  const Recruiterscreens = [
    {
      name: 'Home',
      component: Home,
      options: {animation: 'fade', lazy: true},
    },

    {
      name: 'candidates',
      component: Candidate,
      options: {animation: 'fade', lazy: true},
    },

    {
      name: 'Job Posts',
      component: JobPost,
      options: {animation: 'fade', lazy: true},
    },

    {
      name: 'Profile',
      component: Profile,
      options: {animation: 'fade', lazy: true},
    },
  ];

  const Candidatescreens: any[] = [
    {
      name: 'Home',
      component: CandidateDashboard,
      options: {animation: 'fade', lazy: true},
    },
    {
      name: 'Job Posts',
      component: CandidateJoblist,
      options: {animation: 'fade', lazy: true},
    },
    {
      name: 'Profile',
      component: CandidateProfile,
      options: {animation: 'fade', lazy: true},
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomNavBar {...props} />}>
      {Role === 'recruiter'
        ? Recruiterscreens.map((item: any, ind: number) => (
            <Tab.Screen
              key={ind}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          ))
        : Candidatescreens.map((item: any, ind: number) => (
            <Tab.Screen
              key={ind}
              name={item.name}
              component={item.component}
              options={item.options}
            />
          ))}
    </Tab.Navigator>
  );
};
export default TabNavigator;
