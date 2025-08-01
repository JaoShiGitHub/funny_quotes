import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/Authentication";
import axios from "axios";
import Logo from "../components/Logo";

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

const userId: number = 4;

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

  const voteQuote = async (quote_id: number): Promise<void> => {
    try {
      const result = await axios.post(
        "http://localhost:4000/quotes/vote",
        { quote_id },
        { withCredentials: true }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("quotes: ", quotes);
  return (
    <div className="text-slate-200 flex flex-col items-center pt-10">
      <Logo />
      <ul className="flex gap-4 flex-wrap mt-10 max-w-[1020px]">
        {quotes.map((quote) => {
          const hasVoted = quote.voters?.includes(userId);
          const votes = quote?.voters[0] ? quote?.voters?.length : 0;
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
                  <button onClick={() => voteQuote(quote?.quote_id)}>
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
      <button
        className="bg-blue-600 hover:bg-blue-900 font-bold px-4 py-2 mt-10 mb-10 min-w-80 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;
