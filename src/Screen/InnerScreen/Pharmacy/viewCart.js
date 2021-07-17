import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';

import styles from './styles';
import {
  cartItems,
  productItemsSave,
  storeCartItemsData,
} from '../../../redux/actions';
import ProgressLoader from '../../../common/ProgressLoader';
import constants from '../../../config/constants';

const ViewCartScreen = props => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    getCartItemData();

    return () => props.storeCartItemsDataCall();
  }, []);

  const getCartItemData = () => {
    const requestData = {
      purchase_user_id: props.userData.doctor_id,
      purchase_user_type: 'Doctor',
    };
    setisLoading(true);
    props.cartItemsCall(
      requestData,
      response => {
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const cartItemModify = (item, actionCount) => {
    const requestData = {
      product_id: item.product_id,
      product_unit: item.product_unit,
      qty: '1',
      price: item.price,
      purchase_user_type: 'Doctor',
      purchase_user_id: props.userData.doctor_id,
      cart_id: item.cart_id,
      actionCount: actionCount,
    };
    setisLoading(true);
    props.productItemsSaveCall(
      requestData,
      response => {
        setisLoading(false);
        getCartItemData();
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const renderProductItem = ({item}) => {
    return (
      <Card>
        <View>
          <View style={{flexDirection: 'row', marginVertical: 8}}>
            <View style={{marginLeft: 12, flex: 1}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 19,
                  marginTop: 5,
                  textTransform: 'capitalize',
                }}>
                {item.product_name}
              </Text>
              <Text
                style={{fontSize: 15, textTransform: 'capitalize'}}
                numberOfLines={1}>
                Unit: {item.product_unit}{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: constants.APP_THEME_COLOR_DARK,
                  }}>
                  MYR {parseInt(item.price)} X {item.qty} = MYR {item.total_amt}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: 140,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      paddingVertical: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: constants.APP_THEME_COLOR,
                    }}
                    onPress={() => cartItemModify(item, 1)}>
                    <Icon name="minus" color="#fff" size={14} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 4,
                    }}>
                    {item.qty}
                  </Text>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      paddingVertical: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: constants.APP_THEME_COLOR,
                    }}
                    onPress={() => cartItemModify(item, 2)}>
                    <Icon name="plus" color="#fff" size={14} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const EmptyDoctors = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginTop: '80%',
        }}>
        No Item's Available
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {props.cartItemsData.length > 0 && (
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <Text style={{fontSize: 19, marginHorizontal: '3%'}}>
            Subtotal :{' '}
          </Text>
          <Text style={{fontSize: 15}}>MYR </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: constants.APP_THEME_COLOR_DARK,
            }}>
            {props.totalAmount}
          </Text>
        </View>
      )}
      <FlatList
        data={props.cartItemsData}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        style={{marginBottom: 45}}
        ListEmptyComponent={<EmptyDoctors />}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={isLoading}
            onRefresh={getCartItemData}
          />
        }
      />

      {props.cartItemsData.length > 0 && (
        <TouchableOpacity
          style={{
            width: '100%',
            height: 45,
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            backgroundColor: constants.APP_THEME_COLOR_DARK,
          }}
          onPress={() => props.navigation.navigate('PharmacyCheckout')}>
          <Text
            style={{
              color: constants.APP_WHITE_COLOR,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Proceed
          </Text>
        </TouchableOpacity>
      )}
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
    cartItemsData: state.product.cartItems,
    totalAmount: _.sumBy(state.product.cartItems, function (item) {
      return parseInt(item.total_amt);
    }),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cartItemsCall: (requestData, onSuccess, onError) => {
      dispatch(cartItems(requestData, onSuccess, onError));
    },
    productItemsSaveCall: (requestData, onSuccess, onError) => {
      dispatch(productItemsSave(requestData, onSuccess, onError));
    },
    storeCartItemsDataCall: () => {
      dispatch(storeCartItemsData([]));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCartScreen);
