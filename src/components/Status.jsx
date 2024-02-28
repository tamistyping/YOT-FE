import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Footer from "../components/Footer";

export default function Status() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statuses when component mounts
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/statuses/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStatuses(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching statuses:", error);
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
              statuses.map(status => (
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
