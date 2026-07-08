import { Card, Row, Col, Button, Container } from "react-bootstrap";
import "./Bestsellers.css";

export default function Bestsellers() {
  const products = [
    {
      name: "Green Plant",
      price: 499,
      description: "Beautiful indoor plant for your home or office.",
      image: "plant.jpg",
    },
    {
      name: "Rose Bouquet",
      price: 899,
      description: "A classic bouquet of red roses for your loved ones.",
      image: "rose.jpg",
    },
    {
      name: "Chocolate Box",
      price: 699,
      description: "Premium assorted chocolates to sweeten your day.",
      image: "chocolates.jpg",
    },
    {
      name: "Teddy Bear",
      price: 599,
      description: "Soft and cuddly teddy bear — perfect for gifting.",
      image: "teddy.jpg",
    },
  ];

  return (
    <Container className="bestseller-container">
      <h4 className="title">Our Bestsellers</h4>
      <Row className="bestseller-row ">
        {products.map((product, index) => (
          <Col key={index} lg={3} md={4} sm={6} xs={12} className="mb-4">
            <Card className="bestseller-card shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="bestseller-img"
              />
              <Card.Body>
                <Card.Title className="fw-semibold">{product.name}</Card.Title>
                <div>
                  <h6>₹ {product.price}</h6>
                  <p className="text-muted">{product.description}</p>
                </div>
                <Button variant="primary" size="sm">
                  Buy Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
