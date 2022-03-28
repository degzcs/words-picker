import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sewntences from "../containers/Sentences/Index.jsx";
const Routes = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Sentences} />
          />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Routes;
