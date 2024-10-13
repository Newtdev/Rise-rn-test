import PaginationElement from 'app/components/Slider';
import {SCREEN_WIDTH, colors, currentFormatter} from 'app/constant/utils';
import React, {useCallback, useRef, useState} from 'react';
import {View, Animated, Text, ViewToken, StyleSheet} from 'react-native';
import {IconButton, Divider, Icon} from 'react-native-paper';
import {useSharedValue} from 'react-native-reanimated';

export default function BalanceComp({
  userBalance,
}: {
  userBalance: {
    [x: string]: number | null;
  };
}) {
  const [showAmount, setShowAmount] = useState(false);
  const x = useSharedValue(0);
  const slideRef = useRef(null);
  const flatListIndex = useSharedValue(0);
  const slides = [
    {balance: userBalance?.total_returns, name: 'Total Balance'},
    {balance: userBalance?.total_returns, name: 'Total Returns'},
  ];

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [],
  );
  return (
    <View style={style.cardContainer}>
      <Animated.FlatList
        data={slides}
        pagingEnabled
        renderItem={({item, index}) => (
          <View key={index} style={style.slideContainer}>
            <View style={style.totalBalanceContainer}>
              <Text style={style.totalBalance}>{item?.name}</Text>
              <IconButton
                size={16}
                icon={!showAmount ? 'eye-off' : 'eye'}
                iconColor={colors.teal}
                onPress={() => setShowAmount(prevstate => !prevstate)}
              />
            </View>
            <>
              {showAmount ? (
                <Text style={style.totalAmount}>
                  {currentFormatter(item?.balance ?? 0)}
                </Text>
              ) : (
                <Text style={style.hideAmount}>......</Text>
              )}
            </>

            <Divider bold={true} />
            <View style={style.totalChains}>
              <Text style={style.totalBalance}>Total Chains</Text>
              <Icon size={16} source={'arrow-top-right'} color="#27BF41" />
              <Text style={[style.totalBalance, {color: '#27BF41'}]}>
                0.00%
              </Text>
              <Icon size={16} source="chevron-right" />
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={1}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        onScroll={event => (x.value = event.nativeEvent.contentOffset.x)}
        ref={slideRef}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      <View style={style.paginationContainer}>
        <PaginationElement length={slides.length} x={x} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    height: 190,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,

    borderColor: '#fff',
  },
  totalBalance: {
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    color: '#71879C',
    textAlign: 'center',
  },
  totalAmount: {
    fontWeight: '400',
    lineHeight: 38.4,
    fontSize: 32,
    fontFamily: 'TomatoGrotesk-Bold',
    color: '#333333',
    textAlign: 'center',
  },
  hideAmount: {
    fontWeight: '400',
    lineHeight: 38.4,
    fontSize: 64,
    fontFamily: 'TomatoGrotesk-Bold',
    color: '#333333',
    textAlign: 'center',
  },
  slideContainer: {
    width: SCREEN_WIDTH / 1.1,
    height: '100%',
    padding: 10,
    rowGap: 4,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 26,
  },
  totalChains: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 2,
    marginTop: 15,
  },
  totalBalanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
