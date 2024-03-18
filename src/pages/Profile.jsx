import { useParams, useNavigate } from "react-router-dom";
import MessagesList from "../components/MessagesList";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Profile.module.css";
import { messages } from "../data/sample";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const title = username ? `Profil de ${username}` : "Mon profil";

  return (
    <main>
      <button onClick={() => navigate(-1)} className={styles.back}>
        <IoArrowBack />
        <span>Retour</span>
      </button>
      <h1>{title}</h1>
      <MessagesList messages={messages} username={username} />
    </main>
  );
};

export default Profile;
