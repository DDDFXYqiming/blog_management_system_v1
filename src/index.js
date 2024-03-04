import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./router";
// import "./index.scss"
import { Provider } from "react-redux";
import store from "./store";
// 模拟后端数据
import "./mock"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
