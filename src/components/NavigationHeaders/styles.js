import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 0,
    // borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
    // fontFamily:'audiowide_regular',
    color: Constants.APP_WHITE_COLOR,
    fontWeight: 'bold',
    marginRight: 60,
  },
  filterIconStyle: {
    width: 25,
    height: 25,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Constants.APP_WHITE_COLOR,
    fontSize: 12,
  },
  locationText2: {
    color: Constants.APP_WHITE_COLOR,
    fontSize: 12,
    fontWeight: 'bold',
  },
  skipText: {
    fontSize: 14,
    color: Constants.APP_WHITE_COLOR,
  },
});

export default styles;
