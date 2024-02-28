import React, { useState, useEffect } from "react";
import axios from "axios";
import GameDetailModal from "../modals/GameDetailModal";

export default function DiscoverPage() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/games/top-anticipated-games/")
      .then((response) => {
        setGames(response.data.games);
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: '100vmin'}}>
        <h2 style={{ color: '#DFE0E2' }}>&lt;Top Rated Games&gt;</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {games.map((game) => (
            <div key={game.id} style={{ padding: '0', margin: "10px" }}>
              <img
                src={`https:${game.cover.url}`}
                alt=""
                style={{ width: 'auto', height: 'auto', objectFit: 'fill', cursor: 'pointer' }}
                onClick={() => handleGameClick(game)}
              />
            </div>
          ))}
        </div>
        {selectedGame && (
          <GameDetailModal open={modalOpen} game={selectedGame} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
}