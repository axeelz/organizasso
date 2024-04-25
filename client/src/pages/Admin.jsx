import { useCallback, useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/user", { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <main>
      <h1>Administration</h1>

      <h2>Utilisateurs non vérifiés</h2>
      <UsersList unverified users={users} loading={loading} fetchUsers={fetchUsers} />

      <h2>Utilisateurs vérifiés</h2>
      <UsersList verified users={users} loading={loading} fetchUsers={fetchUsers} />
    </main>
  );
};

export default Admin;
