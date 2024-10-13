import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, colors} from 'app/constant/utils';
import AuthHeader from 'app/components/Auth-header';
import TextInputComp from 'app/components/Text-input';
import {Controller} from 'react-hook-form';
import {UserDetailsProps} from 'app/types/types';
import DatePicker from 'app/components/Date-picker';

export default function UserInfoForm({
  control,
  errors,
  getValues,
}: UserDetailsProps) {
  return (
    <View style={{height: SCREEN_HEIGHT / 2}}>
      <AuthHeader
        text="Tell Us More About You"
        desc="Please use your name as it appears on your ID."
      />
      <View style={style.formContainer}>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Legal First Name"
                value={value}
                handleBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors?.first_name?.message}
              />
            )}
            name="first_name"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Legal Last Name"
                value={value}
                handleBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors?.last_name?.message}
              />
            )}
            name="last_name"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Nick Name"
                value={value}
                handleBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors?.username?.message}
              />
            )}
            name="username"
          />
        </View>

        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <DatePicker label="" onChange={onChange} value={value} />
            )}
            name="date_of_birth"
          />
        </View>
      </View>
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
});
