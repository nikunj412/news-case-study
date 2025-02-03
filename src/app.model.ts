export interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  publishedAt: Date;
}

export interface Filters {
  category: string;
  sources: string[];
  startDate?: string;
  endDate?: string;
}

export interface NewsApiResponse {
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  publishedAt: string;
}

export type FetchNewsFunction = (
  query: string,
  filters: Filters
) => Promise<Article[]>;
