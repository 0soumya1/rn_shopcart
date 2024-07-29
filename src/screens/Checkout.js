import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  reduceCartData,
  removeCartData,
  setCartData,
} from '../redux/slices/CartSlice';
import EmptyView from '../common/EmptyView';
import {useDispatch, useSelector} from 'react-redux';
import CardView from 'react-native-cardview';
import Loader from '../common/Loader';
import CommonButton from '../common/CommonButton';

const Checkout = () => {
  const navigation = useNavigation();
  const cartState = useSelector(state => state?.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(
    'Please Select Address',
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cartState?.cartData);
  }, [cartState]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item?.qty * item?.price;
    });
    return total.toFixed(0);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'Checkout'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />

      <Text style={styles.addedItems}>{'Added Items :'}</Text>
      <View>
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 10}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.productView}
                onPress={() => {
                  navigation.navigate('ProductDetail', {data: item});
                }}>
                <CardView
                  cardElevation={2}
                  cardMaxElevation={1}
                  cornerRadius={8}
                  style={{marginVertical: 5}}>
                  <View style={styles.mainView}>
                    {/* <Image source={{uri: item?.image}} style={styles.itemImg} /> */}
                    {item?.image != null && item?.image != undefined ? (
                      <Image
                        source={{uri: item?.image}}
                        style={styles.itemImg}
                      />
                    ) : (
                      <Image
                        source={require('../assets/default_image.png')}
                        style={styles.itemImg}
                      />
                    )}
                    <View style={styles.TextView}>
                      <Text style={styles.itemTitle} numberOfLines={1}>
                        {
                          //   item.title.length > 35
                          //     ? item.title.substring(0, 35) + '...'
                          //     :
                          item?.title
                        }
                      </Text>
                      <Text style={{color: '#888'}} numberOfLines={2}>
                        {
                          //    item.description.length > 35
                          //     ? item.description.substring(0, 35) + '...'
                          //     :
                          item?.description
                        }
                      </Text>
                      <View style={styles.cartView}>
                        <Text style={styles.itemPrice}>
                          {'$ ' + item?.price}
                        </Text>
                        <TouchableOpacity
                          style={styles.minusCart}
                          onPress={() => {
                            if (item?.qty > 1) {
                              dispatch(reduceCartData(item));
                            } else {
                              dispatch(removeCartData(index));
                            }
                          }}>
                          <Image
                            source={require('../assets/minus.png')}
                            style={{height: 12, width: 12}}
                          />
                        </TouchableOpacity>

                        <Text style={styles.qtyTxt}>{item?.qty}</Text>

                        <TouchableOpacity
                          style={styles.addCart}
                          onPress={() => {
                            dispatch(setCartData(item));
                          }}>
                          <Image
                            source={require('../assets/plus.png')}
                            style={{height: 12, width: 12}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </CardView>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={() => {
            return <EmptyView msgText={'No Items In Cart'} />;
            // return isLoading === false ? (
            //   <EmptyView msgText={'No data found'} />
            // ) : null;
          }}
        />
      </View>

      <View style={styles.priceView}>
        <Text style={styles.addedItems}>Total :</Text>
        <Text style={[styles.addedItems, {marginRight: 10, color: 'green'}]}>
          {'$ ' + getTotal()}
        </Text>
      </View>
      <Text style={styles.addedItems}>Select Payment Mode :</Text>
      <View>
        <TouchableOpacity
          style={styles.payment}
          onPress={() => {
            setSelectedMethod(0);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 0 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 0
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.paymentTxt}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.payment}
          onPress={() => {
            setSelectedMethod(1);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 1 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 1
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.paymentTxt}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.payment}
          onPress={() => {
            setSelectedMethod(2);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 2 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 2
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.paymentTxt}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.payment}
          onPress={() => {
            setSelectedMethod(3);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 3 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 3
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.paymentTxt}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.AddressView}>
        <Text style={styles.addedItems}>Address :</Text>
        <Text
          style={[
            styles.addedItems,
            {color: '#121481', textDecorationLine: 'underline'},
          ]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          Edit Address
        </Text>
      </View>

      <Text
        style={[
          styles.paymentTxt,
          {paddingHorizontal: 10, paddingVertical: 10},
        ]}>
        {selectedAddress}
      </Text>
      <View style={{marginTop: 10}}>
        <CommonButton
          bgColor={'green'}
          title={'Pay & Order'}
          textColor={'#fff'}
        />
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  AddressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  img: {
    width: 25,
    height: 25,
  },
  paymentTxt: {
    fontSize: 17,
    color: '#000',
  },
  payment: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  priceView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.4,
    borderBlockColor: '#B7B7B7',
  },
  addedItems: {
    fontSize: 19,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 20,
    fontWeight: '500',
  },
  minusCart: {
    width: 30,
    height: 30,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 90,
    top: 0,
  },
  qtyTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    right: 60,
    top: 3,
  },
  addCart: {
    width: 30,
    height: 30,
    borderWidth: 0.8,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 0,
  },
  cartView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemPrice: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
    top: 3,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  TextView: {
    gap: 5,
    padding: 10,
    width: '77%',
  },
  itemImg: {
    width: 100,
    height: 110,
  },
  mainView: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
  },
  productView: {
    // width: Dimensions.get("window").width,
    // height:100,
    // marginTop:10,
    // backgroundColor:"#fff"
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
