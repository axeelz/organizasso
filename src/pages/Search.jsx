import { useState } from "react";
import styles from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <main>
      <h2>Recherche</h2>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Entrez votre recherche"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Résultats pour "{query || "..."}"</p>
    </main>
  );
};

export default Search;
