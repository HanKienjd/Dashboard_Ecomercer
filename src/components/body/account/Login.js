import React from "react";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import { Link, Redirect } from "react-router-dom";
import UserContent from "components/body/layout/UserContent";
import "./styles/Login.scss";
import { login } from "actions/userActions";
import { getCookie } from "actions/common/utils";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onBlurNotNull = (key, val, text) => {
    if (!val || val.trim().length === 0) {
      this.setState({ [key]: "Trường này không để để trống" });
    }
  };

  onChangeMax255 = (key, val, error) => {
    if (val && val.length >= 255) {
      this.setState({ [error]: "Bạn nhập quá 255 kí tự" });
      return window.noti.error("Bạn nhập quá 255 kí tự");
    } else {
      this.setState({ [key]: val, [error]: "" });
    }
  };

  submit = (e) => {
    const { email, password, errorPassword, errorUsername } = this.state;
    const isCanSubmit = !errorUsername && !errorPassword;

    if (!isCanSubmit)
      return window.noti.error("Bạn chưa nhập tài khoản hoặc mật khẩu");
    this.props.login(email, password);
  };

  render() {
    const { email, password, errorUsername, errorPassword } = this.state;
    if (getCookie("_accessToken")) {
      return <Redirect to="/" />;
    }
    // const isCanSubmit = !isChecked && !errorName && !erroremail && !errorPassword1 && !errorPassword2 && !errorEmail;
    return (
      <UserContent>
        <div className="wrapper-login d-flex flex-column">
          <h3 className="title-center">Đăng nhập</h3>

          <div className="login-form d-flex flex-column">
            <input
              type="text"
              value={email || ""}
              className={errorUsername ? "error" : ""}
              placeholder="Nhập tài khoản"
              title={errorUsername}
              onChange={(e) =>
                this.onChangeMax255("email", e.target.value, "errorUsername")
              }
              onBlur={(e) =>
                this.onBlurNotNull("errorUsername", e.target.value)
              }
            />
            <input
              type="password"
              value={password || ""}
              className={errorPassword ? "error" : ""}
              placeholder="Nhập mật khẩu"
              title={errorPassword}
              onChange={(e) =>
                this.onChangeMax255("password", e.target.value, "errorPassword")
              }
              onBlur={(e) =>
                this.onBlurNotNull("errorPassword", e.target.value)
              }
            />
            <button
              className="btn btn-info"
              onClick={() => {
                this.submit();
              }}
            >
              Đăng nhập ngay
            </button>
            <div className="hr">
              <span>Hoặc</span>
            </div>
            <Link to="/dang-ky">
              <button
                className="btn btn-outline-info"
                // onClick={}
              >
                Tạo tài khoản mới
              </button>
            </Link>
          </div>
          <Link to="/quen-mat-khau" className="text-center">
            Quên mật khẩu ?
          </Link>
        </div>
      </UserContent>
    );
  }
}

export default connect(null, {
  login,
})(Login);
