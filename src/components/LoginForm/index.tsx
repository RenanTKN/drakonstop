import { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router";
import * as Yup from "yup";

import { useAuth } from "../../auth";
import Button from "../Button";

import "./style.scss";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Deve ter no máximo 15 caracteres")
        .required("Campo obrigatório"),
      password: Yup.string()
        .max(15, "Deve ter no máximo 15 caracteres")
        .required("Campo obrigatório"),
    }),
    onSubmit: ({ username, password }) => {
      setIsLoading(true);
      auth.signin({ username, password }, () => {
        navigate(from, { replace: true });
      });
    },
  });

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="form" onSubmit={formik.handleSubmit}>
          <label>
            Usuário:{" "}
            <input
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus
            />
            {formik.touched.username && formik.errors.username && (
              <div className="form-error">{formik.errors.username}</div>
            )}
          </label>{" "}
          <label>
            Senha:{" "}
            <input
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="form-error">{formik.errors.password}</div>
            )}
          </label>{" "}
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
