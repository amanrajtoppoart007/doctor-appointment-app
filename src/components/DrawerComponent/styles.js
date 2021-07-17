import {StyleSheet} from 'react-native';
import Constants from '../../config/constants';

const styles = StyleSheet.create({
  safeContainer: {flex: 1, backgroundColor: Constants.APP_THEME_COLOR},
  container: {
    // justifyContent: 'space-evenly',
    flex: 1,
    marginLeft: 10,
  },
  text: {fontSize: 14},
  userName: {
    marginTop: 20,
    fontSize: 20,
    color: Constants.APP_WHITE_COLOR,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 5,
    fontSize: 14,
    color: 'rgba(255,255,255,0.95)',
  },
  line: {
    height: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    // width: 100,
  },
  menuItem: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 15,
  },
  list: {
    marginVertical: 10,
    marginBottom: 20,
    // marginHorizontal: 15,
    flex: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    marginLeft: 15,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Constants.APP_WHITE_COLOR,
  },
  nameContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Constants.APP_WHITE_COLOR,
    marginRight: 15,
  },
});

export default styles;
