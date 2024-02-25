import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import DiscoverPage from "./pages/DiscoverPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LandingPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}
