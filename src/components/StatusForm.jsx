import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function StatusForm({onStatusAdded}) {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);

  function getCookie(name) {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
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
    var csrftoken = getCookie('csrftoken');

    try {
      const response = await fetch("http://localhost:8000/statuses/create/", {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'X-CSRFToken': csrftoken
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
    <form onSubmit={handleSubmit}>
      <TextField
        id="content"
        label="Are you on tonight?"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        sx={{ backgroundColor: "#DFE0E2", color: "#071013", width: "75vmin" }}
        value={content}
        onChange={handleContentChange}
      />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Set Status
      </Button>
    </form>
  );
}
