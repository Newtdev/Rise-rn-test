import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';

import {useForm} from 'react-hook-form';
import useYupValidationResolver from 'app/hooks/useYupValidationResolver';
import {SAFE_AREA_PADDING} from 'app/constant/utils';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import RequestButton from 'app/components/request-button';
import {APP_ROUTES} from 'app/constant/app-routes';
import Goal from './Goal';
import TargetAmount from './Target-amount';
import TargetDate from './Target-date';
import useAuth from 'app/hooks/useAuth';

const CreatePlanSchema = [
  yup.object().shape({
    plan_name: yup.string().label('Plan Name').required(),
  }),
  yup.object().shape({
    target_amount: yup.string().label('Target amount').required(),
  }),
  yup.object().shape({
    maturity_date: yup.string().trim().label('Maturity date').required(),
  }),
];

export default function CreatePlan({navigation}: any) {
  const [step, setStep] = useState(0);
  const yupResolver = useYupValidationResolver(CreatePlanSchema[step]);
  const {token} = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({resolver: yupResolver});

  const mutation = useMutation({
    mutationFn: data => {
      return axios.post(`${process.env.APP_API_BASE_URL}/plans`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: success => {
      navigation.navigate(APP_ROUTES.Success);
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        showMessage({
          message: 'Create Plan Error',
          description: error.response?.data?.message || error?.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'Network Error',
          description: error?.message,
          type: 'danger',
        });
      }
    },
  });

  function handlePrevious() {
    if (step > 0) {
      setStep(prevState => prevState - 1);
    } else {
      navigation.navigate(APP_ROUTES.Home);
    }
  }
  const onSubmit = async (data: void) => {
    if (step < 2) {
      setStep(prevState => prevState + 1);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <View style={{flex: 1, paddingBottom: SAFE_AREA_PADDING.paddingBottom}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{paddingTop: 70}}>
          {step === 0 ? (
            <Goal
              control={control}
              errors={errors}
              getValues={getValues}
              handlePrevious={handlePrevious}
            />
          ) : step === 1 ? (
            <TargetAmount
              control={control}
              errors={errors}
              getValues={getValues}
              handlePrevious={handlePrevious}
            />
          ) : (
            <TargetDate
              control={control}
              errors={errors}
              getValues={getValues}
              handlePrevious={handlePrevious}
            />
          )}
        </View>
        <View style={style.buttonContainer}>
          <RequestButton
            onPress={handleSubmit(onSubmit)}
            name={step < 2 ? 'Continue' : 'Submit'}
            disabled={!isValid || mutation.isPending}
            isLoading={mutation.isPending}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  formContainer: {
    marginTop: 0,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
    paddingTop: 10,
  },

  login: {fontWeight: '400', fontSize: 18},

  buttonContainer: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingRight,
  },
  buttonStyle: {borderRadius: 30},

  headerContainer: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
  },
  footerText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 15.62,
    color: '#012224',
    fontFamily: 'DMSans-Regular',
  },
});
