import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import CardView from 'react-native-cardview';
import Loader from '../../common/Loader';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)
        setIsLoading(false);
    }) .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../assets/menu.png')}
        rightIcon={require('../../assets/cart.png')}
        title={'Explore'}
        onClickLeftIcon={() => {
          navigation.openDrawer();
        }}
      />
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity activeOpacity={0.8} style={styles.productView}>
              <CardView
                cardElevation={2}
                cardMaxElevation={1}
                cornerRadius={8}
                style={{marginVertical: 5}}>
                <View style={styles.mainView}>
                  <Image source={{uri: item.image}} style={styles.itemImg} />
                  <View style={styles.TextView}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                      {
                        //   item.title.length > 35
                        //     ? item.title.substring(0, 35) + '...'
                        //     :
                        item.title
                      }
                    </Text>
                    <Text style={{}} numberOfLines={2}>
                      {
                        //    item.description.length > 35
                        //     ? item.description.substring(0, 35) + '...'
                        //     :
                        item.description
                      }
                    </Text>
                    <Text style={styles.itemPrice}>{'$ ' + item.price}</Text>
                  </View>
                </View>
              </CardView>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
      <Loader modalVisible={isLoading} />

    </View>
  );
};

export default Home;

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
  },
});
