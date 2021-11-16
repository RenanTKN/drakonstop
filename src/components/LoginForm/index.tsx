import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../../auth";
import Button from "../Button";

import "./style.scss";

export default function LoginForm() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    auth.signin({ username, password }, () => {
      navigate(from, { replace: true });
    });
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </label>{" "}
          <label>
            Password:{" "}
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>{" "}
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}
