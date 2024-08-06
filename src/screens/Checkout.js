import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  emptyCart,
  reduceCartData,
  removeCartData,
  setCartData,
} from '../redux/slices/CartSlice';
import EmptyView from '../common/EmptyView';
import {useDispatch, useSelector} from 'react-redux';
import CardView from 'react-native-cardview';
import Loader from '../common/Loader';
import CommonButton from '../common/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {setOrderData} from '../redux/slices/OrderSlice';

const Checkout = () => {
  const navigation = useNavigation();
  const cartState = useSelector(state => state?.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');

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

  useEffect(() => {
    getSelectedAddress();
    getProfile();
  }, [isFocused]);

  const getSelectedAddress = async () => {
    setSelectedAddress(await AsyncStorage.getItem('My_Address'));
  };

  const getProfile = async () => {
    setName(await AsyncStorage.getItem('NAME'));
  };

  const orderPlace = paymentId => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    let ampm = '';
    if (hours > 12) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    const data = {
      items: cartItems,
      amount: '$' + getTotal(),
      address: selectedAddress,
      paymentId: paymentId,
      paymentStatus: selectedMethod == 3 ? 'Pending' : 'Success',
      orderDate:
        day +
        '/' +
        month +
        '/' +
        year +
        ' ' +
        hours +
        ': ' +
        minutes +
        ': ' +
        seconds +
        ' ' +
        ampm,
    };
    dispatch(setOrderData(data));
    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };

  const payNow = () => {
    if (
      cartItems != '' &&
      cartItems != null &&
      selectedAddress != null &&
      selectedAddress != ''
    ) {
      var options = {
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_WAYMtWq1G07zQr', // Your api key
        amount: getTotal() * 1000,
        name: {name},
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Razorpay Software',
        },
        theme: {color: '#121481'},
      };
      RazorpayCheckout.open(options)
        .then(data => {
          // handle success
          // alert(`Success: ${data.razorpay_payment_id}`);
          orderPlace(data.razorpay_payment_id);
        })
        .catch(error => {
          // handle failure
          // alert(`Error: ${error.code} | ${error.description}`);

          Alert.alert(
            "Order Couldn't be placed !!!",
            'Try with : TEST CARD NUMBER = 4111 1111 1111 1111',
          );
        });
    } else {
      Alert.alert('Please Add Items and Select a Delivery Address');
    }
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

      <Text style={[styles.addedItems, {marginTop: 10}]}>
        {'Added Items :'}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 5}}
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
            return <EmptyView msgText={'No Items Added'} isCheckout={true} />;
            // return isLoading === false ? (
            //   <EmptyView msgText={'No data found'} />
            // ) : null;
          }}
        />
      </ScrollView>

      <View style={{height: 470}}>
        <View style={styles.priceView}>
          <View style={{}}>
            <Text
              style={{
                color: '#000',
                fontSize: 19,
                fontWeight: '500',
              }}>
              {'Items : ' + cartItems?.length}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.addedItems,
                {marginTop: 10, marginBottom: 10, left: 10},
              ]}>
              Total :
            </Text>
            <Text style={[styles.addedItems, {marginTop: 10, color: 'green'}]}>
              {'$ ' + getTotal()}
            </Text>
          </View>
        </View>
        <Text style={[styles.addedItems, {marginTop: 10}]}>
          Select Payment Mode :
        </Text>
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
          <Text style={styles.addedItems}>Delivery Address :</Text>
          <Text
            style={[
              styles.addedItems,
              {color: '#121481', textDecorationLine: 'underline'},
            ]}
            onPress={() => {
              navigation.navigate('Addresses');
            }}>
            Add Address
          </Text>
        </View>

        <Text
          style={[
            styles.paymentTxt,
            {paddingHorizontal: 10, paddingVertical: 10},
          ]}
          numberOfLines={4}>
          {selectedAddress != '' && selectedAddress != null
            ? selectedAddress
            : 'Please Add Address'}
        </Text>
        <View style={{}}>
          <CommonButton
            bgColor={'green'}
            title={'Pay & Order'}
            textColor={'#fff'}
            onPress={() => {
              payNow();
            }}
          />
        </View>
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
    marginTop: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
  },
  priceView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexDirection: 'row',
    // height: 100,
    borderBottomWidth: 0.4,
    borderBottomColor: '#B7B7B7',
    paddingHorizontal: 10,
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
