/**
 * on October 13, 2020
 * Styles - Styles of OTP verification screen
 */

import {StyleSheet} from 'react-native';
// import Constants from '../../config/constants';
import Constants from './config/constants';
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
    alignContent: 'center',
    justifyContent: 'center',
  },

  titleText: {
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 25,
  },
});

export default styles;
