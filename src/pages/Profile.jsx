import { useParams, useNavigate } from "react-router-dom";
import MessagesList from "../components/MessagesList";
import { IoLogOut } from "react-icons/io5";
import styles from "./Profile.module.css";
import { loggedInUser, messages, users } from "../data/sample";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import BackButton from "../components/BackButton";

const Profile = ({ setIsLoggedIn }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };
  const user = username ? users.find((user) => user.username === username) : loggedInUser;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <main>
      <div className={styles.actions}>
        <BackButton />

        <button onClick={logout}>
          <IoLogOut />
          <span>Déconnexion</span>
        </button>
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
