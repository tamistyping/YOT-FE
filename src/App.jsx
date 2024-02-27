import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";
import Profile from "./pages/Profile";

export default function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/discover" /> : <LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/myprofile" element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}