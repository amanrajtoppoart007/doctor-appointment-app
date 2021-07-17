import React from 'react';
import {Image, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Modal, Portal} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';

const PreviewImage = ({visible, hideModal, imagePath, onDownload}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <View style={{backgroundColor: '#000'}}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}>
            <Image
              source={{uri: imagePath}}
              style={{height: '100%', marginHorizontal: 8}}
              resizeMode="contain"
            />
          </ImageZoom>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 12,
              top: 24,
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginRight: 36}} onPress={onDownload}>
              <Icon name="download" color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={hideModal}>
              <Icon name="times-circle" color="white" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default PreviewImage;
