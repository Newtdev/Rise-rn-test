import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {SAFE_AREA_PADDING, colors} from 'app/constant/utils';
import {Button} from 'react-native-paper';
import Notification from '@assets/svg/notification.svg';
import BalanceComp from './components/BalanceComp';
import CreatePlan from './components/CreatePlan';
import {ScrollView} from 'react-native-gesture-handler';
import Contact from 'assets/svg/contact.svg';

import {getHours} from 'date-fns';
import {useQueries} from '@tanstack/react-query';
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';
import Quote from './components/Quoate';
import LoaderModalComp from 'app/components/Loader';

const fetchResource = async (endpoint: any, token: any) => {
  const {data} = await axios.get(
    `${process.env.APP_API_BASE_URL}/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

const endpoints = [
  {queryKey: ['user'], endpoint: 'quotes'},
  {queryKey: ['session', 1], endpoint: 'sessions'},
  {queryKey: ['plans', 1], endpoint: 'plans'},
];

const Home = () => {
  const currentDate = new Date();
  const hours = getHours(currentDate);
  const {token} = useAuth();

  const queries = useQueries({
    queries: endpoints.map(endpoint => ({
      queryKey: endpoint.queryKey,
      queryFn: () => fetchResource(endpoint.endpoint, token),
    })),
  });

  const quoate = useMemo(() => queries[0], [queries]);
  const user = useMemo(() => queries[1], [queries]);
  const Plan = useMemo(() => queries[2], [queries]);

  const greetings = useMemo(() => {
    let greeting;
    if (hours < 12) {
      greeting = 'Good morning';
    } else if (hours < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    return greeting;
  }, []);

  const isLoading = quoate.isLoading || quoate.isFetching;
  const isUserLoading = user.isLoading || user.isFetching;
  const isPLanLoading = Plan.isLoading || Plan.isFetching;

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingBottom: SAFE_AREA_PADDING.paddingBottom,
        backgroundColor: '#fff',
      }}>
      <LoaderModalComp loading={isLoading && isUserLoading && isPLanLoading} />
      <StatusBar hidden />
      <ImageBackground
        source={require('assets/img/top-background.png')}
        style={style.imageBackground}>
        <View style={style.topContainer}>
          <View>
            <Text style={style.greetings}>{greetings}</Text>
            <Text style={style.name}>{user?.data?.last_name}</Text>
          </View>
          <View style={style.leftSide}>
            <Button
              mode="contained"
              labelStyle={style.label}
              buttonColor={colors.teal}>
              Earn 3% bonus
            </Button>
            <Notification />
          </View>
        </View>
        <BalanceComp userBalance={user?.data} />
      </ImageBackground>
      <View style={[style.flexProps, {borderRadius: 0}]}>
        <Button
          icon="plus"
          style={style.addMoneyButton}
          mode="outlined"
          labelStyle={style.labelStyle}>
          Add Money
        </Button>
      </View>
      <CreatePlan plan={Plan?.data?.items} />
      <View style={style.contactContainer}>
        <View style={[style.flexProps, {columnGap: 10}]}>
          <Contact />
          <Text style={[style.contact, {color: '#000'}]}>Need Help?</Text>
        </View>
        <Button
          mode="contained"
          style={style.contactButton}
          labelStyle={style.contact}>
          Contact us
        </Button>
      </View>
      <Quote quote={quoate?.data} />
      <View style={[style.flexProps, {height: 100}]}>
        <Image source={require('@assets/img/rise-home-logo.png')} />
      </View>
    </ScrollView>
  );
};

export default Home;

const style = StyleSheet.create({
  imageBackground: {
    height: 300,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,

    paddingTop: SAFE_AREA_PADDING.paddingTop + 40,
  },
  greetings: {
    fontWeight: '400',
    lineHeight: 22,
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    color: '#333333',
  },
  name: {
    fontWeight: '400',
    lineHeight: 26.04,
    fontSize: 20,
    fontFamily: 'DMSans-Regular',
    color: '#333333',
  },
  label: {
    fontWeight: '400',
    lineHeight: 15.62,
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#fff',
  },
  leftSide: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    columnGap: 20,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addMoneyButton: {
    width: '90%',
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 'auto',
    borderColor: colors.gray,
    marginTop: 40,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19.53,
    fontFamily: 'DMSans-Regular',
    color: colors.teal,
  },
  contactContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '90%',
    marginHorizontal: SAFE_AREA_PADDING.paddingLeft,
    marginVertical: SAFE_AREA_PADDING.paddingTop,
    height: 66,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#35475926',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 10,
  },
  contactButton: {
    borderRadius: 5,
    backgroundColor: colors.teal,
  },
  contact: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
    fontFamily: 'DMSans-Regular',
    color: '#fff',
  },

  flexProps: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
