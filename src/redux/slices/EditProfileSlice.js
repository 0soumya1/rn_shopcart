import {createSlice} from '@reduxjs/toolkit';

const EditProfileSlice = createSlice({
    name: 'editProfile',
    initialState: {
      editProfileData: [],
    },
    reducers: {
      updateProfile: (state, action) => {
        let temp = state?.editProfileData;
        temp.map(item => {
            console.log("11111----------", item);
            
          if (item?.id == action.payload.id) {
            item.name = action.payload.name;
            item.email = action.payload.email;
            item.phoneNumber = action.payload.phoneNumber;
          }
        });
        state.editProfileData = temp;
      },
    },
  });
  
  export const {updateProfile} = EditProfileSlice.actions;
  export default EditProfileSlice.reducer;