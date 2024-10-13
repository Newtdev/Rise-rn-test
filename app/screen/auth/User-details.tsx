import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, colors} from 'app/constant/utils';
import AuthHeader from 'app/components/Auth-header';
import TextInputComp from 'app/components/Text-input';
import {Controller} from 'react-hook-form';
import {UserDetailsProps} from 'app/types/types';
import {TextInput} from 'react-native-paper';
import PasswordValidationComp from 'app/components/Password-validator';

export default function UserDetails({
  control,
  errors,
  getValues,
}: UserDetailsProps) {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  return (
    <View style={{height: SCREEN_HEIGHT / 2.2}}>
      <AuthHeader
        text="Create an account"
        desc="Start building your dollar-denominated 
investment portfolio"
      />

      <View style={style.formContainer}>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Email address"
                value={value}
                handleBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors?.email_address?.message}
              />
            )}
            name="email_address"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Password"
                value={value}
                handleBlur={onBlur}
                secureTextEntry={showPassword}
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
                rightIcon={
                  <TextInput.Icon
                    icon={!showPassword ? 'eye' : 'eye-off'}
                    color={colors.teal}
                    onPress={() => setShowPassword(prevState => !prevState)}
                  />
                }
              />
            )}
            name="password"
          />
        </View>
        <PasswordValidationComp password={getValues().password} />
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
  },
});
