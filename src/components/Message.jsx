import styles from "./Message.module.css";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { BsFillReplyFill, BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
import NewMessage from "./NewMessage";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Message = ({ message }) => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div key={message.id} className={styles.message}>
      <div className={styles.messageHeader}>
        <Link to={`profile/${message.username}`} className={styles.username}>
          @{message.username}
          {message.isAdmin && <RiVerifiedBadgeFill />}
        </Link>
        <span>· {formatDistance(new Date(message.date), new Date(), { addSuffix: true, locale: fr })}</span>
      </div>
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
        {!message.isAdmin && (
          <button>
            <RiVerifiedBadgeFill />
            <span>Rendre admin.</span>
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
