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

export default function RegistrationScreen({ navigation }) {
    let data = {
        email: null,
        name: null,
        surname: null,
        passwd: null,
        confirmPasswd: null,
    }

    return (
        <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* <StatusBar  hidden = {true} backgroundColor="#00BCD4" /> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Image style={styles.logo} source={require('../../img/logo128.png')} />
                    <Text style={styles.title}>Регистрация</Text>
                    <View style={styles.inputItem}>
                        <EditInput onChange={text => { data.email = text }} style={styles.input} data={{ label: "Электронная почта" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput onChange={text => { data.name = text }} style={styles.input} data={{ label: "Имя" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput onChange={text => { data.surname = text }} style={styles.input} data={{ label: "Фамилия" }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput onChange={text => { data.passwd = text }} style={styles.input} data={{ label: "пароль", secure: true }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput onChange={text => { data.confirmPasswd = text }} style={styles.input} data={{ label: "Подтверждение пароля", secure: true }} />
                    </View>
                    <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => {
                        let errs = [];
                        if (!data.email) errs.push('Почта обязательное поле');
                        if (!data.name) errs.push('Почта обязательное поле');
                        if (!data.surname) errs.push('Почта обязательное поле');
                        if (!data.passwd) errs.push('Пароль обязательное поле');
                        if (!data.confirmPasswd) errs.push('Пароль обязательное поле');

                        if (errs.length) {
                            Alert.alert('Не все поля заполнены!');
                            return;
                        }
                        if (data.passwd != data.confirmPasswd) {
                            Alert.alert('Пароли не совпадают!');
                            return;
                        }

                        var formdata = new FormData();
                        formdata.append("email", data.email);
                        formdata.append("name", data.name);
                        formdata.append("surname", data.surname);
                        formdata.append("passwd", data.passwd);
                        formdata.append("confirmPasswd", data.confirmPasswd);

                        fetch('http://colledge.fun/api/account/create', {
                            method: 'post',
                            body: formdata,
                        }).then(response => response.text()).then(response => {
                            response = JSON.parse(response)
                            if (response.status == 'error') {
                                Alert.alert("Данная почта уже кем-то используется!")
                            } else {
                                AsyncStorage.setItem('user', JSON.stringify(response.data.user), () => {
                                    navigation.navigate('main')
                                });
                            }
                            console.log(response)
                        })
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
