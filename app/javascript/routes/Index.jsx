import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Sentenses from "../containers/Sentenses/Index.jsx";
import Sentense from "../components/Sentense/Index.jsx";

const ARoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/" exact
            element={<Sentenses />}
          />
          <Route
            path="/sentenses/:id"
            exact
            element={<Sentense/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default ARoutes;
