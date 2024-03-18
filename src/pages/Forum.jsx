import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import BackToList from "../components/BackToList";
import { useParams, Navigate } from "react-router-dom";
import { messages } from "../data/sample";

const Forum = () => {
  const { name } = useParams();
  const forums = ["ouvert", "ferme"];

  if (!forums.includes(name)) {
    return <Navigate to="/forum/ouvert" />;
  }

  const displayName = name === "ouvert" ? "ouvert" : "fermé";
  const forumMessages = messages.filter((message) => message.forum === name);

  return (
    <>
      <ForumHeader name={displayName} />
      <main>
        <BackToList />
        <NewMessage />
        <MessagesList messages={forumMessages} />
      </main>
    </>
  );
};

export default Forum;
