import {StyleSheet, View, useWindowDimensions} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors} from 'app/constant/utils';
// import {useTheme} from '@rneui/themed';

type Props = {
  length: number;
  x: Animated.SharedValue<number>;
};

const PaginationElement = ({length, x}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const PaginationComponent = useCallback(({index}: {index: number}) => {
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [5, 12, 5],
        Extrapolate.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [colors.gray, colors.teal, colors.gray],
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({length}).map((_, index) => {
        return <PaginationComponent index={index} key={index} />;
      })}
    </View>
  );
};

export default PaginationElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  itemStyle: {
    width: 35,
    height: 6,
    borderRadius: 23,
    backgroundColor: 'red',
    marginHorizontal: 3,
  },
});
