/* eslint-disable no-restricted-globals */

import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import AdminContent from "components/body/layout/AdminContent";

const QuestionList = (props) => {
  return <AdminContent></AdminContent>;
};

export default withRouter(QuestionList);
