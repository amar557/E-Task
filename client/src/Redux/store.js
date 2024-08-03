import cartSlice from "./cart.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

// import { version } from "react";
const rootReducer = combineReducers({ cartSlice });
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const persistedreducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
export const persistor = persistStore(store);
