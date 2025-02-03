import React, { useState } from "react";
import { Filters } from "../app.model";

interface SearchFilterProps {
  onSearch: (query: string, filters: Filters) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sources, setSources] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSourceChange = (source: string) => {
    setSources((prev) =>
      prev.includes(source)
        ? prev.filter((item) => item !== source)
        : [...prev, source]
    );
  };

  const handleSearch = () => {
    if (!category || category === "all") {
      setError("Please select a valid category.");
      return;
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }
    setError(""); // Clear error on valid search
    onSearch(query, { category, sources, startDate, endDate });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            flex: "1",
          }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <option value="all">Select Category</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
        </select>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              flex: "1",
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              flex: "1",
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#007BFF",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <label>
          <input
            type="checkbox"
            value="guardian"
            checked={sources.includes("guardian")}
            onChange={() => handleSourceChange("guardian")}
          />
          The Guardian
        </label>
        <label>
          <input
            type="checkbox"
            value="nyt"
            checked={sources.includes("nyt")}
            onChange={() => handleSourceChange("nyt")}
          />
          NYT
        </label>
        <label>
          <input
            type="checkbox"
            value="bbc"
            checked={sources.includes("bbc")}
            onChange={() => handleSourceChange("bbc")}
          />
          BBC
        </label>
      </div>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default SearchFilter;
