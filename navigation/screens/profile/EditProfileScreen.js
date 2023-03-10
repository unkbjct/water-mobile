import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert,
    RefreshControl,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EditInput from '../../../components/EditInput';
import { Loading } from '../../../components/Loading';





export default function () {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState();
    const [surname, setSurname] = React.useState();
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [oldPasswd, setOldPasswd] = React.useState();
    const [newPasswd, setNewPasswd] = React.useState();
    const [confirmPasswd, setConfirmPasswd] = React.useState();

    const getUser = () => {
        setIsLoading(true);
        AsyncStorage.getItem('user', (errs, user) => {
            setUser(JSON.parse(user));
            // console.log()
            setSurname(JSON.parse(user).surname);
            setName(JSON.parse(user).name);
            setEmail(JSON.parse(user).email);
            // console.log(user)
        }).finally(() => {
            setIsLoading(false)
        });
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
        <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getUser} />}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.Container}>
                        <Text style={styles.header}>Персональные данные</Text>
                        <EditInput data={{ value: user.surname, label: 'Фамилия' }} onChange={text => setSurname(text)} />
                        <EditInput data={{ value: user.name, label: 'Имя' }} onChange={text => setName(text)} />
                        <EditInput data={{ value: user.email, label: 'Почта' }} onChange={text => setEmail(text)} />
                        <View style={styles.btnsView}>
                            <TouchableOpacity onPress={getUser} style={[styles.btn, { backgroundColor: 'silver' }]}>
                                <Text>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (name == user.name
                                    && surname == user.surname
                                    && email == user.email) return;
                                if (!name || !surname || !email) Alert.alert("Не все поля заполнены!", "Для изменения данных нужно заполнить все поля.")
                                // if ()
                                let formdata = new FormData();
                                formdata.append("name", name);
                                formdata.append("surname", surname);
                                formdata.append("email", email);
                                formdata.append("id", user.id);

                                fetch('http://colledge.fun/api/account/edit', {
                                    method: 'post',
                                    body: formdata,
                                }).then(response => response.text()).then(response => {
                                    response = JSON.parse(response);
                                    newUser = response.data.user;
                                    if (response.status == 'error') {
                                        Alert.alert("Ошибка", "Данная почта уже кам-то используется")
                                    }
                                    Alert.alert("Успех", "Данные успешно обнавлены", [
                                        {
                                            text: "Ок",
                                            onPress: () => {
                                                AsyncStorage.setItem('user', JSON.stringify(newUser), () => {
                                                    getUser();
                                                })
                                            }
                                        }
                                    ])

                                });
                            }} style={[styles.btn, { backgroundColor: 'orange' }]}>
                                <Text style={{ color: 'white' }}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.Container}>
                        <Text style={styles.header}>Пароль</Text>
                        <EditInput data={{ secure: true, label: 'Старый пароль' }} onChange={text => setOldPasswd(text)} />
                        <EditInput data={{ secure: true, label: 'Новый пароль' }} onChange={text => setNewPasswd(text)} />
                        <EditInput data={{ secure: true, label: 'Подтверждение пароля' }} onChange={text => setConfirmPasswd(text)} />
                        <View style={styles.btnsView}>
                            <TouchableOpacity onPress={getUser} style={[styles.btn, { backgroundColor: 'silver' }]}>
                                <Text>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (!oldPasswd || !newPasswd || !confirmPasswd) {
                                    Alert.alert("Ошибка", "Не все поля заполнены!");
                                    return
                                };

                                if (newPasswd != confirmPasswd) {
                                    Alert.alert("Ошибка", "Пароли не совпадают");
                                    return;
                                }

                                let formdata = new FormData();
                                formdata.append("oldPassword", oldPasswd);
                                formdata.append("newPassword", newPasswd);
                                formdata.append("confirmNewPassword", confirmPasswd);
                                formdata.append("id", user.id);

                                fetch('http://colledge.fun/api/account/edit/password', {
                                    method: 'post',
                                    body: formdata,
                                }).then(response => response.text()).then(response => {
                                    response = JSON.parse(response);
                                    if (response.status == 'error') {
                                        Alert.alert("Ошибка", "Старый пароль не верный!")
                                        return;
                                    }
                                    Alert.alert("Успех", "Пароль успешно обновлен!", [
                                        {
                                            text: "Ок",
                                            onPress: () => {
                                                getUser();
                                            }
                                        }
                                    ])

                                });
                            }} style={[styles.btn, { backgroundColor: 'orange' }]}>
                                <Text style={{ color: 'white' }}>Сохранить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    Container: {
        padding: 20
    },
    header: {
        fontSize: 25,
        marginBottom: 20,
        color: 'rgb(60, 60, 60)'
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 10,
    }
})