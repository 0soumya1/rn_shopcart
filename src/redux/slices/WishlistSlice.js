import {createSlice} from '@reduxjs/toolkit';

const WishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    wishListData: [],
  },
  reducers: {
    setWishListData: (state, action) => {
      let tempData = state.wishListData;
      tempData.push(action.payload);
      state.wishListData = tempData;
    },
  },
});

export const {setWishListData} = WishListSlice.actions;
export default WishListSlice.reducer;
