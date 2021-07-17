import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import moment from 'moment';

import styles from './styles';
import {getOrderHistory} from '../../../../redux/actions';
import ProgressLoader from '../../../../common/ProgressLoader';

const OrderHistoryScreen = props => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const requestData = {
      purchase_user_id: props.userData.doctor_id,
    };
    setisLoading(true);
    props.getOrderHistoryCall(
      requestData,
      response => {
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  }, []);

  const handleOrderDetail = item => {
    props.navigation.navigate('OrderDetail', {
      data: item,
    });
  };

  const renderProductItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleOrderDetail(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.rowCon}>
            <View>
              <Text style={styles.orderYear}>
                {moment(item.order_at).format('YYYY')}
              </Text>
              <Text style={styles.orderDate}>
                {moment(item.order_at).format('DD')}
              </Text>
              <Text style={styles.orderMonth}>
                {moment(item.order_at).format('MMM')}
              </Text>
            </View>
            <View>
              <Text style={styles.orderId}>
                Order:
                <Text style={styles.orderNumber}>{` #${item.order_id}`}</Text>
              </Text>
              <Text style={styles.orderPerson}>{item.name}</Text>
              <Text style={styles.orderPhone}>{item.phoneno}</Text>
            </View>
            <View>
              <Text style={styles.orderAmount}>Total</Text>
              <Text style={styles.orderPerson}>RM {item.amount}</Text>
            </View>
            <Text style={styles.orderStatus}>{item.order_status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={props.orderHistoryData}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
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
    orderHistoryData: state.product.orderHistory,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderHistoryCall: (requestData, onSuccess, onError) => {
      dispatch(getOrderHistory(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen);
