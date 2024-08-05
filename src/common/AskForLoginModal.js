import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CommonButton from './CommonButton';
import {useNavigation} from '@react-navigation/native';

const AskForLoginModal = ({
  modalVisible,
  onRequestClose,
  onClickLoginSignUp,
  onCancel,
}) => {
  const navigation = useNavigation();
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
     
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.modalView}
        onPress={onRequestClose}>
        <TouchableWithoutFeedback>
          <View style={styles.mainView}>
            <View style={{marginBottom: 30, marginTop: 10}}>
              <Text style={styles.txt}>
                {'Want to Add Product in Cart or WishList?\nPlease Login or Sign Up'}
              </Text>
              <CommonButton
                title={'Login or Sign Up'}
                bgColor={'#121481'}
                textColor={'#ffffff'}
                onPress={() => {
                  onClickLoginSignUp();
                }}
              />
              <CommonButton
                title={'Cancel'}
                bgColor={'#888'}
                textColor={'#ffffff'}
                onPress={() => {
                  onCancel();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default AskForLoginModal;

const styles = StyleSheet.create({
  txt: {
    color: '#000',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 10,
  },
  modalView: {
    flex: 1,
    //   width: Dimensions.get('window').width,
    //   height: Dimensions.get('window').height,
    //   position: 'absolute',
    //   top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
