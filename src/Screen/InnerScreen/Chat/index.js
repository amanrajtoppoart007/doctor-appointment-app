import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {ChatItem} from '../../../../chat';
import FireChat from '../../../common/FireChat';

const ChatScreen = props => {
  const [chatList, setChatList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    FireChat.shared.getUserChatList(props.userData.doctor_id, response => {
      setChatList(response);
    });
  }, []);

  const renderChatList = ({item}) => {
    return (
      <ChatItem
        avatar={require('../../../assets/images/man.png')}
        title={item.name}
        subtitle={item.message}
        date={new Date()}
        onClick={() =>
          props.navigation.navigate('ChatView', {
            data: {
              ...item,
            },
          })
        }
        unread={0}
      />
    );
  };

  const EmptyDoctors = () => {
    return (
      <Text
        style={{
          textAlign: 'center',
          justifyContent: 'center',
          marginTop: '75%',
        }}>
        No Conversations Available
      </Text>
    );
  };

  const getConversationList = () => {};

  return (
    <View>
      <FlatList
        data={chatList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderChatList}
        ListEmptyComponent={<EmptyDoctors />}
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={isLoading}
            onRefresh={getConversationList}
          />
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
