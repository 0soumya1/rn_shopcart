import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import CardView from 'react-native-cardview';
import Loader from '../../common/Loader';
import {useNavigation} from '@react-navigation/native';
import EmptyView from '../../common/EmptyView';

const WishList = () => {
  const wishListState = useSelector(state => state?.wishlist);
  const [wishListItems, setWishListItems] = useState(
    wishListState?.wishListData,
  );
  const navigation = useNavigation();
  // console.log(
  //   JSON.stringify(wishListState) + '---->' +wishListState?.wishListData?.length);
  return (
    <View style={styles.container}>
      <Header
        title={'My WishList'}
        isCart={false}
        onClickLeftIcon={() => {
          null;
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <FlatList
        data={wishListItems}
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
                  <Image source={{uri: item?.image}} style={styles.itemImg} />
                  <View style={styles.TextView}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {
                        //   item.title.length > 35
                        //     ? item.title.substring(0, 35) + '...'
                        //     :
                        item?.title
                      }
                    </Text>
                    <Text style={{color:"#888"}} numberOfLines={2}>
                      {
                        //    item.description.length > 35
                        //     ? item.description.substring(0, 35) + '...'
                        //     :
                        item?.description
                      }
                    </Text>
                    <Text style={styles.itemPrice}>{'$ ' + item?.price}</Text>
                  </View>
                </View>
              </CardView>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={() => {
          return(
            <EmptyView msgText={'No data found'}/>
          )
          // return isLoading === false ? (
          //   <EmptyView msgText={'No data found'} />
          // ) : null;
        }}
      />
    </View>
  );
};

export default WishList;

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
