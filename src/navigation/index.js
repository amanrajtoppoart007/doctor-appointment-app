import React, {useReducer, useMemo} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SigninScreen from '../Screen/AuthScreen/SignIn';
import Welcome from '../Screen/AuthScreen/Welcome';
import BottamNavigation from './BottamNavigation';
import Reshedule from '../Screen/InnerScreen/TopActvityInner/reshedule';
import ViewCart from '../Screen/InnerScreen/Pharmacy/viewCart';
import ProfileView from '../Screen/InnerScreen/ProfileGroup/ProfileView';
import PreferredTiming from '../Screen/InnerScreen/ProfileGroup/PreferredTiming';
import PharmacyCheckout from '../Screen/InnerScreen/Pharmacy/checkout';
import AppointmentView from '../Screen/InnerScreen/TopActvityInner/appointmentView';
import ChatView from '../Screen/InnerScreen/Chat/chatView';
import VideoConference from '../Screen/InnerScreen/TopActvityInner/videoConference';

import {AuthContext} from '../utils/authContext';
import constants from '../config/constants';
import OrderHistoryScreen from '../Screen/InnerScreen/ProfileGroup/orderHistory';
import OrderDetail from '../Screen/InnerScreen/ProfileGroup/orderHistory/orderDetail';
import PaymentGateway from '../common/paymentGatway';
import {Provider} from 'react-native-paper';

const RootStack = createStackNavigator();

const Navigation = ({navigation}) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            doctorId: action.doctorId,
            isLoading: false,
            userData: action.userData,
          };
        case 'LOGIN_IN':
          return {
            ...prevState,
            isLogout: false,
            doctorId: action.doctorId,
            userData: action.userData,
          };
        case 'LOGIN_OUT':
          return {
            ...prevState,
            isLoading: false,
            isLogout: true,
            doctorId: 0,
            userData: {},
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      doctorId: 0,
      userData: {},
    },
  );

  const authContext = useMemo(
    () => ({
      loginIn: async data => {
        dispatch({
          type: 'LOGIN_IN',
          doctorId: data.doctorId,
          userData: data.userData,
        });
      },
      loginUp: async data => {
        dispatch({
          type: 'RESTORE_TOKEN',
          doctorId: data.doctorId,
          userData: data.userData,
        });
      },
      logOut: () => dispatch({type: 'LOGIN_OUT'}),
      userData: state.userData,
      doctorId: state.doctorId,
    }),
    [state.userData],
  );

  const getHeader = route => {
    if (route.state === undefined || route.state?.index === 0) {
      return {
        headerShown: true,
        title: state.userData.name,
        headerTitleAlign: 'center',
      };
    } else if (route.state?.index === 2) {
      return {
        headerShown: true,
        title: 'Chat',
        headerTitleAlign: 'center',
      };
    } else if (route.state?.index === 3) {
      return {
        headerShown: true,
        title: 'Pharmacy',
        headerTitleAlign: 'center',
      };
    } else {
      return {
        headerShown: false,
      };
    }
  };

  return (
    <Provider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor={constants.APP_THEME_COLOR}
        />
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <RootStack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: constants.APP_THEME_COLOR,
                },
                headerTintColor: constants.APP_WHITE_COLOR,
                headerTitleStyle: {
                  fontSize: 17,
                },
              }}>
              {parseInt(state.doctorId) > 0 ? (
                <>
                  <RootStack.Screen
                    name="BottamNavigation"
                    component={BottamNavigation}
                    options={({route}) => getHeader(route)}
                  />
                  <RootStack.Screen name="Reshedule" component={Reshedule} />
                  <RootStack.Screen name="ViewCart" component={ViewCart} />
                  <RootStack.Screen
                    name="ProfileView"
                    component={ProfileView}
                    options={{
                      title: 'Profile View',
                    }}
                  />
                  <RootStack.Screen
                    name="PreferredTiming"
                    component={PreferredTiming}
                    options={{
                      title: 'Preferred Timing',
                    }}
                  />
                  <RootStack.Screen
                    name="PharmacyCheckout"
                    component={PharmacyCheckout}
                    options={{
                      title: 'Checkout',
                    }}
                  />
                  <RootStack.Screen
                    name="AppointmentView"
                    component={AppointmentView}
                    options={{
                      title: 'Appointment View',
                    }}
                  />
                  <RootStack.Screen
                    name="ChatView"
                    component={ChatView}
                    options={{
                      title: 'Chat View',
                    }}
                  />
                  <RootStack.Screen
                    name="VideoConference"
                    component={VideoConference}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <RootStack.Screen
                    name="OrderHistoryScreen"
                    component={OrderHistoryScreen}
                    options={{
                      title: 'Order History',
                    }}
                  />
                  <RootStack.Screen
                    name="OrderDetail"
                    component={OrderDetail}
                    options={{
                      title: 'Order Detail',
                    }}
                  />
                  <RootStack.Screen
                    name="PaymentGateway"
                    component={PaymentGateway}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              ) : (
                <>
                  {state.isLoading && (
                    <RootStack.Screen
                      name="Welcome"
                      component={Welcome}
                      options={{
                        headerShown: false,
                      }}
                    />
                  )}
                  <RootStack.Screen
                    name="SigninScreen"
                    component={SigninScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                </>
              )}
            </RootStack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default Navigation;
