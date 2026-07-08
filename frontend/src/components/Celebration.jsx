import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import childrenday from "../assets/childrenday.jpg";
import MensDay from "../assets/MensDay.jpg";
import Christmas2 from "../assets/Christmas2.jpg";
import NewYear from "../assets/NewYear.jpg";
import "./Celebration.css";

export default function CelebrationsCalendar() {
  const celebrations = [
    { date: "14ᵗʰ NOV", title: "Children's Day", img: childrenday },
    { date: "19ᵗʰ NOV", title: "International Men's Day", img: MensDay },
    { date: "25ᵗʰ DEC", title: "Christmas", img: Christmas2 },
    { date: "1ˢᵗ JAN", title: "New Year", img: NewYear },
  ];

  return (
    <Container className="celeb-container">
      <h4 className="celeb-title">Celebrations Calendar</h4>
      <Row className="row-celeb">
        {celebrations.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <Card className="card-img">
              <div className="img-wrapper">
                <Card.Img variant="top" src={item.img} className="card-image" />
                <div className="date-badge">{item.date}</div>
              </div>
              <Card.Body>
                <Card.Text className="card-text">{item.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
