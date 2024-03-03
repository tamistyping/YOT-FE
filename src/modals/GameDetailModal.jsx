import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "#1f2937",
  borderRadius: "10px",
  padding: "20px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  color: "#ff0000",
};

const GameDetailModal = ({ open, game, onClose }) => {
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const getRatingColor = (rating) => {
    if (rating >= 80) return "#4caf50";
    if (rating >= 40) return "#ff9800";
    return "#f44336";
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton style={closeButtonStyle} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            {game.name}
          </Typography>
        </Box>
        <Typography variant="body1" gutterBottom style={{ color: "#FFFFFF" }}>
          <strong> Summary: </strong> {game.summary}
          <br />
          <br />
          <strong> Release Date: </strong>{" "}
          {convertTimestampToDate(game.first_release_date)}
          <br />

          <strong>Rating:</strong> {Math.round(game.rating)} / 100
        </Typography>
        <LinearProgress
          variant="determinate"
          value={game.rating}
          sx={{
            height: "20px",
            width: "50%",
            borderRadius: "5px",
            marginTop: "5px",
            backgroundColor: "#555",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getRatingColor(game.rating),
            },
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {game.screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={`https:${screenshot.url.replace("t_thumb", "t_screenshot_med_2x")}`}
              style={{
                width: "150px",
                height: "auto",
                marginRight: "10px",
                marginBottom: "10px",
                objectFit: "contain",
              }}
              alt={`Screenshot ${index + 1}`}
            />
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default GameDetailModal;
