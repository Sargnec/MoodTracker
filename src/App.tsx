import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

let persistor = persistStore(store);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
