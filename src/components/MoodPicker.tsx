import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../types';
import { AppTextRegular, AppTextBold } from './AppText';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];
const ImageSrc = require('../assets/butterflies.png');

type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood
        ? withTiming(1, { duration: 300 })
        : withTiming(0.5, { duration: 300 }),
      transform: [
        {
          scale: selectedMood
            ? withTiming(1, { duration: 300 })
            : withTiming(0.8, { duration: 300 }),
        },
      ],
    }),
    [selectedMood],
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={ImageSrc} style={styles.image} />
        <ReanimatedPressable
          style={[styles.button]}
          onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Back</Text>
        </ReanimatedPressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <AppTextBold style={styles.heading}>How are you right now?</AppTextBold>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji} style={{ alignItems: 'center' }}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                selectedMood?.emoji === option.emoji
                  ? styles.selected
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>
            <AppTextRegular style={styles.descriptionText}>
              {option.emoji === selectedMood?.emoji
                ? option.description
                : undefined}
            </AppTextRegular>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <AppTextRegular style={styles.buttonText}>Choose</AppTextRegular>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.primary,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    alignSelf: 'center',
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodText: {
    fontSize: 24,
  },
  moodItem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  selected: {
    backgroundColor: theme.primary,
    borderWidth: 2,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.secondary,
    textAlign: 'center',
    fontSize: 10,
  },
  heading: {
    color: theme.colorWhite,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.primary,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
  },
});
