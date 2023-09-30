'use client';

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Features/counter/counterSlice';
import fakeStoreSlice from './Features/fakeStore/fakeStoreSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        fakeStore: fakeStoreSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;