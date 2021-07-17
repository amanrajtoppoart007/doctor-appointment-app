import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, Divider} from 'react-native-paper';
import Icons from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import {category, productItems, productItemsSave} from '../../../redux/actions';
import ProgressLoader from '../../../common/ProgressLoader';
import DropDownPicker from '../../../config/dropDown';
import {isValidHttpUrl} from '../../../config/common';
import constants from '../../../config/constants';
import PreviewImage from '../../../components/models/previewImage';

const PharmacyScreen = props => {
  const {navigation} = props;
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.categoryList);
  const [imagePathNew, setImagePathNew] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [itemNeedsToBeAdded, setItemsNeedToBeAdded] = useState('');

  useEffect(() => {
    if (props.categoryList.length <= 0) {
      getProductCategory();
    }
  }, []);

  useEffect(() => {
    if (value != null) {
      const requestData = {
        category_id: value,
      };
      setisLoading(true);
      props.productItemsCall(
        requestData,
        response => {
          setisLoading(false);
        },
        error => {
          setisLoading(false);
        },
      );
    }
  }, [value]);

  const getProductCategory = () => {
    setisLoading(true);
    props.categoryCall(
      response => {
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const addToCartItem = item => {
    const requestData = {
      product_id: item.product_id,
      product_unit: item.unit,
      qty: '1',
      price: item.selling_price,
      purchase_user_type: 'Doctor',
      purchase_user_id: props.userData.doctor_id,
    };
    setisLoading(true);
    props.productItemsSaveCall(
      requestData,
      response => {
        setisLoading(false);
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
            <TouchableOpacity onPress={() => setImagePathNew(item.img_path)}>
              <Image
                source={
                  item.img_path?.length > 0 && isValidHttpUrl(item.img_path)
                    ? {uri: item.img_path}
                    : require('../../../assets/images/man.png')
                }
                resizeMode={'contain'}
                style={{
                  width: 85,
                  height: 85,
                  marginLeft: 4,
                }}
              />
            </TouchableOpacity>
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
                {item.product_description}{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: constants.APP_THEME_COLOR_DARK,
                  }}>
                  MYR {item.selling_price}
                </Text>
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 35,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: constants.APP_THEME_COLOR,
                    marginRight: 12,
                  }}
                  //onPress={() => addToCartItem(item)}
                  onPress={() => setItemForPop(item)}>
                  <Text style={{color: constants.APP_WHITE_COLOR}}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Divider style={{height: 2}} />
        </View>
      </Card>
    );
  };

  const setItemForPop = item => {
    if (item != itemNeedsToBeAdded) {
      setQuantity(1);
    }
    setItemsNeedToBeAdded(item);
    addToCartItem(item);
    setModalVisible(true);
  };

  const addItemsToCart = () => {
    setQuantity(quantity => quantity + 1);
    addToCartItem(itemNeedsToBeAdded);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{}}
                onPress={() =>
                  quantity == 1
                    ? console.log('cant be less')
                    : setQuantity(quantity => quantity - 1)
                }>
                <Icons name="minus" size={20} style={{marginLeft: 20}} />
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity style={{}} onPress={() => addItemsToCart()}>
                <Icons name="plus" style={{marginRight: 20}} size={20} />
              </TouchableOpacity>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                  marginTop: 50,
                }}>
                <Text style={{color: 'black'}}>CANCEL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 50}}>
                <Text style={{color: 'black'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {props.categoryList.length > 0 && (
        <DropDownPicker
          items={props.categoryList}
          containerStyle={{
            width: '90%',
            height: 45,
            alignSelf: 'center',
            marginTop: 16,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={selectedItem => {
            setValue(selectedItem.value);
          }}
        />
      )}

      <FlatList
        data={props.productItemsList}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('ViewCart')}
        style={styles.fab}>
        <Icons name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
      <ProgressLoader
        visible={isLoading}
        isHUD={true}
        isModal={true}
        hudColor={'#FFFFFF'}
        color={'#000000'}
      />
      <PreviewImage
        visible={imagePathNew.length > 0}
        hideModal={() => setImagePathNew('')}
        imagePath={imagePathNew}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    categoryList: state.product.category,
    productItemsList: state.product.productItems,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCall: (onSuccess, onError) => {
      dispatch(category(onSuccess, onError));
    },
    productItemsCall: (requestData, onSuccess, onError) => {
      dispatch(productItems(requestData, onSuccess, onError));
    },
    productItemsSaveCall: (requestData, onSuccess, onError) => {
      dispatch(productItemsSave(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PharmacyScreen);
