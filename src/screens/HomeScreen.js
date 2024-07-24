import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import Loader from '../common/Loader';
import Home from './tabs/Home';
import Search from './tabs/Search';
import WishList from './tabs/WishList';
import Notification from './tabs/Notification';
import Profile from './tabs/Profile';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
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
            style={styles.tabIcon}
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
            style={selectedTab == 1 ? {width: 33, height: 33} : styles.tabIcon}
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
            style={styles.tabIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
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
            style={styles.tabIcon}
          />
        </TouchableOpacity>
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
            style={styles.tabIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

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
    backgroundColor: '#fff',
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
