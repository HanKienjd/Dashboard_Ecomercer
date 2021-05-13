import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/admin/Home";
function RouterList() {
  return (
    <Router>
      <Switch>
        <Redirect path="/" to="cms" />
        <Route path="/cms" component={Home} />
      </Switch>
    </Router>
  );
}
export default RouterList;
