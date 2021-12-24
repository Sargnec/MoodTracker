import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addMoodToHistory } from '../slices/history.slice';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

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
    <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
      <MoodPicker onSelect={handleSelectMood} />
    </ImageBackground>
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
