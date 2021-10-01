import React, { FC } from "react";

// import Header from "../Header";
import Sidebar from "components/Sidebar";
import Content from "components/Content";
const LayoutMain: FC = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
};

export default LayoutMain;
