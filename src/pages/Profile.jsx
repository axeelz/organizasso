import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  return (
    <main>
      <h1>Profil de {username}</h1>
    </main>
  );
};

export default Profile;
