import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, ViewToken} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import RenderOnboardingList from './component/Render-onboard-list';
import OnboardingOne from 'assets/svg/onboarding-one.svg';
import OnboardingTwo from 'assets/svg/onboarding-two.svg';
import OnboardingThree from 'assets/svg/onboarding-three.svg';
import OnboardingNavigation from './component/onboarding-navigation';

import AuthButton from './component/auth-button';
import {SCREEN_WIDTH, colors, SAFE_AREA_PADDING} from 'app/constant/utils';

export const onboardingColors = {
  one: '#FEFAF7',
  two: '#FDF4F9',
  three: '#F6FFFE',
};
export default function Onboarding() {
  const x = useSharedValue(0);
  const slideRef = useRef<{scrollToIndex: ({}) => void}>(null);
  const flatListIndex = useSharedValue(0);
  const [slide, setSlide] = useState(0);

  const onboardingData = useMemo(
    () => [
      {
        id: 1,
        desc: 'Rise invests your money into the best dollar investments around the world.',
        color: onboardingColors.one,
        header: (
          <Text style={[style.onboardingColor, style.onBoardingStylingOne]}>
            Quality assets
          </Text>
        ),
        image: <OnboardingOne height={300} width={300} />,
      },
      {
        id: 2,
        header: (
          <Text style={[style.onboardingColor, style.onBoardingStylingTwo]}>
            Superior Selection
          </Text>
        ),
        desc: 'Our expert team and intelligent algorithms select assets that beat the markets.',
        color: onboardingColors.two,
        image: <OnboardingTwo height={300} width={300} />,
      },
      {
        id: 3,
        header: (
          <Text style={[style.onboardingColor, style.onBoardingStylingThree]}>
            Better Performance
          </Text>
        ),
        desc: 'You earn more returns, achieve more of your financial goals and protect your money from devaluation',
        color: onboardingColors.three,
        image: <OnboardingThree height={300} width={300} />,
      },
    ],
    [flatListIndex.value],
  );

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setSlide(viewableItems[0].index ?? 0);
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [flatListIndex.value],
  );

  const handleNext = useCallback((index: number) => {
    slideRef.current?.scrollToIndex({index, animated: true});
    setSlide(index);
  }, []);

  const handlePrevious = useCallback((index: number) => {
    slideRef.current?.scrollToIndex({index, animated: true});
    setSlide(index);
  }, []);

  const active = useMemo(
    () =>
      slide === 0 ? colors.orange : slide === 1 ? colors.indigo : colors.teal,
    [slide],
  );
  const activeSlideBackground = useMemo(
    () =>
      slide === 0
        ? onboardingColors.one
        : slide === 1
          ? onboardingColors.two
          : onboardingColors.three,
    [slide],
  );

  return (
    <View
      style={[{backgroundColor: activeSlideBackground}, style.mainContainer]}>
      <View>
        <View>
          <Animated.FlatList
            data={onboardingData}
            pagingEnabled
            renderItem={data => (
              <RenderOnboardingList
                data={data}
                x={x}
                slide={slide}
                active={active}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            bounces={false}
            initialNumToRender={1}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            onScroll={event => (x.value = event.nativeEvent.contentOffset.x)}
            ref={slideRef as any}
            onViewableItemsChanged={onViewableItemsChanged}
          />
          <View style={style.buttonStyle}>
            {slide !== 2 ? (
              <OnboardingNavigation
                value={active}
                slide={slide}
                previous={() => handlePrevious(0)}
                next={() => handleNext(slide + 1)}
              />
            ) : (
              <View>
                <AuthButton />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  buttonStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
    width: SCREEN_WIDTH,
    height: 150,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 'auto',
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
  },
  onboardingColor: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'TomatoGrotesk-Bold',
  },
  onBoardingStylingOne: {
    color: colors.orange,
  },
  onBoardingStylingTwo: {
    color: colors.indigo,
  },
  onBoardingStylingThree: {
    color: colors.teal,
  },
});
