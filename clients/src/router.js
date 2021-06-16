import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Intro from "./components/pages/Intro";
import Contact from "./components/pages/Contact";
import News from "./components/pages/News";

const RouterList = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Router path="/gioi-thieu" component={Intro} />
      <Router path="/tin-tuc" component={News} />
      <Router path="/lien-he" component={Contact} />
    </Switch>
  );
};

export default RouterList;
