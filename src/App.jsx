import "./App.css";
import Home from "./pages/Home";
import DetectMudra from "./pages/DetectMudra";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detect" element={<DetectMudra />} />
      </Routes>
    </>
  );
}

export default App;