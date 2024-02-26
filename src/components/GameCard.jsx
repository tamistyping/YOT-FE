import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function GameCard({ game, onClick }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        width="auto"
        image={`https:${game.cover.url}`}
        alt=""
        sx={{ objectFit: "cover" }} // Ensure the image fills the space without distortion
      />
    </Card>
  );
}
