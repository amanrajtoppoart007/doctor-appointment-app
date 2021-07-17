/**
 * on October 13, 2020
 * Styles - Styles of OTP verification screen
 */

import {StyleSheet, Dimensions} from 'react-native';
// import Constants from '../../config/constants';
import Constants from '../../../config/constants';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  box: {justifyContent: 'center', alignContent: 'center', alignItems: 'center'},
  box01: {
    flex: 0.38,
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  box02: {
    flex: 0.38,
    marginTop: 0,
  },
  box03: {
    flex: 0.24,
    alignContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleText01: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    textAlign: 'center',
    paddingLeft: 20,
    fontSize: 20,
  },
  newboxrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    alignItems: 'flex-end',
    borderRadius: 20,
  },
  Row: {
    marginLeft: 16,
    marginTop: 12,
  },
  knowAppointmentTitle: {
    fontSize: 19,
    color: Constants.APP_THEME_COLOR,
  },
});

export default styles;
