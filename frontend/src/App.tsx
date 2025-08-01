import React from "react";
import { useAuth } from "./contexts/Authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnAuthenticatedApp";

function App(): React.ReactElement {
  const auth = useAuth();

  return (
    <div className="App">
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
