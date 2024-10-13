import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import useAuth from 'app/hooks/useAuth';
import DashboardNavigation from './DashboardNavigation';

export default function RootNavigation() {
  let token = useAuth();
  token = token?.token;

  return (
    // route to dashboard when the token is available
    <NavigationContainer>
      {!token ? <AuthNavigation /> : <DashboardNavigation />}
    </NavigationContainer>
  );
}
