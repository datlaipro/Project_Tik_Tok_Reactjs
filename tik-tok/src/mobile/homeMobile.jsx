import React from "react";

function Home({ icon, title, handleClick, isActive }) {
  return (
    <div className="home-button-wrapper">
      <button
        className={`home-button ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {icon}
        {title && <span>{title}</span>}
      </button>
    </div>
  );
}


export default Home;
