import { useParams, useNavigate } from "react-router-dom";
import MessagesList from "../components/MessagesList";
import { IoArrowBack } from "react-icons/io5";
import styles from "./Profile.module.css";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <main>
      <button onClick={() => navigate(-1)} className={styles.back}>
        <IoArrowBack />
        <span>Retour</span>
      </button>
      {(username && <h1>Profil de {username}</h1>) || <h1>Mon profil</h1>}
      {(username && <MessagesList username={username} />) || <MessagesList />}
    </main>
  );
};

export default Profile;
