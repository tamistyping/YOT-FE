import React, { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Status from "../components/Status";
import StatusForm from "../components/StatusForm";


export default function FeedPage() {
  const [refresh, setRefresh] = useState(false);

  const handleStatusAdded = () => {

    setRefresh(!refresh);
  };

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', alignContent: 'center', textAlign: 'center', flexDirection: "column" }}>
        <StatusForm onStatusAdded={handleStatusAdded} />
        <Status refresh={refresh} />
      </div>
      <Footer />
    </>
  );
}