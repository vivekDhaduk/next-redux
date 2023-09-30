import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface fakeStoreState {
  loading: boolean;
  products: Product[];
  cart: Product[];
}

const initialState: fakeStoreState = {
  loading: false,
  products: [],
  cart: [],
};

export const getProducts = createAsyncThunk<Product[]>(
  "fakeStore/fetchProducts",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log(response.data, "res");
      return response.data;
    } catch (error) {
      throw error; // You can throw the error to handle it elsewhere
    }
  }
);

export const fakeStoreSlice = createSlice({
  name: "fakestore",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      console.log(action.payload);
      state.cart = [...state.cart, product];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log(state.products);
      });
  },
});

export const loading = (state: { fakeStore: fakeStoreState }) => state.fakeStore.loading;
export const products = (state: { fakeStore: fakeStoreState }) => state.fakeStore.products;
export const cart = (state: { fakeStore: fakeStoreState }) => state.fakeStore.cart;

export const { addToCart } = fakeStoreSlice.actions;

export default fakeStoreSlice.reducer;
