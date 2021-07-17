import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Divider} from 'react-native-paper';

import styles from './styles';

const OrderDetail = props => {
  const {data} = props.route.params;

  const orderItem = ({item}) => {
    return (
      <View style={{marginLeft: 12, flex: 1, marginTop: 4}}>
        <View style={styles.itemSingle}>
          <View>
            <Text style={{fontSize: 16, textTransform: 'capitalize'}}>
              {item.product_name}
            </Text>
            <Text style={{fontSize: 15}} numberOfLines={1}>
              {item.category}{' '}
            </Text>
            <Text style={{fontSize: 15}} numberOfLines={1}>
              RM {item.price} X {item.qty}{' '}
            </Text>
          </View>
          <Text style={{fontSize: 16}} numberOfLines={1}>
            RM {parseInt(item.price) * parseInt(item.qty)}{' '}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.conatinerDetail}>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.value}>{data.name}</Text>
      </View>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Order Id</Text>
        <Text style={styles.value}>#{data.order_id}</Text>
      </View>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Phone Number</Text>
        <Text style={styles.value}>{data.phoneno}</Text>
      </View>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.value}>{data.address}</Text>
      </View>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Payment Type</Text>
        <Text style={styles.value}>{data.payment_type}</Text>
      </View>
      <View style={styles.rowConDetail}>
        <Text style={styles.title}>Order Status</Text>
        <Text style={styles.value}>{data.order_status}</Text>
      </View>
      <Text style={styles.itemRoot}>Item Details</Text>
      <FlatList
        data={data.product}
        renderItem={orderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
      <Divider style={{height: 1}} />
      <View style={[styles.rowConDetail, {marginBottom: 16}]}>
        <Text style={styles.titleTwo}>Total Amount</Text>
        <Text style={styles.valueTwo}>RM {data.amount}</Text>
      </View>
      <Divider style={{height: 1}} />
    </View>
  );
};

export default OrderDetail;
