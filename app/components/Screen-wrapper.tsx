import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors as appColor} from 'react-native/Libraries/NewAppScreen';
import {SAFE_AREA_PADDING} from 'app/constant/utils';

export default function ScreenWrapper({
  children,
  showArrow = false,
  name,
  previous,
}: any) {
  const navigation = useNavigation();
  const {fontScale} = useWindowDimensions();
  const style = styles(fontScale);

  function Goback() {
    navigation.goBack();
  }
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? appColor.darker : appColor.lighter,
  };
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {showArrow ? (
          <View style={style.iconStyle}>
            <TouchableOpacity
              onPress={previous}
              style={{
                position: 'absolute',
                left: SAFE_AREA_PADDING.paddingRight,
              }}>
              <Image source={require('assets/img/back-button.png')} />
            </TouchableOpacity>
            <Text style={[style.textStyle]}>{name}</Text>
          </View>
        ) : null}

        {children}
      </SafeAreaView>
    </>
  );
}

const styles = (fontScale: number) =>
  StyleSheet.create({
    iconStyle: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 10,
      paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
      position: 'relative',
    },
    textStyle: {
      fontSize: 24,
      textAlign: 'center',
      color: '#000',
      lineHeight: 26,
      fontFamily: 'TomatoGrotesk-Bold',
    },
  });
