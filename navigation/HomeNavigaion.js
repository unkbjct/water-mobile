import * as React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Button, View, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import FilterScreen from './screens/FilterScreen';

const Stack = createStackNavigator();

const HomeScreenNavigation = function ({ navigation }) {

    let qwe = '';

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                title: 'Каталог',
                header: () => {
                    return (
                        <View style={styles.safeArea}>

                            <TextInput
                                style={styles.input}
                                // value={value}
                                placeholder="Поиск товара"
                                onChangeText={(text) => { qwe = text }}
                            // keyboardType="text"
                            />
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                navigation.navigate("Filter")
                            }}>
                                <Ionicons style={{
                                }} name={'filter'} size={30} color={'blue'} />
                            </TouchableOpacity>
                        </View>
                    );
                }
            }} />
            <Stack.Screen name="FullPost" component={PostScreen} options={{ title: 'Продукт', unmountOnBlur: true, headerLeftLabelVisible: false, }} />
            <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Фильтры', headerLeftLabelVisible: false, }} />
        </Stack.Navigator>
    );
}

export { HomeScreenNavigation };

const styles = StyleSheet.create({
    input: {
        width: '85%',
        borderWidth: 1,
        borderColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    safeArea: {
        backgroundColor: 'white',
        zIndex: -1,
        height: 50,
        paddingHorizontal: 20,
        paddingVertical: 7,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btn: {
        width: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    }
});
