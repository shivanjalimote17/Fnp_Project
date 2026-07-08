import { Container } from "react-bootstrap";
import accessDeniedImage from "../assets/accessDeniedImage.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AccessDenied.css";

export function AccessDenied() {
  return (
    <div className="access-denied-bg">
      <Container className="access-denied-container text-center">
        <img
          src={accessDeniedImage}
          alt="Access Denied"
          className="access-denied-image"
        />
        <h4 className="mt-3 text-danger fw-bold">Access Denied</h4>
        <p>You do not have permission to view this page.</p>
      </Container>
    </div>
  );
}
