import React from "react";
import Marquee from "react-fast-marquee";
import Container from "./Container";
import amazon from '../assets/brands/amazon.png'
import casio from '../assets/brands/casio.png'
import moonstar from '../assets/brands/moonstar.png'
import randstad from '../assets/brands/randstad.png'
import star from '../assets/brands/star.png'
import start_people from '../assets/brands/start_people.png'
import amazon_vector from '../assets/brands/amazon_vector.png'

const Brands = () => {
    const brandLogos = [amazon,casio,moonstar,randstad,amazon_vector,star,start_people]
  return (
    <Container>
      <div className="mt-32 w-11/12 mx-auto">
        <h3 className="font-bold text-3xl text-second my-12 text-center">
          We've helped thousands of sales teams
        </h3>

        <Marquee loop={0} autoFill>
            {brandLogos.map(brand => <img src={brand} alt="logo" className="mx-8"/>)}
        </Marquee>
        
      </div>
    </Container>
  );
};

export default Brands;
