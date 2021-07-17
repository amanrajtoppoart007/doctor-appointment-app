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
  TextInput,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../config/images';
import Strings from '../config/strings';
import Constants from '../config/constants';
import {useLinkProps} from '@react-navigation/native';
// import { TextInput } from 'react-native-paper';

export default function Inputpaper(props) {
  const [text, setText] = React.useState('');

  return (
    <View
      style={{
        backgroundColor: Constants.APP_GRAY_COLOR2,
        marginTop: 5,
        width: '100%',
        padding: 5,
        height: 55,
        borderRadius: 10,
      }}>
      <Text
        style={{
          color: Constants.APP_GRAY_COLOR3,
          fontSize: 15,
          marginLeft: 10,
        }}>
        {props.title}
      </Text>

      <TextInput style={{marginLeft: 10}} {...props} editable maxLength={40} />
    </View>
  );
}
