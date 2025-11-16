import React, { useEffect, useState } from "react";
import Container from "./Container";
import ReviewCard from "./ReviewCard";
import customerTopImg from '../assets/images/customer-top.png'

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {

        const filtered = data
          .filter((r) => r.ratings >= 4.0)
          .slice(0, 6); 
        setReviews(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <p className="text-center text-gray-500">Loading reviews...</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 mt-32">
      <Container>
        <div className="text-center mb-12">
  
          <img
            src={customerTopImg}
            alt="Delivery illustration"
            className="w-64 mx-auto mb-6"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-second mb-3">
            What our customers are saying
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: ".review-prev",
            nextEl: ".review-next",
          }}
          pagination={{ clickable: true, el: ".review-pagination" }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="pb-12"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <ReviewCard
                review={item.review}
                name={item.userName}
                title={item.ratings >= 4.5 ? "Valued Customer" : "Customer"}
                photoURL={item.user_photoURL}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows + Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6 max-w-26 mx-auto">
          <button className="review-prev p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
            <ChevronLeft className="w-5 h-5 text-second" />
          </button>

          <div className="review-pagination flex gap-1"></div>

          <button className="review-next p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5 text-second" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default CustomerReviews;