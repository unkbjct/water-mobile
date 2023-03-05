import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
    View,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import EditInput from '../../components/EditInput';

export default function LoginScreen({ navigation }) {
    return (
        <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* <StatusBar  hidden = {true} backgroundColor="#00BCD4" /> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Image style={styles.logo} source={require('../../img/logo128.png')} />
                    <Text style={styles.title}>Регистрация</Text>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Электронная почта" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Имя" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Фамилия" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "пароль", secure: true }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Подтверждение пароля", secure: true }} />
                    </View>
                    <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => {
                        // var data = null;
                        // console.log('\n')
                        // AsyncStorage.getItem('qwe', (errs, result) => {
                        //     // data = result;
                        //     // console.log(result)
                        // }).then((user) => {
                        //     if(!user) return;
                        //     console.log(user)
                        // })

                    }}>
                        <Text>Войти</Text>
                    </TouchableOpacity>
                    <Text style={styles.small}>Если у вас уже есть аккаунт <Text style={styles.link} onPress={() => { navigation.navigate('login') }}>войдите в него</Text></Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(200, 200, 200, .3)',
    },
    inner: {
        padding: 24,
        flex: 1,
        paddingTop: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    inputItem: {
        borderColor: 'red',
        width: '80%'
    },
    title: {
        fontSize: 25,
        marginBottom: 30,
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    btnPrimary: {
        backgroundColor: '#0d6efd',
    },
    link: {
        color: '#0d6efd',
    }
})
