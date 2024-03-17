import { useState } from "react";
import styles from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <main>
      <h1>Rechercher</h1>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Entrez votre recherche"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={styles.filters}>
        <span>Messages entre le</span>
        <input type="date" />
        <span>et le</span>
        <input type="date" />
      </div>

      <hr className={styles.separator} />

      <p>Résultats pour "{query || "..."}"</p>
    </main>
  );
};

export default Search;
