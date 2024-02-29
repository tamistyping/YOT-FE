import { Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useState } from "react";

export default function LandingPage() {
  const [scrollToSignup, setScrollToSignup] = useState(false);

  const handleScrollToSignup = () => {
    setScrollToSignup(true);
    setTimeout(() => {
      document
        .getElementById("signup-form")
        .scrollIntoView({ behavior: "smooth" });
    }, 220); 
  };

  return (
    <div
      style={{
        backgroundColor: "#071013",
        minHeight: "90vh",
        paddingTop: "5vmin",
        paddingBottom: "20vmin",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      <LoginForm />
      <div style={{ textAlign: "center" }}>
        <Typography
          component="h1"
          variant="h6"
          mt={4}
          mb={1}
          align="center"
          sx={{
            p: 1,
            mt: 7,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "#DFE0E2",
            textDecoration: "none",
          }}
        >
          Don't have an account?
        </Typography>
      </div>

      <div>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#75ABBC",
            mb: 1.3,
            paddingRight: "30px",
            paddingLeft: "30px",
            marginBottom: "30vmin"
          }}
          onClick={handleScrollToSignup}
        >
          Click Here
        </Button>
      </div>
      <div id="signup-form">
        <SignupForm scrollToSignup={scrollToSignup} />
      </div>
    </div>
  );
}
