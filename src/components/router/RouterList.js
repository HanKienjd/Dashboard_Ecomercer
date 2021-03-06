import React from "react";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import { logout, changeLayout, init } from "actions/userActions";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { getCookie } from "actions/common/utils";
import Register from "../body/account/Register";
import Login from "components/body/account/Login";
import ForgotPassword from "components/body/account/ForgotPassword";
import ChangePassword from "components/body/account/ChangePassword";
import AdminHome from "components/body/admin/Home/AdminHome";
import CategoryList from "components/body/admin/category/CategoryList";
import CategoryForm from "components/body/admin/category/CategoryForm";
import ProductsList from "components/body/admin/products/ProductsList";
import ProductsForm from "components/body/admin/products/ProductsForm";
import UserList from "components/body/admin/user_manage/UserList";
import UserForm from "components/body/admin/user_manage/UserForm";
import AdvantismentList from "components/body/admin/advantisment/AdvantismentList";
import AdvantismentForm from "components/body/admin/advantisment/AdvantismentForm";
import OrderList from "components/body/admin/order/OrderList";
import Profile from "components/body/account/Profile";
class RouterList extends React.Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    const accessToken = getCookie("_accessToken");
    return (
      <Switch>
        <Route exact path="/">
          {accessToken ? <Redirect to="/admin" /> : <Login />}
        </Route>
        <Route exact path="/dang-ky" component={Register} />
        <Route exact path="/dang-nhap" component={Login} />
        <Route exact path="/quen-mat-khau" component={ForgotPassword} />
        <Route exact path="/doi-mat-khau" component={ChangePassword} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/products/list" component={ProductsList} />
        <Route path="/admin/products/edit/:id" component={ProductsForm} />
        <Route path="/admin/products/create" component={ProductsForm} />
        <Route exact path="/admin/category/list" component={CategoryList} />
        <Route exact path="/admin/category/create" component={CategoryForm} />
        <Route exact path="/admin/category/edit/:id" component={CategoryForm} />

        <Route exact path="/admin/user/list" component={UserList} />
        <Route path="/admin/user/detail/:id" component={UserForm} />
        <Route path="/admin/advantisment/list" component={AdvantismentList} />
        <Route path="/admin/advantisment/create" component={AdvantismentForm} />
        <Route path="/admin/order/list" component={OrderList} />
        <Route path="/admin/setting/profile" component={Profile} />
      </Switch>
    );
  }
}

export default connect(null, {
  init,
})(RouterList);
