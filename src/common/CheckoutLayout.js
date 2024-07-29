import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CheckoutLayout = ({total, items}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={{color: '#000', fontSize: 16}}>{`Items : ${items}`}</Text>
        <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
          {'Total : $ ' + total}
        </Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>{'Checkout'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutLayout;

const styles = StyleSheet.create({
  checkout: {
    width: '65%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: '#121481',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: Dimensions.get('window').width,
    backgroundColor: '#F5F7F8',
    flexDirection: 'row',
  },
});
