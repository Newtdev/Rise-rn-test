import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

type OnboardingTypes = {
  value: string;
  previous: () => void;
  next: () => void;
  slide?: number;
};

export default function OnboardingNavigation({
  value,
  previous,
  next,
  slide,
}: OnboardingTypes) {
  return (
    <>
      <TouchableOpacity
        disabled={slide === 0 ? true : false}
        style={[styles.buttonStyle, styles.backButton]}
        onPress={previous}>
        <Image
          style={{
            tintColor: value,
            transform: [{rotate: '180deg'}],
          }}
          source={require('assets/img/arrow-right.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonStyle, styles.nextButton]}
        onPress={next}>
        <Text
          style={{
            fontWeight: '700',
            fontFamily: 'DMSans-Regular',
            fontSize: 15,
            color: value,
          }}>
          Next
        </Text>
        <Image
          style={{tintColor: value}}
          source={require('assets/img/arrow-right.png')}
        />
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: '#71879C1A',
    height: 58,
  },
  backButton: {
    width: 43,
  },
  nextButton: {
    width: 103,
  },
});
