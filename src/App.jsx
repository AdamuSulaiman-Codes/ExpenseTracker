import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import Modal from "./assets/Modal";
import AddTransaction from "./components/AddTransaction";
import DeleteTransaction from "./components/DeleteTransaction";

const App = () => {
  return (
    <>
      <Modal id="addTransactions">
        <AddTransaction />
      </Modal>
      <Modal id="deleteTransaction">
        <DeleteTransaction />
      </Modal>
      <div>
        <Header />
        <main className="main-content">
          <SideBar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
