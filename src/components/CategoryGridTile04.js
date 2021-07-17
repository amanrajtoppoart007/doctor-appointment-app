import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from 'react-native';
import Constants from '../config/constants';
const CategoryGridTile04 = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container}}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gridItem: {
    // flex: 1,

    height: 50,
    width: 230,
    alignItems: 'center',
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    borderWidth: 2,
    borderColor: Constants.APP_WHITE_COLOR,

    margin: 5,
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    //width:width-20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Constants.APP_THEME_COLOR,
  },
  title: {
    fontSize: 16,

    color: Constants.APP_WHITE_COLOR,
    fontWeight: 'bold',
    // shadowColor: Constants.APP_THEME_COLOR_DARK,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
});

export default CategoryGridTile04;
