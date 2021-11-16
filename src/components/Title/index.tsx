import { ReactNode } from "react";

import "./style.scss";

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <div className="title">
      <h1>{children}</h1>
    </div>
  );
}
