import React from "react";

const Button = ({ active, onClick, children }) => {
  const buttonClass = `btn ${active ? "btn-primary" : "btn-secondary"}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
