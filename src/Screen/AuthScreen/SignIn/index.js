import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import ProgressLoader from '../../../common/ProgressLoader';
import {
  login,
  forgotPassword,
  forgotPasswordUpdate,
} from '../../../redux/actions';
import {AuthContext} from '../../../utils/authContext';
import {useEffect} from 'react';
import {checkPermission, requestPermission} from '../../../config/common';
import ForgotPasswordModel from '../../../components/models/forgotPassword';
import ForgotPasswordUpdateModel from '../../../components/models/forgotPasswordUpdate';

const SigninScreen = props => {
  const {loginIn} = useContext(AuthContext);

  const [Security, setSecurity] = useState(true);
  const [email, setEmail] = useState(props.userCredData?.email);
  const [password, setPassword] = useState(props.userCredData?.password);
  const [isLoading, setisLoading] = useState(false);

  const [visibleForgotPasswordModel, setVisibleForgotPasswordModel] =
    useState(false);
  const [
    visibleForgotPasswordUpdateModel,
    setVisibleForgotPasswordUpdateModel,
  ] = useState(false);
  const [forgotPwdId, setForgotPwdId] = useState(0);

  const togglePassword = () => {
    if (!Security) {
      setSecurity(true);
    } else {
      setSecurity(false);
    }
  };

  const handleSignIn = () => {
    setisLoading(!isLoading);
    const requestData = {
      email: email,
      password: password,
    };
    props.loginCall(
      requestData,
      response => {
        setisLoading(false);
        loginIn({
          doctorId: response.doctor_id,
          userData: response,
        });
      },
      error => {
        setisLoading(false);
      },
    );
  };

  useEffect(() => {
    checkPermission(response => {
      if (!response) {
        requestPermission();
      }
    });
  }, []);

  const onForgotPasswordInit = email => {
    const requestData = {
      email: email,
    };
    setisLoading(true);
    props.forgotPasswordCall(
      requestData,
      response => {
        setForgotPwdId(response.id);
        setVisibleForgotPasswordModel(false);
        setVisibleForgotPasswordUpdateModel(true);
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  const onForgotPasswordUpdateInit = requestData => {
    setisLoading(true);
    props.forgotPasswordUpdateCall(
      {
        ...requestData,
        id: forgotPwdId,
      },
      response => {
        setForgotPwdId('');
        setVisibleForgotPasswordUpdateModel(false);
        setisLoading(false);
      },
      error => {
        setisLoading(false);
      },
    );
  };

  return (
    <View style={styles.safeContainer}>
      <ImageBackground
        source={require('../../../assets/images/doctorBg.jpeg')}
        style={styles.image}
        blurRadius={3}
        blurType="light"
        blurAmount={3}>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Welcome Back </Text>
            <Text style={styles.titleTextw}>Log in your Acount</Text>
          </View>
          <View style={styles.box02}>
            <View style={[{blurRadius: 2}, styles.inputRoot]}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                autoCorrect={false}
              />
            </View>
            <View style={[{blurRadius: 2}, styles.pwdRoot]}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                autoCorrect={false}
                value={password}
                secureTextEntry={Security}
              />
              <TouchableOpacity
                style={{marginRight: 24}}
                onPress={() => togglePassword()}>
                <Text>show</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[{blurRadius: 2}, styles.submit]}
              onPress={() => handleSignIn()}>
              <Text style={styles.titleTextw}>Continue </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#3d84b8',
              height: 40,
              width: '30%',
              borderRadius: 20,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              marginRight: 30,
              blurRadius: 2,
            }}
            onPress={() => setVisibleForgotPasswordModel(true)}>
            <Text style={{alignSelf: 'center', color: '#fff'}}>
              Forgot Password?{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ProgressLoader
        visible={isLoading}
        isHUD={true}
        isModal={true}
        hudColor={'#FFFFFF'}
        color={'#000000'}
      />
      <ForgotPasswordModel
        visible={visibleForgotPasswordModel}
        hideModal={() => setVisibleForgotPasswordModel(false)}
        onForgotPasswordUpdate={email => onForgotPasswordInit(email)}
      />
      <ForgotPasswordUpdateModel
        visible={visibleForgotPasswordUpdateModel}
        hideModal={() => setVisibleForgotPasswordUpdateModel(false)}
        onForgotPasswordUpdate={data => onForgotPasswordUpdateInit(data)}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userCredData: state.auth.userCred,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginCall: (requestData, onSuccess, onError) => {
      dispatch(login(requestData, onSuccess, onError));
    },
    forgotPasswordCall: (requestData, onSuccess, onError) => {
      dispatch(forgotPassword(requestData, onSuccess, onError));
    },
    forgotPasswordUpdateCall: (requestData, onSuccess, onError) => {
      dispatch(forgotPasswordUpdate(requestData, onSuccess, onError));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
