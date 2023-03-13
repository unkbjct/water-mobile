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
import { SiteUrl } from '../../../env';





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
        setIsLoading(false);
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
                   <Text style={styles.header}>rt</Text>
                    
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
  
})