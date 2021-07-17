import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from 'react-native';
import {SERVER_URL} from '../config/api';
import Constants from '../config/constants';
const width = Dimensions.get('window').width;
import axios from 'axios';
const CategoryGridTile05 = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              resizeMode={'contain'}
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
                // tintColor: color
              }}
            />
            <View>
              <Text
                style={styles.title01}
                numberOfLines={2}
                ellipsizeMode="tail">
                {props.title}
              </Text>
              {/* <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                {props.title}
              </Text> */}
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                borderColor: Constants.APP_DARK_GREY_TEXT,
                borderWidth: 2,
                width: '45%',
                height: 35,
                alignItems: 'center',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={props.onSelectApp}>
              <Text style={styles.title} numberOfLines={2}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderColor: Constants.APP_DARK_GREY_TEXT,
                borderWidth: 2,
                width: '45%',
                height: 35,
                alignItems: 'center',
                borderRadius: 10,
                justifyContent: 'center',
              }}
              onPress={props.onSelectAppBook}>
              <Text style={styles.title}>Edit </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    // flex: 1,

    margin: 5,
    height: 130,
    width: width,
    borderRadius: 5,
    // overflow:
    //   Platform.OS === 'android' && Platform.Version >= 21
    //     ? 'hidden'
    //     : 'visible',
    //opacity: 0.5,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    flex: 1,
    //borderRadius: 10,
    // shadowColor: 'black',
    // shadowOpacity: 0.26,
    //shadowOffset: {width: 0, height: 2},
    // shadowRadius: 10,
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: Constants.APP_THEME_COLOR_DARK,
    borderRadius: 20,
    //  elevation: 5,
    backgroundColor: 'white',

    //  justifyContent: 'center',
    //  alignItems: 'center',
  },
  title: {
    fontSize: 13,
    textAlign: 'right',
    marginTop: 2,
    color: Constants.APP_THEME_COLOR_DARK,
    shadowColor: Constants.APP_THEME_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.72,
    shadowRadius: 2.22,

    elevation: 6,
  },
  title01: {
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 20,
    marginTop: 2,
    color: Constants.APP_THEME_COLOR_DARK,
    shadowColor: Constants.APP_THEME_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.72,
    shadowRadius: 2.22,

    elevation: 6,
  },
});

export default CategoryGridTile05;
