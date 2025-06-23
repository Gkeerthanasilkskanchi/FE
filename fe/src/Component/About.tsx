import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
export const About = () => {


  const data = [
    { year: 2003, customers: 5000 },
    { year: 2006, customers: 12000 },
    { year: 2010, customers: 22000 },
    { year: 2013, customers: 30000 },
    { year: 2016, customers: 38000 },
    { year: 2019, customers: 47000 },
    { year: 2022, customers: 52000 },
    { year: 2023, customers: 58000 },
    { year: 2024, customers: 63000 },
    { year: 2025, customers: 70000 },
  ];

const reviews = [
  {
    quote: "Keerthana Silks has the most stunning collection of sarees. I received so many compliments!",
    author: "– Priya S."
  },
  {
    quote: "Loved the quality and intricate designs. Truly traditional elegance at its best!",
    author: "– Aarthi M."
  },
  {
    quote: "Fast delivery, beautiful packaging, and the saree looked even better in person!",
    author: "– Revathi G."
  },
  {
    quote: "I gifted a silk saree to my mom from Keerthana Silks and she was absolutely delighted!",
    author: "– Sneha V."
  },
  {
    quote: "Affordable pricing and top-notch fabric. Will definitely shop again.",
    author: "– Lakshmi R."
  }
];


  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const current = payload[0]?.value;
      const index = data.findIndex((d) => d.customers === current);
      const prev = index > 0 ? data[index - 1].customers : 0;
      const growth = prev ? ((current - prev) / prev) * 100 : 0;

      return (
        <div style={{ backgroundColor: "#fff", padding: 10, border: "1px solid #ccc", borderRadius: 6 }}>
          <p><strong>{payload[0].payload.year}</strong></p>
          <p>{current.toLocaleString()} customers</p>
          <p style={{ color: growth >= 0 ? "green" : "red" }}>
            {growth.toFixed(2)}% {growth >= 0 ? "growth" : "decline"} from previous
          </p>
        </div>
      );
    }
    return null;
  };


  return (

    <div className="container py-5">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        {/* Text column */}
        <div className="col-md-6">
          <p className="mb-4 responsive-para">
            <strong>Keerthana Silks</strong> has been Kanchipuram’s pride since 1991, offering timeless silk sarees rooted in tradition and elegance.<br /><br />
            We believe a saree is more than fabric — it's a story, a celebration, and a legacy.<br /><br />
            With decades of trust, <strong>Keerthana Silks</strong> remains the choice of those who value authenticity and artistry.<br />
          </p>
        </div>

        {/* Image column */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src="/FE/images/aboutsaree.jpg"
            alt="Keerthana Silks"
            className="img-fluid shadow-sm mb-3 rounded"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
          <p
            className="text-uppercase text-muted lower-text"
            style={{
              letterSpacing: '1px',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              fontFamily: "'Cedarville Cursive', cursive"
            }}
          >
            Woven with love. Worn with pride.
          </p>

        </div>
      </div>




      {/* Signature Section */}
      <div className="text-center mt-5 mb-5 px-3" >
        <h4 className="fw-bold mb-3 text-para" style={{
          fontSize: "clamp(1.2rem, 4vw, 2rem)" // 👈 Responsive font size
        }}>
          Our Signature Touch
        </h4>
        <p className="lower-text" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)' }}>
          Crafted with tradition, served with passion
        </p>

        <div className="row gy-4 justify-content-center mt-4">
          {[
            { icon: 'bi-brush', title: 'Unique Designs', desc: 'Explore the diverse collection of sarees that tell their own story.' },
            { icon: 'bi-award', title: 'Elegant & Exclusive', desc: 'Find the perfect saree for every occasion, from weddings to festivals.' },
            { icon: 'bi-patch-check', title: 'Premium Quality Fabrics', desc: 'Only the finest quality silk and handloom fabrics, woven with care.' },
            { icon: 'bi-cash-coin', title: 'Affordable Luxury', desc: 'Offering premium quality at prices that suit your budget.' },
            { icon: 'bi-flower1', title: 'Authentic Handloom', desc: 'Woven by skilled artisans with precision and care.' },
            { icon: 'bi-bag-check', title: 'Seamless Shopping', desc: 'Shop online with ease and enjoy hassle-free delivery.' },
          ].map((card, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex justify-content-center">
              <div
                className="d-flex flex-column align-items-center text-center p-3 promise-item rounded-4 h-100 hover-shadow transition neon-hover bg-white"
                style={{ maxWidth: '340px' }}
              >
                <i className={`bi ${card.icon} fs-2 mb-2`} style={{ color: "#e1306c" }}></i>
                <h6 className="fw-semibold mb-1" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
                  {card.title}<br /><br />
                </h6>
                <p className="text-muted" style={{ fontSize: 'clamp(0.9rem, 2.3vw, 1rem)' }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Mission & Vision */}
      <div className="text-center mb-5" style={{ marginTop: '80px' }}>
        <h4 className="fw-bold mb-3 text-para mb-5" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)" }}>Where Heritage Meets Heart</h4>


        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 rounded-4 h-100 position-relative border-start border-4 border-success shadow-sm hover-up">
              <i className="bi bi-bullseye fs-1 text-success position-absolute top-0 end-0 p-3 opacity-10"></i>
              <h3 className="fw-bold text-success">Mission</h3>
              <p className="text-muted mt-2 mb-0">
                To weave tradition with excellence by offering high-quality sarees at affordable prices, ensuring unmatched value, trust, and satisfaction.
              </p>
            </div>
          </div>


          <div className="col-md-6">
            <div className="p-4 rounded-4 h-100 position-relative border-start border-4 border-info shadow-sm hover-up">
              <i className="bi bi-eye fs-1 text-info position-absolute top-0 end-0 p-3 opacity-10"></i>
              <h3 className="fw-bold text-info">Vision</h3>
              <p className="text-muted mt-2 mb-0">
                To become a cherished household name where tradition meets innovation — offering timeless sarees and heartfelt service across generations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-5" style={{ marginTop: '80px' }}>
        <h1 className="fw-bold text-para" style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)" }} >Quality of Our Product</h1></div>
      <h5 className="text-center lower-text mb-4">Our Promises</h5>
      <div className="row justify-content-center text-center g-4">
        {[
          { icon: "bi-palette-fill", color: "#5A2A83", text: "Uncompromised Quality" },
          { icon: "bi-stars", color: "#F6B800", text: "Authenticity You Can Trust" },
          { icon: "bi-gem", color: "#DC3545", text: "A Saree for Every Story" },
          { icon: "bi-currency-dollar", color: "#28A745", text: "Elegance Made Affordable" }
        ].map((item, idx) => (
          <div
            key={idx}
            className="col-6 col-sm-6 col-md-3 d-flex flex-column align-items-center promise-item neon-hover"
          >
            <i
              className={`bi ${item.icon} mb-2`}
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                color: item.color,
              }}
            ></i>
            <p
              className="h6 text-center"
              style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.7rem)",
                lineHeight: "1.4",
                padding: "0 8px",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>



      <div className="container my-5">
        <h3
          className="fw-bold text-center mb-4 text-para"
          style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)" }}
        >
          What our customers say
        </h3>

        <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {reviews.map((review, idx) => (
              <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                <div
                  className="testimonial-box mx-auto text-center px-3 px-md-5 py-4"
                  style={{
                    maxWidth: "800px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
                  }}
                >
                  <h5
                    className="card-title fw-semibold"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                  >
                    {/* Client {idx + 1} */}
                  </h5>
                  <p
                    className="lower-text mt-3"
                    style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)", lineHeight: "1.6" }}
                  >
                    "{review.quote}"
                  </p>
                  <p
                    className="text-muted text-end"
                    style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)" }}
                  >
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#clientCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon bg-primary rounded-circle p-2"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#clientCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon bg-primary rounded-circle p-2"></span>
          </button>
        </div>
      </div>


      <div className="mt-5">
        <h4 className="fw-bold text-para text-center " style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)" }} >Customer Growth Over the Years</h4>

        <div className="container">
          <div className="row align-items-start">
            <div className="col-12">
              <div className="p-3">
                <div className="d-flex flex-wrap justify-content-center gap-4 text-center">
                  {[
                    { title: "Customer Satisfaction", count: "99.5%" },
                    { title: "Happy Customers", count: "12,000+" },
                    { title: "Total Sarees Sold", count: "25,000+" },
                    { title: "States Covered", count: "18+" },
                    { title: "Years in Business", count: "20+" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="card promise-item p-3 rounded-4 border-0 neon-hover"
                      style={{ maxWidth: "200px", minWidth: "150px" }}
                    >
                      <h4 className="fw-bold text-primary">{item.count}</h4>
                      <p className="text-muted small mb-0">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>


    </div>


  );
};
