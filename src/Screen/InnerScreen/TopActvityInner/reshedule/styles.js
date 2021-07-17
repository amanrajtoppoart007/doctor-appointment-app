import {StyleSheet} from 'react-native';
import {normalize} from '../../../../config/common';
import constants from '../../../../config/constants';

import Constants from '../../../../config/constants';
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
    justifyContent: 'center',
    paddingVertical: 12,
  },
  box02: {
    flex: 1,
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
    marginVertical: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemContainer: {
    height: 210,
    marginTop: 8,
  },
  spec: {
    fontSize: 15,
    marginTop: 4,
    color: constants.APP_GRAY_COLOR3,
    textTransform: 'capitalize',
  },
  notes: {
    height: 80,
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    marginTop: 24,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 24,
    fontSize: 17,
  },
  submit: {
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
    width: '60%',
    padding: 12,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 25,
  },
  submitText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Constants.APP_WHITE_COLOR,
  },
  applyCoupon: {
    color: constants.APP_BLACK_COLOR,
    fontSize: 17,
    marginTop: 12,
    marginHorizontal: 12,
  },
  applyCouponInputRoot: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 12,
  },
  applyCouponInput: {
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  applyCouponSubmit: {
    flex: 0.25,
    width: '100%',
    height: 40,
    marginLeft: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: Constants.APP_WHITE_COLOR,
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
  },
  status: {
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
  doctorLeave: {
    fontSize: normalize(15),
    textAlign: 'center',
    marginVertical: normalize(30),
    fontWeight: 'bold',
  },
});

export default styles;
