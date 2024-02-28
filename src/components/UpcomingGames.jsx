import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import GameDetailModal from "../modals/GameDetailModal";

export default function DiscoverPage() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/games/top-anticipated-games/")
      .then((response) => {
        setGames(response.data.games);
        setDisplayedGames(response.data.games.slice(0, 3)); // Initially display only 3 games
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

  const handleLoadMore = () => {
    setDisplayedGames(games); // Load all games
    setShowAll(true);
  };

  const handleCollapse = () => {
    setDisplayedGames(games.slice(0, 3)); // Display only the initial 3 games
    setShowAll(false);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: '500px'}}>
        <h2 style={{ color: '#DFE0E2' }}>&lt;Upcoming Games&gt;</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {displayedGames.map((game) => (
            <div key={game.id} style={{ margin: "20px" }}>
              <Card onClick={() => handleGameClick(game)}>
                <CardMedia
                  component="img"
                  width="auto"
                  image={`https:${game.cover.url}`}
                  alt=""
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            </div>
          ))}
        </div>
        {!showAll && games.length > 3 && (
          <Button variant="contained" color="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
        {showAll && (
          <Button variant="contained" color="secondary" onClick={handleCollapse}>
            Collapse
          </Button>
        )}
        {selectedGame && (
          <GameDetailModal open={modalOpen} game={selectedGame} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
}
