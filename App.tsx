/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import RootNavigation from './app/navigation/RootNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from 'app/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import SplashScreen from 'app/components/Splash-screen';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate
          loading={<SplashScreen />}
          onBeforeLift={() => new Promise(resolve => setTimeout(resolve, 3000))}
          persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <StatusBar />
            <RootNavigation />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
      <FlashMessage position="top" duration={5000} />
    </GestureHandlerRootView>
  );
}

export default App;
