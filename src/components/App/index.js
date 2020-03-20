import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BasicLayout from "../Layout";

function App() {
  return (
    <BrowserRouter>
      <BasicLayout />
    </BrowserRouter>
  );
}

export default App;
