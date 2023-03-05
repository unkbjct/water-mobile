import * as React from 'react';
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


export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.ViewName}>
                <Text style={styles.TextName}>Худнийикй Дмитрий</Text>
            </View>
            <ScrollView style={styles.ListSettings}>
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
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'reorder-three'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Мои заказы</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'notifications'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Уведомления</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'heart'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Избранное</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'eye'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>История просмотроп</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
                <TouchableWithoutFeedback onPress={() => { Alert.alert("asd", 'asd') }}>
                    <View style={styles.SettingItem}>
                        <View>
                            <Ionicons name={'log-out'} size={25} color={'blue'} />
                        </View>
                        <View style={styles.SettingItemViewText}>
                            <Text style={styles.SettingItemText}>Сменить пользователя</Text>
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