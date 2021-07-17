import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  BackHandler,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {OTSession, OTPublisher, OTSubscriber} from 'opentok-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {VONAGE_API_KEY} from '../../../../redux/api';
import Strings from '../../../../config/strings';
import Styles from './style.videoConference';
import constants from '../../../../config/constants';

class VideoConference extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // VideoStream Variables
      videoStreamStatus: Strings.waitingForPatient,
      videoStreamConnected: false,
      publisherCreated: true,
      subscriberDisabled: false,

      // OT Properties
      OTPublisherProperties: {
        publishAudio: true,
        publishVideo: true,
        videoSource: 'camera',
        cameraPosition: 'front',
      },
      OTSessionOptions: {
        connectionEventsSuppressed: true,
        androidZOrder: 'onTop',
        useTextureViews: true,
      },
      OTSubscriberProperties: {},

      // Indicator Variables
      indicatorStatus: false,
      indicatorText: null,
    };

    this.videoStreamEventHandlers();
    this.videoStreamBindActions();
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleHardwareBackClick,
    );
  };

  videoStreamEventHandlers = () => {
    this.OTSessionEventHandlers = {
      streamCreated: event => {
        console.log(event);
      },

      streamDestroyed: event => {
        console.log(event);
      },

      sessionConnected: event => {
        console.log(event);
      },
    };

    this.OTPublisherEventHandlers = {
      error: error => {
        console.log(error);
      },

      streamCreated: event => {
        console.log(event);
        this.setState({
          publisherCreated: false,
        });
      },

      streamDestroyed: event => {},
    };

    this.OTSubscriberEventHandlers = {
      error: error => {
        console.log(error);
      },

      otrnError: error => {},

      connected: () => {
        this.setState({
          videoStreamConnected: true,
          videoStreamStatus: this.state.subscriberDisabled
            ? ''
            : Strings.connected,
        });
      },

      videoEnabled: data => {
        this.setState({
          subscriberDisabled: false,
        });

        if (!this.state.videoStreamConnected) {
          this.setState({
            videoStreamConnected: true,
            videoStreamStatus: data.stream.hasVideo ? Strings.connected : '',
            subscriberDisabled: !data.stream.hasVideo,
          });
        }
      },

      videoDisabled: data => {
        this.setState({
          subscriberDisabled: true,
          videoStreamStatus: '',
        });
      },

      disconnected: () => {
        this.setState({
          videoStreamConnected: false,
          subscriberDisabled: false,
          videoStreamStatus: Strings.waitingForPatient,
        });
      },
    };
  };

  videoStreamBindActions = () => {
    this.handleHardwareBackClick = this.handleHardwareBackClick.bind(this);

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleHardwareBackClick,
    );
  };

  handleHardwareBackClick() {
    this.videoStreamDisconnect();

    return true;
  }

  videoStreamDisconnect = () => {
    Alert.alert(Strings.endConfirmation, Strings.endConfirmationDesc, [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.props.navigation.pop();
        },
      },
    ]);
  };

  videoStreamTopActions = () => {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={Styles.videoStreamTopActions}
        colors={[constants.modalBackground, constants.transparent]}>
        <>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={constants.APP_WHITE_COLOR}
            onPress={() => {
              this.videoStreamDisconnect();
            }}
          />
          <Text style={Styles.providerNameStyle}>
            {this.props.selectedAppointment.patientname}
          </Text>
          <View style={Styles.videoStreamTopActionsOptions}>
            <MaterialIcons
              name="flip-camera-ios"
              size={26}
              color={constants.APP_WHITE_COLOR}
              onPress={() => {
                this.handleCameraPosition();
              }}
            />
          </View>
        </>
      </LinearGradient>
    );
  };

  handleCameraPosition = () => {
    const {OTPublisherProperties} = this.state;
    if (OTPublisherProperties.cameraPosition === 'back') {
      this.setState({
        OTPublisherProperties: {
          ...OTPublisherProperties,
          cameraPosition: 'front',
        },
      });
    } else {
      this.setState({
        OTPublisherProperties: {
          ...OTPublisherProperties,
          cameraPosition: 'back',
        },
      });
    }
  };

  videoStreamLoader = () => {
    const {
      publisherCreated,
      subscriberDisabled,
      videoStreamConnected,
      videoStreamStatus,
    } = this.state;
    if (publisherCreated) {
      return (
        <View style={Styles.viewRow}>
          <ActivityIndicator size="large" color={constants.APP_WHITE_COLOR} />
          <Text style={Styles.connectingTextStyle}>{Strings.connecting}</Text>
        </View>
      );
    } else if (subscriberDisabled || !videoStreamConnected) {
      return (
        <>
          <MaterialIcons
            name="person"
            size={constants.SCREEN_HEIGHT * 0.25}
            color={constants.APP_WHITE_COLOR}
          />
          <Text style={Styles.conferenceStatusText}>{videoStreamStatus}</Text>
        </>
      );
    }
  };

  handleVideoStreamPublisherAudio = () => {
    const {OTPublisherProperties} = this.state;
    this.setState({
      OTPublisherProperties: {
        ...OTPublisherProperties,
        publishAudio: !OTPublisherProperties.publishAudio,
      },
    });
  };

  handleVideoStreamPublisherVideo = () => {
    const {OTPublisherProperties, OTSessionOptions} = this.state;
    this.setState({
      OTPublisherProperties: {
        ...OTPublisherProperties,
        publishVideo: !OTPublisherProperties.publishVideo,
      },
    });
  };

  videoStreamBottomActions = () => {
    const {OTPublisherProperties} = this.state;
    return (
      <>
        <View style={Styles.videoStreamBottomActions}>
          <TouchableOpacity
            onPress={() => {
              this.handleVideoStreamPublisherAudio();
            }}>
            <View style={Styles.videoStreamBottomActionsIcon}>
              <FontAwesome5
                name={
                  OTPublisherProperties.publishAudio
                    ? 'microphone'
                    : 'microphone-slash'
                }
                size={22}
                color={constants.APP_BLACK_COLOR}
                light
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.videoStreamDisconnect();
            }}>
            <View
              style={[Styles.videoStreamBottomActionsIcon, Styles.callEndIcon]}>
              <MaterialIcons
                name="call-end"
                size={28}
                color={constants.APP_WHITE_COLOR}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.handleVideoStreamPublisherVideo();
            }}>
            <View style={Styles.videoStreamBottomActionsIcon}>
              <FontAwesome5
                name={
                  OTPublisherProperties.publishVideo ? 'video' : 'video-slash'
                }
                size={20}
                color={constants.APP_BLACK_COLOR}
                light
              />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    const {
      publisherCreated,
      subscriberDisabled,
      videoStreamConnected,
      OTPublisherProperties,
      OTSessionOptions,
      OTSubscriberProperties,
    } = this.state;
    return (
      <>
        <OTSession
          apiKey={VONAGE_API_KEY}
          sessionId={this.props.selectedAppointment.session_id}
          token={this.props.selectedAppointment.token_id}
          options={OTSessionOptions}
          eventHandlers={this.OTSessionEventHandlers}>
          <OTPublisher
            properties={OTPublisherProperties}
            eventHandlers={this.OTPublisherEventHandlers}
            style={Styles.publisherView}
          />
          <OTSubscriber
            properties={OTSubscriberProperties}
            eventHandlers={this.OTSubscriberEventHandlers}
            style={Styles.subscriberView}
          />
        </OTSession>

        {(publisherCreated || subscriberDisabled || !videoStreamConnected) && (
          <View style={Styles.subscriberDisabledView}>
            {this.videoStreamLoader()}
          </View>
        )}

        {this.videoStreamTopActions()}
        {this.videoStreamBottomActions()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAppointment: state.appointment.selectedAppointment,
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps, null)(VideoConference);
