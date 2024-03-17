import { useState } from "react";
import styles from "./Search.module.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span>et le</span>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <hr className={styles.separator} />

      <p>Résultats pour "{query || "..."}"</p>
    </main>
  );
};

export default Search;
