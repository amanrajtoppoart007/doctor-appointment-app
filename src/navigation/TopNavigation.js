import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Approved from '../Screen/InnerScreen/TopActvityInner/approved';
import Waiting from '../Screen/InnerScreen/TopActvityInner/waiting';
import Cancelled from '../Screen/InnerScreen/TopActvityInner/cancelled';
import Past from '../Screen/InnerScreen/TopActvityInner/past';
import Constants from '../config/constants';

const Tab = createMaterialTopTabNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

export default function TopNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Constants.APP_THEME_COLOR,
        inactiveTintColor: Constants.APP_GRAY_COLOR3,
        indicatorStyle: {
          backgroundColor: Constants.APP_THEME_COLOR,
        },
        labelStyle: {
          fontSize: 12,
          margin: 0,
          padding: 0,
        },
      }}>
      <Tab.Screen name="Waiting" component={Waiting} />
      <Tab.Screen name="Approved" component={Approved} />
      <Tab.Screen name="Past" component={Past} />
      <Tab.Screen name="Dropped" component={Cancelled} />
    </Tab.Navigator>
  );
}
