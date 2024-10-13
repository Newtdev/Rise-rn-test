import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {SAFE_AREA_PADDING, currentFormatter} from 'app/constant/utils';
import PlusCirlce from 'assets/svg/plus-circle.svg';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from 'app/constant/app-routes';

const CreatePlan = ({plan}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.header}>Create a Plan</Text>
        <Button
          disabled={true}
          icon={'chevron-right'}
          contentStyle={styles.contentStyle}>
          View all plans
        </Button>
      </View>
      <Text style={styles.description}>
        {'Start your investment journey by creating a \n plan"'}
      </Text>

      <Animated.FlatList
        data={plan}
        pagingEnabled
        renderItem={({item, index}) => (
          <>
            {index === 0 ? (
              <TouchableOpacity
                style={[styles.flexProps, styles.addPlanCard]}
                onPress={() => navigation.navigate(APP_ROUTES.Plan as never)}>
                <PlusCirlce height={42.64} width={42.64} />
                <Text style={styles.createInvestment}>
                  {'Create an \n investment plan'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.addPlanCard, styles.planContainer]}>
                <Text style={styles.plan}>{item?.plan_name}</Text>
                <Text style={styles.plan}>
                  {currentFormatter(item?.target_amount)}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
        ListEmptyComponent={
          <TouchableOpacity
            style={[styles.flexProps, styles.addPlanCard]}
            onPress={() => navigation.navigate(APP_ROUTES.Plan as never)}>
            <PlusCirlce height={42.64} width={42.64} />
            <Text style={styles.createInvestment}>
              {'Create an \n investment plan'}
            </Text>
          </TouchableOpacity>
        }
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={1}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
      />
    </View>
  );
};

export default CreatePlan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    paddingTop: 20,
  },
  header: {
    fontWeight: '400',
    fontSize: 18,
    fontFamily: 'TomatoGrotesk-Bold',
    color: '#000',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  contentStyle: {
    flexDirection: 'row-reverse',
    columnGap: 0,
  },
  description: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    color: '#71879C',
  },
  addPlanCard: {
    height: 243,
    width: 188,
    backgroundColor: '#71879C1A',
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 6,
  },
  createInvestment: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.23,
    fontFamily: 'DMSans-Regular',
    color: '#333333',
    textAlign: 'center',
  },

  flexProps: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 6,
  },
  plan: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 18.23,
    fontFamily: 'TomatoGrotesk-Bold',
    color: '#fff',
  },
  planContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 20,
    marginBottom: 30,
    rowGap: 2,
    backgroundColor: '#FE8A77',
  },
});
