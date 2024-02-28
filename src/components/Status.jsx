import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import LinearProgress from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function Status({ refresh }) {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    // Fetch statuses when component mounts
    fetchStatuses();
  }, [refresh]);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/statuses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatuses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  function getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
  }

  const handleDelete = async (statusId) => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(
        `http://localhost:8000/statuses/${statusId}/delete/`,
        {
          credentials: "include",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete status");
      }
      // Refresh statuses after successful delete
      fetchStatuses();
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedStatus(null);
  };

  const calculateDaysAgo = (postedAt) => {
    const today = new Date();
    const postedDate = new Date(postedAt);
    const differenceInTime = today.getTime() - postedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return `${differenceInDays} days ago`;
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {statuses.map((status) => (
          <Card key={status.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {status.username} is on tonight!
              </Typography>
              <Typography variant="body1" gutterBottom>
               {status.content}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Posted {calculateDaysAgo(status.created_at)}
              </Typography>
              {/* Display delete button only if the status belongs to the logged-in user */}
              {status.username === localStorage.getItem("username") && (
                <Button
                  onClick={() => handleDelete(status.id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
      {/* Status Details Modal */}
      <Modal
        open={!!selectedStatus}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            maxWidth: 600,
            bgcolor: "#1f2937",
            borderRadius: "10px",
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0, color: "#ff0000" }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" gutterBottom style={{ color: "#FFFFFF" }}>
            {selectedStatus?.username}'s Status
          </Typography>
          <Typography variant="body1" style={{ color: "#FFFFFF" }}>
            Content: {selectedStatus?.content}
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "#FFFFFF" }}>
            Posted At: {selectedStatus?.created_at}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
