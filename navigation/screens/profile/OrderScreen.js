import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
    RefreshControl,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Loading } from '../../../components/Loading';
import SmallProduct from '../../../components/SmallProduct';

export default function HistoryScreen({ route, navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [order, setOrder] = React.useState();

    const getOrder = () => {
        setIsLoading(true);
        try {
            setOrder(route.params.order)
        } catch (e) {
            Alert.alert("Ошибка", "Что-то пошло не так.")
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(getOrder, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    // console.log(orders)
    // return;
    let date = new Date(order.created_at);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl onRefresh={getOrder} refreshing={isLoading} />}>
                <View style={styles.inner}>
                    <View style={{ marginTop: 20, marginBottom: 30, }}>
                        <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Заказ # {order.id} от {date.toLocaleDateString("ru-RU")}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, }}>{currencyFormat(order.fullPrice)}</Text>
                            {drawStatus(order.status)}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.header}>Товары</Text>
                        {order.products.map((product) => {
                            return (
                                <SmallProduct key={'product' + product.id} item={product} navigation={navigation} />
                            )
                        })}
                    </View>
                    <View>
                        <Text style={styles.header}>Подробная информация</Text>
                        <View style={{ marginBottom: 20, }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Персональная информация</Text>
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>Фамилия:</Text>
                                <Text style={styles.formatedText}>{order.surname}</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>Имя:</Text>
                                <Text style={styles.formatedText}>{order.name}</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>Почта:</Text>
                                <Text style={styles.formatedText}>{order.email}</Text>
                            </View>
                            <View style={styles.listItem}>
                                <Text style={styles.listTitle}>Телефон:</Text>
                                <Text style={styles.formatedText}>{order.phone}</Text>
                            </View>
                        </View>
                        {order.comment ? <View style={{ marginBottom: 20, }}>
                            <Text style={{ fontSize: 18 }}>Коментарий к заказу: <Text style={styles.formatedText}>{order.comment}</Text></Text>
                        </View> : <></>}
                        <View>
                            <Text style={{ fontSize: 18 }}>Адрес: <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'rgb(100, 100, 100)' }}>{order.city}, Ул. {order.street} Д. {order.house} {(order.build) ? "К. " + order.build : <></>} Кв. {order.apart}</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    status: {
        flexDirection: 'row',
    },
    statusText: {
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
        overflow: 'hidden'
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
    },
    listTitle: {
        fontSize: 18,
        marginRight: 10,
        marginBottom: 5,
    },
    formatedText: {
        fontSize: 18,
        color: 'rgb(100, 100, 100)',
        fontStyle: 'italic',
    }
})