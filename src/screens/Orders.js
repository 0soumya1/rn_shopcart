import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '../common/Header';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import EmptyView from '../common/EmptyView';
import moment from 'moment';

const Orders = () => {
  const navigation = useNavigation();
  const orderState = useSelector(state => state?.order);
  console.log('11111', orderState);

  const parsedDate = moment(
    orderState?.orderData[0]?.orderDate,
    'D/M/YYYY HH:mm:ss A',
  );

  // Format to dd mm yyyy
  const formattedDate = parsedDate.format('DD MMMM, YYYY');

  // Format to h:mm a
  const formattedTime = parsedDate.format('h:mm A');

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'My Orders'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <FlatList
        data={orderState?.orderData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                backgroundColor: '#fff',
                alignSelf: 'center',
                marginTop: 20,
                padding: 10,
                borderRadius: 10,
                borderWidth: 0.8,
                borderColor: '#7D7D7DF2',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Image
                    source={require('../assets/date.png')}
                    style={{height: 16, width: 16}}
                  />
                  <Text
                    style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                    {formattedDate + '  ' + formattedTime}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', gap: 5}}>
                  {/* <Image
                  source={require('../assets/dollar.png')}
                  style={{height: 16, width: 16, }}
                /> */}
                  <Text
                    style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                    {'Total :'}
                  </Text>
                  <Text
                    style={{color: 'green', fontSize: 14, fontWeight: '500'}}>
                    {item?.amount}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  marginBottom: 10,
                }}>
                <Image
                  source={require('../assets/location.png')}
                  style={{height: 16, width: 16}}
                />
                <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>
                  {item?.address}
                </Text>
              </View>
              <View style={{height: 150}}>
                <FlatList
                  data={item?.items}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      // <TouchableOpacity
                      //   activeOpacity={0.9}
                      //   style={styles.productView}
                      //   onPress={() => {
                      //     navigation.navigate('ProductDetail', {data: item});
                      //   }}>
                      <View style={{paddingHorizontal: 10}}>
                        <CardView
                          cardElevation={2}
                          cardMaxElevation={1}
                          cornerRadius={8}
                          style={{marginVertical: 5}}>
                          <View style={styles.mainView}>
                            <Image
                              source={{uri: item?.image}}
                              style={styles.itemImg}
                            />
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
                              <Text style={styles.itemPrice}>
                                {'$ ' + item?.price}
                              </Text>
                            </View>
                          </View>
                        </CardView>
                      </View>
                      // </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => {
          return <EmptyView msgText={'No data found'} isCheckout={false} />;
          // return isLoading === false ? (
          //   <EmptyView msgText={'No data found'} />
          // ) : null;
        }}
        // keyExtractor={item => item?.id.toString()}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  itemPrice: {
    color: 'green',
    fontSize: 16,
    fontWeight: '500',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  TextView: {
    gap: 5,
    padding: 10,
    width: '75%',
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
