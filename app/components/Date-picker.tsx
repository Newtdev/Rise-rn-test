import React from 'react';
import {colors} from 'app/constant/utils';
import {DatePickerInput} from 'react-native-paper-dates';
type DatePickerProps = {
  value: Date;
  onChange: () => void;
  label?: string;
};
export default function DatePicker({
  value,
  onChange,
  label = 'Date Of Birth',
}: DatePickerProps) {
  return (
    <DatePickerInput
      locale="en"
      mode="outlined"
      label={label}
      activeOutlineColor={colors.teal}
      withDateFormatInLabel={false}
      value={value}
      onChange={onChange}
      onChangeText={onChange}
      inputMode="end"
      outlineColor={'#E1E8ED'}
      placeholderTextColor={'#000'}
      style={{
        height: 60,
        backgroundColor: 'transparent',
        fontWeight: '700',
        fontSize: 15,
        fontFamily: 'DMSans-Regular',
        marginTop: 60,
      }}
    />
  );
}
