import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import DropDownPicker from '../../../../config/dropDown';
import {dropdownListConvert} from '../../../../config/common';
import ProgressLoader from '../../../../common/ProgressLoader';
import {doctorProfileUpdate} from '../../../../redux/actions';

const ProfileView = props => {
  const {userProfile, navigation} = props;

  const [docotrName, setDocotrName] = useState(userProfile.name);
  const [clinicName, setClinicName] = useState(userProfile.clinic_name);
  const [email, setEmail] = useState(userProfile.email);
  const [phoneNumber, setPhoneNumber] = useState(userProfile.mobile);
  const [specialty, setSpecialty] = useState(userProfile.specialty);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {}, []);

  const proceedToSave = () => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      clinic_name: clinicName,
      mobile: phoneNumber,
      email: email,
      name: docotrName,
      specialty: specialty,
    };
    setisLoading(true);
    props.doctorProfileUpdateCall(
      requestData,
      response => {
        if (response.message) {
          navigation.pop();
        }
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Name</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={docotrName}
              onChangeText={setDocotrName}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Clinic Name</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={clinicName}
              onChangeText={setClinicName}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Email</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              value={email}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Phone Number</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              value={phoneNumber}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Specialty</Text>
            <DropDownPicker
              containerStyle={styles.specialty}
              items={dropdownListConvert(
                props.specalitysList,
                'specialty_name',
                'specialty_id',
              )}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              onChangeItem={selectedItem => {
                setSpecialty(selectedItem.value);
              }}
              defaultValue={specialty}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={proceedToSave}>
            <Text style={styles.saveText}>Update Profile</Text>
          </TouchableOpacity>

          <ProgressLoader
            visible={isLoading}
            isHUD={true}
            isModal={true}
            hudColor={'#FFFFFF'}
            color={'#000000'}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    specalitysList: state.appointment.specalitysList,
    userProfile: state.user.userProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doctorProfileUpdateCall: (requestData, onSuccess, onError) => {
      dispatch(doctorProfileUpdate(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
