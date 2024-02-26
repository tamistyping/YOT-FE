// import React, { useState, useEffect } from "react";
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
        <HighestRatedGames />
        <UpcomingGames />
        <SearchGames />
      </div>
        <Footer />
    </>
  );
}
