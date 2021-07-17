/**
 * on September 24, 2020
 * NavigationHeader - Navigation header component.
 */

import styles from './styles';
import React, {Component} from 'react';
import Images from '../../config/images';
import Constants from '../../config/constants';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {normalizedHeight, normalizedWidth} from '../../config/common';

class NavigationHeader2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      showBackButton,
      didTapOnBackButton,
      navigationBackgroundColor,
      title,
      skipButton,
      didTapOnSkip,
    } = this.props;
    return (
      <View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: navigationBackgroundColor
                ? navigationBackgroundColor
                : Constants.APP_THEME_COLOR,
            },
          ]}>
          {showBackButton && (
            <View
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={didTapOnBackButton && didTapOnBackButton}
                hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                <Image
                  source={Images.backArrow}
                  resizeMode={'contain'}
                  style={{
                    marginLeft: 15,
                    width: 24,
                    height: 24,
                    tintColor: this.props.tintColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.titleText}>{title}</Text>

          {skipButton && (
            <TouchableOpacity
              style={{
                paddingRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={didTapOnSkip && didTapOnSkip}
              hitSlop={{top: 20, bottom: 20, left: 0, right: 50}}>
              <Text style={styles.skipText}>SKIP</Text>
              <Image
                source={Images.rightTriangle}
                resizeMode={'contain'}
                style={{
                  marginLeft: 5,
                  width: 15,
                  height: 15,
                  tintColor: Constants.APP_WHITE_COLOR,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
export default NavigationHeader2;
