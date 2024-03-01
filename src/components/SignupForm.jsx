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
    username: "",
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/users/`, 
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("User signed up successfully:", response.data);
      toast.success("User signed up successfully! Please log in.");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
  
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
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ backgroundColor: "#DFE0E2" }}
            />
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
