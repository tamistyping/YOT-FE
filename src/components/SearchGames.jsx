import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import GameDetailModal from "../modals/GameDetailModal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function SearchGames() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const fetchData = useCallback(async () => {
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
      setGames(response.data.games.map((game) => ({
        ...game,
        cover: {
          ...game.cover,
          url: `https:${game.cover.url.replace("t_thumb", "t_cover_big_2x")}`
        }
      })));
    } catch (error) {
      console.error("Error:", error);
    }
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [fetchData, query]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ color: "#DFE0E2", marginBottom: "20px" }}>
          &lt;Search Games&gt;
        </h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <TextField
            label="Search games..."
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ backgroundColor: "white", marginBottom: "10px" }}
          />
          <div style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
          </div>
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
              <Card
                onClick={() => handleGameClick(game)}
                style={{ cursor: "pointer", maxWidth: "300px" }}
              >
                {game.cover && game.cover.url ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={game.cover.url}
                    alt=""
                    style={{ objectFit: "cover" }}
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
      <div style={{ marginBottom: "100px" }}></div>
    </>
  );
}
