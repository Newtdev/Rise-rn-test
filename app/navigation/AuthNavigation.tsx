import {Platform} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import {APP_ROUTES} from 'app/constant/app-routes';
import CreateAccount from 'app/screen/auth/Create-account';
import React from 'react';
import SignUpCompleted from 'app/screen/auth/Sign-up-completed';
import LoginForm from 'app/screen/auth/Login';
import Home from 'app/screen/home/Home';
import Onboarding from 'app/screen/on-boarding/Onboarding';

const {Screen, Navigator} = createStackNavigator();

const isAndroid = Platform.OS === 'android';
const transitionSpecObject = {
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  transitionSpec: {
    open: isAndroid
      ? TransitionSpecs.ScaleFromCenterAndroidSpec
      : TransitionSpecs.ScaleFromCenterAndroidSpec,
    close: isAndroid
      ? TransitionSpecs.FadeOutToBottomAndroidSpec
      : TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
};

export default function AuthNavigation() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...transitionSpecObject,
      }}>
      <Screen name={APP_ROUTES.Onboarding} component={Onboarding} />
      <Screen name={APP_ROUTES.Login} component={LoginForm} />
      <Screen name={APP_ROUTES.Sign_up} component={CreateAccount} />
      <Screen name={APP_ROUTES.Success} component={SignUpCompleted} />
    </Navigator>
  );
}
