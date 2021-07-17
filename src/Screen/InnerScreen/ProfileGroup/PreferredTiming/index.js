import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';

import styles from './styles';
import DropDownPicker from '../../../../config/dropDown';
import ProgressLoader from '../../../../common/ProgressLoader';
import {timingCalculation} from '../../../../config/common';
import {savePreferredTiming} from '../../../../redux/actions';

const PreferredTiming = props => {
  const {navigation} = props;

  const [startTimings, setStartTimings] = useState([]);
  const [endTimings, setEndTimings] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  var doctorTiming = {};

  useEffect(() => {
    setStartTimings(timingCalculation(0, 12));
    setEndTimings(timingCalculation(12, 24));
  }, []);

  const proceedToSave = () => {
    const requestData = {
      ...doctorTiming,
      doctorid: props.userData.doctor_id,
    };
    setisLoading(true);
    props.savePreferredTimingCall(
      requestData,
      response => {
        setisLoading(false);
        if (response.status === 'success') {
          navigation.pop();
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
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Sunday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    sunday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    sunday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Monday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    monday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    monday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Tuesday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    tuesday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    tuesday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Wednesday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    wednesday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    wednesday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Thursday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    thursday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    thursday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Friday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    friday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    friday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayTitle}>Saturday</Text>
          <View style={styles.dayTimeContainer}>
            <View style={styles.dayStartTiming}>
              <Text style={styles.startEndTitle}>Start Time</Text>
              <DropDownPicker
                items={startTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    saturday_fn_from: selectedItem.value,
                  };
                }}
              />
            </View>
            <View style={styles.dayEndTiming}>
              <Text style={styles.startEndTitle}>End Time</Text>
              <DropDownPicker
                items={endTimings}
                containerStyle={styles.startEndTimingsDropdown}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                placeholder="Select an timing"
                onChangeItem={selectedItem => {
                  doctorTiming = {
                    ...doctorTiming,
                    saturday_an_to: selectedItem.value,
                  };
                }}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={proceedToSave}>
          <Text style={styles.saveText}>Update Timing</Text>
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
  );
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePreferredTimingCall: (requestData, onSuccess, onError) => {
      dispatch(savePreferredTiming(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreferredTiming);
