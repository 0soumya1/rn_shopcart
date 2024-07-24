import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CommonButton = ({onPress, title, bgColor, textColor}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
      style={{
        width:"86%",
        height:50,
        borderRadius:10,
        backgroundColor: bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:"center",
        marginTop:30,
      }}
      //   onPress={props.onPress}
      onPress={() => {
        onPress();
      }}>
      <Text style={{color: textColor, fontSize:18}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
