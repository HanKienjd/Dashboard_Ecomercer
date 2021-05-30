import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import RouterList from "./router";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import "./css/all.css";
import "./css/base.css";
import "./css/module.css";
import "./css/plugin.css";
import "./css/reponsive.css";
import "./css/style.css";
import "./css/stylechunk.css";
import "./css/products.css";
import "./css/lightbox.min.css";

class App extends React.Component {
  render() {
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
}

export default App;
