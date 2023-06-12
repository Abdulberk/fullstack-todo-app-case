import { configureStore } from '@reduxjs/toolkit';
import {todosApi} from '../api/todosApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import todosReducer from './slices/todoSlice';


export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    todos: todosReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);



