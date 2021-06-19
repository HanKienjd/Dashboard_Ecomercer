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
import Register from "../body/Register";
import UserInfo from "../body/user/UserInfo";
import Login from "components/body/account/Login";
import ForgotPassword from "components/body/account/ForgotPassword";
import ChangePassword from "components/body/account/ChangePassword";
import AdminHome from "components/body/admin/Home/AdminHome";
import HistoryList from "components/body/history/HistoryList";
import CategoryList from "components/body/admin/category/CategoryList";
import CategoryForm from "components/body/admin/category/CategoryForm";
import ProductsList from "components/body/admin/products/ProductsList";
import UserList from "components/body/admin/user_manage/UserList";
import UserForm from "components/body/admin/user_manage/UserForm";

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
        <Route exact path="/thong-tin-ca-nhan" component={UserInfo} />
        <Route exact path="/lich-su" component={HistoryList} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/products/list" component={ProductsList} />
        <Route exact path="/admin/category/list" component={CategoryList} />
        <Route exact path="/admin/category/create" component={CategoryForm} />
        <Route
          exact
          path="/admin/category/detail/:id"
          component={CategoryForm}
        />

        <Route exacts path="/admin/user/list" component={UserList} />
        <Route path="/admin/user/detail/:id" component={UserForm} />
      </Switch>
    );
  }
}

export default connect(null, {
  init,
})(RouterList);
