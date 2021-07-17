/**
 * on September 24, 2020
 * NoData - NoData common view
 */

import React, {Component} from 'react';
import Constants from '../config/constants';
import {View, Image, Text} from 'react-native';
import images from '../config/images';

export default class NoDataFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {styles, parentStyle, titleText} = this.props;
    return (
      <View
        style={[
          {flex: 1, alignItems: 'center'},
          parentStyle ? parentStyle : null,
        ]}>
        <View
          style={{
            backgroundColor: 'rgba(32,32,32,0.2)',
            marginTop: 50,
            width: 160,
            height: 160,
            borderRadius: 160 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image style={{}} source={images.noDataFound} />
        </View>
        <Text
          style={{
            fontFamily: Constants.Fonts.REGULAR,
            fontSize: 18,
            color: Constants.APP_NOT_HIGHLITED_TEXT_COLOR,
            marginTop: 30,
            textAlign: 'center',
          }}>
          {titleText ? 'No Photos Found' : ' No data found'}
        </Text>
      </View>
    );
  }
}
