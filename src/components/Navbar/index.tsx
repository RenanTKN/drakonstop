import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { fakeAuthProvider, useAuth } from "../../auth";
import { Logout } from "../../icons";
import Fab from "../Fab";
import Tooltip from "../Tooltip";

import "./style.scss";

export default function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div>
        <h1>
          <Link to="/">DrakonStop</Link>
        </h1>
      </div>
      <div>
        {fakeAuthProvider.isAuthenticated && (
          <div
            onClick={() => {
              auth.signout(() => navigate("/"));
            }}
            className="logout"
          >
            <Tooltip text="Logout">
              <Fab color="white">
                <Logout />
              </Fab>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}
