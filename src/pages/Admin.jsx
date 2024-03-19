import UsersList from "../components/UsersList";

const Admin = () => {
  return (
    <main>
      <h1>Administration</h1>

      <h2>Utilisateurs non vérifiés</h2>
      <UsersList unverified />

      <h2>Utilisateurs vérifiés</h2>
      <UsersList verified />
    </main>
  );
};

export default Admin;
