import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [badName, setBadName] = useState(false);
  const [badEmail, setBadEmail] = useState('');
  const [badPhoneNumber, setBadPhoneNumber] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUP = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);
    let isValid = false;
    if (name === '') {
      setBadName(true);
      setIsLoading(false);
    } else {
      setBadName(false);
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
        if (phoneNumber === '') {
          setBadPhoneNumber('Please Enter Phone Number');
          isValid = false;
          setIsLoading(false);
        } else if (phoneNumber != '' && phoneNumber.length < 10) {
          setBadPhoneNumber('Please Enter Valid Phone Number');
          isValid = false;
          setIsLoading(false);
        } else if (phoneNumber != '' && phoneNumber.length > 10) {
          setBadPhoneNumber('Please Enter Valid Phone Number');
          isValid = false;
          setIsLoading(false);
        } else if (phoneNumber != '' && phoneNumber.length == 10) {
          setBadPhoneNumber('');
          isValid = true;
          if (password === '') {
            setBadPassword(true);
            setIsLoading(false);
          } else {
            setBadPassword(false);
            if (confirmPassword === '') {
              setBadConfirmPassword(true);
              setIsLoading(false);
            } else if (confirmPassword != password) {
              setBadConfirmPassword(true);
              setIsLoading(false);
            } else {
              setBadConfirmPassword(false);
              // setIsLoading(false)
              setTimeout(() => {
                // saveData();
                addUser();
              }, 1000);
            }
          }
        }
      }
    }
  };

  const addUser = () => {
    firestore()
      .collection('Users')
      .add({
        name: name,
        email: email,
        mobile: phoneNumber,
        password: password,
      })
      .then(() => {
        console.log('User added!');
        navigation.navigate('LoginScreen');
      });
  };

  // const saveData = async () => {
  //   await AsyncStorage.setItem('NAME', name);
  //   await AsyncStorage.setItem('EMAIL', email);
  //   await AsyncStorage.setItem('MOBILE', phoneNumber);
  //   await AsyncStorage.setItem('PASSWORD', password);
  //   console.log('data saved----------->', name, email, phoneNumber, password);
  //   // setIsLoading(false)
  //   navigation.navigate('LoginScreen');
  // };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/shop_cart_logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.loginText}>Create New Account</Text>

        <View style={{marginTop: 10}}>
          <View style={styles.textInput}>
            <Image
              source={require('../assets/user.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Full Name"
              placeholderTextColor={'#888'}
              value={name}
              onChangeText={txt => setName(txt)}
            />
          </View>
          {badName === true && (
            <Text style={styles.errorTxt}>Please Enter Full Name</Text>
          )}
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
              source={require('../assets/phone.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Phone Number"
              placeholderTextColor={'#888'}
              keyboardType={'number-pad'}
              value={phoneNumber}
              onChangeText={txt => setPhoneNumber(txt)}
            />
          </View>
          {badPhoneNumber != '' && (
            <Text style={styles.errorTxt}>{badPhoneNumber}</Text>
          )}
          <View style={styles.textInput}>
            <Image
              source={require('../assets/lock.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Password"
              placeholderTextColor={'#888'}
              // secureTextEntry={password}
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
          </View>
          {badPassword === true && (
            <Text style={styles.errorTxt}>Please Enter Password</Text>
          )}
          <View style={styles.textInput}>
            <Image
              source={require('../assets/lock.png')}
              style={{width: 18, height: 18}}
            />
            <TextInput
              style={styles.txt}
              placeholder="Enter Confirm Password"
              placeholderTextColor={'#888'}
              value={confirmPassword}
              onChangeText={txt => setConfirmPassword(txt)}
            />
          </View>
          {badConfirmPassword === true && (
            <Text style={styles.errorTxt}>Please Enter Confirm Password</Text>
          )}
        </View>

        <CommonButton
          title={'SignUp'}
          bgColor={'#121481'}
          textColor={'#ffffff'}
          onPress={() => {
            signUP();
          }}
        />

        <View style={styles.bottomView}>
          <Text style={styles.accountTxt}>{'Already have an Account ?  '}</Text>
          <TouchableOpacity
            style={{marginBottom: 40}}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.loginTxt}>{'Login'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <Loader modalVisible={isLoading} /> */}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  txt: {
    paddingLeft: 10,
    color: '#000',
    width: '98%',
    fontSize: 15,
  },
  loginTxt: {
    color: '#121481',
    fontSize: 18,
    fontWeight: '600',
  },
  accountTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomView: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  errorTxt: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  },
  // textInput: {
  //   width: '85%',
  //   height: 55,
  //   borderWidth: 0.8,
  //   borderRadius: 10,
  //   borderColor: '#121481',
  //   alignSelf: 'center',
  //   paddingLeft: 20,
  //   marginBottom: 30,
  //   color: '#000',
  // },
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
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
