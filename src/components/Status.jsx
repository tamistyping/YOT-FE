import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";

export default function Status({ refresh }) {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  const handleDelete = async (statusId) => {
    try {
      const csrftoken = getCookie('csrftoken'); 
      const response = await fetch(`http://localhost:8000/statuses/${statusId}/delete/`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'X-CSRFToken': csrftoken,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete status');
      }
      // Refresh statuses after successful delete
      fetchStatuses();
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Statuses
            </Typography>
            {loading ? (
              <Typography>Loading statuses...</Typography>
            ) : (
              statuses.map((status) => (
                <div
                  key={status.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    color: "black",
                  }}
                >
                  <h3>{status.username} is on tonight!</h3>
                  <p>Content: {status.content}</p>
                  <p>Created At: {status.created_at}</p>
                  {/* Display delete button only if the status belongs to the logged-in user */}
                  {status.username === localStorage.getItem("username") && (
                    <Button onClick={() => handleDelete(status.id)} variant="contained" color="error">
                      Delete
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
