import React from "react";
import NavVar from "./components/NavVar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
function App() {
  return (
    <Router>
      <div className="App">
        <NavVar />
        <div className="container">
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/users" element={<Users />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
