import React, { useState, useEffect } from "react";
import axios from "axios";
import GameDetailModal from "../modals/GameDetailModal";

export default function HighestRatedGames() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/games/top-rated-games/`)
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
            <div key={game.id} style={{ padding: '0', margin: "10px", width: '125px', height: '150px', position: 'relative' }}>
              <img
                src={`https:${game.cover.url}`}
                alt="Inside Cover"
                loading="lazy"
                decoding="async"
                className="object-cover rounded-xl"
                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)', position: 'absolute', height: '100%', width: '100%', inset: '0', color: 'transparent', opacity: '1', transition: 'opacity 300ms ease-in 0ms', cursor: 'pointer'}}
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
