import styles from "./UsersList.module.css";
import { Link } from "react-router-dom";
import { IoCheckmarkCircle, IoTrashBin } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { verifyUser } from "../functions/admins";

const UsersList = ({ users, loading, fetchUsers, verified, unverified }) => {
  if (verified && unverified) {
    throw new Error("Vous ne pouvez pas afficher les utilisateurs vérifiés et non vérifiés en même temps");
  }

  const displayedUsers = users.filter((user) => {
    if (verified) {
      return user.isVerified;
    }
    if (unverified) {
      return !user.isVerified;
    }
    return true;
  });

  if (displayedUsers.length === 0 && !loading) {
    return <p>Aucun utilisateur à afficher</p>;
  }

  return (
    <section className={styles.usersList}>
      {displayedUsers.map((user) => (
        <div key={user._id} className={styles.user}>
          <div className={styles.info}>
            <Link to={`/profile/${user.username}`}>
              <span className={styles.fullName}>
                {user.firstName} {user.lastName}
              </span>
              <span className={styles.username}>@{user.username}</span>
            </Link>
            {!user.isVerified && <span className={styles.unverified}>Non vérifié</span>}
            {user.isVerified && <span>{(user.isAdmin && "Administrateur") || "Membre"}</span>}
            <span>Créé le {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className={styles.actions}>
            {!user.isAdmin && (
              <button className={styles.danger}>
                <IoTrashBin /> Supprimer
              </button>
            )}
            {!user.isVerified && (
              <button className={styles.success} onClick={() => verifyUser(user._id).then(fetchUsers)}>
                <IoCheckmarkCircle /> Vérifier
              </button>
            )}
            {!user.isAdmin && user.isVerified && (
              <button className={styles.promote}>
                <RiVerifiedBadgeFill /> Promouvoir
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default UsersList;
