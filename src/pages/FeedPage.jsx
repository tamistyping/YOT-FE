import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Status from "../components/Status";
import StatusForm from "../components/StatusForm";


export default function FeedPage() {
  return (
    <>
      <NavBar />
      <div style={{display: 'flex', alignContent: 'center', textAlign: 'center', flexDirection: "column" }}>
        <StatusForm />
        <Status />
      </div>
      <Footer />
    </>
  );
}