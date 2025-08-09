'use strict';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/routers';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/store/store';
import Toast from 'react-native-toast-message';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import SplashScreenComponent from './src/components/SplashScreen';

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
};

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      SplashScreen.hide();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenComponent />;
  }

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
