import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import React from 'react';
import RiseLogo from 'assets/svg/rise-logo.svg';
import {SAFE_AREA_PADDING} from 'app/constant/utils';
// import Logo from '@assets/svg/rise-logo.svg';

export default function SplashScreen() {
  const currentYear = new Date().getFullYear();
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.logoContainer}>
        <RiseLogo width={123} height={67.17} />
        <Text style={styles.logoDescription}>
          {'Dollar investments that \n help you grow '}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {'All rights reserved \n'} &copy; {currentYear}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0898A0',
    paddingBottom: SAFE_AREA_PADDING.paddingBottom + 10,
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
  logoDescription: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'TomatoGrotesk-Bold',
  },
  footer: {
    marginTop: 'auto',
  },
  footerText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
});
