import { Route, Routes } from "react-router-dom";
import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function UnauthenticatedApp(): React.ReactElement {
  return (
    <div className="AuthenticatedApp">
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
