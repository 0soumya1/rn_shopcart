import {createSlice} from '@reduxjs/toolkit';

const AddressSlice = createSlice({
  name: 'address',
  initialState: {
    addressData: [],
  },
  reducers: {
    setAddressData: (state, action) => {
      state?.addressData?.push(action.payload);
    },
    deleteAddress: (state, action) => {
      let newArr = state?.addressData?.filter(item => {
        return item?.id != action.payload;
      });
      state.addressData = newArr;
    },
    updateAddress: (state, action) => {
      let temp = state?.addressData;
      temp.map(item => {
        if (item?.id == action.payload.id) {
          item.location = action.payload.location;
          item.city = action.payload.city;
          item.state = action.payload.state;
          item.pincode = action.payload.pincode;
          item.type = action.payload.type;
        }
      });
      state.addressData = temp;
    },
  },
});

export const {setAddressData, deleteAddress, updateAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
