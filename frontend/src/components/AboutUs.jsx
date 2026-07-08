import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css";

export default function AboutUs() {
  const team = [
    { name: "Team Member 1", role: "Developer", img: "./src/assets/team/amey.png" },
    { name: "Team Member 2", role: "Developer", img: "./src/assets/team/shivanjali.png" },
    { name: "Team Member 3", role: "Developer", img: "./src/assets/team/sofiya.png" },
  ];

  return (
    <div  style={{  background: 'linear-gradient(to right, #ffffff, #f9f9f9)' }} >
      <Container className="py-5 text-center">
        <h2 className="text-primary fw-bold mb-3" style={ { marginTop: "40px"}}>About Fern & Petals</h2>
        <p className="text-muted mb-5" style={{ maxWidth: "750px", margin: "0 auto" }}>
          “Our journey began with a simple idea: to make gifting effortless and meaningful. 
          Today, Fern and Petals stands as a trusted name, blending creativity, quality, and heartfelt emotion in every bouquet and box we deliver.”
        </p>

        <Row className="g-4 justify-content-center mb-5">
          <Col md={5}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <h5 className="text-success fw-bold">Our Vision</h5>
                <p className="text-muted">
                  To deliver fresh, high-quality flowers and meaningful gifts that help people
            express emotions and celebrate life’s special moments.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <h5 className="text-success fw-bold">Our Mission</h5>
                <p className="text-muted">
                  Fern & Petals is a leading name in the world of flowers, plants, and gifts.
            We’re passionate about spreading joy and love through our artfully designed
            bouquets and thoughtful gift packages. Whether it’s a birthday, anniversary,
            or celebration — we make every moment memorable.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h3 className="text-primary fw-bold mb-4">Meet Our Team</h3>
        <Row className="g-4 justify-content-center">
          {team.map((member, i) => (
            <Col md={4} key={i}>
              <Card className="border-0 shadow-sm text-center p-3 hover-card">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto mb-3"
                  width="100"
                  height="100"
                />
                <h5 className="text-primary fw-bold">{member.name}</h5>
                <p className="text-muted">{member.role}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      
    </div>
  );
}