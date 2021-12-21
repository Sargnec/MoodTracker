import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addMoodToHistory } from '../slices/history.slice';

export const Home: React.FC = () => {
  const history = useAppSelector(state => state.history.value);
  const dispatch = useAppDispatch();
  const handleSelectMood = React.useCallback(
    (mood: MoodOptionType) => {
      let newHistory = [...history, { mood, timestamp: Date.now() }];
      dispatch(addMoodToHistory(newHistory));
    },
    [dispatch, history],
  );

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: theme.colorBlack,
  },
});
