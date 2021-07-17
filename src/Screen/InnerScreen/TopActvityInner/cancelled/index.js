import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, RefreshControl} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import AppoinmentHistoryItem from './appoinmentHistoryItem';

import {
  cancelledAppointmentList,
  selectedAppointment,
} from '../../../../redux/actions';
import ProgressLoader from '../../../../common/ProgressLoader';

const Cancelled = props => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getCancelledAppointmentHistory();
  }, []);

  const getCancelledAppointmentHistory = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      status: 'Cancelled',
    };
    props.cancelledAppointmentListCall(
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
          }
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
    <View style={styles.safeContainer}>
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          keyExtractor={(item, index) => index.toString()}
          data={props.cancelledAppointmentListData}
          renderItem={renderGridItem}
          ListEmptyComponent={<EmptyDoctors />}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={isLoading}
              onRefresh={getCancelledAppointmentHistory}
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
    cancelledAppointmentListData: state.appointment.cancelledAppointment,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelledAppointmentListCall: (requestData, onSuccess, onError) => {
      dispatch(cancelledAppointmentList(requestData, onSuccess, onError));
    },
    selectedAppointmentCall: data => {
      dispatch(selectedAppointment(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cancelled);
