import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from './screens/profile/ProfileScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';

const Stack = createStackNavigator();

const ProfileScreenNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: 'Профиль', headerShown: false, }} />
            <Stack.Screen name='EditProfile' component={EditProfileScreen} options={{ title: 'Изменение профиля', headerBackTitleVisible: false, }} />
        </Stack.Navigator>
    )
}

export { ProfileScreenNavigation }