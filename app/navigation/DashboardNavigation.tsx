import React, {useEffect, useRef, useState} from 'react';
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import {Alert, AppState, Platform} from 'react-native';
import {APP_ROUTES} from 'app/constant/app-routes';
import Home from 'app/screen/home/Home';
import CreatePlan from 'app/screen/plan/Create-plan';
import SignUpCompleted from 'app/screen/auth/Sign-up-completed';
import PlanCreateSuccessfully from 'app/components/Create-plan-successfully';

const {Screen, Navigator} = createStackNavigator();

export default function DashboardNavigation() {
  // CHECK IF THE USER PIN OR FINGERPRINT IS ACTIVE

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

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          ...transitionSpecObject,
        }}>
        <Screen name={APP_ROUTES.Home} component={Home} />
        <Screen name={APP_ROUTES.Plan} component={CreatePlan} />
        <Screen name={APP_ROUTES.Success} component={PlanCreateSuccessfully} />
      </Navigator>
    </>
  );
}
