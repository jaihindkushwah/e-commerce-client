import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/reducers/auth.reducer";
import { api } from "./api";

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
