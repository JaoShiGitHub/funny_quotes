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
  voters: number[];
};

type QuotesResponse = {
  quotes_data: Quote[];
};

const userId: number = 3;

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
    <div className="text-slate-200">
      <NavBar />
      <SearchBar />
      <h1 className="font-luckiestGuy text-4xl"> HAHA QUOTES</h1>
      <ul className="flex gap-4 flex-wrap">
        {quotes.map((quote) => {
          const hasVoted = quote.voters?.includes(userId);
          const votes = quote?.voters ? quote?.voters?.length : 0;
          console.log("check votes", votes);

          return (
            <li
              key={quote?.quote_id}
              className="border p-4 rounded-lg min-w-[300px] max-w-[300px] min-h-[160px] w-full flex flex-col text-center"
            >
              <div className="flex justify-between mb-4">
                {hasVoted ? (
                  <span className="text-xl">😂</span>
                ) : (
                  <button>
                    <img src="images/heart_plus.svg" className="" />
                  </button>
                )}

                <span>
                  {votes} {votes > 1 ? " Votes" : " Vote"}
                </span>
              </div>
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
