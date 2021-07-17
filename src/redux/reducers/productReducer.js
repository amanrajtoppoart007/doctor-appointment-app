import {dropdownListConvert} from '../../config/common';
import {
  PRODUCT_CATEGORY,
  PRODUCT_ITEM,
  CART_ITEMS,
  ORDER_HISTORY_DATA,
} from '../types/productTypes';

const initialState = {
  category: [],
  productItems: [],
  cartItems: [],
  orderHistory: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY:
      return {
        ...state,
        category: dropdownListConvert(
          action.payload,
          'category_name',
          'category_id',
        ),
      };
    case PRODUCT_ITEM:
      return {
        ...state,
        productItems: action.payload,
      };
    case CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case ORDER_HISTORY_DATA:
      return {
        ...state,
        orderHistory: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
