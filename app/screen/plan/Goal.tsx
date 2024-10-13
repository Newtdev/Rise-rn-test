import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, colors} from 'app/constant/utils';
import AuthHeader from 'app/components/Auth-header';
import TextInputComp from 'app/components/Text-input';
import {Controller} from 'react-hook-form';
import {UserDetailsProps} from 'app/types/types';
import {DatePickerInput} from 'react-native-paper-dates';
import ScreenWrapper from 'app/components/Screen-wrapper';
import {ProgressBar} from 'react-native-paper';
import InputLabel from 'app/components/Input-lable';
import GoalProgress from 'app/components/Goal-progress';

export default function Goal({
  control,
  errors,
  handlePrevious,
}: UserDetailsProps) {
  return (
    <View style={{height: SCREEN_HEIGHT / 2.9}}>
      <ScreenWrapper
        showArrow={true}
        name="Goal name"
        previous={handlePrevious}>
        <View style={style.formContainer}>
          <GoalProgress num={1} total={3} />
          <View style={{rowGap: 20, marginTop: 40}}>
            <InputLabel name="What you saving for?" />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInputComp
                  label=""
                  value={value}
                  handleBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors?.first_name?.message}
                />
              )}
              name="plan_name"
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
    // backgroundColor: 'red',
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
