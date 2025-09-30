import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AppColors } from '../../constants/colors.config';
import moment from 'moment';

interface ExperienceChartProps {
  experiences: Array<{
    CompanyName: string;
    role: string;
    fromDate: string;
    toDate: string;
    experience: number;
  }>;
}

const ExperienceChart: React.FC<ExperienceChartProps> = ({ experiences }) => {
  const screenWidth = Dimensions.get('window').width;

  // Prepare data for bar chart
  const prepareChartData = () => {
    if (experiences.length === 0) return null;

    const sortedExperiences = experiences
      .slice()
      .sort((a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime());

    const labels = sortedExperiences.map(exp => {
      const companyName = exp.CompanyName || 'Unknown Company';
      return companyName.length > 8 
        ? companyName.substring(0, 8) + '...'
        : companyName;
    });

    const data = sortedExperiences.map(exp => exp.experience || 0);

    return {
      labels,
      datasets: [
        {
          data,
          colors: sortedExperiences.map((_, index) => 
            (opacity = 1) => `rgba(${
              index % 2 === 0 ? '34, 139, 34' : '70, 130, 180'
            }, ${opacity})`
          ),
        },
      ],
    };
  };

  const chartData = prepareChartData();

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => AppColors.AppButtonBackground + Math.floor(opacity * 255).toString(16).padStart(2, '0'),
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForVerticalLabels: {
      fontSize: 10,
    },
    propsForHorizontalLabels: {
      fontSize: 10,
    },
  };

  const totalExperience = experiences.reduce((sum, exp) => sum + (exp.experience || 0), 0);

  if (experiences.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No experience data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Professional Experience</Text>
        <Text style={styles.subtitle}>{totalExperience.toFixed(1)} years total experience</Text>
      </View>
      
      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{totalExperience.toFixed(1)}</Text>
          <Text style={styles.summaryLabel}>Years</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{experiences.length}</Text>
          <Text style={styles.summaryLabel}>Companies</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>
            {experiences.length > 0 ? (totalExperience / experiences.length).toFixed(1) : '0'}
          </Text>
          <Text style={styles.summaryLabel}>Avg/Company</Text>
        </View>
      </View>
      
      {chartData && (
        <BarChart
          data={chartData}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          yAxisLabel=""
          yAxisSuffix="y"
          fromZero
          style={styles.chart}
          showValuesOnTopOfBars
        />
      )}

      <View style={styles.detailsContainer}>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.companyHeader}>
              <Text style={styles.companyName}>{exp.CompanyName || 'Unknown Company'}</Text>
              <Text style={styles.duration}>{exp.experience?.toFixed(1) || 0}y</Text>
            </View>
            <Text style={styles.role}>{exp.role || 'Role not specified'}</Text>
            <Text style={styles.period}>
              {moment(exp.fromDate).format('MMM YYYY')} - {moment(exp.toDate).format('MMM YYYY')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  totalYears: {
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
  },
  companiesCount: {
    fontSize: 14,
    color: '#666',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  detailsContainer: {
    marginTop: 15,
  },
  experienceItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: AppColors.AppButtonBackground,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  duration: {
    fontSize: 14,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
    backgroundColor: AppColors.AppBackground,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  role: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
    fontWeight: '500',
  },
  period: {
    fontSize: 12,
    color: '#777',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: AppColors.AppButtonBackground,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default ExperienceChart;
