import {StyleSheet} from 'react-native';
import {normalize} from '../../../config/common';

import Constants from '../../../config/constants';
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
    flex: 0.17,
    justifyContent: 'center',
    marginTop: normalize(12),
  },
  box02: {
    flex: 0.87,
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
  specialty: {
    fontSize: 15,
    color: Constants.APP_THEME_COLOR,
    textTransform: 'capitalize',
  },
});

export default styles;
