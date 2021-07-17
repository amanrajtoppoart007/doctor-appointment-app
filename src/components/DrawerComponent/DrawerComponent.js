/**
 * on September 24, 2020
 * Drawer Component UI
 */

import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Images from '../../config/images';
import Constants from '../../config/constants';
import {showAlertWithCallback} from '../../config/common';
import Strings from '../../config/strings';
import {connect} from 'react-redux';
import Login from '../../screens/LoginScreen';

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      isLoginViewShow: false,
      menuItems: [
        'Home',
        'My Orders',
        'Notifications',
        'My Favorites',
        'F&F Wallet',
        'My Addresses',
        'Refer and Earn',
        'Feedbacks',
        'Contact Us',
        'Logout',
      ],
    };
  }

  _renderItem = ({item, index}) => {
    const {selectedIndex} = this.state;

    let menuIcon = Images.backArrow;
    // switch (index) {
    //   case 0:
    //     menuIcon = Images.menuHome;
    //     break;
    //   case 1:
    //     menuIcon = Images.menuCommunity;
    //     break;
    //   case 2:
    //     menuIcon = Images.menuArchdiocese;
    //     break;
    //   case 3:
    //     menuIcon = Images.menuDiaspora;
    //     break;
    //   case 4:
    //     menuIcon = Images.menuPersons;
    //     break;
    //   case 5:
    //     menuIcon = Images.menuSpotlight;
    //     break;
    //   case 6:
    //     menuIcon = Images.menuJacobites;
    //     break;
    //   case 7:
    //     menuIcon = Images.menuContact;
    //     break;
    //   case 8:
    //     menuIcon = Images.blogs;
    //     break;
    // }

    return (
      <TouchableOpacity onPress={() => this._didSelectRow(item, index)}>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
            borderBottomColor: Constants.APP_SEPARATOR_COLOR,
            borderBottomWidth: item !== 'Logout' ? 1 : 0,
            marginHorizontal: 15,
          }}>
          {item !== 'Logout' && (
            <Image
              style={{tintColor: Constants.APP_THEME_COLOR}}
              source={menuIcon}
            />
          )}
          <Text style={[styles.menuItem]}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  _didSelectRow = (item, index) => {
    this.props.navigation.closeDrawer();
    if (index !== 8) {
      this.setState({selectedIndex: index});
    }
    switch (index) {
      case 0:
        this.props.navigation.navigate('Home');
        break;
      case 1:
        this.props.navigation.navigate('CommunityDrawer');
        break;
      case 2:
        this.props.navigation.navigate('Notifications');
        break;
      // case 3:
      //   this.props.navigation.navigate('DiasporaDrawer');
      //   break;
      case 3:
        this.props.navigation.navigate('Favorites');
        break;
      // case 5:
      //   this.props.navigation.navigate('SpotLight');
      //   break;
      case 6:
        this.props.navigation.navigate('ReferAndEarn');
        break;
      case 7:
        this.props.navigation.navigate('Feedbacks');
        break;
      case 8:
        this.props.navigation.navigate('ContactUs');
        break;
      case 9:
        showAlertWithCallback(
          'Are you sure you want to logout?',
          'Yes',
          'No',
          () => {
            this.props.navigation.navigate('Registration');
          },
        );
        break;
    }
  };

  render() {
    const {menuItems, isLoginViewShow} = this.state;
    // const {isUserLoggedIn, userData} = this.props;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={{backgroundColor: Constants.APP_THEME_COLOR}}>
          <Text style={styles.userName}>John Doe</Text>

          <View style={styles.nameContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.email}>+91 9878765432</Text>
              <Text style={styles.email}>johndoe@gmail.com</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.closeDrawer();
                // this.props.navigation.navigate('Registration');
                this.props.navigation.navigate('EditProfile');
              }}
              style={styles.editButton}>
              <Text style={{color: Constants.APP_WHITE_COLOR}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{backgroundColor: Constants.APP_WHITE_COLOR, flex: 1}}>
          <FlatList
            style={styles.list}
            renderItem={this._renderItem}
            data={menuItems}
            extraData={this.state}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    // isUserLoggedIn: state.userReducer.isUserLoggedIn,
    // userData: state.userReducer.userData,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
