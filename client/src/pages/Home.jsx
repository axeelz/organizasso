import AskToLogin from "../components/AskToLogin";
import ForumsList from "../components/ForumsList";

const Home = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <AskToLogin />;
  }

  return (
    <>
      <ForumsList />
    </>
  );
};

export default Home;
