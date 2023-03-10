import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from '../../../components/Loading';


export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState();
    const [favorites, setFavorites] = React.useState();

    const getUser = () => {
        setIsLoading(true);
        AsyncStorage.getItem('user', (errs, user) => {
            setUser(JSON.parse(user));
            AsyncStorage.getItem('favorites', (errs, favorites) => {
                setFavorites(JSON.parse(favorites));
            }).finally(() => {
                setIsLoading(false)
            });
        })
    };

    React.useEffect(getUser, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.ViewName}>
                <Text style={styles.TextName}>{user.surname} {user.name}</Text>
            </View>
            <ScrollView style={styles.ListSettings} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getUser} />}>
                <TouchableWithoutFeedback onPress={() => { navigation.navigate('EditProfile') }}>
                    <View style={styles.SettingItem}>
                        <View style={styles.ViewIcon}>
                            <Ionicons name={'pencil-outline'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Редактировать профиль</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { navigation.navigate('HistoryScreen') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'reorder-three'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Мои заказы</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { navigation.navigate('Favorites') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'heart'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Избранное <Text style={{ color: 'rgb(100, 100, 100)' }}>{(favorites) ? favorites.length : ''}</Text></Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                {/* <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'eye'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>История просмотроп</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback> */}
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'information-circle'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Информация</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'help-buoy'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Поддержка</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "Вы дейстительно хотите выйти?", null,
                        [
                            {
                                text: "Да, Выйти",
                                onPress: () => {
                                    AsyncStorage.removeItem('user');
                                    navigation.navigate('auth');
                                },
                            }, {
                                text: "Нет, Отмена",
                            },
                        ]
                    );
                }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'log-out'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Выйти</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ViewName: {
        // borderWidth: 1,
        // borderColor: 'red',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 20,
        justifyContent: 'center',
        borderBottomColor: 'rgba(30, 30, 30, .2)',
        borderBottomWidth: 1,
        // marginBottom: 10,
    },
    TextName: {
        fontSize: 30,
        // fontFamily: 'satisfies'
    },
    ListSettings: {
        // borderWidth: 1,
        // borderColor: 'blue',
        // padding: 10,
    },
    SettingItem: {
        // borderWidth: 1,
        // borderColor: 'green',
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: '100%',
        borderBottomColor: 'rgba(30, 30, 30, .1)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: 'center'
        // alignContent: 'center',
    },
    ViewIcon: {
        justifyContent: 'center',
    },
    SettingItemViewText: {
        justifyContent: 'center'
    },
    SettingItemText: {
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 'auto',
    }
})