import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const EmptyView = ({msgText}) => {
  return (
    <View
      style={{
        width: '88%',
        height: 700,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#000',
          fontWeight: '400',
        }}>
        {msgText}
      </Text>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({});
