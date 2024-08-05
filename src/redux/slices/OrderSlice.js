import {createSlice} from '@reduxjs/toolkit';

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    orderData: [],
  },
  reducers: {
    setOrderData: (state, action) => {
      state?.orderData?.push(action.payload);
    },
  },
});

export const {setOrderData} = OrderSlice.actions;
export default OrderSlice.reducer;
