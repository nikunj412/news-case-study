import React, { useState } from "react";

interface SearchFilterProps {
  onSearch: (query: string, filters: any) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!category || category === "all") {
      setError("Please select a valid category.");
      return;
    }
    setError(""); // Clear error on valid search
    onSearch(query, { category });
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
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
        </select>
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
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
};

export default SearchFilter;
