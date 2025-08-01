import React from "react";
import { useAuth } from "../contexts/Authentication";

function HomePage(): React.ReactElement {
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div className="text-red-500">
      Welcome to Home Page
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
