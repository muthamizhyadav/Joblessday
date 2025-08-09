import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const SplashScreenComponent: React.FC = () => {
  return (
    <LinearGradient
      colors={['#8E44AD', '#6A1B9A', '#7B1FA2']}
      style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Interview Spot</Text>
        {/* Add your character illustration here if you have it as an image */}
        <View style={styles.characterPlaceholder}>
          {/* This is where you would add the running character image */}
          <Text style={styles.characterEmoji}>🏃‍♂️💼</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,
    letterSpacing: 1,
  },
  characterPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
});

export default SplashScreenComponent;
