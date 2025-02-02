import React, { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import NewsFeed from "./components/NewsFeed";
import "./App.css";
import {
  fetchBBCNews,
  fetchGuardianNews,
  fetchNYTNews,
} from "./services/newsApi";

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (query: string, filters: any) => {
    setLoading(true);
    try {
      const [guardianNews, nytNews, bbcNews] = await Promise.all([
        fetchGuardianNews(query, filters),
        fetchNYTNews(query, filters),
        fetchBBCNews(query, filters),
      ]);

      const combinedArticles = [...guardianNews, ...nytNews, ...bbcNews];
      setArticles(combinedArticles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>News Case Study</h1>
      </div>
      <SearchFilter onSearch={handleSearch} />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <NewsFeed articles={articles} />
      )}
    </div>
  );
};

export default App;
