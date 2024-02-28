import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Adjust the width of the modal
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GameDetailModal({ open, game, onClose }) {
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleDateString();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {game.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Summary: {game.summary}
          <br />
          Release Date: {convertTimestampToDate(game.first_release_date)}
          <br />
          Rating: {Math.round(game.rating)}
        </Typography>
        <Carousel showThumbs={false} showStatus={false} showArrows={true} showIndicators={false} infiniteLoop={true}>
          {game.screenshots.map((screenshot, index) => (
            <div key={index} >
              <img src={`https:${screenshot.url}`} style={{ height: '30vmin', width: '40vmin', marginBottom: '3vmin', marginTop:  '3vmin' }} />
            </div>
          ))}
        </Carousel>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary" component="a" href={game.url} target="_blank" rel="noopener noreferrer">
          More Details
        </Button>
      </Box>
    </Modal>
  );
}
