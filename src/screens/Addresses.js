import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slices/AddressSlice';
import EmptyView from '../common/EmptyView';

const Addresses = () => {
  const navigation = useNavigation();
  const addressState = useSelector(state => state?.address);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('addressState--------->', addressState);
  }, [isFocused]);

  const defaultAddress = async item => {
    await AsyncStorage.setItem(
      'My_Address',
      '' +
        item?.location +
        ', ' +
        item?.city +
        ', ' +
        item?.state +
        ', Pincode : ' +
        item?.pincode +
        ', Place : ' +
        item?.type,
    );
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'My Addresses'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={addressState?.addressData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{paddingHorizontal: 10}}
              onPress={() => {
                defaultAddress(item);
              }}>
              <CardView
                cardElevation={2}
                cardMaxElevation={1}
                cornerRadius={8}
                style={{marginVertical: 10}}>
                <View style={styles.mainView}>
                  <Text
                    style={styles.txt}>{`Location : ${item?.location}`}</Text>
                  <Text style={styles.txt}>{`City : ${item?.city}`}</Text>
                  <Text style={styles.txt}>{`State : ${item?.state}`}</Text>
                  <Text style={styles.txt}>{`Pincode : ${item?.pincode}`}</Text>
                  {/* {item?.default == true ? ( */}
                  {/* <View style={{position: 'absolute', top: 10, right: 10}}>
                    <Image
                      source={require('../assets/success.png')}
                      style={{
                        height: 24,
                        width: 24,
                      }}
                    />
                  </View> */}
                  {/* ):(
                    null
                  )} */}
                  <Text style={styles.type}>{item?.type}</Text>
                  <View style={styles.editView}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddAddress', {
                          type: 'edit',
                          data: item,
                        });
                      }}>
                      <Image
                        source={require('../assets/edit.png')}
                        style={{height: 23, width: 23, tintColor: '#121481'}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(deleteAddress(item?.id));
                      }}>
                      <Image
                        source={require('../assets/delete.png')}
                        style={{height: 25, width: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </CardView>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return <EmptyView msgText={'No data found'} isCheckout={false} />;
          // return isLoading === false ? (
          //   <EmptyView msgText={'No data found'} />
          // ) : null;
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addView}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
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
  editView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    gap: 15,
  },
  type: {
    color: '#000',
    fontSize: 15,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FDA403',
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    color: '#000',
    fontSize: 16,
    width: '80%',
  },
  mainView: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
    gap: 5,
  },
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
