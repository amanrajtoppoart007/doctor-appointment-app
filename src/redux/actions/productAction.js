import Toast from 'react-native-simple-toast';

import {authApi} from '../api/apiConfig';
import {
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_ITEMS,
  SAVE_TO_CART,
  GET_CART_ITEMS,
  CART_ITEM_DECREMENT,
  CART_CHECKOUT,
  ORDER_PLACE,
  ORDER_HISTORY,
} from '../api';
import {
  PRODUCT_CATEGORY,
  PRODUCT_ITEM,
  CART_ITEMS,
  ORDER_HISTORY_DATA,
} from '../types/productTypes';

export const category = (onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_PRODUCT_CATEGORY)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data);
          dispatch(storeCategoryData(response.data?.message));
        } else {
          onError(response.data);
          Toast.show(response.data, Toast.LONG);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const productItems = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_PRODUCT_ITEMS, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data);
          dispatch(storeProductItemData(response.data?.message));
        } else {
          onError(response.data);
          Toast.show(response.data, Toast.LONG);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const productItemsSave = (requestData, onSuccess, onError) => {
  var cartUrl = SAVE_TO_CART;
  if (requestData.actionCount === 1) {
    cartUrl = CART_ITEM_DECREMENT;
  } else {
    cartUrl = SAVE_TO_CART;
  }
  return dispatch => {
    authApi
      .post(cartUrl, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const cartItems = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(GET_CART_ITEMS, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data);
          dispatch(storeCartItemsData(response.data?.message));
        } else {
          onError(response.data);
          dispatch(storeCartItemsData([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const cartCheckout = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(CART_CHECKOUT, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const orderPlace = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(ORDER_PLACE, requestData)
      .then(response => {
        if (response.status === 200) {
          onSuccess(response.data);
          Toast.show(response.data.status, Toast.LONG);
        } else {
          onError(response.data);
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const getOrderHistory = (requestData, onSuccess, onError) => {
  return dispatch => {
    authApi
      .post(ORDER_HISTORY, requestData)
      .then(response => {
        if (
          response.status === 200 &&
          typeof response.data?.message !== 'string' &&
          response.data?.message.length > 0
        ) {
          onSuccess(response.data);
          dispatch(storeOrderHistoryData(response.data?.message));
        } else {
          onError(response.data);
          dispatch(storeOrderHistoryData([]));
        }
      })
      .catch(error => {
        onError(error);
        Toast.show(error.message, Toast.LONG);
      });
  };
};

export const storeProductItemData = productItems => {
  return {
    type: PRODUCT_ITEM,
    payload: productItems,
  };
};

export const storeCategoryData = productCategory => {
  return {
    type: PRODUCT_CATEGORY,
    payload: productCategory,
  };
};

export const storeCartItemsData = cartItems => {
  return {
    type: CART_ITEMS,
    payload: cartItems,
  };
};

export const storeOrderHistoryData = orderHistory => {
  return {
    type: ORDER_HISTORY_DATA,
    payload: orderHistory,
  };
};
