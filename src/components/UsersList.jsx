import styles from "./UsersList.module.css";
import { users } from "../data/sample";

const UsersList = () => {
  return (
    <section className={styles.usersList}>
      {users.map((user) => (
        <div key={user.id} className={styles.user}>
          <span>{user.username}</span>
          {user.isAdmin && <span className={styles.admin}>(Admin)</span>}
        </div>
      ))}
    </section>
  );
};

export default UsersList;
