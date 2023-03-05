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

export const Product = ({ title, imageUrl, createdAt }) => {
    return (
        <View style={styles.ProductCart}>
            <View style={styles.ProductViewImage}>
                <Image style={styles.ProductCartImage} source={{ uri: imageUrl }} />
            </View>
            <View >
                <View style={{ marginBottom: 10}}>
                    <Text style={{fontSize: 18}}>Название товара</Text>
                </View>
                <View style={{flexDirection: 'row', flexWrap: 'wrap' }}>
                    <Text>9000 P.</Text>
                </View>
                {/* <Text>{title}</Text> */}
                {/* <Text>{new Date(createdAt).toLocaleDateString()}</Text> */}
            </View>
        </View>
    );
};

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
        width: '100%',
        // borderTopStartRadius: 10,
        // borderRadius: 20,
        borderRadius: 10,
        height: 200,

        // height: 'auto',
    },
    ProductViewImage: {
        // borderRadius: 40,
        // padding: 10,
        overflow: 'hidden'
    }
});