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
import CheckBox from 'react-native-check-box';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [isCheck, setIsCheck] = useState(true);

  const toast = msg => {
    return ToastAndroid.show(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
  };

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setPassword('');
    }, []),
  );

  const login = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);
    if (email === '') {
      setBadEmail('Please Enter Email');
      isValid = false;
      setIsLoading(false);
    } else if (!emailReg.test(email)) {
      setBadEmail('Please Enter Valid Email');
      isValid = false;
      setIsLoading(false);
    } else {
      setBadEmail('');
      isValid = true;
      if (password === '') {
        setBadPassword(true);
        setIsLoading(false);
      } else {
        setBadPassword(false);
        if (isCheck === false) {
          toast("Please agree to ShopCart's Privacy Policy");
          setIsLoading(false);
        } else {
          setTimeout(() => {
            // getData();
            loginUser();
          }, 1000);
        }
      }
    }
  };

  const loginUser = () => {
    setIsLoading(true);
    firestore()
      .collection('Users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        setIsLoading(false);
        if (snapshot.docs[0] != []) {
          if (snapshot.docs[0]?._data?.password === password) {
            goToNextScreen(snapshot.docs[0]?._data);
          }else{
            toast('Wrong Credentials');
          }
        }
        // console.log(snapshot.docs[0]?._data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('NAME', data?.name);
    await AsyncStorage.setItem('EMAIL', data?.email);
    await AsyncStorage.setItem('MOBILE', data?.mobile);
    await AsyncStorage.setItem('USERID', data?.userId);
    navigation.navigate('MainNavigation');
  };

  // const getData = async () => {
  //   const mEmail = await AsyncStorage.getItem('EMAIL');
  //   const mPassword = await AsyncStorage.getItem('PASSWORD');
  //   console.log('login data--------------->', mEmail, mPassword);
  //   if (email === mEmail && password === mPassword) {
  //     navigation.navigate('MainNavigation');
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     toast('Wrong Credentials');
  //   }
  // };

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
              placeholderTextColor={'#888'}
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
          </View>
          {badEmail != '' && <Text style={styles.errorTxt}>{badEmail}</Text>}
          <View style={styles.textInput}>
            <Image
              source={require('../assets/lock.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={[styles.txt, {width: '90%'}]}
              placeholder="Enter Password"
              placeholderTextColor={'#888'}
              secureTextEntry={hidePass}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
              {hidePass ? (
                <Image
                  source={require('../assets/eye_close.png')}
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../assets/eye.png')}
                  style={{width: 20, height: 20}}
                />
              )}
            </TouchableOpacity>
          </View>
          {badPassword === true && (
            <Text style={styles.errorTxt}>Please Enter Password</Text>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingHorizontal: 30,
            marginTop: 25,
          }}>
          <CheckBox
            style={{}}
            onClick={() => setIsCheck(!isCheck)}
            isChecked={isCheck}
            checkedCheckBoxColor={'#121481'}
            uncheckedCheckBoxColor={'#121481'}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 16,
            }}>
            {"By Login, you agree to ShopCart's"}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: '#121481',
                fontSize: 16,
                fontWeight: '500',
              }}>
              {'Privacy Policy'}
            </Text>
          </TouchableOpacity>
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
    marginTop: 20,
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
