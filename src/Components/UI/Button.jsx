import React from "react";
import "../../Styles/Button.css";

const Button = ({ active, onClick, children }) => {
  const buttonClass = `modern-btn ${active ? "modern-btn-active" : "modern-btn-inactive"}`;

  return (
    <button 
      className={buttonClass} 
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
};

const ButtonGroup = ({ activeLayer, setActiveLayer }) => {
  const buttons = [
    { label: "All", value: "all", icon: "🌐" },
    { label: "Hospitals", value: "hospital", icon: "🏥" },
    { label: "Schools", value: "school", icon: "🏫" },
  ];

  return (
    <div className="modern-button-container" role="group" aria-label="Infrastructure filter">
      {buttons.map((button) => (
        <Button
          key={button.value}
          active={activeLayer === button.value}
          onClick={() => setActiveLayer(button.value)}
        >
          <span className="button-icon">{button.icon}</span>
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export { Button, ButtonGroup };