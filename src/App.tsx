import React, { useState } from "react";
import SearchFilter from "./components/SearchFilter";
import NewsFeed from "./components/NewsFeed";
import "./App.css";
import {
  fetchBBCNews,
  fetchGuardianNews,
  fetchNYTNews,
} from "./services/newsApi";
import { Article, Filters } from "./app.model";

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (query: string, filters: Filters) => {
    setLoading(true);
    try {
      let apiPromises: Promise<Article[]>[] = [];

      if (!filters.sources.length) {
        // Call all APIs if no source is selected
        apiPromises = [
          fetchGuardianNews(query, filters),
          fetchNYTNews(query, filters),
          fetchBBCNews(query, filters),
        ];
      } else {
        if (filters.sources.includes("guardian")) {
          apiPromises.push(fetchGuardianNews(query, filters));
        }
        if (filters.sources.includes("nyt")) {
          apiPromises.push(fetchNYTNews(query, filters));
        }
        if (filters.sources.includes("bbc")) {
          apiPromises.push(fetchBBCNews(query, filters));
        }
      }

      const results = await Promise.all(apiPromises);
      const combinedArticles = results.flat();

      const formattedArticles = combinedArticles.map((article) => ({
        ...article,
        publishedAt: new Date(article.publishedAt),
      }));

      // Sort articles by publication date (most recent first)
      formattedArticles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setArticles(formattedArticles);
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
