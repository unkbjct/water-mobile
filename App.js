import * as React from 'react';
import { Alert, SafeAreaView, StatusBar, View } from 'react-native';
import MainContainer from './navigation/MainContainer';


function App() {
    return (
        <SafeAreaView style={{flex: 1,}}>
            <MainContainer />
        </SafeAreaView>
    )
}

export default App;

