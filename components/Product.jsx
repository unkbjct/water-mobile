// import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

// const truncateTitle = (str) => {
//   if (str.length >= 50) {
//     return str.substring(0, 50) + '...';
//   }

//   return str;
// };

// date-fns => format

export const Product = ({ item, img }) => {
    
    return (
        <View style={styles.ProductCart}>
            <View style={styles.ProductViewImage}>
                <Image style={styles.ProductCartImage} source={{ uri: 'http://colledge.fun/' + img }} />
            </View>
            <View >
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, color: 'rgb(100, 100, 100)' }}>{item.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <View style={styles.prices}>
                        <Text style={styles.currentPrice}>{currencyFormat(item.price - item.price * (item.sale / 100))} P.</Text>

                        {(item.sale) ? <Text style={styles.oldPrice}>{currencyFormat(item.price)} P.</Text> : <></>}
                    </View>
                </View>
                {/* <Text>{title}</Text> */}
                {/* <Text>{new Date(createdAt).toLocaleDateString()}</Text> */}
            </View>
        </View>
    );
};

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

const styles = StyleSheet.create({
    ProductCart: {
        // marginHorizontal: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        paddingHorizontal: 7,
        marginBottom: 20,
        // height: '100%',
        // height: '100px',
        // borderColor: 'silver',
        // borderRadius: 20,
        // borderWidth: 1,
    },
    ViewDetails: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    ProductCartImage: {
        // width: '100%',
        // borderTopStartRadius: 10,
        // borderRadius: 20,
        borderRadius: 10,
        height: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',


        // height: 'auto',
    },
    ProductViewImage: {
        // borderRadius: 40,
        // padding: 10,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        // overflow: 'hidden'
    },
    prices: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    currentPrice: {
        fontSize: 18,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'red',
    }
});