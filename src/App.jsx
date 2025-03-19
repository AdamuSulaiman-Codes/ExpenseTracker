import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <SideBar />
        <Outlet />
      </main>
    </div>
  );
};

export default App;
