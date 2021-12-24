import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';
import { MoodOpttionWithTimeStamp } from '../types';
import { format } from 'date-fns';
import { theme } from '../theme';
import { AppTextBold, AppTextRegular } from './AppText';
import { useAppDispatch } from '../hooks';
import { deleteMoodFromHistory } from '../slices/history.slice';

type MoodItemRowProps = {
  item: MoodOpttionWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(deleteMoodFromHistory(item));
  }, [dispatch, item]);

  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <Text style={styles.moodValue}>{item.mood.emoji}</Text>
        <View>
          <AppTextBold style={styles.moodDescription}>
            {item.mood.description}
          </AppTextBold>
          <AppTextRegular style={styles.moodDate}>
            {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </AppTextRegular>
        </View>
      </View>
      <Pressable onPress={handleDelete}>
        <AppTextRegular style={styles.deleteText}>Delete</AppTextRegular>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  deleteText: {
    textAlign: 'center',
    color: theme.colorBlue,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.primary,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
