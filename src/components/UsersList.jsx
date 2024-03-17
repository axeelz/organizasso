import styles from "./UsersList.module.css";

const UsersList = ({
  users = [
    {
      id: 1,
      username: "johndoe",
      isAdmin: false,
    },
    {
      id: 2,
      username: "janedoe",
      isAdmin: true,
    },
  ],
}) => {
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
