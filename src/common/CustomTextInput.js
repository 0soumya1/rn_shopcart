import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const CustomTextInput = ({
  value,
  onChangeText,
  placeHolder,
  type,
  icon,
  placeholderTextColor,
  keyboardType,
}) => {
  return (
    <View
      style={styles.textView}>
      <Image source={icon} style={{width: 20, height: 20}} />
      <TextInput 
      style={{paddingLeft:10, color: '#000', width:"98%",}}
      placeHolder={placeHolder} 
      onChangeText={(txt)=>onChangeText(txt)}
      value={value} 
      placeholderTextColor={placeholderTextColor ? placeholderTextColor : "#888"}
      keyboardType={keyboardType ? keyboardType: "default"}
      secureTextEntry={type ? true : false}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textView: {
    width: '85%',
    height: 50,
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: '#121481',
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom: 30,
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
 
