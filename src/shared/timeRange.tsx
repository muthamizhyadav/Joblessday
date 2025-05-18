// src/components/TimeRange.tsx

import React from 'react';
import { Text, TextStyle } from 'react-native';
import moment from 'moment';

interface TimeRangeProps {
  startTime: string | Date;
  endTime: string | Date;
  style?: TextStyle;
}

const TimeRange: React.FC<TimeRangeProps> = ({ startTime, endTime, style }) => {
  const formattedStart = moment.utc(startTime).format('hh:mm A');
  const formattedEnd = moment.utc(endTime).format('hh:mm A');

  return <Text style={style}>{`${formattedStart} - ${formattedEnd}`}</Text>;
};

export default TimeRange;
