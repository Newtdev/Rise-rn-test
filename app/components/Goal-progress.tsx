import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ProgressBar} from 'react-native-paper';
import {SAFE_AREA_PADDING, colors} from 'app/constant/utils';

export default function GoalProgress({
  num,
  total,
}: {
  num: number;
  total: number;
}) {
  const progress = num / total;
  return (
    <View style={{marginTop: 20}}>
      <Text style={style.question}>
        Question {num} of {total}
      </Text>
      <ProgressBar
        progress={progress}
        color={colors.teal}
        style={style.progress}
      />
    </View>
  );
}

const style = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    rowGap: 20,
    height: '100%',
    // backgroundColor: 'red',
  },

  progress: {height: 10, borderRadius: 10, marginTop: 20},
  question: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    color: '#71879C',
  },
});
