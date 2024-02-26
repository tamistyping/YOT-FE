import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GameDetailModal({ open, game, onClose }) {
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
          Release Date: {game.release_date}
          <br />
          Rating: {game.rating}
        </Typography>
        <Button onClick={onClose}>Close</Button>
        <Button >More Details</Button>
        <Button >Add to collection</Button>
      </Box>
    </Modal>
  );
}
