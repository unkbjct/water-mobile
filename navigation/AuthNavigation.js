import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const Stack = createStackNavigator();



export default function AuthNavigation() {
    return (
        // <LoginScreen />
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name='asd' component={LoginScreen} /> */}
                <Stack.Screen name="login" component={LoginScreen} options={{ title: 'Авторизация', headerShown: false }} />
                <Stack.Screen name='registration' component={RegistrationScreen} options={{ title: 'Регистрация', headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    );
}