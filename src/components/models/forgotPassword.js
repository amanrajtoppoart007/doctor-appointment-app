import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {normalize} from '../../config/common';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Toast from 'react-native-simple-toast';
import Constants from '../../config/constants';

const ForgotPasswordModel = ({visible, hideModal, onForgotPasswordUpdate}) => {
  const [email, setEmail] = useState('');

  const validateForm = () => {
    if (email && email.length > 0) {
      onForgotPasswordUpdate(email);
    } else {
      Toast.show('Enter email address', Toast.LONG);
    }
  };

  useEffect(() => {
    if (!visible) {
      setEmail('');
    }
  }, [visible]);

  return (
    <Modal visible={visible} onDismiss={hideModal}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={hideModal} style={styles.closeIcon}>
          <Icon
            name="times-circle"
            color={Constants.APP_GRAY_COLOR3}
            size={28}
          />
        </TouchableOpacity>
        <Text style={styles.modalText}>Forgot Password</Text>

        <Text style={styles.hint}>Email Address</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TouchableOpacity onPress={() => validateForm()} style={styles.button}>
          <Text style={styles.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: Constants.APP_WHITE_COLOR,
    marginHorizontal: normalize(24),
    padding: normalize(12),
    borderRadius: normalize(6),
  },
  modalText: {
    textAlign: 'center',
    fontSize: normalize(15),
    marginTop: normalize(12),
  },
  closeIcon: {
    position: 'absolute',
    right: normalize(12),
    top: normalize(8),
  },
  hint: {
    marginTop: normalize(12),
    fontSize: normalize(15),
  },
  input: {
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    borderRadius: 6,
    height: normalize(40),
    marginTop: normalize(8),
    paddingLeft: 12,
  },
  button: {
    height: normalize(35),
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
    marginTop: normalize(12),
    width: normalize(100),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textStyle: {
    fontSize: normalize(15),
    color: Constants.APP_WHITE_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordModel;
