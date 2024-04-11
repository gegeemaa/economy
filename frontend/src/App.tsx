import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Login from "./components/auth/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
