import { Routes as RoutesList, Route } from "react-router-dom";

import { RequireAuth } from "./auth";
import DragonInfo from "./pages/DragonInfo";
import Dragons from "./pages/Dragons";
import Login from "./pages/Login";

export default function Routes() {
  return (
    <RoutesList>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dragons />
          </RequireAuth>
        }
      />
      <Route
        path="/:id"
        element={
          <RequireAuth>
            <DragonInfo />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </RoutesList>
  );
}
