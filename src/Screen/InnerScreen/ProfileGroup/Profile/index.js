import React, {useContext, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import {Divider} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {findSpecialty} from '../../../../config/common';
import constants from '../../../../config/constants';
import {AuthContext} from '../../../../utils/authContext';
import {storeObjectData, USER_DATA} from '../../../../utils/localStorage';
import {ABOUT_US, CONTACT_US} from '../../../../redux/api';
import {
  doctorLeaveUpdate,
  doctorPriceUpdate,
  doctorPasswordUpdate,
} from '../../../../redux/actions';
import styles from './styles';
import LeaveModel from '../../../../components/models/leave';
import PriceUpdateModel from '../../../../components/models/price';
import ProgressLoader from '../../../../common/ProgressLoader';
import PasswordChangeModel from '../../../../components/models/passwordChange';
import axios from 'axios';

const ProfileScreen = props => {
  const {logOut} = useContext(AuthContext);

  const [visibleLeaveModel, setVisibleLeaveModel] = useState(false);
  const [visiblePriceModel, setVisiblePriceModel] = useState(false);
  const [visiblePasswordModel, setVisiblePasswordModel] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [ratingNumber, setRatingNumber] = useState('');
  const [submitReviewText, setSubmitReviewText] = useState('');

  const [isLoading, setisLoading] = useState(false);

  const clearStorage = () => {
    storeObjectData(USER_DATA, {});
    logOut();
    Toast.show('Logout Successful', Toast.LONG);
  };

  const handleClick = url => {
    Linking.openURL(url);
  };

  const onLeaveUpdate = date => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      date: date,
    };
    setisLoading(true);
    props.doctorLeaveUpdateCall(
      requestData,
      response => {
        if (response.message) {
          setVisibleLeaveModel(false);
        }
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const onPriceUpdate = cost => {
    const requestData = {
      doctor_id: props.userData.doctor_id,
      doctor_price: cost,
    };
    setisLoading(true);
    props.doctorPriceUpdateCall(
      requestData,
      response => {
        if (response.message) {
          setVisiblePriceModel(false);
        }
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const onPasswordUpdate = data => {
    const requestData = {
      ...data,
      doctor_id: props.userData.doctor_id,
    };
    setisLoading(true);
    props.doctorPasswordUpdateCall(
      requestData,
      response => {
        if (response.message) {
          setVisiblePasswordModel(false);
        }
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  //submitReview
  const submitReview = () => {
    // console.log(props.userData.patient_id)
    // ToastAndroid.show("Review Submitted",ToastAndroid.LONG)
    // setShowRating(false)
    var status;
    axios
      .post('https://telemed.aspmedic.com/API/docotor/rating', {
        user_id: props.userData.doctor_id,
        note: reviewtext,
        rating: ratingNumber,
      })
      .then(function (response) {
        status = response.data.status;
        ToastAndroid.show(response.data.status, ToastAndroid.LONG);
        //console.log(response.data.status)
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowRating(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showRating}
        onRequestClose={() => {
          setShowRating(!modalVisible);
        }}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              height: 200,
              width: '90%',
              alignSelf: 'center',
              marginTop: 300,
              borderRadius: 20,
              justifyContent: 'center',
            }}>
            <Rating
              showRating
              startingValue={0}
              onFinishRating={value => setRatingNumber(value)}
              style={{paddingVertical: 10}}
            />

            <TextInput
              placeholder="write Review"
              style={{width: '40%', alignSelf: 'center'}}
              onChangeText={text => setSubmitReviewText(text)}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: '15%',
                  alignSelf: 'flex-end',
                  marginLeft: 30,
                }}
                onPress={() => setShowRating(false)}>
                <Text>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: 30,
                  width: '15%',
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}
                onPress={() => submitReview()}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.box01}>
          <View style={styles.profilePic}>
            <Image
              source={require('../../../../assets/images/doctor.png')}
              resizeMode={'cover'}
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
              }}
            />
            <View>
              <Text style={styles.doctorName}>{props.userData.name}</Text>
              {props.doctorSpecality?.specialty_name && (
                <Text style={styles.specialty}>
                  {props.doctorSpecality.specialty_name}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.box02}>
          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => props.navigation.navigate('ProfileView')}>
            <View style={styles.innerBox}>
              <Icon
                name="user-alt"
                size={20}
                color={constants.APP_WHITE_COLOR}
              />
            </View>
            <Text style={styles.optionsName}>Profile Info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => setVisibleLeaveModel(true)}>
            <View style={styles.innerBox}>
              <Icon name="edit" size={20} color={constants.APP_WHITE_COLOR} />
            </View>
            <Text style={styles.optionsName}>Leave</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => setVisiblePriceModel(true)}>
            <View style={styles.innerBox}>
              <Icon
                name="money-bill"
                size={20}
                color={constants.APP_WHITE_COLOR}
              />
            </View>
            <Text style={styles.optionsName}>Update Price</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.innrboxrow}
            onPress={() => props.navigation.navigate('PreferredTiming')}>
            <View style={styles.innerBox}>
              <Icon name="user-clock" size={20} color={constants.APP_WHITE_COLOR} />
            </View>
            <Text
              style={styles.optionsName}>
              Preferred Timing
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => setVisiblePasswordModel(true)}>
            <View style={styles.innerBox}>
              <Icon name="lock" size={20} color={constants.APP_WHITE_COLOR} />
            </View>
            <Text style={styles.optionsName}>Password Change</Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => props.navigation.navigate('OrderHistoryScreen')}>
            <View style={styles.innerBox}>
              <Icon name="lock" size={20} color={constants.APP_WHITE_COLOR} />
            </View>
            <Text style={styles.optionsName}>Order History</Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => handleClick(ABOUT_US)}>
            <View style={styles.innerBox}>
              <Icon name="info" size={20} color={constants.APP_WHITE_COLOR} />
            </View>

            <Text style={styles.optionsName}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowRating(true)}
            style={styles.innrboxrow}>
            <View style={styles.innerBox}>
              <Icon name="meh" size={20} color={constants.APP_WHITE_COLOR} />
            </View>

            <Text style={styles.optionsName}>Rate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.innrboxrow}
            onPress={() => handleClick(CONTACT_US)}>
            <View style={styles.innerBox}>
              <Icon
                name="headset"
                size={20}
                color={constants.APP_WHITE_COLOR}
              />
            </View>

            <Text style={styles.optionsName}>Help</Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.innrboxrow} onPress={clearStorage}>
            <View style={styles.innerBox}>
              <Icon
                name="sign-out-alt"
                size={20}
                color={constants.APP_WHITE_COLOR}
              />
            </View>
            <Text style={styles.optionsName}>LogOut</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LeaveModel
        visible={visibleLeaveModel}
        hideModal={() => {
          setVisibleLeaveModel(false);
        }}
        onLeaveUpdate={onLeaveUpdate}
      />

      <PriceUpdateModel
        price={props.userProfile.doctor_price}
        visible={visiblePriceModel}
        hideModal={() => {
          setVisiblePriceModel(false);
        }}
        onPriceUpdate={onPriceUpdate}
      />

      <PasswordChangeModel
        visible={visiblePasswordModel}
        hideModal={() => {
          setVisiblePasswordModel(false);
        }}
        onPasswordUpdate={onPasswordUpdate}
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
    userProfile: state.user.userProfile,
    doctorSpecality: findSpecialty(
      state.appointment.specalitysList,
      state.user.userProfile.specialty,
    ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doctorLeaveUpdateCall: (requestData, onSuccess, onError) => {
      dispatch(doctorLeaveUpdate(requestData, onSuccess, onError));
    },
    doctorPriceUpdateCall: (requestData, onSuccess, onError) => {
      dispatch(doctorPriceUpdate(requestData, onSuccess, onError));
    },
    doctorPasswordUpdateCall: (requestData, onSuccess, onError) => {
      dispatch(doctorPasswordUpdate(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
