import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/stack';
// import { FullPostScreen } from './screens/FullPost';

// screens
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/profile/ProfileScreen';
import FullPostScreen from './screens/PostScreen';

import { HomeScreenNavigation } from './HomeNavigaion';
import { ProfileScreenNavigation } from './ProfileNavigation';

// Screens names
// const homeName = 'Католог';
// const cartName = 'Корзина';
// const profileName = 'Профиль';

const screenNames = {
    home: 'Каталог',
    cart: 'Корзина',
    profile: 'Профиль'
}

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <NavigationContainer>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                theme="auto"
            // hidden={true}
            // animated="slide"
            // showHideTransition="fade"
            />

            <Tab.Navigator
                initialRouteName={screenNames.home}
                header={'asd'}
                tabBarO
                screenOptions={({ route }) => ({
                    // headerShown: () => {
                    //     if () {
                    //         iconName = focused ? 'home' : 'home-outline';
                    //     } else if (rn === settingsName) {
                    //         iconName = focused ? 'settings' : 'settings-outline';
                    //     }
                    // }.bind(route),
                    // headerShown: qwe(route),
                    headerShown: false,
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        let rn = route.name;
                        // console.debug();
                        if (rn === screenNames.home) {
                            iconName = focused ? 'search-circle' : 'search-circle-outline';
                        } else if (rn === screenNames.cart) {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (rn === screenNames.profile) {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        }
                        // color = focused ? 'red' : 'blue';
                        // size = 20;

                        return <Ionicons name={iconName} size={30} color={color} />
                    }
                })}
            >

                <Tab.Screen name={screenNames.home} component={HomeScreenNavigation} />
                <Tab.Screen name={screenNames.cart} component={HomeScreenNavigation} />
                <Tab.Screen name={screenNames.profile} component={ProfileScreenNavigation} />

            </Tab.Navigator>

            {/* <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Новости' }} />
                <Stack.Screen name="FullPost" component={FullPostScreen} options={{ title: 'Статья' }} />
            </Stack.Navigator> */}
        </NavigationContainer>
    );
}

function qwe(route) {
    // if (route.name == screenNames.home) {
    //     return false
    // } else {
    //     return true
    // };
}