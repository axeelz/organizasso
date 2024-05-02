import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import { useParams, Navigate } from "react-router-dom";
import styles from "./Forum.module.css";
import BackButton from "../components/BackButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import axios from "axios";
import { displayForumName } from "../utils";

const Forum = () => {
  const { name } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // useCallback est utilisé pour éviter de créer une nouvelle fonction à chaque rendu
  const fetchMessages = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/message/" + name, { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [name]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const forums = ["ouvert", "ferme"];
  if (!forums.includes(name) || (name === "ferme" && !loggedInUser.isAdmin)) {
    return <Navigate to="/forum/ouvert" />;
  }

  return (
    <>
      <ForumHeader name={displayForumName(name)} />
      <main>
        <div className={styles.backContainer}>
          <BackButton to="/" text="Liste des forums" />
        </div>
        <NewMessage forumName={name} fetchMessages={fetchMessages} />
        <MessagesList messages={messages} loading={loading} fetchMessages={fetchMessages} />
      </main>
    </>
  );
};

export default Forum;
