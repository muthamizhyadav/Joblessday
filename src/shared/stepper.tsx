import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppColors} from '../constants/colors.config';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onNext,
  onPrevious,
}) => {
  return (
    <View style={styles.container}>
      {/* Step Indicators */}
      <View style={styles.stepContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepWrapper}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}>
              <View
                style={[
                  styles.circle,
                  index === currentStep
                    ? styles.activeCircle
                    : index < currentStep
                    ? styles.completedCircle
                    : styles.inactiveCircle,
                ]}>
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
              <Text>{step}</Text>
            </View>

            {index < steps.length - 1 && <View style={styles.line} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  activeCircle: {
    backgroundColor: AppColors.AppButtonBackground,
  },
  completedCircle: {
    backgroundColor: '#28a745',
  },
  inactiveCircle: {
    backgroundColor: '#ccc',
  },
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    width: 100,
    height: 5,
    backgroundColor: '#ccc',
  },
  stepContent: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
