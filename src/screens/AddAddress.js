import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonButton from '../common/CommonButton';
import {useDispatch} from 'react-redux';
import {setAddressData, updateAddress} from '../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';
import Loader from '../common/Loader';

const AddAddress = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState(
    route?.params?.type == 'edit' ? route?.params?.data?.location : '',
  );
  const [city, setCity] = useState(
    route?.params?.type == 'edit' ? route?.params?.data?.city : '',
  );
  const [state, setState] = useState(
    route?.params?.type == 'edit' ? route?.params?.data?.state : '',
  );
  const [pinCode, setPinCode] = useState(
    route?.params?.type == 'edit' ? route?.params?.data?.pincode : '',
  );
  const [selectedMethod, setSelectedMethod] = useState(
    route?.params?.type == 'edit'
      ? route?.params?.data?.type == 'Home'
        ? 0
        : 1
      : 0,
  );

  const [locationErr, setLocationErr] = useState('');
  const [cityErr, setCityErr] = useState('');
  const [stateErr, setStateErr] = useState('');
  const [pinCodeErr, setPinCodeErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveAddress = () => {
    setIsLoading(true)
    if (location == '') {
      setLocationErr('Please enter location');
      setIsLoading(false)
    } else {
      setLocationErr('');
      setIsLoading(false)
    }

    if (city == '') {
      setCityErr('Please enter city');
      setIsLoading(false)
    } else {
      setCityErr('');
      setIsLoading(false)
    }

    if (state == '') {
      setStateErr('Please enter state');
      setIsLoading(false)
    } else {
      setStateErr('');
      setIsLoading(false)
    }

    if (pinCode == '') {
      setPinCodeErr('Please enter pincode');
      setIsLoading(false)
    } else if (pinCode != '' && pinCode.length < 6) {
      setPinCodeErr('Please enter valid pincode');
      setIsLoading(false)
    } else if (pinCode != '' && pinCode.length > 6) {
      setPinCodeErr('Please enter valid pincode');
      setIsLoading(false)
    } else if (pinCode != '' && pinCode.length == 6) {
      setPinCodeErr('');
      setIsLoading(false)
    }

    if (
      location != '' &&
      city != '' &&
      state != '' &&
      pinCode != '' &&
      pinCode.length == 6 &&
      route?.params?.type == 'edit'
    ) {
      setIsLoading(false)
      dispatch(
        updateAddress({
          location: location,
          state: state,
          city: city,
          pincode: pinCode,
          type: selectedMethod == 0 ? 'Home' : 'Work',
          // default: false,
          id: route?.params?.data?.id,
        }),
        navigation.goBack(),
      );
    } else if (
      location != '' &&
      city != '' &&
      state != '' &&
      pinCode != '' &&
      pinCode.length == 6
    ) {
      setIsLoading(false)
      dispatch(
        setAddressData({
          location: location,
          state: state,
          city: city,
          pincode: pinCode,
          type: selectedMethod == 0 ? 'Home' : 'Work',
          // default: false,
          id: uuid.v4(),
        }),
        navigation.goBack(),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={
          route?.params?.type == 'edit' ? 'Edit Address' : 'Add New Address'
        }
        isCart={false}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter Location"
        placeholderTextColor={'#888'}
        value={location}
        onChangeText={txt => setLocation(txt)}
      />
      {locationErr != '' && <Text style={styles.errorTxt}>{locationErr}</Text>}
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter City"
        placeholderTextColor={'#888'}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      {cityErr != '' && <Text style={styles.errorTxt}>{cityErr}</Text>}
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter State"
        placeholderTextColor={'#888'}
        value={state}
        onChangeText={txt => setState(txt)}
      />
      {stateErr != '' && <Text style={styles.errorTxt}>{stateErr}</Text>}
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter Pincode"
        placeholderTextColor={'#888'}
        keyboardType="number-pad"
        value={pinCode}
        onChangeText={txt => setPinCode(txt)}
      />
      {pinCodeErr != '' && <Text style={styles.errorTxt}>{pinCodeErr}</Text>}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
        }}>
        <TouchableOpacity
          style={styles.modeView}
          onPress={() => {
            setSelectedMethod(0);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 0 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 0
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.ModeTxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modeView}
          onPress={() => {
            setSelectedMethod(1);
          }}>
          <Image
            style={[
              styles.img,
              {tintColor: selectedMethod == 1 ? '#121481' : '#000'},
            ]}
            source={
              selectedMethod == 1
                ? require('../assets/radio-fill.png')
                : require('../assets/radio-button.png')
            }
          />
          <Text style={styles.ModeTxt}>Work</Text>
        </TouchableOpacity>
      </View>
      <CommonButton
        bgColor={'#121481'}
        title={'Save Address'}
        textColor={'#fff'}
        onPress={() => {
          handleSaveAddress();
          // if (route?.params?.type == 'edit') {
          //   dispatch(
          //     updateAddress({
          //       location: location,
          //       state: state,
          //       city: city,
          //       pincode: pinCode,
          //       type: selectedMethod == 0 ? 'Home' : 'Work',
          //       id: route?.params?.data?.id,
          //     }),
          //     navigation.goBack(),
          //   );
          // } else {
          //   dispatch(
          //     setAddressData({
          //       location: location,
          //       state: state,
          //       city: city,
          //       pincode: pinCode,
          //       type: selectedMethod == 0 ? 'Home' : 'Work',
          //       id: uuid.v4(),
          //     }),
          //     navigation.goBack(),
          //   );
          // }
        }}
      />
      <Loader modalVisible={isLoading}/>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  errorTxt: {
    color: 'red',
    marginTop: 5,
    marginLeft: 35,
  },
  modeView: {
    width: '30%',
    height: 45,
    borderWidth: 0.8,
    borderColor: '#121481',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  img: {
    width: 23,
    height: 23,
  },
  ModeTxt: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
