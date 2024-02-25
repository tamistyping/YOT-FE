import { BrowserRouter } from 'react-router-dom'
// import NavBar from './components/NavBar'
// import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'


// Bootstrap imports

export default function App() {

  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  )
}