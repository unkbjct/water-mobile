import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export default SmallProduct = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("FullPost", { id: item.id })
        }} style={styles.productItem} key={'produc' + item.id}>
            <View style={styles.ProductViewImage}>
                <Image style={styles.ProductCartImage} source={{ uri: 'http://colledge.fun/' + item.image }} />
            </View>
            <View style={styles.productInfo}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>{item.title}</Text>
                <Text style={{ marginBottom: 8 }}>Количество: {item.count} шт.</Text>
                <Text style={{ marginBottom: 8 }}>{currencyFormat(item.price - item.price * (item.sale / 100))} / шт.</Text>
                <Text style={{ marginTop: 'auto', fontSize: 20 }}>{currencyFormat((item.price - item.price * (item.sale / 100)) * item.count)}</Text>
            </View>
        </TouchableOpacity>
    )
}

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + " ₽."
}

const styles = StyleSheet.create({
    
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
})