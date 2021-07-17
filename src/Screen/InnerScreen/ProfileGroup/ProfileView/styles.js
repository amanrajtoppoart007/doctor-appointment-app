import {StyleSheet} from 'react-native';
import Constants from '../../../../config/constants';
import {normalize} from '../../../../config/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  userField: {
    marginTop: normalize(8),
  },
  userFieldTitle: {
    fontSize: normalize(14),
    marginTop: normalize(8),
  },
  userFieldInput: {
    borderWidth: 0.5,
    borderColor: Constants.APP_GRAY_COLOR3,
    borderRadius: 6,
    marginTop: normalize(4),
    paddingHorizontal: normalize(8),
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  saveButton: {
    width: '100%',
    height: normalize(45),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: normalize(35),
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
  },
  saveText: {
    color: Constants.APP_WHITE_COLOR,
    fontWeight: 'bold',
    fontSize: normalize(17),
  },
  specialty: {
    width: '100%',
    height: normalize(45),
    alignSelf: 'center',
    marginTop: normalize(8),
    borderRadius: 6,
  },
});

export default styles;
