import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Authentication } from "./store/Context-provider";
import { SearchInputValue } from "./store/SearchInput-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SearchInputValue>
    <Authentication>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </Authentication>
  </SearchInputValue>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
