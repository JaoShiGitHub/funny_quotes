import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/Authentication";
import NavBar from "../layouts/NavBar";
import SearchBar from "../components/SearchBar";
import axios from "axios";

type Quote = {
  quote_id: number;
  author_id: number;
  quote: string;
  author: string;
  votes: number;
};

function HomePage(): React.ReactElement {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  const getQuotes = async (): Promise<void> => {
    try {
      const quotes = await axios.get<Quote[]>(
        "http://localhost:4000/quotes/all_quotes",
        {
          withCredentials: true,
        }
      );
      console.log("quotes: ", quotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="text-slate-100">
      <NavBar />
      <SearchBar />
      <h1> Welcome to Home Page</h1>
      <ul></ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
