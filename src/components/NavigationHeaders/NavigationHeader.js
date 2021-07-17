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

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      showBackButton,
      didTapOnBackButton,
      navigationBackgroundColor,
      didTapOnMenu,
      isShowLocation,
      showSearch,
      didTapOnSearch,
      showCart,
      didTapOnCart,
      didTapOnLocation,
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
              //   borderColor: Constants.APP_THEME_COLOR_DARK,
              //  borderWidth: 1,
            },
          ]}>
          <View
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}>
            {showBackButton ? (
              <TouchableOpacity
                onPress={didTapOnBackButton && didTapOnBackButton}
                hitSlop={{top: 20, bottom: 20, left: 50, right: 0}}>
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
            ) : //(
            //   <TouchableOpacity
            //     onPress={didTapOnMenu && didTapOnMenu}
            //     hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
            //     <Image
            //       source={Images.menu}
            //       resizeMode={'contain'}
            //       style={{
            //         marginLeft: 15,
            //         width: 24,
            //         height: 24,
            //         tintColor: Constants.APP_WHITE_COLOR,
            //       }}
            //     />
            //   </TouchableOpacity>
            // )
            null}
          </View>
          {isShowLocation && (
            <TouchableOpacity
              style={styles.location}
              onPress={didTapOnLocation && didTapOnLocation}>
              <Image
                style={{
                  width: 18,
                  height: 18,
                  // marginLeft: 10,
                  tintColor: Constants.APP_WHITE_COLOR,
                }}
                source={Images.location}
              />
              <View style={{marginLeft: 5}}>
                <Text style={styles.locationText}>Karunagappally</Text>
                <Text style={styles.locationText2}>Infopark</Text>
              </View>
            </TouchableOpacity>
          )}
          {title && title.length > 0 ? (
            <Text
              style={[styles.titleText, this.props.titleTextStyle]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {title}
            </Text>
          ) : (
            <Text
              style={styles.titleText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {''}
            </Text>
          )}
          {showSearch && (
            <TouchableOpacity
              style={{paddingRight: 10}}
              onPress={didTapOnSearch && didTapOnSearch}
              hitSlop={{top: 20, bottom: 20, left: 0, right: 50}}>
              <Image
                source={Images.rightTriangle}
                resizeMode={'contain'}
                style={{
                  marginLeft: 15,
                  width: 24,
                  height: 24,
                  tintColor: Constants.APP_WHITE_COLOR,
                }}
              />
            </TouchableOpacity>
          )}
          {showCart && (
            <TouchableOpacity
              style={{paddingRight: 20}}
              onPress={didTapOnCart && didTapOnCart}
              hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
              <Image
                source={Images.notif}
                resizeMode={'contain'}
                style={{
                  marginLeft: 15,
                  width: 24,
                  height: 24,
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
export default NavigationHeader;
