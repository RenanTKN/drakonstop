import { ReactNode } from "react";

import "./style.scss";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  color?: "blue" | "red" | "gray";
  onClick?: () => void;
}

export default function Button({
  children: chidren,
  type = "button",
  color = "blue",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`button ${color}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {chidren}
    </button>
  );
}
