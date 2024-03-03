import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function Status({ refresh }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchStatuses();
  }, [refresh]);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/statuses/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
        `${process.env.REACT_APP_BACKEND_URL}/statuses/${statusId}/delete/`,
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this status?"
    );
    if (isConfirmed) {
      handleDelete(statusId);
    }
  };

  const calculateTimeAgo = (postedAt) => {
    const today = new Date();
    const postedDate = new Date(postedAt);
    const differenceInTime = today.getTime() - postedDate.getTime();
    const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minute${
        differenceInMinutes !== 1 ? "s" : ""
      } ago`;
    } else {
      const differenceInHours = Math.floor(differenceInMinutes / 60);
      if (differenceInHours < 48) {
        return `${differenceInHours} hour${
          differenceInHours !== 1 ? "s" : ""
        } ago`;
      } else {
        const differenceInDays = Math.floor(differenceInHours / 24);
        return `${differenceInDays} day${
          differenceInDays !== 1 ? "s" : ""
        } ago`;
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 3, mb: 5 }}>
      {statuses.map((status) => (
        <Card
          key={status.id}
          sx={{
            mb: 2,
            borderRadius: "10px",
            position: "relative",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            border: "8px solid rgba(35, 181, 211, 0.7)",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                // backgroundColor: "#23B5D3",
                borderRadius: "5px",
                padding: "0.2rem 0.5rem",
                width: "90%",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <Typography variant="body1">@{status.username} posted...</Typography>
            </Box>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                mt: 1,
                mb: 2,
                fontWeight: "bold",
                textAlign: "left"
              }}
            >
              🔊 {status.content}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ color: "text.secondary", textAlign: "left", mb: 0 }}
            >
             Posted {calculateTimeAgo(status.created_at)}
            </Typography>
            {status.username === localStorage.getItem("username") && (
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0 }}
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
  );
}
