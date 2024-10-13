import {View, Text} from 'react-native';
import React from 'react';

export default function InputLabel({name}: {name: string}) {
  return (
    <Text
      style={{
        fontWeight: '700',
        fontSize: 17,
        color: '#222',
        fontFamily: 'DMSans-Regular',
      }}>
      {name}
    </Text>
  );
}
