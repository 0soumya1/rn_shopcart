import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator} from 'react-native';

const Loader = ({modalVisible, setModalVisible}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animated={true}
      animationType="none"
      onRequestClose={() => {
          setModalVisible(!modalVisible)
      }}
      >
      <View style={styles.container}>
        <View
          style={{
            padding: 15,
            borderRadius: 8,
            backgroundColor: '#fff',
            elevation:4,
          }}>
          <ActivityIndicator color={'#121481'} size={'small'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000060',
  },
});

export default Loader;
