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
    Alert,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from '../../../components/Loading';


export default function CartScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [cartList, setCartList] = React.useState();
    const [products, setProducts] = React.useState();

    const getCart = () => {
        // AsyncStorage.removeItem('cartList')
        AsyncStorage.getItem('cartList', (errs, cartList) => {
            if (!cartList) {
                setCartList(null);
                setIsLoading(false);
                return;
            }
            cartList = JSON.parse(cartList);
            setCartList(cartList)
            console.log(cartList)
            let formData = new FormData();
            cartList.forEach(cartItem => {
                formData.append("favorites[]", cartItem.id);
            });
            fetch('http://colledge.fun/api/account/favorites', {
                method: 'post',
                body: formData,
            })
                .then(response => response.text())
                .then((response) => {
                    response = JSON.parse(response)
                    response.data.products.forEach(product => {
                        cartList.forEach(cartItem => {
                            if (cartItem.id == product.id) product.count = cartItem.count
                        })
                    })
                    setProducts(response.data.products)
                }).then(() => {
                    setIsLoading(false)
                })
        })
    };

    React.useEffect(getCart, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    if (!cartList) {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, }}>Корзина пуста!</Text>
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
            <ScrollView style={styles.ListSettings} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getCart} />}>
                <View style={{ padding: 10, }}>
                    <Text style={styles.header}>Товары в корзине</Text>
                    {products.map((product => {
                        return (
                            <View style={styles.productItem} key={'produc' + product.id}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("FullPost", { id: product.id })
                                }} style={styles.ProductViewImage}>
                                    <Image style={styles.ProductCartImage} source={{ uri: 'http://colledge.fun/' + product.images }} />
                                </TouchableOpacity>
                                <View style={styles.productInfo}>
                                    <Text style={{ fontSize: 20 }}>{product.title}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.btnView}>
                                            <TouchableOpacity style={[styles.btn, styles.btnMin]} onPress={() => {
                                                cartList.forEach((cartItem, index) => {
                                                    if (cartItem.id == product.id) cartItem.count--;
                                                    if (cartItem.count <= 0) cartList.splice(index, 1);
                                                })
                                                if (!cartList.length) {
                                                    AsyncStorage.removeItem("cartList")
                                                } else {
                                                    AsyncStorage.setItem("cartList", JSON.stringify(cartList));
                                                }
                                                getCart();
                                            }}>
                                                <Text style={{ fontSize: 16 }}>-</Text>
                                            </TouchableOpacity>
                                            <View style={styles.count}>
                                                <Text style={{ fontSize: 16 }}>{product.count}</Text>
                                            </View>
                                            <TouchableOpacity style={[styles.btn, styles.btnPlus]} onPress={() => {
                                                cartList.forEach(cartItem => {
                                                    if (cartItem.id == product.id) cartItem.count++;
                                                })
                                                AsyncStorage.setItem("cartList", JSON.stringify(cartList));
                                                getCart();
                                            }}>
                                                <Text style={{ fontSize: 16 }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <Text style={{}}>{currencyFormat(product.price - product.price * (product.sale / 100))} / шт.</Text>
                                        <Text style={{ marginTop: 'auto', fontSize: 20 }}>{currencyFormat((product.price - product.price * (product.sale / 100)) * product.count)}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }))}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + " ₽."
}
const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    productItem: {
        borderRadius: 8,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        flexDirection: 'row',
        overflow: 'hidden',
        // justifyContent: 'space-between',
    },
    productInfo: {
        flex: 1,
        padding: 10,
        justifyContent: 'column',
        justifyContent: 'space-between',
    },
    ProductViewImage: {
        width: '30%',
        height: 150,
        padding: 10,
        borderRightWidth: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderColor: 'rgb(150, 150, 150)',
    },
    ProductCartImage: {
        borderRadius: 8,
        justifyContent: 'center',
        height: '100%',
        resizeMode: 'contain',
    },
    btnView: {
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        flexDirection: 'row',
        borderRadius: 4,
    },
    count: {
        // backgroundColor: 'silver',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#9ec5fe',
    },
    btnMin: {
        borderRightWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    btnPlus: {
        borderLeftWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    }
})