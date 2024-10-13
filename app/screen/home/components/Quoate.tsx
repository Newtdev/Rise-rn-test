import {Share, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SAFE_AREA_PADDING, colors} from 'app/constant/utils';
import ShareIcon from '@assets/svg/share.svg';
import {Divider} from 'react-native-paper';

type QuoteProps = {
  [x: string]: {author: string; quote: string};
};
const Quote = ({quote}: QuoteProps) => {
  const onShare = async () => {
    try {
      await Share.share({
        message: quote?.quote,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        paddingBottom: SAFE_AREA_PADDING.paddingBottom,
        paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
      }}>
      <View style={styles.quoateContainer}>
        <Text style={styles.today}>TODAY’S QUOTE</Text>
        <Divider style={{width: 27.56, borderWidth: 2, borderColor: '#fff'}} />
        <Text style={styles.quoate}>{quote?.quote}</Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.today}>{quote?.author}</Text>
          <ShareIcon onPress={onShare} />
        </View>
      </View>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  quoateContainer: {
    height: 261.91,
    backgroundColor: colors.teal,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#41BCC4',
    shadowColor: '#40BBC326',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 0.1,
    elevation: 5,
    padding: 20,
    rowGap: 10,
  },
  today: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.23,
    fontFamily: 'DMSans-Regular',
    color: '#fff',
  },
  quoate: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    color: '#fff',
  },
});
