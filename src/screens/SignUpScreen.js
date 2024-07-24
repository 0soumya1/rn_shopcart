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

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [badName, setBadName] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badPhoneNumber, setBadPhoneNumber] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUP = () => {
    setIsLoading(true)
    let isValid = false;
    if (name === '') {
      setBadName(true);
      setIsLoading(false)
    } else {
      setBadName(false);
      if (email === '') {
        setBadEmail(true);
        setIsLoading(false)
      } else {
        setBadEmail(false);
        if (phoneNumber === '') {
          setBadPhoneNumber('Please Enter Phone Number');
          isValid = false;
          setIsLoading(false)
        } else if (phoneNumber != '' && phoneNumber.length < 10) {
          setBadPhoneNumber('Please Enter Valid Phone Number');
          isValid = false;
          setIsLoading(false)
        } else if (phoneNumber != '' && phoneNumber.length > 10) {
          setBadPhoneNumber('Please Enter Valid Phone Number');
          isValid = false;
          setIsLoading(false)
        } else if (phoneNumber != '' && phoneNumber.length == 10) {
          setBadPhoneNumber('');
          isValid = true;
          if (password === '') {
            setBadPassword(true);
            setIsLoading(false)
          } else {
            setBadPassword(false);
            if (confirmPassword === '') {
              setBadConfirmPassword(true);
              setIsLoading(false)
            } else if (confirmPassword != password) {
              setBadConfirmPassword(true);
              setIsLoading(false)
            } else {
              setBadConfirmPassword(false);
              // setIsLoading(false)
              setTimeout(()=>{
                saveData();
              }, 1000)
            }
          }
        }
      }
    }
  };

  const saveData = async () => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('MOBILE', phoneNumber);
    await AsyncStorage.setItem('PASSWORD', password);
    console.log('data saved----------->', name, email, phoneNumber, password);
    // setIsLoading(false)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/shop_cart_logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.loginText}>Create New Account</Text>
        <View
          style={{
            marginTop: 10,
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
            placeHolder={'Enter Full Name'}
            icon={require('../assets/user.png')}
            placeholderTextColor={'#888'}
            value={name}
            onChangeText={txt => setName(txt)}
          />
          {badName === true && (
            <Text style={styles.errorTxt}>Please Enter Full Name</Text>
          )}
          <CustomTextInput
            placeHolder={'Enter Email Id'}
            icon={require('../assets/email.png')}
            placeholderTextColor={'#888'}
            value={email}
            onChangeText={txt => setEmail(txt)}
          />
          {badEmail === true && (
            <Text style={styles.errorTxt}>Please Enter Email Id</Text>
          )}
          <CustomTextInput
            placeHolder={'Enter Phone Number'}
            icon={require('../assets/phone.png')}
            placeholderTextColor={'#888'}
            keyboardType={'number-pad'}
            value={phoneNumber}
            onChangeText={txt => setPhoneNumber(txt)}
          />
          {/* {badPhoneNumber === true && (
            <Text style={{color: 'red', marginTop: 5, marginLeft: 35}}>
              Please Enter Phone Number
            </Text>
          )} */}
          {badPhoneNumber != '' && (
            <Text style={styles.errorTxt}>{badPhoneNumber}</Text>
          )}
          <CustomTextInput
            placeHolder={'Enter Password'}
            icon={require('../assets/lock.png')}
            placeholderTextColor={'#888'}
            // type={'password'}
            value={password}
            onChangeText={txt => setPassword(txt)}
          />
          {badPassword === true && (
            <Text style={styles.errorTxt}>Please Enter Password</Text>
          )}
          <CustomTextInput
            placeHolder={'Enter Confirm Password'}
            icon={require('../assets/lock.png')}
            placeholderTextColor={'#888'}
            // type={'password'}
            value={confirmPassword}
            onChangeText={txt => setConfirmPassword(txt)}
          />
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
              navigation.goBack();
            }}>
            <Text style={styles.loginTxt}>{'Login'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader modalVisible={isLoading} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
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
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
