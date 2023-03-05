import * as React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, Button, View, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';

const Stack = createStackNavigator();

const HomeScreenNavigation = function () {

    let qwe = '';

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{
                header: () => {
                    return (
                        <SafeAreaView style={styles.safeArea}>
                            <View style={{
                                height: '100%',
                                width: '100%',
                                paddingHorizontal: 10,
                                paddingVertical: 3,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}>
                                <TextInput
                                    style={styles.input}
                                    // value={value}
                                    placeholder="Поиск товара"
                                    onChangeText={(text) => { qwe = text }}
                                    // keyboardType="text"
                                />
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    Alert.alert('Ошибка', qwe);
                                    // console.debug(qwe);
                                }}>
                                    <Ionicons style={{
                                    }} name={'filter'} size={30} color={'blue'} />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    );
                }
            }} />
            <Stack.Screen name="FullPost" component={PostScreen} options={{ title: 'Статья' }} />
        </Stack.Navigator>
    );
}

export { HomeScreenNavigation };

const styles = StyleSheet.create({
    input: {
        // height: "100%",
        // margin: 12,
        width: '80%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'silver',
        padding: 10,
        borderRadius: 10,
    },
    safeArea: {
        backgroundColor: 'white',
        zIndex: -1,
        marginTop: 10,
        height: 50,
        // marginRight: 40,
        paddingRight: 20,
        paddingHorizontal: 10,
        // marginHorizontal: 10,
        width: "100%",
        // borderColor: 'blue',
        // flex: 1,
        // borderWidth: 1,

    },
    btn: {
        // marginTop: 'auto',
        // flex: 1,
        height: '100%',
        justifyContent: 'center',
        // width: 20,
        // borderColor: 'green',
        // borderWidth: 1,
        // marginLeft:
    }
});
