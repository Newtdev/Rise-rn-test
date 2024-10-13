import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SAFE_AREA_PADDING} from 'app/constant/utils';

type AuthHeaderTypes = {
  desc?: string;
  text: string;
};

const AuthHeader = ({text, desc}: AuthHeaderTypes) => {
  return (
    <View style={style.textContainer}>
      <Text style={style.textStyles}>{text}</Text>
      <Text style={[style.desc]}>{desc}</Text>
    </View>
  );
};

export default AuthHeader;

const style = StyleSheet.create({
  textContainer: {
    paddingLeft: SAFE_AREA_PADDING.paddingLeft,
    display: 'flex',
    justifyContent: 'flex-end',
    rowGap: 10,
  },
  textStyles: {
    fontWeight: '500',
    color: '#222222',
    fontSize: 20,
    fontFamily: 'TomatoGrotesk-Bold',
  },
  desc: {
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    color: '#71879C',
  },
});
