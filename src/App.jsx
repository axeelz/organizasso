import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import { useState } from "react";
import Admin from "./pages/Admin.jsx";
import Forum from "./pages/Forum.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
          <Route index element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="search" element={<Search />} />
          <Route path="forum/:name" element={<Forum />} />
          <Route path="admin" element={<Admin />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
