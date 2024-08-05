import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/success.png')}
        style={{width: 50, height: 50}}
      />
      <Text style={styles.orderTxt}>{'Your Order Placed Successfully...!!!'}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={() => {
          navigation.navigate('MainNavigation');
        }}>
        <Text style={styles.btnTxt}>{'Go To Home'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  btnTxt: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    width: '50%',
    height: 50,
    //   borderWidth: 0.8,
    borderRadius: 10,
    backgroundColor: '#121481',
    marginTop: 40,
    padding: 10,
  },
  orderTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
