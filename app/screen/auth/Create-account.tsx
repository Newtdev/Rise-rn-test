import {View, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import ScreenWrapper from 'app/components/Screen-wrapper';
import UserDetails from './User-details';
import {useForm} from 'react-hook-form';
import useYupValidationResolver from 'app/hooks/useYupValidationResolver';
import {SAFE_AREA_PADDING} from 'app/constant/utils';
import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import UserInfoForm from './User-info-form';
import RequestButton from 'app/components/request-button';
import {APP_ROUTES} from 'app/constant/app-routes';

const CreateAccountSchema = [
  yup.object().shape({
    password: yup
      .string()
      .trim()
      .label('password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'error')
      .required(),
    email_address: yup.string().label('Email address').email().required(),
  }),
  yup.object().shape({
    first_name: yup.string().trim().label('First name').required(),
    last_name: yup.string().trim().label('Last name').required(),
    username: yup.string().trim().label('User name').required(),
    date_of_birth: yup.string().trim().label('Date of birth').required(),
  }),
];

export default function CreateAccount({navigation}: any) {
  const [step, setStep] = useState(0);
  const yupResolver = useYupValidationResolver(CreateAccountSchema[step]);

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: {errors, isValid},
  } = useForm({resolver: yupResolver});
  const s = watch('password');

  const mutation = useMutation({
    mutationFn: data => {
      return axios.post(`${process.env.APP_API_BASE_URL}/users`, data);
    },
    onSuccess: err => {
      navigation.navigate(APP_ROUTES.Success);
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        showMessage({
          message: 'Sign In Error',
          description: error.response?.data?.message || error?.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: 'NetworkError',
          description: error?.message,
          type: 'danger',
        });
      }
    },
  });

  function handlePrevious() {
    setStep(0);
  }
  const onSubmit = async (data: void) => {
    if (step === 0) {
      setStep(prevState => prevState + 1);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <ScreenWrapper
      showArrow={step > 0 ? true : false}
      previous={handlePrevious}>
      <View style={{flex: 1, paddingBottom: SAFE_AREA_PADDING.paddingBottom}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={10}
          style={style.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{paddingTop: 70}}>
            {step === 0 ? (
              <UserDetails
                control={control}
                errors={errors}
                getValues={getValues}
              />
            ) : (
              <UserInfoForm
                control={control}
                errors={errors}
                getValues={getValues}
              />
            )}
          </View>
          <View style={style.buttonContainer}>
            <RequestButton
              onPress={handleSubmit(onSubmit)}
              name={step == 1 ? 'Continue' : 'Sign Up'}
              disabled={!isValid || mutation.isPending}
              isLoading={mutation.isPending}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
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
