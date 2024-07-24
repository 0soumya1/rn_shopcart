import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('niru@gmail.com');
  const [password, setPassword] = useState('123');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     setEmail('');
  //     setPassword('');
  //   }, [])
  // );

  const login = () => {
    setIsLoading(true);
    if (email === '') {
      setBadEmail(true);
      setIsLoading(false);
    } else {
      setBadEmail(false);
      if (password === '') {
        setBadPassword(true);
        setIsLoading(false);
      } else {
        setBadPassword(false);
        setTimeout(() => {
          getData();
        }, 1000);
      }
    }
  };

  const getData = async () => {
    const mEmail = await AsyncStorage.getItem('EMAIL');
    const mPassword = await AsyncStorage.getItem('PASSWORD');
    console.log('login data--------------->', mEmail, mPassword);
    if (email === mEmail && password === mPassword) {
      navigation.navigate('MainNavigation');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast('Wrong Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/shop_cart_logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.loginText}>Login</Text>
        <View
          style={{
            marginTop: 20,
          }}>
          {/* <TextInput
          style={styles.textInput}
          placeholder="Enter Email Id"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          placeholderTextColor="#888"
        /> */}
          <CustomTextInput
            placeHolder={'Enter Email Id'}
            icon={require('../assets/email.png')}
            // placeholderTextColor={'#888'}
            value={email}
            onChangeText={txt => setEmail(txt)}
          />
          {badEmail === true && (
            <Text style={styles.errorTxt}>Please Enter Email Id</Text>
          )}
          <CustomTextInput
            placeHolder={'Enter Password'}
            icon={require('../assets/lock.png')}
            // placeholderTextColor={'#888'}
            type={'password'}
            value={password}
            onChangeText={txt => setPassword(txt)}
          />
          {badPassword === true && (
            <Text style={styles.errorTxt}>Please Enter Password</Text>
          )}
        </View>

        <CommonButton
          title={'Login'}
          bgColor={'#121481'}
          textColor={'#ffffff'}
          onPress={() => {
            login();
          }}
        />

        <View style={styles.accountView}>
          <Text style={styles.accountTxt}>{'Create New Account ?  '}</Text>
          <TouchableOpacity
            style={{marginBottom: 40}}
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.signupTxt}>{'SignUp'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader modalVisible={isLoading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  signupTxt: {
    color: '#121481',
    fontSize: 18,
    fontWeight: '600',
  },
  accountTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  accountView: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  errorTxt: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  },
  textInput: {
    width: '85%',
    height: 55,
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: '#121481',
    alignSelf: 'center',
    paddingLeft: 20,
    marginBottom: 30,
    color: '#000',
  },
  loginText: {
    // color:"#000",
    color: '#121481',
    // color:"#FDA403",
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
