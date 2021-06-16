import React from "react";
import { connect } from "react-redux";
import { changeLayout } from "actions/userActions";
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
        <div className="main-content" style={{ padding: "50px 0 20px 0" }}>
          <div className="container">{this.props.children}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  changeLayout,
})(MainContent);
