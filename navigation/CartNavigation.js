import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CartScreen from './screens/cart/CartScreen';
import CreateScreen from './screens/cart/CreateScreen';

const Stack = createStackNavigator();

const CartNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='cart' component={CartScreen} options={{ title: 'Корзина', headerShown: true, }} />
            <Stack.Screen name='create' component={CreateScreen} options={{ title: 'Оформление заказа', headerShown: true, }} />
        </Stack.Navigator>
    )
}

export { CartNavigation }