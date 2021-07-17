import {
    StyleSheet,
} from 'react-native';
import { normalize } from '../../src/config/common';

export default StyleSheet.create({
    rceContainerMbox: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },

    rceMbox: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        marginLeft: 20,
        marginRight: 5,
        marginTop: 12,
        flexDirection: 'column',
        marginBottom: 3,
        paddingVertical: 10,
        paddingLeft: 9,
        paddingRight: 9,
        minWidth: '30%',
        maxWidth: '80%',
        alignSelf: 'flex-start'
    },

    rceMboxBody: {
        margin: 0,
        padding: 0,
        position: 'relative',
    },

    rceMboxRight: {
        marginLeft: 5,
        marginRight: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 5,
        alignSelf: 'flex-end'
    },

    rceMboxText: {
        fontSize: 13.6,
        marginRight: 12
    },

    rceMboxTime: {
        position: 'absolute',
        right: -4,
        bottom: normalize(-8),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },

    rceMboxTimeText: {
        textAlign: 'right',
        color: '#777',
        fontSize: normalize(12)
    },

    rceMboxTimeBlock: {
        right: 0,
        bottom: 0,
        left: 0,
        marginRight: -6,
        marginLeft: -6,
        paddingTop: 5,
        paddingRight: 3,
        paddingBottom: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },

    rceMboxClearPadding: {
        paddingBottom: 3,
    },

    rceMboxRceMboxClearNotch: {
        borderRadius: 5,
    },

    rceMboxTitle: {
        margin: 0,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    rceMboxTitleAvatar: {
        display: 'flex',
        marginRight: 5,
    },

    rceMboxTitleText: {
        fontWeight: '500',
        fontSize: 13,
        color: '#4f81a1'
    },

    rceMboxTitleClear: {
        marginBottom: 5,
    },

    rceMboxStatus: {
        textAlign: 'right',
        marginLeft: 3,
        color: '#999'
    },

    rceMboxTitleRceAvatarContainer: {
        marginRight: 5,
    },

});
