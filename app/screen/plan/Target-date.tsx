import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT} from 'app/constant/utils';
import {Controller} from 'react-hook-form';
import {UserDetailsProps} from 'app/types/types';
import ScreenWrapper from 'app/components/Screen-wrapper';
import InputLabel from 'app/components/Input-lable';
import GoalProgress from 'app/components/Goal-progress';
import DatePicker from 'app/components/Date-picker';

export default function TargetDate({
  control,
  handlePrevious,
}: UserDetailsProps) {
  return (
    <View style={{height: SCREEN_HEIGHT / 2.9}}>
      <ScreenWrapper
        showArrow={true}
        name="Target Date"
        previous={handlePrevious}>
        <View style={style.formContainer}>
          <GoalProgress num={3} total={3} />
          <View style={{rowGap: 20, marginTop: 40}}>
            <InputLabel name="When do you want to withdraw?" />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <DatePicker label="" onChange={onChange} value={value} />
              )}
              name="maturity_date"
            />
          </View>
        </View>
      </ScreenWrapper>
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
  },

  rightIcon: {marginRight: 10},
  question: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    color: '#71879C',
  },
});
