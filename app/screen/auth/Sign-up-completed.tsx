import React from 'react';
import {Text, StyleSheet, StatusBar} from 'react-native';
import SuccessIcon from 'assets/svg/success-icon.svg';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT} from 'app/constant/utils';
import {View} from 'react-native';
import RequestButton from 'app/components/request-button';
import {APP_ROUTES} from 'app/constant/app-routes';
import {NavigationProp} from '@react-navigation/native';

export default function SignUpCompleted({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoContainer}>
        <SuccessIcon width={90} height={90} />
        <View>
          <Text style={styles.logoHeader}>
            {'You just created your \n Rise account'}
          </Text>
          <Text style={styles.logoDescription}>
            {'Welcome to Rise, let’s take \n you home'}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <RequestButton
          onPress={() => navigation.navigate(APP_ROUTES.Login)}
          name="Okay"
        />
      </View>
    </View>
  );
}

// import Logo from '@assets/svg/rise-logo.svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: SAFE_AREA_PADDING.paddingBottom + 30,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    height: SCREEN_HEIGHT / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 50,
  },
  logoHeader: {
    fontSize: 20,
    lineHeight: 26,
    color: '#222',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'TomatoGrotesk-Bold',
  },
  logoDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: '#71879C',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    paddingTop: 4,
  },
  buttonContainer: {marginTop: 'auto'},
});
