import { ReactNode } from "react";

import "./style.scss";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
}

export default function Button({
  children: chidren,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {chidren}
    </button>
  );
}
