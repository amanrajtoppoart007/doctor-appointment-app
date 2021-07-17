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
const CategoryGridTile03 = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
        <View style={{...styles.container}}>
          <Image
            source={{
              uri: 'https://news.drgator.ufl.edu/files/2018/12/Julia-Close_MCM_2828-427x642.jpg',
            }}
            resizeMode={'cover'}
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              marginLeft: 25,
              // tintColor: color
            }}
          />
          <View>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={{marginLeft: 25, color: 'green'}}>Avilable</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  gridItem: {
    height: 140,
    width: width,
    alignItems: 'center',
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
  },
  container: {
    flexDirection: 'row',
    flex: 1,

    padding: 10,
    width: width - 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Constants.APP_THEME_COLOR,
  },
  title: {
    fontSize: 16,
    textAlign: 'right',
    marginLeft: 10,
    color: Constants.APP_THEME_COLOR_DARK,
    fontWeight: 'bold',
    shadowColor: Constants.APP_THEME_COLOR_DARK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default CategoryGridTile03;
