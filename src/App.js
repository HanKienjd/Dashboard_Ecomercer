import React from "react";
import { connect } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReactNotification from "react-notifications-component";
import myReducer from "./reducers";
import "./common.scss";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import RouterList from "./components/router/RouterList";
import "react-notifications-component/dist/theme.css";
import "react-datepicker/dist/react-datepicker.css";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(myReducer, enhancer);

function App(props) {
  const history = useHistory();
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <ReactNotification />
          <RouterList />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
