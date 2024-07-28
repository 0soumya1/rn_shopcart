import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const CommonButton = ({onPress, title, bgColor, textColor}) => {
  return (
    // <LinearGradient
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 0}}
    //   colors={['#FDA403', '#121481']}
    //   style={{borderRadius: 10}}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: '86%',
        height: 50,
        borderRadius: 10,
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
        // paddingVertical: 12,
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection: 'row',
      }}
      //   onPress={props.onPress}
      onPress={() => {
        onPress();
      }}>
      <Text style={{color: textColor, fontSize: 18}}>{title}</Text>
    </TouchableOpacity>
    // </LinearGradient>
  );
};

export default CommonButton;
