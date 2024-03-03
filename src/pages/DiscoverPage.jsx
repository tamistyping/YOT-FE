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
        <div style={{ textAlign: 'center', width: '70%', margin: '0 auto', position: 'relative' }}>
          <h1 style={{ 
            color: 'white',
            textAlign: 'center',
            fontSize: '2.5em',
            marginBottom: '20px',
          }}>
            <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Discover</span> Your Next Gaming Adventure!
          </h1>
        </div>
        <HighestRatedGames />
        <UpcomingGames />
        <SearchGames />
      </div>
      <Footer />
    </>
  );
}
