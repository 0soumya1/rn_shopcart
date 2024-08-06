import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import Loader from '../../common/Loader';
import EmptyView from '../../common/EmptyView';

const Search = () => {
  const productState = useSelector(state => state?.products);
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(productState?.productData);
  const [searchedList, setSearchedList] = useState(oldData);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // Prevent default behavior (exit app)
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true; // Prevent default behavior (exit app)
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener
  }, [navigation]);

  const filterData = txt => {
    setIsLoading(true);
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchedList(newData);
    setIsLoading(false);
    // console.log('search------->', newData);
  };

  // console.log('1111', JSON.stringify(productState?.products?.productData));
  return (
    <View style={styles.container}>
      <Header
        title={'Search'}
        isCart={false}
        onClickLeftIcon={() => {
          null;
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <View style={styles.searchView}>
        <Image
          source={require('../../assets/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search Items here..."
          style={{width: '90%', color:"#000"}}
          placeholderTextColor={'#888'}
          value={search}
          onChangeText={txt => {
            setSearch(txt);
            filterData(txt);
          }}
        />
      </View>
      <FlatList
        data={searchedList}
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
                  {item?.image != null && item?.image != undefined  ? (
                    <Image source={{uri: item?.image}} style={styles.itemImg} />
                  ) : (
                    <Image
                      source={require('../../assets/default_image.png')}
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
          return <EmptyView msgText={'No data found'} isCheckout={false} />;
          // return isLoading === false ? (
          //   <EmptyView msgText={'No data found'} />
          // ) : null;
        }}
        keyExtractor={item => item.id.toString()}
      />
      <Loader modalVisible={isLoading} />
    </View>
  );
};

export default Search;

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
  searchIcon: {
    height: 20,
    width: 20,
    tintColor: '#000',
  },
  searchView: {
    width: '90%',
    height: 53,
    borderWidth: 0.5,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
    // justifyContent:"space-between",
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
});
