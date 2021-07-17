import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import AppoinmentHistoryItem from './appoinmentHistoryItem';

import {
  approvedAppointmentList,
  appointmentApprove,
  selectedAppointment,
} from '../../../../redux/actions';
import ProgressLoader from '../../../../common/ProgressLoader';

const Approved = props => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getApprovedAppointmentHistory();
  }, []);

  const getApprovedAppointmentHistory = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'Confirmed',
    };
    props.approvedAppointmentListCall(
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
              cancelledAppointment(item);
              break;
          }
        }}
      />
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
          getApprovedAppointmentHistory();
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
          data={props.approvedAppointmentListData}
          renderItem={renderGridItem}
          ListEmptyComponent={<EmptyDoctors />}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={isLoading}
              onRefresh={getApprovedAppointmentHistory}
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
  console.log(state.appointment.approvedAppointment);
  return {
    approvedAppointmentListData: state.appointment.approvedAppointment,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    approvedAppointmentListCall: (requestData, onSuccess, onError) => {
      dispatch(approvedAppointmentList(requestData, onSuccess, onError));
    },
    appointmentApproveCall: (requestData, onSuccess, onError) => {
      dispatch(appointmentApprove(requestData, onSuccess, onError));
    },
    selectedAppointmentCall: data => {
      dispatch(selectedAppointment(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Approved);
