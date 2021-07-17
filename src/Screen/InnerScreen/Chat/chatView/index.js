import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {TextInput, TouchableOpacity, View, Text, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import {MessageList} from '../../../../../chat';
import FireChat from '../../../../common/FireChat';
import constants from '../../../../config/constants';
import PreviewImage from '../../../../components/models/previewImage';
import {downloadImage as downloadImageFirebase} from '../../../../config/common';
import DocumentPicker from 'react-native-document-picker';

const ChatView = props => {
  const {data} = props.route.params;

  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [visiblePreviewImage, setVisiblePreviewImage] = useState(false);
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    props.navigation.setOptions({headerTitle: data.name});
    FireChat.shared.getMessages(
      props.userData.doctor_id,
      data.guestUserId,
      response => {
        setMessageList(response);
      },
    );
  }, []);

  const updateNewMessage = () => {
    FireChat.shared.senderMsg(
      newMessage,
      props.userData.doctor_id,
      data.guestUserId,
    );
    FireChat.shared.receiveMsg(
      newMessage,
      props.userData.doctor_id,
      data.guestUserId,
    );
    setNewMessage('');
  };

  const filePicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
        ],
      });
      const {uri, type, name} = result;

      await FireChat.shared.uploadImageToStoarge(
        props.userData.patient_id,
        name,
        uri,
        type,
        uploadedFile => {
          FireChat.shared.senderMsg(
            uploadedFile,
            props.userData.patient_id,
            data.guestUserId,
          );
          FireChat.shared.receiveMsg(
            uploadedFile,
            props.userData.patient_id,
            data.guestUserId,
          );
        },
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Toast.show('User cancelled the picker');
      } else {
        Toast.show('Something went wrong,please try again');
      }
    }
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: 'photo',
    }).then(response => {
      if (response.didCancel) {
        console.log('User cancel image picker');
      } else if (response.error) {
        console.log(' image picker error', response.error);
      } else {
        const filename = response.path.substring(
          response.path.lastIndexOf('/') + 1,
        );
        const uploadUri =
          Platform.OS === 'ios'
            ? response.path.replace('file://', '')
            : response.path;

        FireChat.shared.uploadImageToStoarge(
          props.userData.doctor_id,
          filename,
          uploadUri,
          response.mime,
          response => {
            FireChat.shared.senderMsg(
              response,
              props.userData.doctor_id,
              data.guestUserId,
            );
            FireChat.shared.receiveMsg(
              response,
              props.userData.doctor_id,
              data.guestUserId,
            );
          },
        );
      }
    });
  };

  const downloadImage = () => {
    downloadImageFirebase(imagePath, response => {
      console.log('Success ', response);
    });
  };

  return (
    <View style={{flex: 1}}>
      <MessageList
        lockable={true}
        currentUser={props.userData.doctor_id}
        onPress={(x, i, e) => {
          setVisiblePreviewImage(true);
          setImagePath(x.text);
        }}
        dataSource={messageList}
      />
      <View>
        <TextInput
          placeholder="Type here..."
          multiline={true}
          style={{
            position: 'absolute',
            bottom: '1%',
            paddingHorizontal: 16,
            height: 55,
            borderRadius: 6,
            width: '100%',
            backgroundColor: '#fff',
            borderColor: '#ddd',
            borderWidth: 1,
            paddingRight: '17%',
          }}
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <View
          style={{
            alignSelf: 'flex-end',
            marginRight: 12,
            marginBottom: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[
              {
                marginRight: 12,
                alignSelf: 'center',
              },
              newMessage.length > 0 ? null : {marginBottom: 6},
            ]}
            onPress={() => filePicker()}>
            <Icon
              name="file-alt"
              size={28}
              color={constants.APP_DARK_GREY_TEXT}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                marginRight: 12,
                alignSelf: 'center',
              },
              newMessage.length > 0 ? null : {marginBottom: 6},
            ]}
            onPress={uploadImage}>
            <Icon
              name="camera"
              size={28}
              color={constants.APP_DARK_GREY_TEXT}
            />
          </TouchableOpacity>
          {newMessage.length > 0 && (
            <TouchableOpacity onPress={updateNewMessage}>
              <MaterialCommunityIcons
                name="send-circle"
                size={36}
                color={constants.APP_DARK_GREY_TEXT}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <PreviewImage
        visible={visiblePreviewImage}
        hideModal={() => setVisiblePreviewImage(false)}
        imagePath={imagePath}
        onDownload={downloadImage}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
