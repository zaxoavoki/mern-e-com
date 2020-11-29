import jquery from "jquery";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import { positions, Provider as AlertProvider } from "react-alert";
import Alert from "./components/layout/Alert";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
};

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <AlertProvider template={Alert} {...options}>
        <App />
      </AlertProvider>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
