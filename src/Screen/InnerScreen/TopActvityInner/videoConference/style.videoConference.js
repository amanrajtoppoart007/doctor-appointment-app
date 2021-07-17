import {StyleSheet} from 'react-native';
import constants from '../../../../config/constants';

const styles = StyleSheet.create({
  publisherView: {
    position: 'absolute',
    width: 80,
    height: 120,
    top: 80,
    right: 8,
    backgroundColor: constants.APP_WHITE_COLOR,
    zIndex: 16,
  },
  subscriberView: {
    width: constants.SCREEN_WIDTH,
    height: constants.SCREEN_HEIGHT,
  },
  videoStreamTopActions: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    padding: 16,
  },
  providerNameStyle: {
    fontSize: 18,
    fontWeight: '900',
    color: constants.APP_WHITE_COLOR,
    textAlign: 'left',
    marginHorizontal: 16,
  },
  videoStreamTopActionsOptions: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  subscriberDisabledView: {
    position: 'absolute',
    width: constants.SCREEN_WIDTH,
    height: constants.SCREEN_HEIGHT,
    backgroundColor: constants.APP_BLACK_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectingTextStyle: {
    fontSize: 18,
    fontWeight: '900',
    color: constants.APP_WHITE_COLOR,
    textAlign: 'left',
    marginTop: 4,
    marginHorizontal: 4,
  },
  conferenceStatusText: {
    fontSize: 18,
    fontWeight: '900',
    color: constants.APP_WHITE_COLOR,
    textAlign: 'center',
  },
  viewRow: {
    flexDirection: 'row',
  },
  videoStreamBottomActions: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 28,
  },
  videoStreamBottomActionsIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.APP_WHITE_COLOR,
    borderRadius: 60 / 2,
  },
  callEndIcon: {
    backgroundColor: constants.red,
    marginHorizontal: 16,
  },
});

export default styles;
