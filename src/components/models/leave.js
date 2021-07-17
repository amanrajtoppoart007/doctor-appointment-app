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
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

import Constants from '../../config/constants';

const LeaveModel = ({visible, hideModal, onLeaveUpdate}) => {
  const [minDate, setMinDate] = useState(
    moment().add(1, 'd').format('YYYY-MM-DD'),
  );
  const [selectedData, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

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
        <Text style={styles.modalText}>Update Leave</Text>

        <Text style={styles.hint}>Select leave date</Text>

        <Calendar
          style={styles.calendar}
          current={minDate}
          markedDates={{
            [selectedData]: {
              disableTouchEvent: true,
              selected: true,
              selectedColor: 'red',
            },
          }}
          onDayPress={date => {
            setSelectedDate(date.dateString);
          }}
          minDate={minDate}
          maxDate={moment().add(7, 'd').format('YYYY-MM-DD')}
        />

        <TouchableOpacity
          onPress={() => onLeaveUpdate(selectedData)}
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

export default LeaveModel;
