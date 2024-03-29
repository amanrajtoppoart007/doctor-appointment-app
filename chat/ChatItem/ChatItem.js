import React, { Component } from 'react';
import styles from './ChatItemStyle.js';

import Avatar from '../Avatar/Avatar';

import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';

export class ChatItem extends Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onClick}>
                <View
                    style={styles.rceContainerCitem}
                    onContextMenu={this.props.onContextMenu}>
                    <View style={styles.rceCitem}>
                        <View style={styles.rceCitemAvatar}>
                            <Avatar
                                src={this.props.avatar}
                                alt={this.props.alt}
                                letterItem={this.props.letterItem}
                                sideElement={
                                    this.props.statusColor &&
                                    <View
                                        style={[styles.rceCitemStatus, { backgroundColor: this.props.statusColor }]}>
                                        <Text>
                                            {this.props.statusText}
                                        </Text>
                                    </View>
                                }
                                type={'circle' && { 'flexible': this.props.avatarFlexible }} />
                        </View>

                        <View style={styles.rceCitemBody}>
                            <View style={styles.rceCitemBodyTop}>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={styles.rceCitemBodyTopTitle}>
                                    {this.props.title}
                                </Text>
                                {/* <Text
                                    style={styles.rceCitemBodyTopTime}
                                    ellipsizeMode='tail'
                                    numberOfLines={1}>
                                    {
                                        this.props.date &&
                                        !isNaN(this.props.date) &&
                                        (
                                            this.props.dateString ||
                                            (this.props.date).toString()
                                        )
                                    }
                                </Text> */}
                            </View>

                            <View style={styles.rceCitemBodyBottom}>
                                <Text
                                    ellipsizeMode='tail'
                                    numberOfLines={1}
                                    style={[styles.rceCitemBodyTopTitle, { color: 'rgb(120,120,120)' }]}>
                                    {this.props.subtitle}
                                </Text>
                                {
                                    this.props.unread > 0 &&
                                    <View
                                        style={styles.rceCitemBodyBottomStatus}>
                                        <Text
                                            style={styles.rceCitemBodyBottomStatusText}>
                                            {this.props.unread}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

ChatItem.defaultProps = {
    id: '',
    onClick: null,
    avatar: '',
    avatarFlexible: false,
    alt: '',
    title: '',
    subtitle: '',
    date: new Date(),
    unread: 0,
    statusColor: null,
    statusText: null,
    dateString: null,
}

export default ChatItem;
