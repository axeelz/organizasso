import { useParams } from "react-router-dom";
import MessagesList from "../components/MessagesList";

const Profile = () => {
  const { username } = useParams();

  return (
    <main>
      <h1>Profil de {username}</h1>
      <MessagesList username={username} />
    </main>
  );
};

export default Profile;
