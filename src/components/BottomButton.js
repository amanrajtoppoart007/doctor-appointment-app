/**
 * on October 05, 2020
 * App Bottom Button - Bottom button component for app screens
 */
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../config/images';
import Strings from '../config/strings';
import Constants from '../config/constants';

export default function BottomButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={Constants.ACTIVE_OPACITY}
      onPress={() => props.didTapOnButton()}
      style={[
        {
          height: 50,
          backgroundColor: Constants.APP_THEME_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 20,
          borderRadius: 25,
        },
        props.style,
      ]}>
      <Text
        style={{
          color: Constants.APP_WHITE_COLOR,
          fontWeight: 'bold',
          fontSize: 20,
          //   fontFamily: "audiowide_regular",
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
