import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export default function StatusForm({ onStatusAdded }) {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);

  function getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
  }

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/auth/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.id);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch("http://localhost:8000/statuses/create/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ content, user: userId }),
      });
      if (!response.ok) {
        throw new Error("Failed to create status");
      }
      onStatusAdded();

      setContent("");
    } catch (error) {
      console.error("Error creating status:", error);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <Box sx={{ width: "75%", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            border: "1px solid #ccd6dd",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "14px",
          }}
        >
          <TextField
            id="content"
            placeholder="What's on your mind?"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            sx={{ backgroundColor: "#f7f9fa", borderRadius: "8px" }}
            value={content}
            onChange={handleContentChange}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Box>
  );
}
