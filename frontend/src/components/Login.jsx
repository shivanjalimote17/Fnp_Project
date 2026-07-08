import React, { useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { getToken, storeToken } from "../services/TokenService";
import { login } from "../services/LoginService";
import { storeRole } from "../services/RoleService";
import { storeid } from "../services/IdService";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) navigate("/home");
  }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password too short")
      .required("Password is required"),
    role: Yup.string().required("Please select a role"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await login(values);
      toast.success("🎉 Login successful! ", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });

      if (response.status === 200) {
  const { token, userId, role, userName } = response.data;

  storeToken(token);
  storeRole(role);
  storeid(userId);
  
  // pick the correct name depending on role
  // const nameToStore = role === "admin" ? adminName : userName;

  localStorage.setItem(
    "user",
    JSON.stringify({
      userid: userId,
      username: userName,
      role,
    })
  );

        setTimeout(() => navigate("/home"), 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message || "Login failed", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f6fbf8ff" }}
    >
      <Container
        className="bg-white p-4 rounded"
        style={{ width: "320px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
      >
        <h5 className="text-center mb-3">Log in with</h5>

        <Row className="mb-3">
          <Col>
            <Button variant="light" className="w-100 border">
              <img src="google.png" alt="Google" width="20" className="me-2" />
              Google
            </Button>
          </Col>
          <Col>
            <Button variant="light" className="w-100 border">
              <img src="apple.png" alt="Apple" width="20" className="me-2" />
              Apple
            </Button>
          </Col>
        </Row>

        <div className="text-center text-muted mb-3">or</div>

        <Formik
          initialValues={{ email: "", password: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            dirty,
            isValid,
            isSubmitting,
          }) => (
            <BootstrapForm as={Form} onSubmit={handleSubmit}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.email && !!errors.email}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="email" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.password && !!errors.password}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="password" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label>Role</BootstrapForm.Label>
                <BootstrapForm.Check
                  type="radio"
                  label="Admin"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  checked={values.role === "admin"}
                />
                <BootstrapForm.Check
                  type="radio"
                  label="Customer"
                  name="role"
                  value="customer"
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  checked={values.role === "customer"}
                />
                {touched.role && errors.role && (
                  <div className="text-danger small">{errors.role}</div>
                )}
              </BootstrapForm.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={!(dirty && isValid) || isSubmitting}
                className="w-100 mb-3"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </BootstrapForm>
          )}
        </Formik>

        <div className="text-center" style={{ fontSize: "14px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-decoration-none fw-bold"
            style={{ color: "#0d6efd", cursor: "pointer" }}
          >
            Sign up
          </span>
        </div>
      </Container>
    </div>
  );
}
