import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from './screens/cart/CartScreen';

const Stack = createStackNavigator();

const CartNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='cart' component={CartScreen} options={{ title: 'Корзина', headerShown: false, }} />
        </Stack.Navigator>
    )
}

export { CartNavigation }