import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonButton from '../common/CommonButton';
import {useDispatch} from 'react-redux';
import {setWishListData} from '../redux/slices/WishlistSlice';
import {
  reduceCartData,
  removeCartData,
  setCartData,
} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const addToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    dispatch(setWishListData(route?.params?.data));
  };

  const checkUserStatusForWishList = async () => {
    let userId = await AsyncStorage.getItem('USERID');
    if (userId != null) {
      setModalVisible(false)
      addToWishlist();
    } else {
      setModalVisible(true);
    }
  }

  const addToCart = () => {
    dispatch(
      setCartData({
        category: route?.params?.data?.category,
        description: route?.params?.data?.description,
        id: route?.params?.data?.id,
        image: route?.params?.data?.image,
        price: route?.params?.data?.price,
        qty: qty,
        rating: route?.params?.data?.rating,
        title: route?.params?.data?.title,
      }),
    );
  };

  const checkUserStatusForCart = async () => {
    let userId = await AsyncStorage.getItem('USERID');
    if (userId != null) {
      setModalVisible(false)
      addToCart();
    } else {
      setModalVisible(true);
    }
    // let isUserLoggedIn = false;
    // const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
    // if (status === null) {
    //   isUserLoggedIn = false;
    // } else {
    //   isUserLoggedIn = true;
    // }
    // return isUserLoggedIn;
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        rightIcon={require('../assets/cart.png')}
        title={'Product Detail'}
        isCart={true}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          navigation.navigate('Cart');
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 12}}>
          <Image
            source={{uri: route?.params?.data?.image}}
            style={styles.itemImg}
          />
          <Text style={styles.itemTitle} numberOfLines={2}>
            {route?.params?.data?.title}
          </Text>
          <Text style={styles.itemDes}>{route?.params?.data?.description}</Text>

          <View style={styles.priceView}>
            <Text style={styles.priceTxt}>{'Price : '}</Text>
            <Text style={[styles.priceTxt, {color: 'green'}]}>
              {'$ ' + route?.params?.data?.price}
            </Text>
            <TouchableOpacity
              style={styles.minusCart}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Image
                source={require('../assets/minus.png')}
                style={{height: 12, width: 12}}
              />
            </TouchableOpacity>

            <Text style={styles.qtyTxt}>{qty}</Text>

            <TouchableOpacity
              style={styles.addCart}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Image
                source={require('../assets/plus.png')}
                style={{height: 12, width: 12}}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.wishListView}
            onPress={() => {
              checkUserStatusForWishList();
              // toggleWishlist();
              // if (!checkUserStatus()) {
              //   dispatch(setWishListData(route?.params?.data));
              // } else {
              //   setModalVisible(true);
              // }
            }}>
            <Image
              source={
                isInWishlist
                  ? require('../assets/heart_fill.png')
                  : require('../assets/heart.png')
              }
              style={{
                height: 28,
                width: 28,
                tintColor: isInWishlist === true ? '#121481' : '#000',
              }}
            />
          </TouchableOpacity>

          <CommonButton
            title={'Add to Cart'}
            bgColor={'#121481'}
            textColor={'#ffffff'}
            onPress={() => {
              checkUserStatusForCart()
              // if (!checkUserStatus()) {
              //   dispatch(
              //     setCartData({
              //       category: route?.params?.data?.category,
              //       description: route?.params?.data?.description,
              //       id: route?.params?.data?.id,
              //       image: route?.params?.data?.image,
              //       price: route?.params?.data?.price,
              //       qty: qty,
              //       rating: route?.params?.data?.rating,
              //       title: route?.params?.data?.title,
              //     }),
              //   );
              // } else {
              //   setModalVisible(true);
              // }
              // dispatch(setCartData(route?.params?.data));
            }}
          />
        </View>
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onClickLoginSignUp={() => {
          setModalVisible(false);
          navigation.navigate('LoginScreen');
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default ProductDetail;

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
    right: 110,
    top: 0,
  },
  qtyTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    right: 80,
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
    right: 30,
    top: 0,
  },
  wishListView: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#E2DFDF',
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceTxt: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    top: 4,
  },
  priceView: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemDes: {
    fontSize: 16,
    color: '#00000080',
    lineHeight: 22,
  },
  itemTitle: {
    fontSize: 19,
    color: '#000',
    fontWeight: '500',
    paddingVertical: 10,
  },
  itemImg: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
