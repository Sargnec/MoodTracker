import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeIcon, HistoryIcon, AnalyticsIcon } from '../components/Icons';
import { theme } from '../theme';
import { Analytics } from './Analytics.screen';
import { History } from './History.screen';
import { Home } from './Home.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarIcon: ({ size, color }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} color={color} />;
          }
          if (route.name === 'History') {
            return <HistoryIcon size={size} color={color} />;
          }
          if (route.name === 'Analytics') {
            return <AnalyticsIcon size={size} color={color} />;
          }
          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};
