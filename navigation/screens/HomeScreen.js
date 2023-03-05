import * as React from 'react';
import axios from 'axios';
import {
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../components/Product';
import { Loading } from '../../components/Loading';

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://63d24f7d4abff8883407a3f4.mockapi.io/api/v1/articles')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статьи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={{
      // paddingHorizontal: 10,
    }} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}>
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
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        numColumns={2}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              width: '50%',
              // borderRadius: 50,
              // overflow: 'hidden',
              // height: 250,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Product title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}