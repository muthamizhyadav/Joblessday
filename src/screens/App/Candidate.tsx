import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { AppColors } from '../../constants/colors.config';

const screenWidth = Dimensions.get('window').width;

const CandidateScreen: React.FC = () => {
  // Mock data for job posts
  const jobPostsData = {
    labels: ['This Week', 'Today', 'This Month'],
    datasets: [{
      data: [12, 5, 45],
    }],
  };

  // Mock data for skill matching
  const skillMatchingData = [
    {
      name: 'React',
      population: 85,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Node.js',
      population: 72,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Python',
      population: 68,
      color: '#FFCE56',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Java',
      population: 60,
      color: '#4BC0C0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  // Mock data for comparisons
  const salaryData = {
    labels: ['0-2 Years', '2-5 Years', '5-10 Years', '10+ Years'],
    datasets: [{
      data: [45000, 65000, 85000, 120000],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    }],
  };

  const experienceData = {
    labels: ['React', 'Node.js', 'Python', 'Java', 'AWS'],
    datasets: [{
      data: [3.2, 4.1, 2.8, 5.5, 3.9],
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(105, 75, 195, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    useShadowColorFromDataset: false,
    yAxisLabel: '',
    yAxisSuffix: '',
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForLabels: {
      fontSize: 12,
    },
    propsForVerticalLabels: {
      fontSize: 10,
      rotation: 0,
    },
    propsForHorizontalLabels: {
      fontSize: 10,
    },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Job Posts Overview</Text>
        <BarChart
          data={jobPostsData}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Highest Skill Matching Candidates</Text>
        <PieChart
          data={skillMatchingData}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Average Salary by Experience</Text>
        <LineChart
          data={salaryData}
          width={screenWidth - 100}
          height={220}
          chartConfig={{
            ...chartConfig,
            decimalPlaces: 0,
            propsForLabels: {
              fontSize: 10,
            },
          }}
          style={styles.chart}
          bezier
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Average Experience by Skill</Text>
        <BarChart
          data={experienceData}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    backgroundColor: AppColors.AppButtonBackground,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  chartContainer: {
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 5,
  },
});

export const Candidate = CandidateScreen;
