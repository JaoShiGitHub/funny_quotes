import React from "react";
import { useAuth } from "../contexts/Authentication";
import NavBar from "../layouts/NavBar";
import SearchBar from "../components/SearchBar";

function HomePage(): React.ReactElement {
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div className="text-slate-100">
      <NavBar />
      <SearchBar />
      <h1> Welcome to Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
