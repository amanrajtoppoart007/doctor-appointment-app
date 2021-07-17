import React, {useEffect, useContext} from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Images from '../../../config/images';
import {AuthContext} from '../../../utils/authContext';
import {
  getObjectData,
  USER_DATA,
  SPECIALTY_DATA,
  USER_CREDENTIALS,
} from '../../../utils/localStorage';
import {
  storeUserData,
  storeSpecialitsList,
  storeUserCred,
} from '../../../redux/actions';

const Welcome = props => {
  const {navigation} = props;

  const {loginUp} = useContext(AuthContext);

  useEffect(() => {
    getUserData = async () => {
      const userData = await getObjectData(USER_DATA);
      const specialtyData = await getObjectData(SPECIALTY_DATA);
      const userCred = await getObjectData(USER_CREDENTIALS);

      setTimeout(() => {
        props.storeUserCredCall(userCred);
        if (userData?.doctor_id > 0) {
          props.storeUserDataCall(userData);
          if (specialtyData && specialtyData.length > 0) {
            props.storeSpecialitsListCall(specialtyData);
          }
          loginUp({
            doctorId: userData.doctor_id,
            userData: userData,
          });
        } else {
          navigation.navigate('SigninScreen');
        }
      }, 2000);
    };
    getUserData();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Image
          source={Images.appwel}
          resizeMode={'contain'}
          style={{
            width: 200,
            height: 125,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    storeUserDataCall: data => {
      dispatch(storeUserData(data));
    },
    storeSpecialitsListCall: data => {
      dispatch(storeSpecialitsList(data));
    },
    storeUserCredCall: data => {
      dispatch(storeUserCred(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Welcome);
