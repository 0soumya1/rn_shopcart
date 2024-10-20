import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonButton from '../common/CommonButton';
import {useDispatch} from 'react-redux';
import { updateProfile } from '../redux/slices/EditProfileSlice';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const isFocused = useIsFocused();

  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phoneNumberErr, setPhoneNumberErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, [isFocused]);

  const getProfile = async () => {
    setUserId(await AsyncStorage.getItem('USERID'));
    setName(await AsyncStorage.getItem('NAME'));
    setEmail(await AsyncStorage.getItem('EMAIL'));
    setPhoneNumber(await AsyncStorage.getItem('MOBILE'));
  };

  const handleSaveProfile = () => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsLoading(true);
    if (name == '') {
      setNameErr('Please enter name');
      setIsLoading(false);
    } else {
      setNameErr('');
      setIsLoading(false);
    }

    if (email == '') {
      setEmailErr('Please enter email');
      setIsLoading(false);
    } else if (!emailReg.test(email)) {
      setEmailErr('Please Enter Valid Email');
      setIsLoading(false);
    } else {
      setEmailErr('');
      setIsLoading(false);
    }

    if (phoneNumber === '') {
        setPhoneNumberErr('Please Enter Phone Number');
        setIsLoading(false);
      } else if (phoneNumber != '' && phoneNumber.length < 10) {
        setPhoneNumberErr('Please Enter Valid Phone Number');
        setIsLoading(false);
      } else if (phoneNumber != '' && phoneNumber.length > 10) {
        setPhoneNumberErr('Please Enter Valid Phone Number');
        setIsLoading(false);
      } else if (phoneNumber != '' && phoneNumber.length == 10) {
        setPhoneNumberErr('');
        setIsLoading(false);
      }

    if (
      name != '' &&
      email != '' &&
      phoneNumber != '' 
    ) {
      setIsLoading(false);
      dispatch(
        updateProfile({
          name: name,
          email: email,
          phoneNumber: phoneNumber
          // default: false,
        //   id: route?.params?.data?.id,
        }),
        navigation.goBack(),
      );
    } 
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'Edit Profile'}
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/profileimage.png')}
          style={styles.ImgView}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Name"
          placeholderTextColor={'#888'}
          value={name}
          onChangeText={txt => setName(txt)}
        />
        {nameErr != '' && <Text style={styles.errorTxt}>{nameErr}</Text>}
        <TextInput
          style={[styles.textInput, {marginTop: 20}]}
          placeholder="Enter Email"
          placeholderTextColor={'#888'}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        {emailErr != '' && <Text style={styles.errorTxt}>{emailErr}</Text>}
        <TextInput
          style={[styles.textInput, {marginTop: 20}]}
          placeholder="Enter Phone Number"
          placeholderTextColor={'#888'}
          value={phoneNumber}
          onChangeText={txt => setPhoneNumber(txt)}
        />
        {phoneNumberErr != '' && (
          <Text style={styles.errorTxt}>{phoneNumberErr}</Text>
        )}

        <View style={{marginBottom: 40}}>
          <CommonButton
            bgColor={'#121481'}
            title={'Save Profile'}
            textColor={'#fff'}
            onPress={() => {
                handleSaveProfile();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
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
    paddingRight: 15,
    marginTop: 50,
    color: '#000',
    fontSize: 16,
  },
  ImgView: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
