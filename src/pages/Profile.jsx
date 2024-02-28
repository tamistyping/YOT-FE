import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data when component mounts
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/users/me/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Profile Information
            </Typography>
            {loading ? (
              <Typography>Loading profile data...</Typography>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                      <Avatar
                        alt="Profile Picture"
                        src={profileData.profile_pic}
                        sx={{ width: 120, height: 120 }}
                      />
                    </Box>
                    <Divider />
                    <Typography variant="h6" mt={2}>
                      {profileData.username}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profileData.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Name:</strong> {profileData.first_name}{" "}
                      {profileData.last_name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Bio:</strong> {profileData.bio}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
