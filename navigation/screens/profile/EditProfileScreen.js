import * as React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';

import EditInput from '../../../components/EditInput';








export default class EditProfileScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.Container}>
                        <EditInput data={{value: 'qwe', label: 'Фамилия'}}/>
                        <EditInput data={{value: 'asd', label: 'Имя'}}/>
                        <EditInput data={{value: 'zxc', label: 'Почта'}}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        padding: 20
    }
})