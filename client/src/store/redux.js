import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
// import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

// export const persistor = persistStore(store);
