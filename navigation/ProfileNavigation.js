import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './screens/profile/ProfileScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import HistoryScreen from './screens/profile/HistoryScreen';
import OrderScreen from './screens/profile/OrderScreen';
import FavoritesScreen from './screens/profile/FavoritesScreen';
import InformationScreen from './screens/profile/InformationScreen';

const Stack = createStackNavigator();

const ProfileScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Профиль', headerShown: false, }} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Изменение профиля', headerBackTitleVisible: false, }} />
            <Stack.Screen name='HistoryScreen' component={HistoryScreen} options={{ title: 'История заказов', headerBackTitleVisible: true, }} />
            <Stack.Screen name='Order' component={OrderScreen} options={{ title: 'Заказ', headerBackTitleVisible: true, }} />
            <Stack.Screen name='Favorites' component={FavoritesScreen} options={{ title: 'Избранные товары', headerBackTitleVisible: true, }} />
            {/* <Stack.Screen name='Information' component={InformationScreen} options={{ title: 'Информация', headerBackTitleVisible: true, }} /> */}
        </Stack.Navigator>
    )
}

export { ProfileScreenNavigation }