/**
 * on September 24, 2020
 * Constants - Constant data of the App.
 */

import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

const isProduction = true; //Change here  for converting 'PRODUCTION' or 'STAGING'

export default constants = {
  APP_NAME: 'Fresh And Fetch',

  APP_BASE_URL: isProduction
    ? 'https://new.knanayology.org/wp-json/knanayology/v1/'
    : 'http://knanayology.websprint.in/wp-json/knanayology/v1/',

  APP_S3_BASE_URL: isProduction
    ? 'https://elogics-media.s3-eu-west-1.amazonaws.com/'
    : 'https://elogics-media.s3-eu-west-1.amazonaws.com/',

  APP_BASE_HEIGHT: 896,
  APP_BASE_WIDTH: 414,

  Fonts: {
    SEMI_BOLD:
      Platform.OS === 'ios' ? 'ProximaNova-Semibold' : 'ProximaNova_Semibold',
    REGULAR:
      Platform.OS === 'ios' ? 'ProximaNova-Regular' : 'ProximaNova_Regular',
  },

  PRIVACY_POLICY_URL: '',
  TERMS_AND_CONDITIONS_URL: '',

  APP_THEME_COLOR: '#77acf1',
  APP_THEME_COLOR_DARK: '#2978b5',
  APP_WHITE_COLOR: '#FFFFFF',
  APP_BLACK_COLOR: '#000',
  APP_DARK_BLACK_COLOR: 'rgb(32,32,32)',
  APP_TEXT_GRAY_COLOR: 'rgb(152,152,152)',

  APP_GRAY_COLOR: 'rgb(177,177,177)',
  APP_GRAY_COLOR2: 'rgb(241,243,246)',
  APP_GRAY_COLOR3: 'rgb(120,120,120)',
  APP_SEPARATOR_COLOR: '#E7E6E6',
  APP_GREY_TEXT_COLOR: 'rgb(104,108,126)',
  APP_RED_COLOR: 'rgb(227,100,108)',
  APP_TRANSPARENT_COLOR: 'transparent',
  APP_OUT_OF_STOCK_TEXT: '#b51818',
  APP_LIGHT_GREY_TEXT: 'rgb(165,165,165)',
  APP_YELLOW_COLOR: 'rgb(238,216,86)',
  APP_DARK_GREY_TEXT: 'rgb(130,130,130)',
  APP_SKY_BLUE_COLOR: 'rgb(149,205,226)',
  APP_LIGHT_GREEN_COLOR: 'rgb(141,217,138)',
  APP_LIGHT_PINK_COLOR: 'rgb(250,175,175)',
  APP_LIGHT_PURPLE_COLOR: 'rgb(198,158,238)',
  APP_NOT_HIGHLITED_TEXT_COLOR: 'rgba(255,255,255,0.75)',
  APP_LIGHT_GREY_BG: 'rgb(81,81,81)',
  modalBackground: 'rgba(0,0,0,0.5)',
  red: '#FF0000',
  mediumGrey: '#AEAEAE',
  transparent: 'transparent',

  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,

  ACTIVE_OPACITY: 0.7,

  IS_ANDROID: Platform.OS !== 'ios',

  PAGE_COUNT: 20,

  IOS_VERSION: parseInt(Platform.Version, 10),

  HIT_SLOP: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
};
