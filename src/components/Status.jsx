import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

export default function Status({ refresh }) {
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
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
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
  };

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
      fetchStatuses();
    } catch (error) {
      console.error("Error deleting status:", error);
    }
  };

  const handleDeleteConfirmation = (statusId) => {
    const isConfirmed = window.confirm("Bro... are you SURE you want to delete this status?");
    if (isConfirmed) {
      handleDelete(statusId);
    }
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
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        {statuses.map((status) => (
          <Card key={status.id} sx={{ mb: 2, borderRadius: '10px', position: 'relative' }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>@{status.username}</Typography>
              </Box>
              <Typography variant="body1" gutterBottom sx={{ mt: 1 }}>
                {status.content}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary' }}>
                Posted {calculateDaysAgo(status.created_at)}
              </Typography>
              {status.username === localStorage.getItem("username") && (
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => handleDeleteConfirmation(status.id)}
                  color="error"
                >
                  <CloseIcon />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}
