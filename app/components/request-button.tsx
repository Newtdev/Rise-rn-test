import {SCREEN_WIDTH, SAFE_AREA_PADDING, colors} from 'app/constant/utils';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type RequestButtonProps = {
  onPress: () => void;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
};
const RequestButton = ({
  onPress,
  name,
  disabled,
  isLoading,
}: RequestButtonProps) => (
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

export default RequestButton;

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
