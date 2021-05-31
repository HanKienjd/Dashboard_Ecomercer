import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/UserInfo.scss";
import TittleUserInfo from "./TittleUserInfo";
import LeftProfile from "./profile/LeftProfile";
import RightProfile from "./profile/RightProfile";
import { getUserInfo } from "actions/userActions";
import UserContent from "../layout/UserContent";
const UserInfo = (props) => {
  if (!props.accessToken && props.isDone) {
    return <Redirect to="/" />;
  } else {
    return (
      <UserContent>
        <div className="UserInfo">
          <TittleUserInfo
            title="Hồ Sơ Của Tôi"
            description="Quản lý thông tin hồ sơ để bảo mật tài khoản"
          />
          <div className="content d-flex">
            <LeftProfile />
            <RightProfile />
          </div>
        </div>
      </UserContent>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const { auth } = state;
  return {
    user: auth.user,
    accessToken: auth.accessToken,
    isDone: auth.isDone,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    getUserInfo,
  })(UserInfo)
);
