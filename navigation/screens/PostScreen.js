import React from 'react';
import axios from 'axios';
import { View, Text, RefreshControl, FlatList, ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { Loading } from '../../components/Loading';

// export default function FullPostScreen({ navigation }) {
//   return (
//     <View>
//       <Text>asd</Text>
//     </View>
//   );
// }

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export default function FullPostScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { id, title } = route.params;

  const fetchPosts = () => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://63d24f7d4abff8883407a3f4.mockapi.io/api/v1/articles/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статью');
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
    <View>
      <ScrollView style={{ padding: 20 }} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}>
        {/* <FlatList refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={data}
        renderItem={({ data }) => (
          <View>
            <PostImage source={{ uri: data.imageUrl }} />
            <PostText>qwe</PostText>
          </View>
        )}
      /> */}
        <Image style={{width: '100%', height: 200}} source={{ uri: data.imageUrl }} />
        {/* <Image */}
        <PostText>{data.text}</PostText>
      </ScrollView>
    </View>
  );
};

// export { FullPostScreen }