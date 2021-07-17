import {StyleSheet} from 'react-native';
import {normalize} from '../../../../config/common';
import Constants from '../../../../config/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
    paddingHorizontal: normalize(16),
  },
  dayContainer: {
    marginVertical: normalize(4),
  },
  dayTitle: {
    fontSize: normalize(17),
    fontWeight: 'bold',
  },
  dayTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(8),
  },
  dayStartTiming: {
    flex: 1,
    marginRight: normalize(16),
  },
  dayEndTiming: {
    flex: 1,
  },
  startEndTitle: {
    fontSize: normalize(15),
  },
  startEndTimingsDropdown: {
    width: '100%',
    marginTop: normalize(8),
    borderRadius: 6,
  },
  divider: {
    height: 1.5,
    marginTop: normalize(12),
  },
  saveButton: {
    width: '100%',
    height: normalize(45),
    paddingVertical: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    marginVertical: normalize(35),
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
  },
  saveText: {
    color: Constants.APP_WHITE_COLOR,
    fontWeight: 'bold',
    fontSize: normalize(17),
  },
});

export default styles;
