import React from "react";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import { getAvatar, changeLayout } from "actions/userActions";
class UserContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.changeLayout(0);
  }

  render() {
    const { children, marginStyle } = this.props;
    return (
      <React.Fragment>
        <div
          className="user-content"
          style={{
            height: "100%",
            background: "#f5f5f5",
            padding: "70px 0 20px 0",
          }}
        >
          <div className="container">
            <div
              className="wrapper-user-layout"
              style={{
                borderRadius: 6,
                padding: "25px 15px",
                margin: marginStyle || "0 10%",
                background: "#FFF",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  changeLayout,
})(UserContent);
