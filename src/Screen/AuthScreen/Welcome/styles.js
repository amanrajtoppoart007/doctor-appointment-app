/**
 * on September 24, 2020
 * Styles - Styles fro Login Screen.
 */

import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../../../config/constants';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    // fontFamily: "audiowide_regular",
    color: Constants.APP_THEME_COLOR,
  },
  line: {
    width: 145,
    height: 5,
    // borderRadius:25,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  logolow: {
    fontSize: 23,
    // fontFamily: "audiowide_regular",
  },

  button: {
    flex: 0.3,
    alignItems: 'center',
    // marginTop: "30%",
    alignContent: 'center',
    justifyContent: 'center',
  },
  flashSaleContainer: {
    alignItems: 'center',
    // marginTop: "30%",
    alignContent: 'center',
    justifyContent: 'center',
    // borderRadius: 15,
    flex: 0.6,
    overflow: 'hidden',
  },
  signIn: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  textSignUP: {
    fontSize: 25,
    fontWeight: '400',
    // fontFamily: "audiowide_regular",

    color: Constants.APP_WHITE_COLOR,
  },
  textSign: {
    fontSize: 15,
    fontWeight: '400',
    color: Constants.APP_THEME_COLOR,
    // fontFamily: "audiowide_regular",
  },
  imageRound: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Constants.APP_THEME_COLOR,
    borderRadius: 30,
    overflow: 'hidden',
  },
  separator: {
    height: 6,
    backgroundColor: Constants.APP_SEPARATOR_COLOR,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
  },
  flatTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
  offerView: {
    width: 50,
    height: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 5,
    marginTop: 5,
  },
  offerText: {
    color: Constants.APP_WHITE_COLOR,
    fontSize: 10,
    textAlign: 'center',
  },
  productName: {
    fontSize: 14,
    color: Constants.APP_BLACK_COLOR,
    marginHorizontal: 5,
    lineHeight: 15,
    marginTop: 5,
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 11,
    color: Constants.APP_GRAY_COLOR3,
    marginHorizontal: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 17,
    color: Constants.APP_LIGHT_GREY_BG,
    marginHorizontal: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  productActualPrice: {
    fontSize: 13,
    color: Constants.APP_GRAY_COLOR3,
    marginHorizontal: 5,
    marginTop: 5,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },

  flashSaleSubContainer: {
    width: 190,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Constants.APP_SEPARATOR_COLOR,
    marginLeft: 10,
  },
  timeRemaining: {
    marginTop: 10,
    width: '94%',
    height: 20,
    backgroundColor: 'rgb(253,233,165)',
    alignSelf: 'center',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRemainingText: {
    fontSize: 11,
    textAlign: 'center',
    color: Constants.APP_BLACK_COLOR,
    fontWeight: 'bold',
  },
  qtyButtonContainer: {
    marginTop: 10,
    width: '94%',
    height: 35,
    backgroundColor: Constants.APP_THEME_COLOR,
    alignSelf: 'center',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  qtyPlus: {
    fontSize: 22,
    textAlign: 'center',
    color: Constants.APP_WHITE_COLOR,
    marginHorizontal: 20,
  },
  qtyText: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    color: Constants.APP_WHITE_COLOR,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  pagerItem: {
    width: 7,
    height: 7,
    backgroundColor: 'rgba(255,255,255,0.3)',
    margin: 2,
    borderRadius: 3.5,
  },
  pagerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default styles;
