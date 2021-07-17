import {StyleSheet} from 'react-native';
import Constants from '../../../config/constants';
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  box: {justifyContent: 'center', alignContent: 'center', alignItems: 'center'},
  box01: {
    flex: 0.1,
    marginTop: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  box02: {
    flex: 0.9,
    marginTop: 10,
  },

  searchbox: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    paddingLeft: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Constants.APP_GRAY_COLOR,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'left',
    marginVertical: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: Constants.APP_THEME_COLOR_DARK,
    borderRadius: 50,
    borderColor: Constants.APP_THEME_COLOR_DARK,
    borderWidth: 5,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
