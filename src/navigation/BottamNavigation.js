import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';

import HomeScreen from '../Screen/InnerScreen/Home';
import Images from '../config/images';
import Constant from '../config/constants';
import ProfileScreen from '../Screen/InnerScreen/ProfileGroup/Profile';
import PharmacyScreen from '../Screen/InnerScreen/Pharmacy';
import ChatScreen from '../Screen/InnerScreen/Chat';
import BottamActvity from '../Screen/InnerScreen/BottamActvity';

const Tab = createMaterialBottomTabNavigator();
const InnerRootStack = createStackNavigator();
const ProfileRootStack = createStackNavigator();

const BottamNavigation = ({navigation}) => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor={Constant.APP_WHITE_COLOR}
    labelStyle={{fontSize: 14}}
    backgroundColor={Constant.APP_DARK_BLACK_COLOR}
    barStyle={{backgroundColor: Constant.APP_THEME_COLOR}}>
    <Tab.Screen
      name="HomeScreen"
      component={InnerStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <Image
            source={Images.home}
            resizeMode={'contain'}
            style={{
              width: 24,
              height: 24,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Activity"
      component={BottamActvity}
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({color}) => (
          <Image
            source={Images.activity}
            resizeMode={'contain'}
            style={{
              width: 24,
              height: 24,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarLabel: 'chat',
        tabBarIcon: ({color}) => (
          <Image
            source={Images.chat}
            resizeMode={'contain'}
            style={{
              width: 30,
              height: 26,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={PharmacyScreen}
      options={{
        tabBarLabel: 'Pharmacy',
        tabBarIcon: ({color}) => (
          <Image
            source={Images.pharmecy}
            resizeMode={'contain'}
            style={{
              width: 30,
              height: 26,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStackScreen"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'user',
        tabBarIcon: ({color}) => (
          <Image
            source={Images.user}
            resizeMode={'contain'}
            style={{
              width: 24,
              height: 24,
              tintColor: color,
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const InnerStackScreen = props => (
  <InnerRootStack.Navigator headerMode="none">
    <InnerRootStack.Screen name="HomeBooking" component={HomeScreen} />
  </InnerRootStack.Navigator>
);

const ProfileStackScreen = props => (
  <ProfileRootStack.Navigator headerMode="none">
    <ProfileRootStack.Screen name="ProfileScreen" component={ProfileScreen} />
  </ProfileRootStack.Navigator>
);

export default BottamNavigation;
