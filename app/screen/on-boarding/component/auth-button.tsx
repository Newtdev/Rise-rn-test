import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from 'app/constant/app-routes';
import {SCREEN_WIDTH, SAFE_AREA_PADDING, colors} from 'app/constant/utils';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type SingUpButtonProps = {
  onPress: () => void;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
};
export const RequestButton = ({
  onPress,
  name,
  disabled,
  isLoading,
}: SingUpButtonProps) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.buttonStyle,
      styles.singUpButton,
      {opacity: !disabled ? 1 : 0.4},
    ]}
    onPress={onPress}>
    {isLoading ? (
      <ActivityIndicator color="#fff" size={'large'} />
    ) : (
      <Text style={[styles.buttonText, styles.signUpText]}>{name}</Text>
    )}
  </TouchableOpacity>
);

export default function AuthButton() {
  const navigation = useNavigation();
  function handleSignUpNavigation() {
    navigation.navigate(APP_ROUTES.Sign_up as never);
  }

  function handleLoginNavigation() {
    navigation.navigate(APP_ROUTES.Login as never);
  }
  return (
    <View style={{rowGap: 10}}>
      <RequestButton
        onPress={handleSignUpNavigation}
        name="Sign Up"
        disabled={false}
      />
      <TouchableOpacity
        style={[styles.buttonStyle, styles.signInButton]}
        onPress={handleLoginNavigation}>
        <Text style={[styles.buttonText, styles.LoginText]}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#71879C1A',
    height: 58,
    width: SCREEN_WIDTH - SAFE_AREA_PADDING.paddingRight - 20,
  },
  buttonText: {
    fontWeight: '700',
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
  },
  LoginText: {
    color: colors.teal,
  },
  singUpButton: {
    backgroundColor: colors.teal,
  },
  signInButton: {
    backgroundColor: '#71879C1A',
  },
});
