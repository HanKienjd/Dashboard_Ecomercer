import React from "react";
import { connect } from "react-redux";
import { changeLayout } from "actions/userActions";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
// import "css/all.css";
// import "css/base.css";
// import "css/module.css";
// import "css/plugin.css";
// import "css/reponsive.css";
// import "css/style.css";
// import "css/stylechunk.css";
// import "css/products.css";
// import "css/lightbox.min.css";
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
