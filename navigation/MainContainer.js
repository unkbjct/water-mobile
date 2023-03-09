import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/stack';

// screens


import { HomeScreenNavigation } from './HomeNavigaion';
import { ProfileScreenNavigation } from './ProfileNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

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
const Stack = createStackNavigator();

export default function MainContainer() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isLogin, setIsLogin] = React.useState(true);


    const fetchPosts = () => {
        setIsLoading(true);
        AsyncStorage.getItem('user', (errs, user) => {
            if (user) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        }).finally(() => {
            setIsLoading(false)
        });
    };

    React.useEffect(fetchPosts, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }



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
            <Tab.Navigator initialRouteName={isLogin ? 'main' : 'auth'}>
                <Tab.Screen name="auth" component={Auth} options={{ headerShown: false, tabBarStyle: {display:'none'} }} />
                <Tab.Screen name="main" component={Main} options={{ headerShown: false, tabBarStyle: {display:'none'} }} />
            </Tab.Navigator>
            {/* st */}
        </NavigationContainer>
    );

}


function Auth() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='asd' component={LoginScreen} /> */}
            <Stack.Screen name="login" component={LoginScreen} options={{ title: 'Авторизация', headerShown: false }} />
            <Stack.Screen name='registration' component={RegistrationScreen} options={{ title: 'Регистрация', headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
}


function Main() {
    return (
        <Tab.Navigator
            header={'asd'}
            screenOptions={({ route }) => ({
                // headerShown: () => {
                //     if () {
                //         iconName = focused ? 'home' : 'home-outline';
                //     } else if (rn === settingsName) {
                //         iconName = focused ? 'settings' : 'settings-outline';
                //     }
                // }.bind(route),
                // headerShown: qwe(route),
                headerShown: true,
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

            <Tab.Screen name={screenNames.home} component={HomeScreenNavigation} options={{headerShown: false}} />
            <Tab.Screen name={screenNames.cart} component={HomeScreenNavigation} />
            <Tab.Screen name={screenNames.profile} component={ProfileScreenNavigation} options={{headerShown: false}} />

        </Tab.Navigator>
    );
}

function qwe(route) {
    // if (route.name == screenNames.home) {
    //     return false
    // } else {
    //     return true
    // };
}