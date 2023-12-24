import NavBar from "../components/navBar";
import { Outlet } from "react-router-dom";

// import { useState } from "react";

const Parent = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Parent;
