import Carousel from "react-bootstrap/Carousel";
import './Carousel.css';

export function AddCarousel() {
  return (
    <Carousel >
      <Carousel.Item>
        <img
          src="slide1.jpg"
          alt="Gift Hamper"
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption  className="caption">
          <h3>Gifts That Speak From the Heart</h3>
          <p>Curated hampers to celebrate every bond with love and care.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="slide2.jpg"
          alt="plants"
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption className="caption">
          <h3>Gift a Breath of Fresh Air</h3>
          <p>Surprise your loved ones with living gifts that grow with love.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="slide3.jpg"
          alt="cakes"
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption  className="caption">
          <h3>Delight in Every Slice</h3>
          <p>
            Freshly baked cakes made to melt your heart and sweeten your
            celebrations.
          </p>
        </Carousel.Caption >
      </Carousel.Item>

      <Carousel.Item>
        <img
          src="slide4.jpg"
          alt="makeup"
          className="d-block w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Carousel.Caption className="caption">
          <h3>Glow Beyond Ordinary</h3>
          <p>
            Discover radiant formulas that enhance your natural beauty
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
