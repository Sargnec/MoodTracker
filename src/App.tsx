import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { Provider } from 'react-redux';
import { store } from './store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Platform, UIManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

let persistor = persistStore(store);

export const App: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

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
