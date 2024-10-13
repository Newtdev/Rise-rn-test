import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors} from 'app/constant/utils';

type Props = {
  slide: number;
  length: number;
  x: Animated.SharedValue<number>;
  active: string;
};

const PaginationElement = ({active, length, x}: Props) => {
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
        [6, 6, 6],
        Extrapolate.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [colors.gray, active, colors.gray],
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x, active]);
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
