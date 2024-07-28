import {createSlice} from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'productList',
  initialState: {
    productData: [],
    isLoading: false,
  },
  reducers: {
    setProductData:(state, action) => {
      state.productData = action.payload;
    },
  },
});

export const {setProductData} = ProductSlice.actions
export default ProductSlice.reducer
