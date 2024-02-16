import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productReducer, { productsFetch } from "./features/productSlice.js";
import { productsApi } from "./features/productApi.js";

const store = configureStore({
  reducer: {
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(productsFetch());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
