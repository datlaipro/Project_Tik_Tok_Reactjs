import React from "react";
import { useState, useEffect } from "react";

function ActionPattern({ children, parent, data }) {
  const [isMobile, setIsMobile] = useState(false); //responsive
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    handleResize(); // khởi tạo lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <button
        style={{
          position: "relative",
          width: "50px",
          height: "50px",
          backgroundColor: "#e0e0e0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          padding: 0,
          cursor: "pointer",
          outline: "none",
        }}
        onClick={parent}
      >
        {/* Icon bên trong button */}
        {React.Children.toArray(children)[0]}
      </button>

      <span
        style={{
          marginTop: "4px",
          fontWeight: "bold",
          fontSize: "14px",
          color: isMobile || isTablet ? "white" : "black",
        }}
      >
        {data}
      </span>

      {/* Component phức tạp bên ngoài button */}
      {React.Children.toArray(children)[1]}
    </div>
  );
}
export default ActionPattern;
