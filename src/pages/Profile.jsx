import { useParams } from "react-router-dom";
import MessagesList from "../components/MessagesList";

const Profile = () => {
  const { username } = useParams();

  return (
    <main>
      {(username && <h1>Profil de {username}</h1>) || <h1>Mon profil</h1>}
      {(username && <MessagesList username={username} />) || <MessagesList />}
    </main>
  );
};

export default Profile;
