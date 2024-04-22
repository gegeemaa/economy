import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
};

export default App;
