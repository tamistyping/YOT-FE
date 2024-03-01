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
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useProfile } from "../components/ProfileContext";

export default function Profile() {
  const { profileData, loading, setProfileData } = useProfile(); 
  const [selectedImage, setSelectedImage] = useState(null);

// eslint-disable-next-line
  useEffect(() => {
// eslint-disable-next-line
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
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/users/me/`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
          },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
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
      const userId = profileData?.id; 
  
      if (!userId) {
        console.error("User ID not found");
        return;
      }
  
      const uploadResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${userId}/add_photo/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "X-CSRFToken": csrftoken,
          },
        }
      );
  
      localStorage.setItem('profile_picture_url', uploadResponse.data.url);
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
            {profileData && `@${profileData.username}'s Profile`}
            </Typography>
            {loading ? (
              <Typography>Loading profile data...</Typography>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      mb={2}
                    >
                      {profileData && (
                        <Avatar
                          alt="Profile Picture"
                          src={`${localStorage.getItem("profile_picture_url")}`}
                          sx={{ 
                            width: 120, 
                            height: 120,
                            objectFit: 'cover', 
                          }}
                        />
                      )}
                        
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <button onClick={handleImageUpload}>Upload</button>
                    </Box>
                   
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profileData && profileData.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Name:</strong> {profileData && profileData.first_name}{" "}
                      {profileData && profileData.last_name}
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
