import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerCustomer } from "../services/CustomerService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/TokenService";

export function RegistrationForm() {
  const [initialValues] = useState({
    username: "",
    useremail: "",
    password: "",
    useraddress: "",
    userphone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    useremail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    useraddress: Yup.string().required("Address is required"),
    userphone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await registerCustomer(values);

      toast.success("🎉 Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });

      resetForm();

      setTimeout(() => navigate("/"), 4000);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
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
        style={{ width: "360px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
      >
        <h5 className="text-center mb-3">Register with</h5>

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
          initialValues={initialValues}
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
            isSubmitting,
            dirty,
            isValid,
          }) => (
            <BootstrapForm as={Form} onSubmit={handleSubmit}>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="text"
                  name="username"
                  placeholder="Enter your name"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.username && !!errors.username}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="username" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="email"
                  name="useremail"
                  placeholder="Enter your email"
                  value={values.useremail}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.useremail && !!errors.useremail}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="useremail" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
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
                <BootstrapForm.Control
                  as="textarea"
                  rows={2}
                  name="useraddress"
                  placeholder="Enter your address"
                  value={values.useraddress}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.useraddress && !!errors.useraddress}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="useraddress" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Control
                  type="text"
                  name="userphone"
                  placeholder="Enter your phone number"
                  value={values.userphone}
                  onChange={handleChange}
                  onBlur={handleBlur} // added
                  isInvalid={touched.userphone && !!errors.userphone}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  <ErrorMessage name="userphone" />
                </BootstrapForm.Control.Feedback>
              </BootstrapForm.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                disabled={!(dirty && isValid) || isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </BootstrapForm>
          )}
        </Formik>

        <div className="text-center" style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <a
            href="/register"
            className="text-decoration-none fw-bold"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            log in
          </a>
        </div>
      </Container>
    </div>
  );
}
