'use strict';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/routers';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/store/store';
import Toast from 'react-native-toast-message';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {FontFamily} from './src/constants/fonts';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    surface: '#ffffff',
    primary: '#6200ee',
    text: '#000000',
    placeholder: '#888888',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: FontFamily.Inter.Regular,
    },
    medium: {
      fontFamily: FontFamily.Inter.Medium,
    },
    light: {
      fontFamily: FontFamily.Inter.Light,
    },
    thin: {
      fontFamily: FontFamily.Inter.Light,
    },
  },
};

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Show splash screen
  if (showSplash) {
    return (
      <View style={[styles.container, {backgroundColor: '#8E44AD', justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold', textAlign: 'center', fontFamily: FontFamily.Inter.Bold}}>
          Interview Spot
        </Text>
        <Text style={{color: 'white', fontSize: 60, marginTop: 20}}>
          🏃‍♂️💼
        </Text>
      </View>
    );
  }

  // Show main app
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={lightTheme}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
          <Toast />
        </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
