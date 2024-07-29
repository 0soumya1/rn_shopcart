import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import CardView from 'react-native-cardview';
import Loader from '../common/Loader';
import {useNavigation} from '@react-navigation/native';
import {
  reduceCartData,
  removeCartData,
  setCartData,
} from '../redux/slices/CartSlice';
import EmptyView from '../common/EmptyView';
import CheckoutLayout from '../common/CheckoutLayout';

// const isValidUrl = url => {
//   // Simple check to see if the URL is valid
//   return url && typeof url === 'string' && url.startsWith('https');
// };

const Cart = () => {
  const cartState = useSelector(state => state?.cart);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cartState?.cartData);
  }, [cartState]);
  // console.log(JSON.stringify(cartState) + '---->' + cartState?.cartData?.length)

  // const defaultImage = require('../assets/default_image.png');

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
        title={'My Cart'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <FlatList
        data={cartItems}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
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
                    <Image source={{uri: item?.image}} style={styles.itemImg} />
                  ) : (
                    <Image
                      source={require('../assets/default_image.png')}
                      style={styles.itemImg}
                    />
                  )}
                  {/* <Image
                    source={
                      isValidUrl(item?.image)
                        ? {uri: item?.image}
                        : defaultImage
                    }
                    style={styles.itemImg}
                  /> */}
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
                      <Text style={styles.itemPrice}>{'$ ' + item?.price}</Text>
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
      {cartItems?.length > 0 && (
        <CheckoutLayout items={cartItems?.length} total={getTotal()} />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
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
    backgroundColor:"#fff"
  },
});
