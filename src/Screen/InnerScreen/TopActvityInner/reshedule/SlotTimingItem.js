import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Constants from '../../../../config/constants';

const SlotTimingItem = ({item, selectedTimer, onSelect}) => {
  const selected = selectedTimer === item;
  return (
    <TouchableOpacity
      style={[styles.gridItem, selected ? styles.selectedBg : null]}
      onPress={onSelect}>
      <Text
        style={[
          styles.title,
          selected ? {color: Constants.APP_WHITE_COLOR} : null,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Constants.APP_THEME_COLOR,
    margin: 5,
    borderRadius: 25,
    padding: 10,
  },
  selectedBg: {
    borderColor: Constants.APP_WHITE_COLOR,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  title: {
    fontSize: 14,
    color: Constants.APP_THEME_COLOR,
    fontWeight: 'bold',
  },
});

export default SlotTimingItem;
