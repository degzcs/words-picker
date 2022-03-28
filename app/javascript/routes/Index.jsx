import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sentences from "../containers/Sentences/Index.jsx";
const R = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact component={Sentences} />
        </Routes>
      </Router>
    </>
  );
};

export default R;
