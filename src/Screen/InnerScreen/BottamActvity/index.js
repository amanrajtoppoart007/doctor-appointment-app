import React from 'react';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import TopNavigation from '../../../navigation/TopNavigation';
import constants from '../../../config/constants';
import {findSpecialty, normalize} from '../../../config/common';

const BottamActvity = props => {
  return (
    <View style={styles.container}>
      <View style={styles.box01}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../assets/images/doctor.png')}
            resizeMode="cover"
            style={{
              width: 65,
              height: 65,
              borderRadius: 50,
              marginLeft: 25,
            }}
          />
          <View style={{marginLeft: 25}}>
            <Text
              style={{
                fontSize: 17,
                color: constants.APP_THEME_COLOR,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {props.userData.name}
            </Text>
            {props.doctorSpecality?.specialty_name && (
              <Text style={styles.specialty}>
                {props.doctorSpecality.specialty_name}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.box02}>
        <TopNavigation />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    userProfile: state.user.userProfile,
    doctorSpecality: findSpecialty(
      state.appointment.specalitysList,
      state.user.userProfile.specialty,
    ),
  };
};

export default connect(mapStateToProps, null)(BottamActvity);
