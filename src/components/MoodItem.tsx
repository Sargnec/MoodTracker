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
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  event,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { EventType } from 'react-native-gesture-handler/lib/typescript/EventType';

const maxSwipe = 80;

type MoodItemRowProps = {
  item: MoodOpttionWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const translateX = useSharedValue(0);
  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(deleteMoodFromHistory(item));
  }, [dispatch, item]);

  const deleteWithDelay = React.useCallback(() => {
    setTimeout(() => handleDelete(), 500);
  }, [handleDelete]);

  const onGesture = useAnimatedGestureHandler(
    {
      onActive: evt => {
        translateX.value = evt.translationX;
      },
      onEnd: evt => {
        if (Math.abs(evt.translationX) > maxSwipe) {
          translateX.value = withTiming(1000 * Math.sign(evt.translationX));
          runOnJS(deleteWithDelay)();
        } else {
          translateX.value = withTiming(0);
        }
      },
    },
    [],
  );
  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [],
  );
  return (
    <PanGestureHandler minDeltaX={1} minDeltaY={100} onGestureEvent={onGesture}>
      <Reanimated.View style={[styles.moodItem, cardStyle]}>
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
      </Reanimated.View>
    </PanGestureHandler>
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
