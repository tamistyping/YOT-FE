import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";
import GameDetailModal from "../modals/GameDetailModal";

export default function DiscoverPage() {
  const [games, setGames] = useState([]);
  const [anticipatedGames, setAnticipatedGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/games/top-rated-games/")
      .then((response) => {
        setGames(response.data.games);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/games/top-anticipated-games/")
      .then((response) => {
        setAnticipatedGames(response.data.anticipatedGames);
        console.log(anticipatedGames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <NavBar />
        <h2 style={{ color: '#DFE0E2'}}>&lt;Top Rated Games&gt;</h2>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {games && games.map((game) => (
            <GameCard key={game.id} game={game} onClick={() => handleGameClick(game)} />
          ))}
        </div>
        {selectedGame && (
          <GameDetailModal open={modalOpen} game={selectedGame} onClose={handleCloseModal} />
        )}


        <h2 style={{ color: '#DFE0E2'}}>&lt;Upcoming Games&gt;</h2>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {anticipatedGames && anticipatedGames.map((g) => (
            <GameCard key={g.id} game={g} onClick={() => handleGameClick(g)} />
          ))}
        </div>
        {selectedGame && (
          <GameDetailModal open={modalOpen} game={selectedGame} onClose={handleCloseModal} />
        )}
      </div>
    </>
  )
}