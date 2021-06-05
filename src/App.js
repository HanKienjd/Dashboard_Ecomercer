import React from "react";
import { connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReactNotification from "react-notifications-component";
import myReducer from "./reducers";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./common.scss";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import RouterList from "./components/router/RouterList";
import "bootstrap/dist/css/bootstrap.css";
import "react-notifications-component/dist/theme.css";
import "react-datepicker/dist/react-datepicker.css";
import thunk from "redux-thunk";
import "./css/all.css";
import "./css/base.css";
import "./css/module.css";
import "./css/plugin.css";
import "./css/reponsive.css";
import "./css/style.css";
import "./css/stylechunk.css";
import "./css/products.css";
import "./css/lightbox.min.css";

import ChatBot from "components/chatbot/ChatBot";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(myReducer, enhancer);

function App(props) {
  const history = useHistory();
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <ReactNotification />
          {/* <Header /> */}
          <RouterList />
          {/* <Footer /> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;
