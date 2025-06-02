import React from "react";

import { useRef, useState } from "react";
import styles from "./styleAlike.module.css";
function Home({ icon, title,className,handleClick ,color}) {
 

  return (
    <div style={color}>
      <button
        className={`${styles.alike} ${className}`} // style căn chỉnh các menu sidebar sang trái
        // onClick={() => {
        //   setRed("red");
         
        //   // alert("Chức năng này đang được phát triển");
        // }}
        onClick={handleClick}
      >
        
        {icon} 
        <span style={{ marginLeft: "20px", fontSize: 20 }}>{title} </span>
      </button>
    </div>
  );
}

export default Home;
