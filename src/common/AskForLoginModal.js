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
  onClickLogin,
  onClickSignUp,
}) => {
  const navigation = useNavigation();
//   const [modalClose, setModalClose] = useState(false);

//   const closeModal = () => {
//     setModalClose(false);
//   };
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
        onRequestClose={onRequestClose}
    //   onRequestClose={() => {
    //     setModalClose(!modalClose);
    //   }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.modalView}
        onPress={onRequestClose}>
        <TouchableWithoutFeedback>
          <View style={styles.mainView}>
            <View style={{marginBottom: 30}}>
              <CommonButton
                title={'Login To ShopCart'}
                bgColor={'#121481'}
                textColor={'#ffffff'}
                onPress={() => {
                    // closeModal()
                  navigation.navigate('LoginScreen');
                }}
              />
              <CommonButton
                title={'Create Account'}
                bgColor={'#121481'}
                textColor={'#ffffff'}
                onPress={() => {
                    // closeModal()
                  navigation.navigate('SignUpScreen');
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
