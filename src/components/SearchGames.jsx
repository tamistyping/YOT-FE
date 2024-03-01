import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import GameDetailModal from "../modals/GameDetailModal";

export default function SearchGames() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/games/search-games/`, 
        {
          params: {
            query: query, 
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setGames(response.data.games);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "500px",
          marginBottom: "80px",
        }}
      >
        <h2 style={{ color: "#DFE0E2" }}>&lt;Upcoming Games&gt;</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            placeholder="Search games..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {games.map((game) => (
            <div key={game.id} style={{ margin: "20px" }}>
              <Card onClick={() => handleGameClick(game)}>
                {game.cover && game.cover.url ? (
                  <CardMedia
                    component="img"
                    width="auto"
                    image={`https:${game.cover.url}`}
                    alt=""
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <div>No Image Available</div>
                )}
              </Card>
            </div>
          ))}
        </div>
        {selectedGame && (
          <GameDetailModal
            open={modalOpen}
            game={selectedGame}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}
