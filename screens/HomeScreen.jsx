import { View, Alert, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Post } from '../components/Post.jsx';
import { Loading } from '../components/Loading.jsx';

export const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://63ac4a95da81ba97617fdf18.mockapi.io/articles')
      .then(({ data }) => setItems(data))
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Ошибка при получении статей');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPosts, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
            <Post imageUrl={item.imageUrl} title={item.title} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
