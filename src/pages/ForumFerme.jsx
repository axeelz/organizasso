import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import BackToList from "../components/BackToList";

const ForumFerme = () => {
  return (
    <>
      <ForumHeader name="fermé" />
      <main>
        <BackToList />
        <NewMessage />
        <MessagesList />
      </main>
    </>
  );
};

export default ForumFerme;
