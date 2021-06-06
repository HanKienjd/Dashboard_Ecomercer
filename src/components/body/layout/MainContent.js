import React from "react";
import { connect } from "react-redux";
import * as CommonIcon from "components/icons/common";
import Breadcumb from "../../common/Breadcumb";
import RouterList from "../../router/RouterList";
import { getAvatar, changeLayout } from "actions/userActions";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.changeLayout(0);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="main-content" style={{ padding: "50px 0 20px 0" }}>
          <div className="container">{this.props.children}</div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  changeLayout,
})(MainContent);
