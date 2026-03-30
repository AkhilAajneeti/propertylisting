import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <ToastContainer position="top-right" autoClose={3000} />
        </HelmetProvider>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
