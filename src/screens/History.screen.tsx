import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../hooks';
import { MoodItemRow } from '../components/MoodItem';

export const History: React.FC = () => {
  const history = useAppSelector(state => state.history.value);
  return (
    <View>
      <Text>History</Text>
      {history.map(item => (
        <MoodItemRow item={item} key={item.timestamp} />
      ))}
    </View>
  );
};
