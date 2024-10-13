/* eslint-disable react-native/no-inline-styles */

import React, {ReactNode, useState} from 'react';
import {colors} from 'app/constant/utils';
import {TextInput} from 'react-native-paper';
import {KeyboardTypeOptions} from 'react-native';

type TextInputTypes = {
  handleBlur: (arg: any) => void;
  value: string | number | any;
  onChangeText: (arg: string) => void;
  errorMessage: string | any;
  rightIcon?: ReactNode | undefined;
  secureTextEntry?: boolean;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
};

export default function TextInputComp({
  handleBlur,
  value,
  onChangeText,
  errorMessage,
  rightIcon,
  secureTextEntry,
  label,
  keyboardType,
}: TextInputTypes) {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onBlur={handleBlur}
      outlineColor={'#E1E8ED'}
      placeholderTextColor={'#000'}
      keyboardType={keyboardType || 'default'}
      style={{
        height: 55,
        backgroundColor: 'transparent',
        fontWeight: '700',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
      }}
      secureTextEntry={secureTextEntry}
      activeOutlineColor={colors.teal}
      onChangeText={onChangeText}
      error={errorMessage}
      right={rightIcon}
    />
  );
}

// const styles = StyleSheet.create()
