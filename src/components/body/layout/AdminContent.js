import React from "react";
import { connect } from "react-redux";
import { changeLayout, toggleSidebar } from "actions/userActions";
import Sidebar from "./Sidebar";
class AdminContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.changeLayout(1);
  }

  render() {
    const { children, style } = this.props;
    return (
      <React.Fragment>
        <div className="admin-content d-flex" style={{ background: "#f5f5f5" }}>
          <Sidebar />
          <div
            className="product-form col-md-9 ms-sm-auto col-lg-10 px-md-4"
            style={{ style }}
          >
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    exam: { header },
  } = state;
  return {
    header,
  };
};

export default connect(mapStateToProps, {
  changeLayout,
  toggleSidebar,
})(AdminContent);
