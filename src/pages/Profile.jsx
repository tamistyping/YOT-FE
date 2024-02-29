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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  function getCookie(name) {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
  }

  const fetchProfileData = async () => {
    try {
      const csrftoken = getCookie("csrftoken");
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/users/me/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
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

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("photo-file", selectedImage);
  
    try {
      const csrftoken = getCookie("csrftoken");
      const userId = profileData.id;
  
      const uploadResponse = await axios.post(
        `http://localhost:8000/api/v1/users/${userId}/add_photo/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
          },
        }
      );
  
      // Store the image URL in local storage
      localStorage.setItem('profile_picture_url', uploadResponse.data.url);

      // Refresh profile data after successful upload
      fetchProfileData();
      
  
      console.log("Profile picture uploaded:", uploadResponse.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card elevation={4}>
          <CardContent>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
  {profileData && profileData.username}'s Profile
</Typography>
            {loading ? (
              <Typography>Loading profile data...</Typography>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Box mb={2} sx={{ position: 'relative' }}>
                        <Avatar
                          alt="Profile Picture"
                          src={`${localStorage.getItem("profile_picture_url")}`}
                          sx={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover', // or 'contain' depending on your preference
                          }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                        />
                      </Box>
                      <button onClick={handleImageUpload} style={{ marginBottom: '8px', padding: '8px 16px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Set Profile Picture</button>
                      <button onClick={handleImageUpload} style={{ padding: '8px 16px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Upload</button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profileData.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Name:</strong> {profileData.first_name}{" "}
                      {profileData.last_name}
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
  )
}