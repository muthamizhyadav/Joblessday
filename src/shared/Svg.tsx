import React from 'react';
import {View} from 'react-native';
import {SvgProps} from 'react-native-svg';

// Import SVGs

import Recruiter from '../assets/svg/recruiter.svg';
import JobSeaker from '../assets/svg/jobseaker.svg';
import eye from '../assets/svg/eye.svg';
import eyeClose from '../assets/svg/eyeClose.svg';
import signin from '../assets/svg/signin.svg';
import google from '../assets/svg/google.svg';
import signup from '../assets/svg/signup.svg';
import forgot from '../assets/svg/Forgot.svg';
import otp from '../assets/svg/otp.svg';
import password from '../assets/svg/password.svg';
import home from '../assets/svg/home.svg';
import setting from '../assets/svg/setting.svg';
import profile from '../assets/svg/profile.svg';
import job from '../assets/svg/job.svg';
import bell from '../assets/svg/bell.svg';

const icons: Record<string, React.FC<SvgProps>> = {
  recruiter: Recruiter,
  jobseaker: JobSeaker,
  eye: eye,
  eyeclose: eyeClose,
  signin,
  google,
  signup,
  forgot,
  otp,
  password,
  home,
  setting,
  profile,
  job,
  bell,
};

interface SvgIconProps {
  name: keyof typeof icons;
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeColor?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  width = 24,
  height = 24,
  color,
  strokeColor,
}) => {
  const IconComponent = icons[name];
  console.log('IconComponent:', IconComponent);

  if (!IconComponent) {
    return <View />;
  } else {
    return <IconComponent width={width} height={height} stroke={strokeColor} />;
  }
};

export default SvgIcon;
