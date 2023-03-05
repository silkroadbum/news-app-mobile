import styled from 'styled-components/native';
import { View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../components/Loading';

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

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const { id, title } = route.params;

  useEffect(() => {
    navigation.setOptions({ title });
    axios
      .get(`https://63ac4a95da81ba97617fdf18.mockapi.io/articles/${id}`)
      .then(({ data }) => setPost(data))
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении статьи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: post.imageUrl }} />
      <PostText>{post.text}</PostText>
    </View>
  );
};
