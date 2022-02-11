import { useState } from "react";

function HomePage() {
  const [q, setQ] = useState("coffee, cats");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleFormSubmit(event) {
    event.preventDefault();

    const params = new URLSearchParams({
      q
    });

    setLoading(true);
    fetch(`/api/search?${params}`)
      .then((res) => res.json())
      .then(
        (results) => {
          setSearchResults(results);
          setLoading(false);
          setError(null);
        },
        (error) => {
          setError(error);
        }
      );
  }

  function handleQChange(event) {
    event.preventDefault();
    setQ(event.target.value);
  }

  return (
    <>
      <h1>Next.js SerpApi example</h1>

      <form action="/api/search" method="get" onSubmit={handleFormSubmit}>
        <label>
          <label>Queries (separated by comma):</label>&nbsp;
          <input name="q" value={q} placeholder={q} onChange={handleQChange} />
          <br />
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Search"}
            disabled={isLoading}
          />
        </label>
      </form>

      <br />

      <SearchResults
        results={searchResults}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

export function SearchResults({ results, isLoading, error }) {
  if (isLoading) return <p>Loading...</p>;

  if (!results || results.length === 0) {
    return <p>Click "Search" &uarr; to continue.</p>;
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <span>Search results:</span>
      <ul>{results.map(SearchResult)}</ul>
    </section>
  );
}

function SearchResult(result, index) {
  return (
    <li key={index}>
      {result.search_metadata.id} &rarr; {result.search_parameters.q}
    </li>
  );
}

export default HomePage;
