import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { getToken } from "../services/TokenService";
import { ROLES } from "../constants/RoleConstants.js";

export function Navigationbar() {
  const navigate = useNavigate();
  const token = getToken();
  const role = localStorage.getItem("role"); // 🔑 Retrieve the stored user role

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
    sessionStorage.clear();
    navigate("/"); // redirect to login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm navbar">
      <Container>
        {/* ✅ Brand / Logo */}
        <Navbar.Brand
          onClick={() => navigate("/home")}
          className="brand-name"
          style={{
            letterSpacing: "1px",
            color: "#f8d210",
            cursor: "pointer",
          }}
        >
          Ferns & Petals
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            {role === ROLES.CUSTOMER ? (
              <>
                <NavLink
                  to="/add-product"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Shop
                </NavLink>

                <NavLink
                  to="/getUserOrders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  My Orders
                </NavLink>

                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/aboutus"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  About
                </NavLink>
              </>
            ) : null}

             {role === ROLES.ADMIN ? (
              <>
                <NavLink
                  to="/getAllOrders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Dashboard
                </NavLink>
              </>
            ) : null}

          </Nav>

          {/* ✅ Right-side Auth Buttons */}
          <Nav>
            {token ? (
              <Button
                className="logout"
                onClick={handleLogout}
                style={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "solid 1px white",
                }}
              >
                Logout
              </Button>
            ) : (
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
