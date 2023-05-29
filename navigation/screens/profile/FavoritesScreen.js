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
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from '../../../components/Loading';
import { Product } from '../../../components/Product';
import { SiteUrl } from '../../../env';


export default function HomeScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [products, setProducts] = React.useState();

    const getFavorites = () => {
        setIsLoading(true);
        AsyncStorage.getItem('favorites', (errs, favorites) => {
            if (!favorites) {
                setProducts(null);
                return
            };
            let tmpFavorites = JSON.parse(favorites);
            let formData = new FormData();
            tmpFavorites.forEach(favor => {
                formData.append("favorites[]", favor);
            });
            fetch(SiteUrl + 'api/account/favorites', {
                method: 'post',
                body: formData,
            })
                .then(response => response.text())
                .then((response) => {
                    response = JSON.parse(response)
                    setProducts(response.data.products)
                }).finally(() => {
                    setIsLoading(false);
                })
        }).then((favorites) => {
            if (!favorites) setIsLoading(false);
        })
    };

    React.useEffect(getFavorites, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    if (!products) {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, }}>У вас нет избронных товаров!</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Каталог");
                }}>
                    <Text style={{ color: 'blue' }}>Перейдите в каталог, чтобы добавить товар в избранное</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                style={{
                    width: '100%',
                    flexDirection: 'column',
                    // marginLeft: 10,
                    padding: 20,
                    marginRight: 10,
                    // borderColor: 'green',
                    // borderWidth: 1,
                }}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getFavorites} />}
                numColumns={2}
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            width: '50%',
                            // borderRadius: 50,
                            // overflow: 'hidden',
                            // height: 250,
                            marginBottom: 10,
                        }}
                        onPress={() => navigation.navigate('FullPost', { id: item.id })}
                    >
                        <Product item={item} img={item.images} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

