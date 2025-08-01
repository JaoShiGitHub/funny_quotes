import React from "react";
import { useAuth } from "./contexts/Authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnAuthenticatedApp";

function App(): React.ReactElement {
  const auth = useAuth();

  return (
    <div className="bg-background text-zinc-100 min-h-screen px-8">
      {auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
