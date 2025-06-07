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
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">

          <img
            src={'/images/aboutsaree.jpg'}
            alt="Keerthana Silks"
            className="img-fluid shadow-sm mb-3"
            style={{ maxHeight: '500px', objectFit: 'cover', borderRadius: '5px' }}
          />
          <p className="text-uppercase text-muted lower-text" style={{ letterSpacing: '1px' }}>
            Woven with love. Worn with pride.
          </p>
        </div>

        <div className="col-md-6">
          <p className="text-justify mb-4">
            <strong>Since 2003, Keerthana Silks</strong> has been the heart of Kanchipuram’s rich saree tradition, offering a stunning collection of silks, handlooms, and exclusive designs that capture the essence of elegance and heritage.
          </p>
          <p className="text-justify mb-4">
            At <strong>Keerthana Silks</strong>, we believe that a saree is more than just fabric — it’s an experience, a story, a legacy. With a focus on quality, tradition, and personalized service, we ensure every customer finds the perfect saree to match their unique style and occasion.
          </p>
          <p className="text-justify mb-4">
            Our collections are a blend of timeless craftsmanship and contemporary flair, carefully curated to meet the tastes of modern women while preserving the spirit of tradition. Whether it's for weddings, festivals, or everyday elegance, our sarees are crafted to make every moment memorable.
          </p>
          <p className="text-justify">
            With decades of trust and excellence, <strong>Keerthana Silks</strong> continues to be a preferred destination for those who value authenticity and artistry. Step into our world and experience the legacy of Kanchipuram — woven into every thread.
          </p>
        </div>

      </div>


      {/* Signature Section */}
      <div className="text-center mt-5 mb-5">
        <h4 className="fw-bold mb-3 text-para">Our Signature Touch</h4>
        <p className="lower-text">Crafted with tradition, served with passion</p>
      

      <div className="row gy-4">
        {[
          { icon: 'bi-palette-fill', title: 'Unique Designs', desc: 'Explore the diverse collection of sarees that tell their own story.' },
          { icon: 'bi-stars', title: 'Elegant & Exclusive', desc: 'Find the perfect saree for every occasion, from weddings to festivals.' },
          { icon: 'bi-gem', title: 'Premium Quality Fabrics', desc: 'Only the finest quality silk and handloom fabrics, woven with care.' },
          { icon: 'bi-currency-dollar', title: 'Affordable Luxury', desc: 'Offering premium quality at prices that suit your budget.' },
          { icon: 'bi-handbag', title: 'Authentic Handloom', desc: 'Woven by skilled artisans with precision and care.' },
          { icon: 'bi-cart', title: 'Seamless Shopping', desc: 'Shop online with ease and enjoy hassle-free delivery.' },
        ].map((card, idx) => (
          <div key={idx} className="col-md-6">
            <div className="d-flex align-items-start p-3 shadow-sm rounded-4  h-100 hover-shadow transition neon-hover">
              <i className={`bi ${card.icon} fs-1 text-primary me-3`}></i>
              <div>
                <h5 className="fw-semibold mb-1">{card.title}</h5>
                <p className="mb-0 text-muted">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Mission & Vision */}
      <div className="text-center mb-5" style={{marginTop:'80px'}}>
        <h4 className="fw-bold mb-3 text-para mb-5">Where Heritage Meets Heart</h4>
      

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

      <div className="text-center mb-5" style={{marginTop:'80px'}}>
        <h1 className="fw-bold text-para">Quality of Our Product</h1></div>
         <h5 className="text-center lower-text mb-4">Our Promises</h5>
      <div className="row">

        <div className="col-md-2 text-center mb-4 promise-item neon-hover">
          <i className="bi bi-palette-fill icon mb-3" style={{ fontSize: "30px", color: "#5A2A83" }}></i>
          <p className="h6">Uncompromised Quality</p>
        </div>

        <div className="col-md-2 text-center mb-4 promise-item  neon-hover">
          <i className="bi bi-stars icon mb-3" style={{ fontSize: "30px", color: "#F6B800" }}></i>
          <p className="h6">Authenticity You Can Trust</p>
        </div>

        <div className="col-md-2 text-center mb-4 promise-item neon-hover">
          <i className="bi bi-gem icon mb-3" style={{ fontSize: "30px", color: "#DC3545" }}></i>
          <p className="h6">A Saree for Every Story</p>
        </div>

        <div className="col-md-2 text-center mb-4 promise-item  neon-hover">
          <i className="bi bi-currency-dollar icon mb-3" style={{ fontSize: "30px", color: "#28A745" }}></i>
          <p className="h6">Elegance Made Affordable</p>
        </div>
      </div>


      <div>
        <div className="mt-5">
          <h3 className="fw-bold mb-3 text-para mb-5 text-center">What our customer says</h3>
          <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {[1, 2, 3].map((review, idx) => (
                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                  <div className="testimonial-box mx-auto text-center px-4 py-5">
                    {/* <div className="card p-3" style={{ maxWidth: "1000px" }}>
                      <div className="card-body"> */}
                        <h5 className="card-title">Client {idx + 1}</h5>
                        <p className="lower-text mt-2">"Amazing service and support from Madras Acoustics!"</p>
                        <p className="text-muted text-end">– Happy Customer</p>
                      {/* </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#clientCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon bg-primary"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#clientCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon bg-primary"></span>
            </button>
          </div>
        </div>
      </div>

      <div  className="mt-5">
        <h4 className="fw-bold text-para text-center">Customer Growth Over the Years</h4>

          <div className="container">
            <div className="row align-items-start">
              <div className="col-md-12 ">
                <div className="p-3 ">
                  <div className="row text-center g-4">
                    {[
                      { title: "Customer Satisfaction", count: "99.5%" },
                      { title: "Happy Customers", count: "12,000+" },
                      { title: "Total Sarees Sold", count: "25,000+" },
                      { title: "States Covered", count: "18+" },
                      { title: "Years in Business", count: "20+" },
                    ].map((item, idx) => (
                      <div className="col-md-2 col-6" style={{ width: "200px" }} key={idx}>
                        <div className="card shadow-sm p-3 rounded-4 border-0 neon-hover">
                          <h4 className="fw-bold text-primary">{item.count}</h4>
                          <p className="text-muted small">{item.title}</p>
                        </div>
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
