import React from "react";
import RouterList from "./RouterList.js";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <SideBar />
      <Router history={history}>
        <RouterList />
      </Router>
    </div>
  );
}

export default App;
