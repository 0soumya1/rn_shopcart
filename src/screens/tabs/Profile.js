import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../common/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LogoutModal from '../../common/LogoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);
  const [isOpenDeleteAcModal, setIsOpenDeleteAcModal] = useState(false);
  const [name , setName] = useState('') 
  const [email , setEmail] = useState('') 
  const isFocused = useIsFocused();

  useEffect(() => {
    getProfile();
  }, [isFocused]);

  const getProfile = async () => {
    setName(await AsyncStorage.getItem('NAME'));
    setEmail(await AsyncStorage.getItem('EMAIL'));
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Profile'}
        isCart={false}
        onClickLeftIcon={() => {
          null;
        }}
        onClickRightIcon={() => {
          null;
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/profileimage.png')}
          style={styles.ImgView}
        />
        <Text style={styles.nameTxt}>{name}</Text>
        <Text style={[styles.nameTxt, {marginTop: 5, fontSize: 16}]}>
          {email}
        </Text>

        <TouchableOpacity style={[styles.tab, {marginTop: 40}]}>
          <Text style={styles.txt}>Edit Profile</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, {marginTop: 10}]}
          onPress={() => {
            navigation.navigate('Orders');
          }}>
          <Text style={styles.txt}>Orders</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, {marginTop: 10}]}
          onPress={() => {
            navigation.navigate('Addresses');
          }}>
          <Text style={styles.txt}>Address</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.tab, {marginTop: 10}]}>
          <Text style={styles.txt}>Payment Modes</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.tab, {marginTop: 10}]}
          onPress={() => {
            setIsOpenLogoutModal(true);
          }}>
          <Text style={styles.txt}>Logout</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, {marginTop: 10}]}
          onPress={() => {
            setIsOpenDeleteAcModal(true);
          }}>
          <Text style={styles.txt}>Delete Account</Text>
          <Image
            style={styles.next}
            source={require('../../assets/next.png')}
          />
        </TouchableOpacity>
      </ScrollView>
      <LogoutModal
        onRequestClose={() => setIsOpenLogoutModal(false)}
        onPressLeftButton={() => setIsOpenLogoutModal(false)}
        onPressRightButton={async () => {
          await AsyncStorage.clear();
          setIsOpenLogoutModal(false);
          navigation.navigate('LoginScreen');
        }}
        visible={isOpenLogoutModal}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        modelTitle={'Logout Account !'}
        description={'Do you really want to Logout ?'}
      />
      <LogoutModal
        onRequestClose={() => setIsOpenDeleteAcModal(false)}
        onPressLeftButton={() => setIsOpenDeleteAcModal(false)}
        onPressRightButton={async() => {
          await AsyncStorage.clear();
          setIsOpenDeleteAcModal(false);
          navigation.navigate('LoginScreen');
        }}
        visible={isOpenDeleteAcModal}
        rightButtonText={'Yes'}
        leftButtonText={'No'}
        modelTitle={'Delete Account !'}
        description={'Do you really want to Delete Account ?'}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  next: {
    height: 15,
    width: 15,
  },
  txt: {
    color: '#000',
    fontSize: 15,
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    // borderBottomColor: '#A0A0A0',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    alignSelf: 'center',
    marginTop: 20,
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
