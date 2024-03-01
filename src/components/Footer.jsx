import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        backgroundColor: "#23B5D3", 
        color: "white",
        bottom: 0,
        width: "100%",
        position: "fixed",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="left">
          {"Copyright © "} {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
      <Container maxWidth="sm" align="right" sx={{ paddingRight: '8vmin' }}>
        <a href="https://www.linkedin.com/in/tamparlak/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      </Container>
    </Box>
  );
}


