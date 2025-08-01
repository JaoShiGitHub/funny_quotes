import React from "react";

import NavBar from "./layouts/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./contexts/Authentication";

function App(): React.ReactElement {
  return (
    <div className="bg-background text-zinc-100 min-h-screen">
      <LoginPage />
    </div>
  );
}

export default App;
