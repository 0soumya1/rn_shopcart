import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
  isHideBackButton,
  isHideRightButton,
}) => {
  const cartState = useSelector(state => state?.cart);
  // console.log(JSON.stringify(cartState) + cartState?.cartData?.length);
  return (
    <View style={styles.header}>
      {/* {isHideBackButton == true ? null : ( */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            onClickLeftIcon();
          }}>
          <Image source={leftIcon} style={styles.icon} />
        </TouchableOpacity>
      {/* )} */}

      <Text style={styles.title}>{title}</Text>

      {/* {isHideRightButton == true ? null : ( */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickRightIcon();
        }}>
        <Image source={rightIcon} style={styles.icon} />

        {isCart === true && cartState?.cartData?.length != '' && (
          <View style={styles.cartCount}>
            <Text style={styles.cartTxt}>{cartState?.cartData?.length}</Text>
          </View>
        )}
      </TouchableOpacity>
       {/* )} */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  cartTxt: {
    fontSize: 14,
    color: '#000',
  },
  cartCount: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: width,
    height: 60,
    // backgroundColor: '#83B4FF',
    backgroundColor: '#121481',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign:"center"
  },
});
