import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import {SAFE_AREA_PADDING, SCREEN_HEIGHT, colors} from 'app/constant/utils';
import AuthHeader from 'app/components/Auth-header';
import TextInputComp from 'app/components/Text-input';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import useYupValidationResolver from 'app/hooks/useYupValidationResolver';
import {TextInput} from 'react-native-paper';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import {NavigationProp} from '@react-navigation/native';
import {APP_ROUTES} from 'app/constant/app-routes';
import RequestButton from 'app/components/request-button';
import {useAppDispatch} from 'app/hooks/useAppDispatch';
import {handleSignIn} from 'app/store/storeSlice';

const LoginSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .label('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/, 'error')
    .required(),
  email_address: yup.string().label('Email address').email().required(),
});

export default function LoginForm({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const yupResolver = useYupValidationResolver(LoginSchema);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver,
    defaultValues: {
      email_address: 'info.ezecodes@gmail.com',
      password: 'Test@123',
    },
  });

  const mutation = useMutation({
    mutationFn: data => {
      return axios.post(`${process.env.APP_API_BASE_URL}/sessions`, data);
    },
    onSuccess: response => {
      dispatch(handleSignIn(response?.data));
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

  const onSubmit = (data: void) => {
    mutation.mutate(data);
  };

  return (
    <View style={{height: SCREEN_HEIGHT / 1.4, marginTop: 70}}>
      <AuthHeader
        text="Welcome Back"
        desc="Let’s get you logged in to get back to building your dollar-denominated investment portfolio."
      />
      <View style={style.formContainer}>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Email address"
                value={value}
                handleBlur={onBlur}
                onChangeText={onChange}
                errorMessage={errors?.email_address?.message}
              />
            )}
            name="email_address"
          />
        </View>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInputComp
                label="Password"
                value={value}
                handleBlur={onBlur}
                secureTextEntry={showPassword}
                onChangeText={onChange}
                errorMessage={errors?.password?.message}
                rightIcon={
                  <TextInput.Icon
                    icon={!showPassword ? 'eye' : 'eye-off'}
                    color={colors.teal}
                    onPress={() => setShowPassword(prevState => !prevState)}
                  />
                }
              />
            )}
            name="password"
          />
        </View>
        <View>
          <RequestButton
            onPress={handleSubmit(onSubmit)}
            name="Login"
            isLoading={mutation.isPending}
            disabled={!isValid || mutation.isPending}
          />
        </View>
        <View style={style.forgotPassword}>
          <TouchableOpacity>
            <Text style={style.forgotPasswordText}>I forgot my password</Text>
          </TouchableOpacity>
        </View>
        <View style={style.signUp}>
          <Text style={[style.forgotPasswordText, {color: '#71879C'}]}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(APP_ROUTES.Sign_up)}>
            <Text style={style.forgotPasswordText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom + 10,
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    rowGap: 20,
    height: '100%',
  },
  rightIcon: {marginRight: 10},
  forgotPassword: {
    padding: 10,
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    color: colors.teal,
  },

  signUp: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
    marginTop: 'auto',
  },
});
