import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import moment from 'moment';

import Constants from '../../../../config/constants';
import {isValidHttpUrl, normalize} from '../../../../config/common';
const width = Dimensions.get('window').width;

const AppoinmentHistoryItem = ({item, onSelect}) => {
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{flex: 1}} onPress={() => onSelect(0)}>
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={
                item.img_path?.length > 0 && isValidHttpUrl(item.img_path)
                  ? {uri: item.img_path}
                  : require('../../../../assets/images/man.png')
              }
              resizeMode={'contain'}
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
              }}
            />
            <View style={{marginLeft: 20}}>
              <Text
                style={styles.title01}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.patientname}
              </Text>
              {item.remarks ? (
                <Text
                  style={styles.remarks}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {item.remarks}
                </Text>
              ) : null}
              <Text
                style={styles.status}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 12,
            marginTop: 4,
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                color: Constants.APP_BLACK_COLOR,
                fontSize: 15,
                fontWeight: '700',
              }}>
              Appointment Date
            </Text>
            <Text style={{color: Constants.APP_GRAY_COLOR3, fontSize: 13}}>
              {moment(item.date * 1000).format('ll')}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: Constants.APP_BLACK_COLOR,
                fontSize: 15,
                fontWeight: '700',
              }}>
              Appointment Time
            </Text>
            <Text style={{color: Constants.APP_GRAY_COLOR3, fontSize: 13}}>
              {item.s_time} - {item.e_time}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    margin: 5,
    width: width,
    borderRadius: 5,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    flex: 1,
    padding: 15,
    borderBottomColor: Constants.APP_THEME_COLOR_DARK,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 13,
    textAlign: 'right',
    marginTop: 2,
    color: Constants.APP_THEME_COLOR_DARK,
    textTransform: 'capitalize',
  },
  title01: {
    fontSize: 18,
    marginTop: 2,
    color: Constants.APP_THEME_COLOR_DARK,
    textTransform: 'capitalize',
  },
  remarks: {
    fontSize: 15,
    marginTop: 4,
    color: Constants.APP_GRAY_COLOR3,
    textTransform: 'capitalize',
  },
  status: {
    width: normalize(100),
    fontSize: 13,
    minWidth: 120,
    paddingVertical: 4,
    marginTop: 4,
    fontWeight: 'bold',
    color: Constants.APP_THEME_COLOR,
    borderColor: Constants.APP_THEME_COLOR,
    borderWidth: 2,
    borderRadius: 25,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default AppoinmentHistoryItem;
