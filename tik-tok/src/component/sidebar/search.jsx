import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import style from "./styleAlike.module.css";

import React from "react";

import { Box } from "@mui/material";

function Search() {
  return (
    
    <Box
      sx={{
        marginTop: "60px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        borderRadius: "25px",
        padding: "5px 15px",
        width: "fit-content",
      }}
    >
      <SearchIcon sx={{ color: "black", marginRight: "8px" }} />
      <input
        type="text"
        placeholder="Tìm kiếm"
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "16px",
          color: "black",
        }}
      />
    </Box>
  );
}

export default Search;
