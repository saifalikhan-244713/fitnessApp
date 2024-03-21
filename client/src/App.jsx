import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./assets/Signup";
import Login from "./assets/Login";
import Home from "./assets/Home";
import {BrowserRouter, Routes, Route, } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
