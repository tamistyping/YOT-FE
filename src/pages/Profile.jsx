import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Profile Information
            </Typography>
            {loading ? (
              <Typography>Loading profile data...</Typography>
            ) : (
              <>
              <Typography variant="body1" sx={{ mt: 2 }}>
                  PROFILE PIC
                </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                  Bio: {profileData.bio} 
                </Typography>
                <Typography variant="h6">
                  Username: {profileData.username}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Email: {profileData.email}
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  Name: {profileData.first_name} {profileData.last_name}
                </Typography>

                {/* Additional profile information */}
              </>
            )}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
