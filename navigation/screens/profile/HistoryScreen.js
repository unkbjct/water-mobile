import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { Loading } from '../../../components/Loading';
import { SiteUrl } from '../../../env';

export default function HistoryScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState();
    const [orders, setOrders] = React.useState();

    const getData = () => {
        setIsLoading(true);
        AsyncStorage.getItem('user', (errs, user) => {
            try {
                setUser(JSON.parse(user));
                let formData = new FormData();
                formData.append("id", JSON.parse(user).id);
                fetch(SiteUrl + "api/account/history", {
                    method: 'POST',
                    body: formData,
                }).then(response => response.text()).then(response => {
                    let orders = JSON.parse(response).data.orders
                    setOrders(orders);
                }).finally(() => {
                    setIsLoading(false)
                });
            } catch (e) {
                Alert.alert("Ошибка", "Что-то пошло не так.")
            }
        });
    };

    React.useEffect(getData, []);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    if (!orders.length) {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, }}>У вас нет заказов!</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Каталог");
                }}>
                    <Text style={{ color: 'blue' }}>Перейдите в каталог, чтобы сделать новый заказ</Text>
                </TouchableOpacity>
            </View >
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                refreshControl={<RefreshControl onRefresh={getData} refreshing={isLoading} />}
                data={orders}
                renderItem={(item) => {
                    var order = item.item;
                    let date = new Date(order.created_at);
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Order', { order: order }) }}
                            key={'order' + order.id}
                            style={styles.orderItem}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                                <View>
                                    <Text style={styles.orderId}># {order.id}</Text>
                                </View>
                                {drawStatus(order.status)}
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: 20, marginBottom: 10, }}>{currencyFormat(order.fullPrice)}</Text>
                                    <Text style={{}}>Товары: {order.fullCount} шт.</Text>
                                </View>
                                <View>
                                    <Text>{date.toLocaleDateString("ru-RU")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                style={styles.inner} />
        </SafeAreaView>
    )
}

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + " ₽."
}

function drawStatus(status) {
    switch (status) {
        case 'PROCESSING':
            return (
                <View style={styles.status}>
                    <Text style={[styles.statusText, { backgroundColor: 'orange', color: 'white' }]}>В поцессе доставки</Text>
                </View>
            )

        case 'CREATED':
            return (
                <View style={styles.status}>
                    <Text style={[styles.statusText, { backgroundColor: 'silver' }]}>Ожидает оплаты</Text>
                </View>
            )

        case 'FINISHED':
            return (
                <View style={styles.status}>
                    <Text style={[styles.statusText, { backgroundColor: 'blue', color: 'white' }]}>Доставлен</Text>
                </View>
            )

        case 'CANCELED':
            return (
                <View style={styles.status}>
                    <Text style={[styles.statusText, { backgroundColor: 'red', color: 'white' }]}>Отменен</Text>
                </View>
            )

        default:
            return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 10,
    },
    orderItem: {
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        marginBottom: 30,
        padding: 10,
        borderRadius: 5,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 600,
    },
    status: {
        flexDirection: 'row',
    },
    statusText: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
        overflow: 'hidden'
    }
})