import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import MovieInfo from "./components/MovieInfo";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="body">
        <main className="grow">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieInfo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
