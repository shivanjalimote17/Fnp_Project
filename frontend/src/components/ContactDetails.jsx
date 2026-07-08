import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactDetails.css";

export default function ContactDetails() {
  return (
    <div className="contact-bg">
      <Container className="contact-container">
        <h4 className="text-center mb-4">Contact Details</h4>

        <Row className="mb-4">
          <Col>
            <Button variant="outline-success" className="w-100">
              Track Orders
            </Button>
          </Col>
          <Col>
            <Button variant="outline-success" className="w-100">
              FAQs
            </Button>
          </Col>
        </Row>

        <div className="contact-info">
          <h4 className="fw-bold">Our Office</h4>
          <p>
            FNP Estates, Ashram Marg, Sultanpur Mandi Road, Gadaipur,
            Chhatarpur Farms, DLF Farms, New Delhi, Delhi 110030
          </p>

          <h4 className="fw-bold mt-3">Contact Us</h4>

          <h6>Contact Number</h6>
          <p>📞 8184537801</p>

          <h6>Email</h6>
          <p>📧 fnp@gmail.com</p>
        </div>
      </Container>
    </div>
  );
}
