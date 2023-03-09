import React from 'react';
import {
    View,
    Text,
    RefreshControl,
    FlatList,
    ScrollView,
    Image,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { Loading } from '../../components/Loading';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function PostScreen({ route, navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [product, setProduct] = React.useState();
    const [images, setImages] = React.useState();
    const [attributes, setAttributes] = React.useState();
    const [inclusions, setInclusions] = React.useState();
    const [reviews, setReviews] = React.useState();

    const id = route.params.id;



    const fetchPosts = () => {

        fetch
            ('http://colledge.fun/api/products/' + id, {
                method: 'post',
            })
            .then(response => response.text())
            .then(response => {
                setProduct(JSON.parse(response).data.product)
                setImages(JSON.parse(response).data.product.images)
                setAttributes(JSON.parse(response).data.product.attributes)
                setInclusions(JSON.parse(response).data.product.inclusions)
                setReviews(JSON.parse(response).data.reviews)
                navigation.setOptions({
                    title: JSON.parse(response).data.product.title,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(fetchPosts, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}>
                <Swiper style={styles.wrapper} showsButtons={false}>
                    {images.map((image) => {
                        return (
                            <View key={'img' + image.id} style={styles.imgSwiperContainer}>
                                <Image style={styles.imgSwiper} source={{ uri: 'http://colledge.fun/' + image.url }} />
                            </View>
                        )
                    })}
                </Swiper>
                <View style={styles.inner}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                        <Text style={[styles.link, { fontSize: 20, color: 'blue' }]}>{product.brand.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons size={15} name={'star'} color={(product.rating >= 1) ? 'orange' : 'silver'} />
                            <Ionicons size={15} name={'star'} color={(product.rating >= 2) ? 'orange' : 'silver'} />
                            <Ionicons size={15} name={'star'} color={(product.rating >= 3) ? 'orange' : 'silver'} />
                            <Ionicons size={15} name={'star'} color={(product.rating >= 4) ? 'orange' : 'silver'} />
                            <Ionicons size={15} name={'star'} color={(product.rating >= 5) ? 'orange' : 'silver'} />
                            {(product.rating)
                                ? <>
                                    <Text style={{ fontSize: 15, marginLeft: 10, }}>{product.rating}</Text>
                                    <Text style={{ fontSize: 15, marginLeft: 5, color: 'silver' }}>({product.rating_count})</Text>
                                </>
                                : <Text style={{ fontSize: 15, marginLeft: 5, color: 'silver' }}>(0)</Text>}
                        </View>
                    </View>
                    <Text style={styles.title}>{product.title}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30, }}>
                        <View style={styles.prices}>
                            <Text style={styles.currentPrice}>{currencyFormat(product.price - product.price * (product.sale / 100))}  ₽.</Text>
                            {(product.sale) ? <Text style={styles.oldPrice}>{currencyFormat(product.price)}  ₽.</Text> : <></>}
                        </View>
                    </View>
                    <View style={{ marginBottom: 30, }}>
                        <TouchableOpacity style={styles.btn}>
                            <Text>Добавить в корзину</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.header}>Характеристики</Text>
                        {
                            attributes.map((attribute) => {
                                return (
                                    <View key={'attribute' + attribute.name} style={styles.attributeItem}>
                                        <Text style={{ fontSize: 18, color: 'rgb(60, 60, 60)' }}>{attribute.name}:</Text>
                                        <Text style={{ fontSize: 18, color: 'rgb(60, 60, 60)', fontStyle: 'italic' }}>{attribute.value}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    {(inclusions.length) ?
                        <View style={{ marginBottom: 30, }}>
                            <Text style={styles.header}>Что в поставке?</Text>
                            <View>
                                {inclusions.map((inclusion) => {
                                    return (
                                        <View key={'inclusion' + inclusion.id} style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 5 }}>
                                            <Text style={{ fontSize: 20, fontWeight: 500, fontStyle: 'italic', color: 'rgb(60, 60, 60)' }}>- </Text>
                                            <Text style={{ fontSize: 20, fontWeight: 500, fontStyle: 'italic', color: 'rgb(60, 60, 60)' }}>{inclusion.value}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View> : <></>}
                    <View style={{ marginBottom: 30, }}>
                        <Text style={styles.header}>Отзывы</Text>
                        <View style={{ marginBottom: 30, }}>
                            <TouchableOpacity style={styles.btn}>
                                <Text>Оставить новый отзыв</Text>
                            </TouchableOpacity>
                        </View>
                        {(reviews.length) ?
                            <View>
                                {reviews.map((review) => {
                                    let date = new Date(review.created_at);
                                    return (
                                        <View key={'review' + review.id} style={styles.reviewItem}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                                                <Text style={{ fontSize: 20, fontStyle: 'italic', color: 'rgb(90, 90, 90)' }}>{review.name}</Text>
                                                <Text>{date.toLocaleDateString()}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 25, }}>
                                                <Ionicons size={15} name={'star'} color={(review.rating >= 1) ? 'orange' : 'silver'} />
                                                <Ionicons size={15} name={'star'} color={(review.rating >= 2) ? 'orange' : 'silver'} />
                                                <Ionicons size={15} name={'star'} color={(review.rating >= 3) ? 'orange' : 'silver'} />
                                                <Ionicons size={15} name={'star'} color={(review.rating >= 4) ? 'orange' : 'silver'} />
                                                <Ionicons size={15} name={'star'} color={(review.rating >= 5) ? 'orange' : 'silver'} />
                                            </View>
                                            <View style={{ marginBottom: 30, }}>
                                                <Text style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, }}>Достоинства</Text>
                                                <Text>{review.advantages}</Text>
                                            </View>
                                            <View style={{ marginBottom: 30, }}>
                                                <Text style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, }}>Недостатки</Text>
                                                <Text>{review.flaw}</Text>
                                            </View>
                                            <View style={{ marginBottom: 15, }}>
                                                <Text style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, }}>Комментарий</Text>
                                                <Text>{review.comment}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                            :
                            <View>
                                <Text>Нет отзывов</Text>
                            </View>}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}


const styles = StyleSheet.create({
    container: {
        // paddingTop: 20,
        flex: 1,
    },
    wrapper: {
        marginTop: 20,
        height: 400,
    },
    imgSwiperContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        marginHorizontal: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgSwiper: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    inner: {
        marginTop: 20,
        // borderWidth: 1,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        color: 'rgb(70, 70, 70)',
        marginBottom: 20,
    },
    prices: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    currentPrice: {
        fontSize: 25,
        fontWeight: 600,
    },
    oldPrice: {
        textDecorationLine: 'line-through',
        fontSize: 20,
        textDecorationColor: 'red',
    },
    header: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 15,
    },
    attributeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        marginBottom: 10,
    },
    reviewItem: {
        borderWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffc107'
    },
})