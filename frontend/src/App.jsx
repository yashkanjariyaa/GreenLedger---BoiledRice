import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Learn from "./pages/Learn";
import Location from "./pages/Location";
import MetaMask from "./pages/MetaMask";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/location" element={<Location />} />
        <Route path="/metamasklogin" element={<MetaMask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
