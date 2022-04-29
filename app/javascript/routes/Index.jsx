import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Sentences from "../containers/Sentences/Index.jsx";
import Sentence from "../components/Sentence/Index.jsx";

const ARoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/" exact
            element={<Sentences />}
          />
          <Route
            path="/sentences/:id"
            exact
            element={<Sentence/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ARoutes;
