import React from "react";

import { useRef, useState } from "react";
import styles from "./styleAlike.module.css";
function Home({ icon, title,className,handleClick ,isActive }) {
 

  return (
    <div className={`${styles.wrapper} ${isActive ? styles.active : ""}`}>
      <button
       className={`${styles.alike} `}
        onClick={handleClick}
        
      >
        
        {icon} 
        <span style={{ marginLeft: "20px", fontSize: 20 }}>{title} </span>
      </button>
    </div>
  );
}

export default Home;
