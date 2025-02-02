import React, { useState } from "react";
import "./NewsFeed.css";
import BBCLogo from "../assets/bbc-logo.png";
import GuardianLogo from "../assets/guardian-logo.jpeg";
import NYTLogo from "../assets/nyt-logo.jpg";

interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
}

interface NewsFeedProps {
  articles: Article[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  const [visibleArticles, setVisibleArticles] = useState(10);

  const loadMoreArticles = () => {
    setVisibleArticles((prev: number) => prev + 10);
  };

  const getSourceLogo = (source: string) => {
    switch (source) {
      case "The Guardian":
        return GuardianLogo;
      case "New York Times":
        return NYTLogo;
      case "BBC News":
        return BBCLogo;
      default:
        return "";
    }
  };

  if (articles.length === 0) {
    return <div className="no-data">No articles found.</div>;
  }

  return (
    <>
      <div className="news-feed">
        {articles.slice(0, visibleArticles).map((article, index) => (
          <div key={index} className="article-card">
            <div className="source-info">
              <img
                src={getSourceLogo(article.source)}
                alt={article.source}
                className="source-logo"
              />
              <span className="source-name">{article.source}</span>
            </div>
            <img
              src={article.image}
              alt={article.title}
              className="article-image"
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
      {visibleArticles < articles.length && (
        <div>
          <button onClick={loadMoreArticles} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default NewsFeed;
