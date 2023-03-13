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
import { SiteUrl } from '../../env';



export default function LoginScreen({ navigation }) {

    let data = {
        email: null,
        passwd: null,
    }

    return (
        <KeyboardAwareScrollView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {/* <StatusBar  hidden = {true} backgroundColor="#00BCD4" /> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Image style={styles.logo} source={require('../../img/logo128.png')} />
                    <Text style={styles.title}>Авторизация</Text>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Электронная почта" }} onChange={(text) => { data.email = text }} />
                    </View>
                    <View style={styles.inputItem}>
                        <EditInput style={styles.input} data={{ label: "Пароль", secure: true }} onChange={(text) => { data.passwd = text }} />
                    </View>
                    <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={() => {
                        let errs = [];
                        if (!data.email) errs.push('Почта обязательное поле');
                        if (!data.passwd) errs.push('Пароль обязательное поле');

                        if (errs.length) {
                            Alert.alert('Не все поля заполнены!');
                            return;
                        }

                        var formdata = new FormData();
                        formdata.append("email", data.email);
                        formdata.append("passwd", data.passwd);

                        fetch(SiteUrl + 'api/account/login', {
                            method: 'post',
                            body: formdata,
                        }).then(response => response.text()).then(response => {
                            response = JSON.parse(response)
                            if (response.status == 'error') {
                                Alert.alert("Пользователь не найден!")
                            } else {
                                console.log()
                                AsyncStorage.setItem('user', JSON.stringify(response.data.user), () => {
                                    navigation.navigate('main')
                                });
                            }
                        })
                    }}>
                        <Text>Войти</Text>
                    </TouchableOpacity>
                    <Text style={styles.small}>Если у вас еще нет аккаунт <Text style={styles.link} onPress={() => { navigation.navigate('registration') }}>создайте его</Text></Text>
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
        width: 100,
        height: 100,
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
    small: {
    },
    link: {
        color: '#0d6efd',
    }
})
