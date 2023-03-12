// import { YooCheckout, ICreatePayment } from '@a2seven/yoo-checkout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import { Linking } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditInput from '../../../components/EditInput';
import { Loading } from '../../../components/Loading';


export default function CartScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [cartList, setCartList] = React.useState();
    const [products, setProducts] = React.useState();
    const [gPrice, setGPrice] = React.useState(0);
    const [gCount, setGCount] = React.useState(0);
    const [user, setUser] = React.useState(0);

    const [surname, setSurname] = React.useState();
    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [phone, setPhone] = React.useState();

    const [city, setCity] = React.useState();
    const [street, setStreet] = React.useState();
    const [house, setHouse] = React.useState();
    const [build, setBuild] = React.useState();
    const [apart, setApart] = React.useState();
    const [comment, setComment] = React.useState();

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

                    let tmpCount = 0;
                    let tmpPrice = 0;
                    response.data.products.forEach(product => {
                        tmpCount += product.count
                        tmpPrice += ((product.price - product.price * (product.sale / 100)) * product.count)
                    })
                    setGCount(tmpCount)
                    setGPrice(tmpPrice)
                    setProducts(response.data.products)

                    AsyncStorage.getItem("user", (errs, user) => {
                        setUser(JSON.parse(user))
                        setName(JSON.parse(user).name)
                        setSurname(JSON.parse(user).surname)
                        setEmail(JSON.parse(user).email)
                    }).finally(() => {
                        setIsLoading(false)
                    })
                }).then(() => {
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

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, }}>
            <KeyboardAwareScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getCart} />}>
                <View style={{ marginTop: 20, }}>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={styles.header}>Персональные данные</Text>
                        <EditInput data={{ value: user.surname, label: 'Фамилия' }} onChange={text => setSurname(text)} />
                        <EditInput data={{ value: user.name, label: 'Имя' }} onChange={text => setName(text)} />
                        <EditInput data={{ value: user.email, label: 'Почта' }} onChange={text => setEmail(text)} />
                        <EditInput data={{ label: 'Телефон' }} onChange={text => setPhone(text)} />
                    </View>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={styles.header}>Адрес</Text>
                        <EditInput data={{ label: 'Город' }} onChange={text => setCity(text)} />
                        <EditInput data={{ label: 'Улица' }} onChange={text => setStreet(text)} />
                        <EditInput data={{ label: 'Дом' }} onChange={text => setHouse(text)} />
                        <EditInput data={{ label: 'Корпус', help: 'Если корпуса нет, оставьте поле пустым' }} onChange={text => setBuild(text)} />
                        <EditInput data={{ label: 'Квартира' }} onChange={text => setApart(text)} />
                        <EditInput data={{ label: 'Комментарий к заказу' }} onChange={text => setComment(text)} />
                    </View>
                    <View style={{ marginBottom: 10, }}>
                        <Text style={styles.header}>Информация о заказе</Text>
                        <Text style={{ fontSize: 18, color: 'rgb(100, 100, 100)', marginBottom: 10, }}>Общая стоимость: {currencyFormat(gPrice)}</Text>
                        <Text style={{ fontSize: 18, color: 'rgb(100, 100, 100)', marginBottom: 30, }}>Количество товаров: {gCount} шт.</Text>
                    </View>
                    <View style={{ paddingHorizontal: 30, marginBottom: 30, }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (!name || !surname || !email || !phone || !city || !street || !house || !apart) {
                                    Alert.alert("Ошибка", "Не все обязательные поля заполнены!")
                                    return;
                                }

                                let formData = new FormData();

                                formData.append("mobile", true)
                                formData.append("user", user.id)
                                formData.append("name", name)
                                formData.append("surname", surname)
                                formData.append("email", email)
                                formData.append("phone", phone)
                                formData.append("city", city)
                                formData.append("street", street)
                                formData.append("house", house)
                                formData.append("apart", apart)
                                formData.append("build", build)
                                formData.append("comment", comment)
                                formData.append("cart", JSON.stringify(cartList))

                                console.log(JSON.stringify(cartList))
                                fetch('http://colledge.fun/core/payment/create', {
                                    method: 'post',
                                    body: formData,
                                }).then(response => response.text()).then(url => {
                                    console.log(url)

                                    Linking.canOpenURL(url).then(supported => {
                                        if (supported) {
                                            Linking.openURL(url);
                                        } else {
                                            console.log("Don't know how to open URI: " + url);
                                        }
                                    });
                                })



                            }}
                            style={{ borderRadius: 5, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#0d6efd' }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Заказать</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
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
    }
})