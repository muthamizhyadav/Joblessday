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
import back from '../assets/svg/back.svg';
import plus from '../assets/svg/plus.svg';
import search from '../assets/svg/search.svg';
import filter from '../assets/svg/filter.svg';
import upload from '../assets/svg/upload.svg';
import tick from '../assets/svg/tick.svg';
import close from '../assets/svg/close.svg';
import download from '../assets/svg/download.svg';
import redirect from '../assets/svg/redirect.svg';
import location from '../assets/svg/location.svg';
import locationround from '../assets/svg/locationround.svg';
import applications from '../assets/svg/applications.svg';
import edit from '../assets/svg/edit.svg';
import delet from '../assets/svg/delete.svg';
import candidate from '../assets/svg/userGroup.svg';
import email from '../assets/svg/email.svg';
import phone from '../assets/svg/phone.svg';
import link from '../assets/svg/phone.svg';
import clock from '../assets/svg/clock.svg';
import briefcase from '../assets/svg/briefcase.svg';
import calendor from '../assets/svg/calendor.svg';
import file from '../assets/svg/file.svg';









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
  back,
  plus,
  search,
  filter,
  upload,
  tick,
  close,
  download,
  redirect,
  location,
  locationround,
  applications,
  edit,
  delet,
  candidate,
  email,
  phone,
  link,
  clock,
  briefcase,
  calendor,
  file
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
  if (!IconComponent) {
    return <View />;
  } else {
    return <IconComponent width={width} height={height} stroke={strokeColor} />;
  }
};

export default SvgIcon;
