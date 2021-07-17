import {StyleSheet} from 'react-native';
import Constants from '../../../config/constants';
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.75,
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  box01: {
    backgroundColor: Constants.APP_DARK_GREY_TEXT,
    alignContent: 'center',
    justifyContent: 'center',
  },
  box02: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box03: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginHorizontal: 16,
  },

  titleText: {
    marginTop: 70,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  titleTextw: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
  },
  input: {
    fontSize: 17,
    marginLeft: 25,
  },
  inputRoot: {
    height: 50,
    width: '90%',
    marginTop: 50,
    backgroundColor: '#ffffff',
    opacity: 0.6,
    borderRadius: 25,
    justifyContent: 'center',
  },
  pwdRoot: {
    height: 50,
    width: '90%',
    backgroundColor: '#ffffff',
    marginTop: 20,
    opacity: 0.6,
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submit: {
    height: 50,
    width: '90%',
    backgroundColor: '#3d84b8',
    opacity: 0.9,
    borderRadius: 25,
    marginBottom: 5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    marginHorizontal: 16,
  },
  textSign: {
    fontSize: 17,
    fontWeight: '700',
    color: Constants.APP_WHITE_COLOR,
    textAlign: 'right',
    right: 16,
  },
});

export default styles;
