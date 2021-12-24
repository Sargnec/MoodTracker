import React from 'react';
import { ScrollView } from 'react-native';
import { useAppSelector } from '../hooks';
import { MoodItemRow } from '../components/MoodItem';

export const History: React.FC = () => {
  const history = useAppSelector(state => state.history.value);
  return (
    <ScrollView>
      {history
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow item={item} key={item.timestamp} />
        ))}
    </ScrollView>
  );
};
