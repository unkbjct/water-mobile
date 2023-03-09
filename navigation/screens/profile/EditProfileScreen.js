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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EditInput from '../../../components/EditInput';
import { Loading } from '../../../components/Loading';





export default function () {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState();


    const getUser = () => {
        setIsLoading(true);
        AsyncStorage.getItem('user', (errs, user) => {
            setUser(JSON.parse(user));
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
        <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getUser}/>}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.Container}>
                        <EditInput data={{ value: user.surname, label: 'Фамилия' }} />
                        <EditInput data={{ value: user.name, label: 'Имя' }} />
                        <EditInput data={{ value: user.email, label: 'Почта' }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    Container: {
        padding: 20
    }
})