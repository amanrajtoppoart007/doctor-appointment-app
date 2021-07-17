import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Modal} from 'react-native-paper';
import {checkPasswordValid, normalize} from '../../config/common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

import Constants from '../../config/constants';

const PasswordChangeModel = ({visible, hideModal, onPasswordUpdate}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const checkAllPasswordValid = () => {
    if (oldPassword && newPassword && newPassword === confirmPassword) {
      onPasswordUpdate({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
    } else {
      Toast.show('Please enter valid password', Toast.LONG);
    }
  };

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
        <Text style={styles.modalText}>Update Password</Text>

        <Text style={styles.hint}>Old Password</Text>

        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          keyboardType="visible-password"
          secureTextEntry={true}
        />

        <Text style={styles.hint}>New Password</Text>

        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          keyboardType="visible-password"
          secureTextEntry={true}
        />

        <Text style={styles.hint}>Confirm Password</Text>

        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          keyboardType="visible-password"
          secureTextEntry={true}
        />

        <TouchableOpacity
          disabled={!oldPassword || !newPassword || !confirmPassword}
          onPress={checkAllPasswordValid}
          style={styles.button}>
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

export default PasswordChangeModel;
