import { Button, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function LandingPage() {
  function handleClick() {
    const signupForm = document.getElementById("signupForm");
    signupForm.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      style={{
        backgroundColor: "#071013",
        minHeight: "100vh",
        paddingTop: "7vmin",
        paddingBottom: "20vmin",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

        <div style={{ width: "fit-content", margin: "auto" }}>
          <Button
            variant="contained"
            sx={{ color: "white", backgroundColor: "#75ABBC", mb: '20vmin', paddingRight: '30px', paddingLeft: '30px' }}
            onClick={handleClick}
          >
            Click Here
          </Button>
        </div>
      </div>
      <div id="signupForm">
        <SignupForm />
      </div>
    </div>
  );
}