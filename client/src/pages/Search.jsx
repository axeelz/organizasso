import { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.css";
import MessagesList from "../components/MessagesList";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/message", { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const results = messages.filter((message) => {
    const date = new Date(message.date);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();

    return message.content.toLowerCase().includes(query.toLowerCase()) && date >= start && date <= end;
  });

  return (
    <main>
      <h1>Rechercher</h1>
      <label className={styles.searchContainer}>
        <span className={styles.iconContainer}>
          <IoSearchOutline size={24} />
        </span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Entrez votre recherche"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className={styles.filters}>
        <span>Entre le</span>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span>et le</span>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <hr className={styles.separator} />

      <MessagesList messages={results} loading={loading} showForumName fetchMessages={fetchMessages} />
    </main>
  );
};

export default Search;
