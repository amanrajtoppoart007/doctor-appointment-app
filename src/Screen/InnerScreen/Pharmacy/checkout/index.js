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
import moment from 'moment';
import Toast from 'react-native-simple-toast';

import styles from './styles';
import ProgressLoader from '../../../../common/ProgressLoader';
import {cartCheckout, orderPlace} from '../../../../redux/actions';
import {PAYMENT_URL} from '../../../../redux/api';
import {Divider} from 'react-native-paper';

const PharmacyCheckout = props => {
  const {navigation} = props;

  const [checkoutName, setCheckoutName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});

  useEffect(() => {
    getCheckoutData();
  }, []);

  const getCheckoutData = () => {
    const requestData = {
      purchase_user_id: props.userData.doctor_id,
    };
    setisLoading(true);
    props.cartCheckoutCall(
      requestData,
      response => {
        setisLoading(false);
        console.log(response.message);
        setCheckoutData(response.message);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const proceedToBuy = () => {
    if (
      completeAddress &&
      phoneNumber &&
      checkoutName &&
      phoneNumber.length == 10
    ) {
      const extraParam1 = `member_id=${props.userData.doctor_id}&member_name=${props.userData.name}&description=Pharmacy Purchase&source=Telemedicine`;
      const extraParam2 = `${extraParam1}&member_email=test@gmail.com&member_mobile=1234567890`;
      const paymentUrl = `${PAYMENT_URL}&amount=${
        checkoutData.totalamount
      }&order_id=${moment().unix()}&${extraParam2}`;
      props.navigation.navigate('PaymentGateway', {
        paymentUrl: paymentUrl,
      });
      // const requestData = {
      //     purchase_user_id: props.userData.doctor_id,
      //     purchase_user_type: 'Docotr',
      //     name: checkoutName,
      //     phoneno: phoneNumber,
      //     address: completeAddress
      // }
      // setisLoading(true)
      // props.orderPlaceCall(requestData, response => {
      //     setisLoading(false)
      //     if (response.message) {
      //         props.navigation.popToTop()
      //       }
      // }, error => {
      //     setisLoading(false)
      // })
    } else {
      Toast.show('Required fields are missing', Toast.LONG);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={[styles.userFieldTitle, {fontWeight: 'bold', fontSize: 19}]}>
            Complete Address
          </Text>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Name</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={checkoutName}
              onChangeText={setCheckoutName}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Phone Number</Text>
            <TextInput
              style={styles.userFieldInput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              value={phoneNumber}
              maxLength={10}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.userField}>
            <Text style={styles.userFieldTitle}>Address</Text>
            <TextInput
              style={styles.notes}
              multiline={true}
              numberOfLines={6}
              value={completeAddress}
              onChangeText={setCompleteAddress}
            />
          </View>
          <Text
            style={[
              styles.userFieldTitle,
              {fontWeight: 'bold', fontSize: 19, marginTop: 16},
            ]}>
            Payment Details
          </Text>
          <View style={styles.userField}>
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>SubTotal</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData.subtotal}
              </Text>
            </View>
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>Tax</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData.tax}
              </Text>
            </View>
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>CGST</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData.CGST}
              </Text>
            </View>
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>SGST</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData.SGST}
              </Text>
            </View>
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>Total Tax</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData['Total Tax']}
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.checkoutRow}>
              <Text style={styles.userFieldTitle}>Total amount</Text>
              <Text style={[styles.userFieldTitle, styles.paymentAmount]}>
                MYR {checkoutData.totalamount}
              </Text>
            </View>
            <Divider style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={proceedToBuy}>
            <Text style={styles.saveText}>Checkout</Text>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartCheckoutCall: (requestData, onSuccess, onError) => {
      dispatch(cartCheckout(requestData, onSuccess, onError));
    },
    orderPlaceCall: (requestData, onSuccess, onError) => {
      dispatch(orderPlace(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PharmacyCheckout);
