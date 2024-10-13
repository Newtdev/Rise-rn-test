import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PaginationElement from './Pagination-element';
import {
  SAFE_AREA_PADDING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from 'app/constant/utils';

const RenderOnboardingList = ({data, active, x}: any) => {
  const item = data.item;

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>{item.image}</View>
      <View>
        <View style={style.pagination}>
          <PaginationElement length={3} x={x} active={active} slide={0} />
        </View>
        <View style={style.textContainer}>
          {item.header}
          <Text style={style.desc}>{item.desc}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderOnboardingList;

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    rowGap: 20,
    paddingTop: SAFE_AREA_PADDING.paddingTop,
    height: SCREEN_HEIGHT - 250,
  },
  pagination: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {objectFit: 'contain', height: '100%', width: '100%'},

  textContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    rowGap: 10,
  },

  header: {
    fontSize: 32,
    fontWeight: '700',
  },
  desc: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'DMSans-Regular',
    lineHeight: 22,
    color: '#222',
  },
});
