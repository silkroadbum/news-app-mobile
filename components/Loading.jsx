import { View, ActivityIndicator, Text } from 'react-native';

export const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ fontSize: 20, marginTop: 15 }}>Загрузка...</Text>
    </View>
  );
};
