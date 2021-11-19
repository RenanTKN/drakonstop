import React from "react";

import "./style.scss";

interface FabProps {
  children: React.ReactNode;
  color?: "blue" | "white" | "red" | "yellow";
  onClick?: () => void;
}

export default function Fab({ children, color = "blue", onClick }: FabProps) {
  return (
    <button
      className={`fab ${color}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
