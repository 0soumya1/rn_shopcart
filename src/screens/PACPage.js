import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';

const PACPage = () => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor:"#fff"}}>
     <Header
        leftIcon={require('../assets/back.png')}
        title={'Privacy Policy'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <WebView source={{ uri: "https://www.freeprivacypolicy.com/live/209eb386-cabe-4bae-9bea-394f19f7786a" }} style={{ flex: 1 }} />
  </View>
  )
}

export default PACPage