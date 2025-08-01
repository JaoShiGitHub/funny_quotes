import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./HomePage";

function AuthenticatedApp(): React.ReactElement {
  return (
    <div className="AuthenticatedApp">
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
