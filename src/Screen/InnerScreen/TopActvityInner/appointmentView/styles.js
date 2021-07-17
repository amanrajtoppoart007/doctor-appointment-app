import {StyleSheet, Dimensions} from 'react-native';
import {normalize} from '../../../../config/common';
import Constants from '../../../../config/constants';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    flex: 1,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(12),
  },
  emptyContainer: {
    flex: 1,
    height: height,
    paddingHorizontal: normalize(16),
    textAlign: 'center',
  },
  historyRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(12),
  },
  title: {
    flex: 1,
    color: Constants.APP_DARK_BLACK_COLOR,
    fontSize: normalize(15),
  },
  value: {
    flex: 1,
    color: Constants.APP_GRAY_COLOR3,
    fontSize: normalize(15),
  },
  marginTopStyle: {
    marginTop: normalize(12),
  },
  submit: {
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
    width: '60%',
    padding: 12,
    height: normalize(42),
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: normalize(16),
    borderRadius: 25,
    justifyContent: 'center',
  },
  submitText: {
    fontSize: normalize(13),
    fontWeight: 'bold',
    color: Constants.APP_WHITE_COLOR,
  },
  emptyText: {
    height: height / 2.5,
    alignSelf: 'center',
    marginTop: height / 2.5,
  },
});

export default styles;
