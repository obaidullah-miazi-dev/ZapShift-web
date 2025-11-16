// src/components/FAQSection.jsx
import React from "react";
import Container from "./Container";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I track my parcel in real-time?",
      answer:
        "Once your parcel is picked up, you’ll receive a unique tracking ID via SMS and email. Simply enter it on our Live Tracking page or app to see your parcel’s exact location, estimated delivery time, and rider details — updated every 30 seconds.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We deliver to every corner of Bangladesh — from Dhaka to the remotest upazilas. Same-day delivery is available in major cities (Dhaka, Chattogram, Sylhet, etc.), and next-day delivery covers 64 districts.",
    },
    {
      question: "Is my parcel 100% safe and insured?",
      answer:
        "Yes! Every parcel is handled with care, sealed in tamper-proof packaging, and fully insured up to ৳50,000 at no extra cost. In case of damage or loss (extremely rare), we refund or reship immediately.",
    },
    {
      question: "How much does delivery cost?",
      answer:
        "Our pricing is transparent and affordable: Starting at just ৳60 for intra-city and ৳120 for inter-city. No hidden fees. Weight, distance, and speed options (Standard, Express, Same-Day) determine the final cost — calculated instantly at checkout.",
    },
    {
      question: "Can I schedule a pickup time?",
      answer:
        "Absolutely! Choose your preferred 2-hour pickup window during booking. Our rider will arrive on time, or your next delivery is free. Perfect for businesses and busy individuals.",
    },
    {
      question: "What if I’m not home during delivery?",
      answer:
        "No problem! You can authorize a neighbor, security guard, or family member to receive it. Or redirect to a nearby ZapShift Pickup Point — over 500 locations nationwide.",
    },
  ];

  return (
    <section className="py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-second mb-3">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-arrow bg-white border border-gray-200 rounded-xl"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-base md:text-lg font-semibold text-second pr-12">
                {faq.question}
              </div>
              <div className="collapse-content text-sm md:text-base text-gray-600 pt-2">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;