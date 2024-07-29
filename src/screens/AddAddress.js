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
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../common/CommonButton';

const AddAddress = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../assets/back.png')}
        title={'Add New Address'}
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
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter City"
        placeholderTextColor={'#888'}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter State"
        placeholderTextColor={'#888'}
        value={state}
        onChangeText={txt => setState(txt)}
      />
      <TextInput
        style={[styles.textInput, {marginTop: 20}]}
        placeholder="Enter Pincode"
        placeholderTextColor={'#888'}
        keyboardType="number-pad"
        value={pinCode}
        onChangeText={txt => setPinCode(txt)}
      />
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
          <Text style={styles.ModeTxt}>Office</Text>
        </TouchableOpacity>
      </View>
      <CommonButton
        bgColor={'#121481'}
        title={'Save Address'}
        textColor={'#fff'}
        onPress={() => {}}
      />
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
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
