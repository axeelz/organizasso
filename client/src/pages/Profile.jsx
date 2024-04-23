import { useNavigate, useParams } from "react-router-dom";
import MessagesList from "../components/MessagesList";
import { IoLogOut } from "react-icons/io5";
import styles from "./Profile.module.css";
import { messages, users } from "../data/sample";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/user";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

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
  const { loggedInUser } = useContext(UserContext);

  const user = username ? users.find((user) => user.username === username) : loggedInUser;

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

        {user === loggedInUser && (
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

      <h2>Messages</h2>
      <MessagesList messages={messages} username={user.username} />
    </main>
  );
};

export default Profile;
