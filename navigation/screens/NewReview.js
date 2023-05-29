import * as React from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EditInput from '../../components/EditInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SiteUrl } from '../../env';
import { Alert } from 'react-native';


export default function NewReview({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [score, setScore] = React.useState(5);
    const [pluses, setPluses] = React.useState('');
    const [minuses, setMinuses] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [user, setUser] = React.useState();

    const { productId, title } = route.params;


    const fetchPosts = () => {
        setIsLoading(true)

        AsyncStorage.getItem("user", (async (errs, user) => {
            await setUser(JSON.parse(user))
        })).then(() => { setIsLoading(false) })

        setIsLoading(false)
    }

    React.useEffect(fetchPosts, []);

    return (
        <View style={{ padding: 20, flex: 1, }}>
            <KeyboardAwareScrollView>
                <View style={{ marginBottom: 50 }}>
                    <Text style={{ textAlign: 'center', fontSize: 24 }}>Новый отзыв на товар:</Text>
                    <Text style={{ textAlign: 'center', fontSize: 24 }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 35 }}>
                    <TouchableOpacity onPress={() => { setScore(1) }}>
                        <Ionicons size={40} name={'star'} color={(score >= 1) ? 'orange' : 'silver'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScore(2) }}>
                        <Ionicons size={40} name={'star'} color={(score >= 2) ? 'orange' : 'silver'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScore(3) }}>
                        <Ionicons size={40} name={'star'} color={(score >= 3) ? 'orange' : 'silver'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScore(4) }}>
                        <Ionicons size={40} name={'star'} color={(score >= 4) ? 'orange' : 'silver'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScore(5) }}>
                        <Ionicons size={40} name={'star'} color={(score >= 5) ? 'orange' : 'silver'} />
                    </TouchableOpacity>

                </View>
                <View>
                    <EditInput value={pluses} onChange={text => { setPluses(text) }} multiLine={true} data={{ label: 'Достоинства' }} />
                    <EditInput value={minuses} onChange={text => { setMinuses(text) }} multiLine={true} data={{ label: 'Недостатки' }} />
                    <EditInput value={comment} onChange={text => { setComment(text) }} multiLine={true} data={{ label: 'Комментарий' }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#0d6efd' }} onPress={() => {
                        if (!pluses || !minuses || !comment) {
                            Alert.alert("Не все поля заполнены");
                            return;
                        }

                        let formdata = new FormData();
                        formdata.append("userId", user.id);
                        formdata.append("productId", productId);
                        formdata.append("minuses", minuses);
                        formdata.append("pluses", pluses);
                        formdata.append("comment", comment);
                        formdata.append("score", score);

                        fetch(`${SiteUrl}api/products/review`, {
                            method: 'post',
                            body: formdata,
                        }).then(response => response.json()).then(response => {
                            Alert.alert("Отзыв оставлен успешно!", "", [
                                {
                                    text: 'Ок',
                                    onPress: () => {
                                        navigation.goBack();
                                    }
                                }
                            ]);
                        })
                    }}>
                        <Text style={{ color: 'white' }}>Оставить отзыв</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )


}