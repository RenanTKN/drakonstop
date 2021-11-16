import { ReactNode } from "react";
import { Link } from "react-router-dom";

import "./style.scss";

interface ButtonLinkProps {
  children: ReactNode;
  to: string;
}

export default function ButtonLink({ children, to }: ButtonLinkProps) {
  return (
    <div className="button-link">
      <Link to={to}>{children}</Link>
    </div>
  );
}
