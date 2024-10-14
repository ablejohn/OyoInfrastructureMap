import React from "react";
import "../../Styles/Button.css";
import { throttle } from "lodash";

const Button = ({ active, onClick, children }) => {
  const buttonClass = `modern-btn ${
    active ? "modern-btn-active" : "modern-btn-inactive"
  }`;

  return (
    <button className={buttonClass} onClick={onClick} aria-pressed={active}>
      {children}
    </button>
  );
};

const ButtonGroup = ({ activeLayer, setActiveLayer }) => {
  // Wrap `setActiveLayer` in `throttle` to prevent too frequent updates
  const throttledSetActiveLayer = React.useCallback(
    throttle((layer) => setActiveLayer(layer), 500),
    [setActiveLayer]
  );

  const buttons = [
    { label: "All", value: "all", icon: "🌐" },
    { label: "Hospitals", value: "hospital", icon: "🏥" },
    { label: "Schools", value: "school", icon: "🏫" },
  ];

  return (
    <div
      className="modern-button-container"
      role="group"
      aria-label="Infrastructure filter"
    >
      {buttons.map((button) => (
        <Button
          key={button.value}
          active={activeLayer === button.value}
          onClick={() => throttledSetActiveLayer(button.value)}
        >
          <span className="button-icon">{button.icon}</span>
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export { Button, ButtonGroup };
