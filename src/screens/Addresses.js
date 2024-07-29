import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';

const Addresses = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'Addresses'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addView}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Image
          source={require('../assets/plus.png')}
          style={{width: 25, height: 25}}
          tintColor={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  addView: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#121481',
    position: 'absolute',
    right: 30,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
