import React from "react";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Container from "./Container";

const Banner = () => {
  return (
    <div className="mt-16">
      <Container>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          stopOnHover={false}
          showStatus={false}
        >
          <div>
            <img src={banner1} />
          </div>
          <div>
            <img src={banner2} />
          </div>
          <div>
            <img src={banner3} />
          </div>
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
