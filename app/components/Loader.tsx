import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from 'app/constant/utils';

export default function LoaderModalComp({loading = true}) {
  return (
    <Modal
      visible={loading}
      //   transparent={true}
      animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator color={colors.teal} size={70} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'LibreFranklin-Regular',
  },
});
