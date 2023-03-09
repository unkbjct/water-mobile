import {
  View,
  Text,
} from 'react-native';

const truncateTitle = (str) => {
  if (str.length >= 50) {
    return str.substring(0, 50) + '...';
  }

  return str;
};

// date-fns => format

export const Post = ({ item }) => {
  return (
    <View>
      <Text>asd</Text>
    </View>
  );
};
