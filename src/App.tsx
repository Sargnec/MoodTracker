import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { Provider } from 'react-redux';
import { store } from './store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </Provider>
  );
};
