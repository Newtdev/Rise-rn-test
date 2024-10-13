import {colors} from 'app/constant/utils';
import {useMemo} from 'react';
import {Text, View} from 'react-native';
import Check from 'assets/svg/Check.svg';

const PasswordValidationComp = ({password = ''}: {password: string}) => {
  const upperCaseRegex = /^(?=.*[A-Z]).+$/;
  const atLeastOneSymbolRegex = /[\W_]+/;

  const passwordValidation = useMemo(
    () => [
      {
        id: 1,
        validator: 'Minimum of 8 characters',
        validated: password.length >= 8 ? true : false,
      },
      {
        id: 2,
        validator: 'One UPPERCASE character',
        validated: upperCaseRegex.test(password) ? true : false,
      },
      {
        id: 4,
        validator: 'One unique character (e.g: !@#$%^&*?)',
        validated: atLeastOneSymbolRegex.test(password) ? true : false,
      },
    ],
    [password],
  );

  return (
    <View>
      {passwordValidation.map((v: any, ind: number) => (
        <View
          key={v.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 8,
          }}>
          {v.validated ? (
            <Check height={18} width={18} />
          ) : (
            <View
              style={{
                height: 16,
                width: 16,
                borderWidth: 1,
                borderColor: colors.teal,
                borderRadius: 10,
              }}
            />
          )}

          <Text
            style={{
              fontWeight: '400',
              fontSize: 13,
              fontFamily: 'DMSans-Regular',
              color: '#000',
              lineHeight: 19,
            }}>
            {v.validator}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PasswordValidationComp;
