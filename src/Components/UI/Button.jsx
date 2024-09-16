import React from "react";
import "../../Styles/Button.css";

const Button = ({ active, onClick, children }) => {
  const buttonClass = `btn ${active ? "btn-primary" : "btn-secondary"}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonGroup = ({ activeLayer, setActiveLayer }) => {
  return (
    <div className="button-container">
      <Button
        active={activeLayer === "all"}
        onClick={() => setActiveLayer("all")}
      >
        All
      </Button>
      <Button
        active={activeLayer === "hospital"}
        onClick={() => setActiveLayer("hospital")}
      >
        Hospitals
      </Button>
      <Button
        active={activeLayer === "school"}
        onClick={() => setActiveLayer("school")}
      >
        Schools
      </Button>
    </div>
  );
};

export { Button, ButtonGroup };
