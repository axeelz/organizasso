import styles from "./Message.module.css";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { BsFillReplyFill, BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import NewMessage from "./NewMessage";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoTrashBin } from "react-icons/io5";
import { displayForumName } from "../utils";

const Message = ({ message, showForumName }) => {
  const [isReplying, setIsReplying] = useState(false);

  const user = message.user;

  return (
    <div className={styles.message}>
      <div className={styles.messageHeader}>
        <Link to={`/profile/${user.username}`} className={styles.username}>
          @{user.username}
          {user.isAdmin && <RiVerifiedBadgeFill />}
        </Link>
        <span>· {formatDistance(new Date(message.date), new Date(), { addSuffix: true, locale: fr })}</span>
      </div>
      {showForumName && <span className={styles.forumName}>Forum {displayForumName(message.forum)}</span>}
      <p>{message.content}</p>
      <div className={styles.messageFooter}>
        <button onClick={() => setIsReplying(!isReplying)}>
          <BsFillReplyFill />
          <span>Répondre</span>
        </button>
        <button>
          <BsFillTrashFill />
          <span>Supprimer</span>
        </button>
        {!user.isAdmin && (
          <button>
            <RiVerifiedBadgeFill />
            <span>Rendre admin.</span>
          </button>
        )}
        {!user.isAdmin && (
          <button>
            <IoTrashBin />
            <span>Bannir</span>
          </button>
        )}
      </div>
      {isReplying && (
        <div className={styles.newMessage}>
          <NewMessage isReply />
        </div>
      )}
    </div>
  );
};

export default Message;
