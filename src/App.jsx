import React from 'react';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";
import Profile from "./pages/Profile";
import { ProfileProvider } from './components/ProfileContext';

export default function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <ProfileProvider> 
      <>
        <Router>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/discover" /> : <LandingPage />} />
            <Route path="/myfeed" element={<FeedPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/myprofile" element={<Profile />} />
          </Routes>
        </Router>
        <ToastContainer />
      </>
    </ProfileProvider>
  );
}
