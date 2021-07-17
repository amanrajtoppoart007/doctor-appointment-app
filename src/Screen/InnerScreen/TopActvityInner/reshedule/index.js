import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

import styles from './styles';
import SlotTimingItem from './SlotTimingItem';
import ProgressLoader from '../../../../common/ProgressLoader';

import {
  slotAvailableList,
  storeSlotTiming,
  resheduleAppoinment,
} from '../../../../redux/actions';
import constants from '../../../../config/constants';

const Reshedule = props => {
  const {navigation} = props;
  const {remarks, patientname, status, e_time, s_time} =
    props.selectedAppointment;

  const [date, setdate] = useState(moment().format('YYYY-MM-DD'));
  const [isLoading, setisLoading] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState({});
  const [doctorLeave, setDoctorLeave] = useState(false);

  useEffect(() => {
    return () => props.storeSlotTimingCall();
  }, []);

  useEffect(() => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      date: date,
    };
    setisLoading(true);
    props.slotAvailableListCall(
      requestData,
      response => {
        setisLoading(false);
        setDoctorLeave(false);
      },
      error => {
        if (typeof error.aslots === 'string') {
          setDoctorLeave(true);
        } else {
          setDoctorLeave(false);
        }
        setisLoading(false);
      },
    );
  }, [date]);

  const onDateSelected = selectedDate => {
    setSelectedTimer({});
    setdate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  const renderGridItem = ({item}) => {
    return (
      <SlotTimingItem
        item={item}
        selectedTimer={selectedTimer}
        onSelect={() => {
          setSelectedTimer(item);
        }}
      />
    );
  };

  const handleResheduleAppoinment = () => {
    const requestData = {
      appointment_date: date,
      patient_id: props.selectedAppointment.patient,
      doctor_id: props.userData.doctor_id,
      timeslots: selectedTimer,
      status: 'reschedule',
      id: props.selectedAppointment.id,
    };
    setisLoading(true);
    props.resheduleAppoinmentCall(
      requestData,
      response => {
        setisLoading(false);
        if (response.message) {
          navigation.popToTop();
        }
      },
      error => {
        setisLoading(false);
      },
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box01}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../../../assets/images/man.png')}
              resizeMode="cover"
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
                marginLeft: 25,
              }}
            />
            <View style={{marginLeft: 25}}>
              <Text style={{fontSize: 17}}>{patientname}</Text>
              <Text style={[styles.spec]}>{remarks}</Text>
              <Text style={styles.status}>{status}</Text>
              <Text style={[styles.spec, {lineHeight: 25}]}>
                {`Date: ${moment(props.selectedAppointment.date * 1000).format(
                  'll',
                )} \nTime: ${s_time} - ${e_time}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.box02}>
          <CalendarStrip
            scrollable
            style={{height: 120, paddingTop: 10, paddingBottom: 10}}
            calendarAnimation={{type: 'sequence'}}
            daySelectionAnimation={{
              type: 'background',
              borderWidth: 1,
              highlightColor: constants.APP_THEME_COLOR,
            }}
            calendarHeaderStyle={{
              color: constants.APP_THEME_COLOR,
              fontSize: 19,
            }}
            dateNumberStyle={{color: constants.APP_THEME_COLOR}}
            dateNameStyle={{color: constants.APP_THEME_COLOR}}
            iconContainer={{flex: 0.05}}
            highlightDateNumberStyle={{color: 'white'}}
            highlightDateNameStyle={{color: 'white'}}
            onDateSelected={onDateSelected}
            selectedDate={date}
            maxDate={moment().add(1, 'w')}
            minDate={moment()}
          />
        </View>
        <Text
          style={{
            marginLeft: 25,
            fontSize: 17,
            marginVertical: 8,
            color: constants.APP_GRAY_COLOR3,
          }}>
          {props.slotTiming.length} Slots Available
        </Text>
        {props.slotTiming.length > 0 && (
          <View style={{alignItems: 'center'}}>
            <FlatList
              style={styles.itemContainer}
              keyExtractor={(item, index) => index.toString()}
              data={props.slotTiming}
              renderItem={renderGridItem}
              numColumns={2}
              nestedScrollEnabled
            />
          </View>
        )}
        {doctorLeave && (
          <Text style={styles.doctorLeave}>Consultant Doctor is Leave</Text>
        )}
        {Object.keys(selectedTimer).length > 0 && (
          <TouchableOpacity
            style={styles.submit}
            onPress={handleResheduleAppoinment}>
            <Text style={styles.submitText}>Reshedule a Appoinment</Text>
          </TouchableOpacity>
        )}
        <ProgressLoader
          visible={isLoading}
          isHUD={true}
          isModal={true}
          hudColor={'#FFFFFF'}
          color={'#000000'}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    selectedAppointment: state.appointment.selectedAppointment,
    slotTiming: state.appointment.slotTiming,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    slotAvailableListCall: (requestData, onSuccess, onError) => {
      dispatch(slotAvailableList(requestData, onSuccess, onError));
    },
    storeSlotTimingCall: () => {
      dispatch(storeSlotTiming([]));
    },
    resheduleAppoinmentCall: (requestData, onSuccess, onError) => {
      dispatch(resheduleAppoinment(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reshedule);
