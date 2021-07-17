import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

import {patientHistory, completeAppointment} from '../../../../redux/actions';
import ProgressLoader from '../../../../common/ProgressLoader';
import {checkPermission, requestPermission} from '../../../../config/common';
import constants from '../../../../config/constants';

const AppointmentView = props => {
  const {navigation} = props;
  const [isLoading, setisLoading] = useState(false);
  const [patientHistory, setPatientHistory] = useState({});
  const [isAppoinmentToday, setIsAppoinmentToday] = useState(
    moment(
      moment(props.selectedAppointment.date * 1000).format('YYYY-MM-DD'),
    ).isSame(moment(new Date()).format('YYYY-MM-DD')),
  );

  useEffect(() => {
    getPatientHistory();
    checkPermission(response => {
      if (!response) {
        requestPermission();
      }
    });

    console.log(props.selectedAppointment?.status);
    console.log(isAppoinmentToday);

    if (props.selectedAppointment?.status === 'Confirmed') {
      if (isAppoinmentToday) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={() => {
                if (
                  props.selectedAppointment?.session_id &&
                  props.selectedAppointment?.token_id
                ) {
                  props.navigation.navigate('VideoConference', {
                    selectedAppointment: props.selectedAppointment,
                  });
                } else {
                  Toast.show(
                    'Conference not available, contact customer care',
                    Toast.LONG,
                  );
                }
              }}>
              <Icon name="video" size={24} color={constants.APP_WHITE_COLOR} />
            </TouchableOpacity>
          ),
        });
      } else {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={() => {
                props.navigation.navigate('ChatView', {
                  data: {
                    name: props.selectedAppointment.patientname,
                    guestUserId: props.selectedAppointment.patient,
                  },
                });
              }}>
              <Icon name="chat" size={24} color={constants.APP_WHITE_COLOR} />
            </TouchableOpacity>
          ),
        });
      }
    }
  }, []);

  const getPatientHistory = () => {
    const requestData = {
      patient_id: props.selectedAppointment.patient,
    };
    setisLoading(true);
    props.patientHistoryCall(
      requestData,
      response => {
        if (response.length > 0) {
          setPatientHistory(response[response.length - 1]);
        } else {
          setPatientHistory({});
        }
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const handleAppoinmentCompleted = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'Treated',
      patient_id: props.selectedAppointment.patient,
      id: props.selectedAppointment.id,
    };
    setisLoading(true);
    props.completeAppointmentCall(
      requestData,
      response => {
        setisLoading(false);
        if (response.message) {
          props.navigation.pop();
        }
      },
      error => {
        setisLoading(false);
      },
    );
  };

  return (
    <ScrollView>
      <View style={styles.safeContainer}>
        {Object.keys(patientHistory).length > 0 ? (
          <View style={styles.container}>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Name </Text>
              <Text style={styles.value}>{`:    ${patientHistory.name}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Age </Text>
              <Text style={styles.value}>{`:    ${patientHistory.age}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Gender </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.gender}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Weight </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.weight}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Height </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.height}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Heart Rate </Text>
              <Text
                style={
                  styles.value
                }>{`:    ${patientHistory.heart_rate}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Blood Pressure </Text>
              <Text
                style={
                  styles.value
                }>{`:    ${patientHistory.blood_pressure}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Body Temp </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.body_temp}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Blood Glucose Fasting </Text>
              <Text
                style={
                  styles.value
                }>{`:    ${patientHistory.blood_glucose_fasting}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Blood Glucose Nonfasting </Text>
              <Text
                style={
                  styles.value
                }>{`:    ${patientHistory.blood_glucose_nonfasting}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Smoker </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.smoker}`}</Text>
            </View>
            <View style={styles.historyRowView}>
              <Text style={styles.title}>Alcoholic </Text>
              <Text
                style={styles.value}>{`:    ${patientHistory.alocholic}`}</Text>
            </View>
            <>
              <Text style={[styles.title, styles.marginTopStyle]}>
                Allergy{' '}
              </Text>
              <Text style={styles.value}>{patientHistory.allergy}</Text>
            </>
            <>
              <Text style={[styles.title, styles.marginTopStyle]}>
                Medical History{' '}
              </Text>
              <Text style={styles.value}>{patientHistory.medicalhistory}</Text>
            </>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.emptyText}>Patient history not available</Text>
          </View>
        )}
        {props.selectedAppointment?.status === 'Confirmed' &&
          isAppoinmentToday && (
            <TouchableOpacity
              style={styles.submit}
              onPress={handleAppoinmentCompleted}>
              <Text style={styles.submitText}>Complete a Appoinment</Text>
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
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    patientHistoryCall: (requestData, onSuccess, onError) => {
      dispatch(patientHistory(requestData, onSuccess, onError));
    },
    completeAppointmentCall: (requestData, onSuccess, onError) => {
      dispatch(completeAppointment(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentView);
