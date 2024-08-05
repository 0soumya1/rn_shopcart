import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import Loader from '../common/Loader';
import Home from './tabs/Home';
import Search from './tabs/Search';
import WishList from './tabs/WishList';
import Notification from './tabs/Notification';
import Profile from './tabs/Profile';

const TabNavigation = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <WishList />
      ) : selectedTab == 3 ? (
        <Notification />
      ) : (
        <Profile />
      )}
      {!isKeyboardVisible && (
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}>
            <Image
              source={
                selectedTab == 0
                  ? require('../assets/home_fill.png')
                  : require('../assets/home.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 0 ? '#121481' : '#121481'},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}>
            <Image
              source={
                selectedTab == 1
                  ? require('../assets/search_fill.png')
                  : require('../assets/search.png')
              }
              style={[
                selectedTab == 1 ? {width: 33, height: 33} : styles.tabIcon,
                {tintColor: selectedTab == 1 ? '#121481' : '#121481'},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(2);
            }}>
            <Image
              source={
                selectedTab == 2
                  ? require('../assets/heart_fill.png')
                  : require('../assets/heart.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 2 ? '#121481' : '#121481'},
              ]}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(3);
            }}>
            <Image
              source={
                selectedTab == 3
                  ? require('../assets/notification_fill.png')
                  : require('../assets/notification.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 3 ? '#121481' : '#121481'},
              ]}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(4);
            }}>
            <Image
              source={
                selectedTab == 4
                  ? require('../assets/user_fill.png')
                  : require('../assets/user.png')
              }
              style={[
                styles.tabIcon,
                {tintColor: selectedTab == 4 ? '#121481' : '#121481'},
              ]}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F5F7F8',
  },
  bottomTab: {
    width: '20%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 28,
    height: 28,
  },
});
