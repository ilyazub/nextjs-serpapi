import PropTypes from 'prop-types'; 
import styles from './SearchResults.module.css'

export function SearchResults({ results, isLoading, error }) {
  if (isLoading)
    return <p>Loading <span className={styles.loading}></span></p>;

  if (!results || results.length === 0) {
    return <p>Click "Search" &uarr; to continue.</p>;
  }

  if (error)
    return <p>Error: {error}</p>;

  return (
    <section>
      <h3>Search results ({results.length})</h3>
      <ul className={styles.resultsContainer}>{results.map(SearchResult)}</ul>
    </section>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.object
}

function SearchResult(result, index) {
  return (
    <li key={index} className={styles.result}>
      <p>Search ID: <a href={result.search_metadata.json_endpoint}>{result.search_metadata.id}</a></p>
      <p>Query: {result.search_parameters.q}</p>
      <p>Results: {result.organic_results.length}</p>
      <p>Keys: {Object.keys(result).join("\n")}</p>
    </li>
  );
}
