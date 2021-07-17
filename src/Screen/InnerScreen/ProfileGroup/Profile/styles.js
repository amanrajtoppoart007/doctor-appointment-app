import {StyleSheet} from 'react-native';
import {normalize} from '../../../../config/common';
import Constants from '../../../../config/constants';

const styles = StyleSheet.create({
  navcontainer: {
    height: 55,
    flexDirection: 'row',
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 0,
    alignItems: 'center',
  },
  safeContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  innrboxrow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  innerBox: {
    height: 50,
    width: 50,
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
    opacity: 9,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box01: {
    flex: 0.17,
    justifyContent: 'center',
  },
  box02: {
    flex: 0.83,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
  },
  box03: {
    flex: 0.2,
  },

  titleText: {
    marginTop: 70,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 20,
  },
  titleTextw: {
    marginVertical: 5,
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
  },
  doctorName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: normalize(20),
    color: Constants.APP_WHITE_COLOR,
  },
  specialty: {
    marginLeft: 10,
    fontSize: 18,
    color: Constants.APP_WHITE_COLOR,
    textTransform: 'capitalize',
  },
  optionsName: {
    color: 'white',
    marginLeft: 12,
    fontSize: 20,
    fontWeight: '500',
    color: Constants.APP_GRAY_COLOR3,
  },
  profilePic: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: constants.APP_THEME_COLOR,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(20),
  },
  divider: {
    height: 1.5,
    marginTop: 12,
  },
});

export default styles;
