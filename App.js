import * as React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainContainer from './navigation/MainContainer';
import AuthNavigation from './navigation/AuthNavigation';
import LoginScreen from './navigation/screens/LoginScreen';


function App() {
  return (
    <MainContainer />
    // <LoginScreen />
    // <AuthNavigation />
  );
}

export default App;

