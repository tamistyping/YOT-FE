import { Button, Typography, Dialog, DialogContent } from "@mui/material";
import LoginForm from "../components/LoginForm";
import SignupForm from "../modals/SignupForm";
import { useState } from "react";

export default function LandingPage() {
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const handleModalClick = () => {
    setOpenSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setOpenSignupModal(false);
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
        maxWidth: '100%'
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
            color: 'white',
            backgroundColor: '#75ABBC',
            mb: 1.3,
            paddingRight: '30px',
            paddingLeft: '30px',
          }}
          onClick={handleModalClick}
        >
          Click Here
        </Button>
      </div>
      
      <Dialog open={openSignupModal} onClose={handleCloseSignupModal}>
        <DialogContent sx={{backgroundColor: 'black'}}>
          <SignupForm handleClose={handleCloseSignupModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}