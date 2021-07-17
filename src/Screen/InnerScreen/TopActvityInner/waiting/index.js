import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import AppoinmentHistoryItem from './appoinmentHistoryItem';

import {
  waitingAppointmentList,
  appointmentApprove,
  selectedAppointment,
} from '../../../../redux/actions';
import ProgressLoader from '../../../../common/ProgressLoader';

const Waiting = props => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getWaitingAppointmentHistory();
  }, []);

  const getWaitingAppointmentHistory = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'Confirmed',
    };
    props.waitingAppointmentListCall(
      requestData,
      response => {
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const renderGridItem = ({item}) => {
    return (
      <AppoinmentHistoryItem
        item={item}
        onSelect={value => {
          switch (value) {
            case 0:
              props.selectedAppointmentCall(item);
              props.navigation.navigate('AppointmentView');
              break;
            case 1:
              props.selectedAppointmentCall(item);
              props.navigation.navigate('Reshedule');
              break;
            case 2:
              approvedAppointment(item);
              break;
            case 3:
              cancelledAppointment(item);
              break;
          }
        }}
      />
    );
  };

  const approvedAppointment = item => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'Confirmed',
      patient_id: item.patient,
      id: item.id,
    };
    setisLoading(true);
    props.appointmentApproveCall(
      requestData,
      response => {
        setisLoading(false);
        if (response.message) {
          setisLoading(true);
          getWaitingAppointmentHistory();
        }
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const cancelledAppointment = item => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'cancelled',
      patient_id: item.patient,
      id: item.id,
    };
    setisLoading(true);
    props.appointmentApproveCall(
      requestData,
      response => {
        setisLoading(false);
        if (response.message) {
          setisLoading(true);
          getWaitingAppointmentHistory();
        }
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const EmptyDoctors = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginTop: '60%',
        }}>
        No Appointments Available
      </Text>
    );
  };

  return (
    <View style={styles.safeContainer}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => index.toString()}
          data={props.waitingAppointmentListData}
          renderItem={renderGridItem}
          ListEmptyComponent={<EmptyDoctors />}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={isLoading}
              onRefresh={getWaitingAppointmentHistory}
            />
          }
        />
      </View>
      <ProgressLoader
        visible={isLoading}
        isHUD={true}
        isModal={true}
        hudColor={'#FFFFFF'}
        color={'#000000'}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    waitingAppointmentListData: state.appointment.waitingAppointment,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    waitingAppointmentListCall: (requestData, onSuccess, onError) => {
      dispatch(waitingAppointmentList(requestData, onSuccess, onError));
    },
    appointmentApproveCall: (requestData, onSuccess, onError) => {
      dispatch(appointmentApprove(requestData, onSuccess, onError));
    },
    selectedAppointmentCall: data => {
      dispatch(selectedAppointment(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);
