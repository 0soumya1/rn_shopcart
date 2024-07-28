import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './slices/ProductSlice';
import WishlistReducer from "./slices/WishlistSlice"
import CartReducer from "./slices/CartSlice"

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    wishlist: WishlistReducer,
    cart: CartReducer,
  },
});
