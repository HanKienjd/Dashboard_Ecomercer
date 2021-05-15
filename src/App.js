import React, { Component } from "react";
import RouterList from "./router.js";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <Router>
            <RouterList />
          </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
