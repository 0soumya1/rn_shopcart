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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, [])
  );

  const login = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);
    if (email === '') {
      setBadEmail("Please Enter Email");
      isValid = false;
      setIsLoading(false);
    } else if(!emailReg.test(email)) {
      setBadEmail("Please Enter Valid Email");
      isValid = false;
      setIsLoading(false);
    }else{
      setBadEmail("")
      isValid = true;
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
          {/* <CustomTextInput
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
          )} */}
            <View style={styles.textInput}>
            <Image
              source={require('../assets/email.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Email"
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
          </View>
          {badEmail != '' && (
            <Text style={styles.errorTxt}>{badEmail}</Text>
          )}
            <View style={styles.textInput}>
            <Image
              source={require('../assets/lock.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Password"
              // secureTextEntry={password}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
          </View>
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
  txt: {
    paddingLeft: 10,
    color: '#000',
    width: '98%',
    fontSize: 15,
  },
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
    height: 50,
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: '#121481',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom: 30,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
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
