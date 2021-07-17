import {Alert, Dimensions, Platform, PixelRatio} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import Constants from './constants';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const PERMISSONS_LIST = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
];

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

// Method to check object is empty/null
export function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) {
    return true;
  }

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) {
    return false;
  }
  if (obj.length === 0) {
    return true;
  }

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') {
    return true;
  }

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

//Method to check if the given dictionaries are sam
export function isEqualDictionaries(map1, map2) {
  var testVal;
  if (map1.size !== map2.size) {
    return false;
  }
  for (var [key, val] of map1) {
    testVal = map2.get(key);
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
}

// Method to show single alert message with 'OK' callback
export function showSingleAlert(alertMessage, okText, callbackFunction) {
  setTimeout(function () {
    Alert.alert(Constants.APP_NAME, alertMessage, [
      {
        text: okText ? okText : 'Ok',
        onPress: () => {
          callbackFunction ? callbackFunction() : null;
        },
      },
    ]);
  }, 100);
}

// Method to show alert with callback
export function showAlertWithCallback(
  titleMessage,
  okText,
  cancelText,
  okCallbackFunction,
  cancelCallbackFunction,
) {
  setTimeout(function () {
    Alert.alert(
      Constants.APP_NAME,
      titleMessage,
      [
        {
          text: cancelText,
          style: 'cancel',
          onPress: () => {
            cancelCallbackFunction ? cancelCallbackFunction() : null;
          },
        },
        {
          text: okText,
          onPress: () => {
            okCallbackFunction ? okCallbackFunction() : null;
          },
        },
      ],
      {cancelable: true},
    );
  }, 100);
}

//Check if the email is valid or not
export function checkEMailValidation(email) {
  //var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
  return re.test(email);
}

//Check if the phone number is valid or not
export function checkPhoneNumberValid(phone) {
  if (phone.match(/(^[0-9( )+-]*)$/)) {
    return true;
  }
  return false;
}

//Format phone number
export function formatMobileNumber(text) {
  var cleaned = ('' + text).replace(/\D/g, '');
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? '+1 ' : '',
      number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join(
        '',
      );
    return number;
  }
  return text;
}

//Check if password is valid or not
//Min 8 letter with at least a special char, upper and lower case, letters and a number
export function checkPasswordValid(password) {
  if (password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
    return true;
  }
  return false;
}

//check if username is valid
export function checkUserNameValid(name) {
  if (
    name.match(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/)
  ) {
    return true;
  }
  return false;
}

//check if password format is valid
export function checkPasswordFormatValid(password) {
  if (password.match(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
    return true;
  }
  return false;
}

export const convertFormData = body => {
  var data = new FormData();
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

export const isValidHttpUrl = string => {
  var regex =
    /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(string)) {
    return false;
  } else {
    return true;
  }
};

export const dropdownListConvert = (data, label, value) => {
  return data.map(item => {
    if (label) {
      if (item[label] === null) {
        return {
          label: '',
          value: '',
        };
      }
      return {
        label: item[label].toString(),
        value: item[value].toString(),
      };
    }
    return {
      label: item.toString(),
      value: item.toString().toLowerCase(),
    };
  });
};

export const normalize = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const findSpecialty = (specalityList, specalityId) => {
  return specalityList[_.findIndex(specalityList, {specialty_id: specalityId})];
};

export const timingCalculation = (startTime, endTime) => {
  const hours = [];

  for (let hour = startTime; hour < endTime; hour++) {
    hours.push(moment({hour}).format('h:mm A'));
  }

  return dropdownListConvert(hours);
};

export const requestPermission = () => {
  try {
    checkPermission(response => {
      if (!response) {
        PermissionsAndroid.requestMultiple(PERMISSONS_LIST);
      }
    });
  } catch (err) {
    console.warn(err);
  }
};

export const checkPermission = onSuccess => {
  PermissionsAndroid.check(PERMISSONS_LIST[0] && PERMISSONS_LIST[1]).then(
    response => {
      onSuccess(response);
    },
  );
};

export const downloadBase64ToImage = (imageUrl, onResponse) => {
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  console.log(PictureDir);
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: PictureDir,
    },
  };

  config(options)
    .fetch('GET', imageUrl)
    .then(res => {
      console.log('The file saved to ', res.path());
    });
};

export const downloadImage = image_URL => {
  var date = new Date();
  var ext = getExtention(image_URL);
  ext = '.' + ext[0].split('?')[0];
  const {config, fs} = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      Alert.alert('Image Downloaded Successfully.');
    });
};

export const getExtention = filename => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};
