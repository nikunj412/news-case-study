import axios from "axios";
import { Filters } from "../app.model";

export const fetchGuardianNews = async (query: string, filters: Filters) => {
  const params: any = {
    q: query,
    "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
    "show-fields": "thumbnail,publicationDate",
    section: filters.category || undefined,
  };

  if (filters.startDate) params["from-date"] = filters.startDate;
  if (filters.endDate) params["to-date"] = filters.endDate;

  const response = await axios.get(`https://content.guardianapis.com/search`, {
    params,
  });

  return response.data.response.results.map((article: any) => ({
    title: article.webTitle,
    description: article.sectionName,
    url: article.webUrl,
    source: "The Guardian",
    image: article.fields?.thumbnail || "https://placehold.co/600x400",
    publishedAt: new Date(article.webPublicationDate),
  }));
};

export const fetchNYTNews = async (query: string, filters: Filters) => {
  const params: any = {
    q: query,
    fq: filters.category || undefined,
    "api-key": process.env.REACT_APP_NYT_API_KEY,
  };

  if (filters.startDate)
    params.begin_date = filters.startDate.replace(/-/g, "");
  if (filters.endDate) params.end_date = filters.endDate.replace(/-/g, "");

  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
    { params }
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
    publishedAt: new Date(article.pub_date),
  }));
};

export const fetchBBCNews = async (query: string, filters: Filters) => {
  const params: any = {
    q: query,
    sources: "bbc-news",
    apiKey: process.env.REACT_APP_BBC_API_KEY,
  };

  if (filters.startDate) params.from = filters.startDate;
  if (filters.endDate) params.to = filters.endDate;

  const response = await axios.get(`https://newsapi.org/v2/everything`, {
    params,
  });

  return response.data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: "BBC News",
    image: article.urlToImage || "https://placehold.co/600x400",
    publishedAt: new Date(article.publishedAt),
  }));
};
