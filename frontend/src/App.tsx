import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import { ConfigProvider } from "antd";
import "./index.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,
            colorLink: "#00b96b",
            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <MainLayout />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
