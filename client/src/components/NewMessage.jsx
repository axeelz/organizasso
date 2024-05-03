import { useState } from "react";
import styles from "./NewMessage.module.css";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";

const NewMessage = ({ forumName, fetchMessages, isReplying, setIsReplying, replyTo }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    axios
      .post(
        import.meta.env.VITE_API_URL + "/message",
        {
          content: message,
          forum: forumName,
          replyTo,
        },
        { withCredentials: true }
      )
      .then(() => {
        setMessage("");
        toast.success("Message envoyé !");
        if (fetchMessages) fetchMessages();
        if (setIsReplying) setIsReplying(false);
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast.error(message);
      });
  };

  return (
    <div className={styles.container}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isReplying ? "Répondre à ce message" : "Nouveau message"}
      />
      <button onClick={handleSend} className={styles.send}>
        <IoIosSend />
        <span>Envoyer</span>
      </button>
    </div>
  );
};

export default NewMessage;
