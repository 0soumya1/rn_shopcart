import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './slices/ProductSlice';
import WishlistReducer from "./slices/WishlistSlice"
import CartReducer from "./slices/CartSlice"
import AddressReducer from "./slices/AddressSlice"
import OrderReducer from "./slices/OrderSlice"
import EditProfileReducer from "./slices/EditProfileSlice"

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
    address: AddressReducer,
    order: OrderReducer,
    editProfile: EditProfileReducer,
  },
});
