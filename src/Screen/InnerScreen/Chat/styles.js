/**
 * on October 13, 2020
 * Styles - Styles of OTP verification screen
 */

import {StyleSheet} from 'react-native';
// import Constants from '../../config/constants';
import Constants from '../../../config/constants';
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_GRAY_COLOR2,
    // alignContent: 'center',
    // justifyContent: 'center',
  },
  box: {justifyContent: 'center', alignContent: 'center', alignItems: 'center'},
  box01: {
    flex: 0.1,
    marginTop: 10,
  },
  box02: {
    flex: 0.9,
    marginTop: 10,
    // alignContent: 'center', alignItems: 'center'
  },

  searchbox: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    paddingLeft: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Constants.APP_GRAY_COLOR,
    alignItems: 'center',
  },

  titleText: {
    textAlign: 'left',
    // autoCapitalize: 'none',
    marginVertical: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
    //lineHeight: 25,
  },
});

export default styles;
