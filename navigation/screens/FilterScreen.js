import * as React from 'react';
import axios from 'axios';
import {
    Alert,
    Text,
    FlatList,
    View,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Product } from '../../components/Product';
import { Loading } from '../../components/Loading';
import Checkbox from 'expo-checkbox';
import { StyleSheet } from 'react-native';
import EditInput from '../../components/EditInput';

export default function FilterScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState();
    const [isChecked, setChecked] = React.useState(false)


    const fetchPosts = () => {
        setIsLoading(true);
        // fetch('http://colledge.fun/api/products', {
        //     method: 'post',
        // })
        //     .then(response => response.text())
        //     .then(response => {
        //         data = JSON.parse(response)
        //         setItems(data.data.products);
        //     })
        //     .finally(() => {
        setIsLoading(false);
        // console.log(items[0].images[0].url)
        // });
    };

    React.useEffect(fetchPosts, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    return (
        <View >
            <View style={{ marginTop: 10, padding: 10, }}>
                <Text style={styles.h1}>Фильры</Text>
                <EditInput data={{ label: 'Название товара' }} />
                <View>
                    <Text style={styles.h2}>Бренд</Text>

                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 600,
    },
    h2: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 600,
    }
})