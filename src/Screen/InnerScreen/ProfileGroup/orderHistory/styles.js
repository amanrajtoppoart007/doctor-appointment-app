import {StyleSheet} from 'react-native';
import {normalize} from '../../../../config/common';
import constants from '../../../../config/constants';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingVertical: normalize(6),
  },
  conatinerDetail: {
    flex: 1,
    paddingVertical: normalize(6),
    backgroundColor: constants.APP_WHITE_COLOR,
  },
  itemContainer: {
    backgroundColor: constants.APP_WHITE_COLOR,
    padding: normalize(8),
    marginHorizontal: normalize(8),
    marginVertical: normalize(6),
  },
  rowCon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  rowConDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(8),
    paddingHorizontal: normalize(12),
  },
  orderStatus: {
    color: constants.APP_THEME_COLOR_DARK,
    fontSize: normalize(14),
  },
  orderPerson: {
    fontSize: normalize(14),
    color: constants.APP_BLACK_COLOR,
  },
  orderPhone: {
    fontSize: normalize(14),
    color: constants.APP_TEXT_GRAY_COLOR,
  },
  orderYear: {
    fontSize: normalize(14),
    color: constants.APP_TEXT_GRAY_COLOR,
  },
  orderDate: {
    fontSize: normalize(21),
    fontWeight: 'bold',
    color: constants.APP_THEME_COLOR,
    fontStyle: 'italic',
  },
  orderMonth: {
    fontSize: normalize(14),
    color: constants.APP_TEXT_GRAY_COLOR,
  },
  orderId: {
    fontSize: normalize(14),
    color: constants.APP_TEXT_GRAY_COLOR,
  },
  orderAmount: {
    fontSize: normalize(14),
    color: constants.APP_TEXT_GRAY_COLOR,
    alignSelf: 'center',
  },
  orderNumber: {
    fontWeight: 'bold',
    color: constants.APP_THEME_COLOR,
  },
  title: {
    flex: 1,
    fontSize: normalize(15),
  },
  value: {
    flex: 1,
    fontSize: normalize(15),
    color: constants.APP_GRAY_COLOR3,
  },
  titleTwo: {
    fontSize: normalize(15),
  },
  valueTwo: {
    fontSize: normalize(15),
    color: constants.APP_GRAY_COLOR3,
  },
  itemRoot: {
    margin: normalize(12),
    fontSize: normalize(15),
    fontWeight: 'bold',
  },
  itemSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(6),
  },
});

export default styles;
