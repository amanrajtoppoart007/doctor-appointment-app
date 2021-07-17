import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Switch} from 'react-native-paper';
import moment from 'moment';

import {
  doctorStatusChange,
  knowYourAppointment,
  specialityList,
  doctorProfile,
  selectedAppointment,
} from '../../../redux/actions';
import styles from './styles';
import AppoinmentHistoryItem from '../TopActvityInner/past/appoinmentHistoryItem';
import ProgressLoader from '../../../common/ProgressLoader';
import {checkPermission, requestPermission} from '../../../config/common';
import FireChat from '../../../common/FireChat';

const HomeScreen = props => {
  const {navigation, userData} = props;
  const [isOnline, setisOnline] = useState(props.doctorStatus);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getKnowYourAppointment();
    if (Object.keys(props.userProfile).length <= 0) {
      getDoctorProfileInfo();
    } else {
      FireChat.shared.addUser(props.userData.doctor_id, {
        name: props.userProfile.name,
        _id: props.userData.doctor_id,
      });
    }
    if (Object.keys(props.specalitysListData).length <= 0) {
      getSpecalitysList();
    }
  }, []);

  useEffect(() => {
    checkPermission(response => {
      if (!response) {
        requestPermission();
      }
    });
  }, []);

  const getSpecalitysList = () => {
    props.specialityListCall(response => {}), error => {};
  };

  const getDoctorProfileInfo = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
    };
    props.doctorProfileCall(
      requestData,
      response => {
        FireChat.shared.addUser(props.userData.doctor_id, {
          name: response.name,
          _id: props.userData.doctor_id,
        });
      },
      error => {},
    );
  };

  const getKnowYourAppointment = () => {
    const requestData = {
      doctor_id: userData.doctor_id,
      appointment_date: moment().format('YYYY-MM-DD'),
    };
    setisLoading(true);
    props.knowYourAppointmentCall(
      requestData,
      response => {
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const toggleSwitch = value => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: value ? 'ONLINE' : 'OFFLINE',
    };
    props.doctorStatusChangeCall(
      requestData,
      response => {},
      error => {},
    );
    setisOnline(!isOnline);
  };

  const renderAppointmentItem = ({item}) => {
    return (
      <AppoinmentHistoryItem
        item={item}
        onSelect={() => {
          props.selectedAppointmentCall(item);
          props.navigation.navigate('AppointmentView');
        }}
      />
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
    <View style={styles.container}>
      <View style={styles.newboxrow}>
        <Text style={{fontSize: 20, marginRight: 20, textAlign: 'center'}}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
        <Switch color="#81b0ff" value={isOnline} onValueChange={toggleSwitch} />
      </View>
      <View style={styles.Row}>
        <Text style={styles.knowAppointmentTitle}>Know your Schedule</Text>
      </View>
      <FlatList
        data={props.knowYourAppointment}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<EmptyDoctors />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getKnowYourAppointment}
          />
        }
      />
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
    userData: state.auth.userData,
    doctorStatus: state.appointment.doctorStatus,
    knowYourAppointment: state.appointment.knowYourAppointment,
    specalitysListData: state.appointment.specalitysList,
    userProfile: state.user.userProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doctorProfileCall: (requestData, onSuccess, onError) => {
      dispatch(doctorProfile(requestData, onSuccess, onError));
    },
    doctorStatusChangeCall: (requestData, onSuccess, onError) => {
      dispatch(doctorStatusChange(requestData, onSuccess, onError));
    },
    knowYourAppointmentCall: (requestData, onSuccess, onError) => {
      dispatch(knowYourAppointment(requestData, onSuccess, onError));
    },
    specialityListCall: (onSuccess, onError) => {
      dispatch(specialityList(onSuccess, onError));
    },
    selectedAppointmentCall: data => {
      dispatch(selectedAppointment(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
