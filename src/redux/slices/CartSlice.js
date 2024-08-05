import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData: [],
  },
  reducers: {
    setCartData: (state, action) => {
      let tempData = state.cartData;
      let isItemExist = false;
      tempData.map(item => {
        if (item?.id === action?.payload?.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }
      state.cartData = tempData;
    },
    reduceCartData: (state, action) => {
      let tempData = state.cartData;
      tempData.map(item => {
        if (item?.id === action?.payload?.id) {
          item.qty = item.qty - 1;
        }
      });
      state.cartData = tempData;
    },
    removeCartData: (state, action) => {
      let tempData = state.cartData;
      tempData.splice(action.payload, 1);
      state.cartData = tempData;
    },
    emptyCart: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const {setCartData, reduceCartData, removeCartData, emptyCart} = CartSlice.actions;
export default CartSlice.reducer;
