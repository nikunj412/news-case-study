import axios from "axios";

export const fetchGuardianNews = async (query: string, filters: any) => {
  const response = await axios.get(`https://content.guardianapis.com/search`, {
    params: {
      q: query,
      section: filters.category,
      "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
      "show-fields": "thumbnail",
    },
  });
  return response.data.response.results.map((article: any) => ({
    title: article.webTitle,
    description: article.sectionName,
    url: article.webUrl,
    source: "The Guardian",
    image: article.fields?.thumbnail || "https://placehold.co/600x400",
  }));
};

export const fetchNYTNews = async (query: string, filters: any) => {
  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    {
      params: {
        q: query,
        fq: filters.category,
        "api-key": process.env.REACT_APP_NYT_API_KEY,
      },
    }
  );
  return response.data.response.docs.map((article: any) => ({
    title: article.headline.main,
    description: article.snippet,
    url: article.web_url,
    source: "New York Times",
    image:
      article.multimedia.length > 0
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : "https://placehold.co/600x400",
  }));
};

export const fetchBBCNews = async (query: string, filters: any) => {
  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params: {
      q: query,
      sources: "bbc-news",
      apiKey: process.env.REACT_APP_BBC_API_KEY,
    },
  });
  return response.data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: "BBC News",
    image: article.urlToImage || "https://placehold.co/600x400",
  }));
};
