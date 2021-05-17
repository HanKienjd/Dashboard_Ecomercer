import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/admin/Home";
import ProductForm from "./components/admin/ProductManage/ProductForm";
import ProductCreate from "./components/admin/ProductManage/ProductCreate";
import Login from "./components/admin/Auth/Login";
function RouterList() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/cms" />
      </Route>
      <Route path="/cms" component={Home} />
      <Route path="/product/form" component={ProductForm} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}
export default RouterList;
