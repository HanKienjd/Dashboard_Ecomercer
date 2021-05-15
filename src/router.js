import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/admin/Home";
import ProductForm from "./components/admin/ProductManage/ProductForm";
function RouterList() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/cms" />
      </Route>
      <Route path="/cms" component={Home} />
      <Route path="/product/form" component={ProductForm} />
    </Switch>
  );
}
export default RouterList;
