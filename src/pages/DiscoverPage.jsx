import React from "react";
import NavBar from "../components/NavBar";
import HighestRatedGames from "../components/HighestRatedGames";
import UpcomingGames from "../components/UpcomingGames"
import SearchGames from "../components/SearchGames";
import Footer from "../components/Footer"

export default function DiscoverPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NavBar />
        <h1 style={{ 
          color: 'white',
          width: '70%',
          textAlign: 'left', 
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          padding: '20px', 
          margin: '10px auto' 
        }}>Discover Your Next Gaming Adventure!</h1>
        <HighestRatedGames />
        <UpcomingGames />
        <SearchGames />
      </div>
      <Footer />
    </>
  );
}
