import React from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./css/all.css";
import "./css/base.css";
import "./css/bootstrap.css";
import "./css/module.css";
import "./css/products.css";
import "./css/reponsive.css";
import "./css/style.css";
import "./css/stylechunk.css";
import "./css/plugin.css";

import RouterList from "./router";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <RouterList />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
