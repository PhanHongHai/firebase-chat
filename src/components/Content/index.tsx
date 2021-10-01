import React, { FC } from "react";
import { Box } from "@mui/material";
const Content: FC = ({ children }) => {
  return (
    <Box
      sx={{
        width: "80%",
        height: "100vh",
        marginLeft: "20%",
      }}
    >
      {children}
    </Box>
  );
};

export default Content;
