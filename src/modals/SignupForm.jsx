import { toast } from "react-toastify";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignupForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      console.log("passwords don't match!");
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/users/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store tokens in local storage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // Redirect or perform any other action after successful sign-up
      console.log("User signed up successfully");

      // Fetch user list with JWT token
      const userListResponse = await axios.get(
        "http://localhost:8000/api/v1/auth/users/",
        {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        }
      );

      console.log("User list:", userListResponse.data);
    } catch (error) {
      console.error("Error signing up: ", error.message);
      toast.error("Failed to sign up. Please try again!");
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#DFE0E2" }}
            align="left"
          >
            &lt;Sign up&gt;
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="re_password"
              label="Confirm Password"
              type="password"
              id="re_password"
              value={formData.re_password}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                mb: 1,
                padding: 1,
                color: "white",
                backgroundColor: "#23B5D3",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

// User Registration (Sign Up):

// Endpoint: /auth/users/
// Method: POST
// This endpoint is used for registering a new user. You send a POST request with the user's data (such as email, password, etc.), and Djoser creates a new user if the data is valid.
// User Login:

// Endpoint: /auth/token/login/
// Method: POST
// This endpoint is used for user authentication. You send a POST request with the user's credentials (such as email and password), and Djoser returns an authentication token if the credentials are correct.
// User Logout:

// Endpoint: /auth/token/logout/
// Method: POST
// This endpoint is used to invalidate the user's token and log them out.
