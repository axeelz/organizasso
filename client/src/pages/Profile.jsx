import { useNavigate, useParams } from "react-router-dom";
import MessagesList from "../components/MessagesList";
import { IoLogOut } from "react-icons/io5";
import styles from "./Profile.module.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const fetchUsers = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/user", { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setUsersLoading(false));
  }, []);
  const fetchMessages = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/message", { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setMessagesLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, [fetchUsers, fetchMessages]);

  const logout = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/user/logout", { withCredentials: true })
      .then(() => {
        console.log("Logged out");
        navigate(0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Si username spécifié dans l'URL, on cherche l'utilisateur correspondant
  // Si utilisateur pas trouvé, message d'erreur
  // Si username pas spécifié, on affiche le profil de l'utilisateur connecté
  const user = username ? users.find((u) => u.username === username) : loggedInUser;

  if (usersLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <main>
        <h1>Profil inexistant</h1>
        <p>Cet utilisateur n'existe pas</p>
      </main>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <main>
      <div className={styles.actions}>
        <BackButton />

        {JSON.stringify(user) === JSON.stringify(loggedInUser) && (
          <button onClick={logout}>
            <IoLogOut />
            <span>Déconnexion</span>
          </button>
        )}
      </div>

      <h1>@{user.username}</h1>
      <h2>{fullName}</h2>

      <section className={styles.infos}>
        <span className={styles.status}>
          {(user.isAdmin && (
            <>
              Administrateur <RiVerifiedBadgeFill />
            </>
          )) ||
            "Membre"}
        </span>
        <span>Compte créé {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true, locale: fr })}</span>
      </section>

      <h2>Messages ({messages.filter((m) => m.user.username === user.username).length})</h2>
      <MessagesList messages={messages} username={user.username} loading={messagesLoading} showForumName />
    </main>
  );
};

export default Profile;
