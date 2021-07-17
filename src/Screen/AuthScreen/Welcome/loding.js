import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import NavigationHeader1 from '../../../components/NavigationHeaders/NavigationHeader';

export default function lodingScreen(props) {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* <NavigationHeader1
        showBackButton
        title={'Register and continue'}
        didTapOnBackButton={() => props.navigation.pop()}
      /> */}
      <View style={styles.container}>
        <View style={styles.flashSaleContainer}>
          <Text style={styles.logo}>Doctor</Text>
          <View style={styles.line} />
          <Text style={styles.logolow}>patient</Text>
        </View>
        <ActivityIndicator size="large" color={'red'} />

        <View style={styles.button} />
      </View>
    </SafeAreaView>
  );
}
