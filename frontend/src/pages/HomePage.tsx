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

type QuotesResponse = {
  quotes_data: Quote[];
};

function HomePage(): React.ReactElement {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { logout } = useAuth();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  const getQuotes = async (): Promise<void> => {
    try {
      const quotes = await axios.get<QuotesResponse>(
        "http://localhost:4000/quotes/all_quotes",
        {
          withCredentials: true,
        }
      );
      setQuotes(quotes?.data?.quotes_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  console.log("quotes: ", quotes);
  return (
    <div className="text-slate-100">
      <NavBar />
      <SearchBar />
      <h1> Welcome to Home Page</h1>
      <ul className="flex gap-4 flex-wrap">
        {quotes.map((quote) => {
          return (
            <li
              key={quote?.quote_id}
              className="border p-4 rounded-lg min-w-[300px] max-w-[300px] min-h-[160px] w-full flex flex-col text-center"
            >
              <span className="self-end">
                {quote?.votes} {quote?.votes > 1 ? "Votes" : "Vote"}
              </span>
              <p className="mb-auto">{quote?.quote}</p>
              <i>- {quote?.author} -</i>
            </li>
          );
        })}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
