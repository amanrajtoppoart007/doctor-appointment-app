import React, {Component} from 'react';
import {View, Animated, StyleSheet, TextInput} from 'react-native';
import {string, func, object, number} from 'prop-types';
import Constants from '../config/constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FloatingLabel extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,
    focus: string.isRequired,
  };

  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {},
    otherTextInputAttributes: {},
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({isFieldActive: true});
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({isFieldActive: false});
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  };

  _onChangeText = updatedValue => {
    const {attrName, updateMasterState} = this.props;
    updateMasterState(attrName, updatedValue);
  };

  _returnAnimatedTitleStyles = () => {
    const {isFieldActive} = this.state;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
    } = this.props;

    return {
      top:
        isFieldActive || this.props.value
          ? -11
          : this.position.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0],
            }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
    };
  };

  render() {
    const {isFieldActive} = this.state;

    return (
      <View style={[Styles.container, this.props.containerStyle]}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[Styles.container, this.props.containerStyle1]}
          onPress={() => {
            this.textInputRef.focus();
          }}>
          <Animated.Text
            style={[
              Styles.titleStyles,
              {marginTop: isFieldActive ? 2 : 3},
              this._returnAnimatedTitleStyles(),
              this.props.titleTextStyle,
            ]}>
            {this.props.title}
          </Animated.Text>
          <TextInput
            ref={ref => {
              this.textInputRef = ref;
              this.props.textInputRef ? this.props.textInputRef(ref) : null;
            }}
            value={this.props.value}
            style={[Styles.textInput, this.props.textInputStyle]}
            underlineColorAndroid={'transparent'}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this._onChangeText}
            onSubmitEditing={() =>
              this.props.onSubmitEditing && this.props.onSubmitEditing()
            }
            keyboardType={this.props.keyboardType}
            returnKeyType={this.props.returnKeyType}
            secureTextEntry={this.props.secureTextEntry}
            multiline={this.props.multiline}
            autoFocus={this.props.autoFocus}
            numberOfLines={this.props.numberOfLines}
            maxLength={this.props.maxLength}
            {...this.props.otherTextInputProps}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    // width: '100%',
    borderRadius: 5,
    height: 50,
    backgroundColor: Constants.APP_WHITE_COLOR,
    borderColor: Constants.APP_GRAY_COLOR,
    borderWidth: 0.7,
  },
  textInput: {
    // marginTop: 15,

    color: 'rgb(24,24,24)',
    marginHorizontal: 10,
    fontSize: 16,
    // backgroundColor: 'red',
    // height: 35,
  },
  titleStyles: {
    position: 'absolute',
    fontSize: 20,
    color: Constants.APP_THEME_COLOR,
    marginHorizontal: 10,
    marginTop: 0,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
});
