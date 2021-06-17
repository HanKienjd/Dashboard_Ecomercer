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
      <Route path="/gioi-thieu" component={Intro} />
      <Route path="/tin-tuc" component={News} />
      <Route path="/lien-he" component={Contact} />
    </Switch>
  );
};

export default RouterList;
