import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyView = ({msgText, isCheckout}) => {
  return (
    <View
      style={[
        styles.emptyView,
        {marginVertical: isCheckout === true ? 140 : 380},
      ]}>
      <Text style={styles.msgTxt}>{msgText}</Text>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  msgTxt: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
  },
  emptyView: {
    // width: '88%',
    // height: 700,
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    marginVertical: 380,
    // marginVertical: 140,
  },
});
