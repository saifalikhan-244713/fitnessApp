import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./assets/Signup";
import Login from "./assets/Login";
import Home from "./assets/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Calculator from "./assets/Calculator";
import Performance from "./assets/Performance";
// import NutritionPage from "./assets/NutritionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
