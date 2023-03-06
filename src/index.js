import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./routes";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
