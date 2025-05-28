import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
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
        className="img-fluid rounded shadow-sm mb-3"
        style={{ maxHeight: '500px', objectFit: 'cover' }}
      />
      <p className="text-uppercase fw-semibold text-muted" style={{ letterSpacing: '1px' }}>
        Woven with love. Worn with pride.
      </p>
    </div>

    <div className="col-md-6">
      <p className="fs-5 text-justify mb-4">
        <strong>Since 2003, Keerthana Silks</strong> has been the heart of Kanchipuram’s rich saree tradition, offering a stunning collection of silks, handlooms, and exclusive designs that capture the essence of elegance and tradition.
      </p>
      <p className="fs-5 text-justify">
        At <strong>Keerthana Silks</strong>, we believe that a saree is more than just fabric it’s an experience, a story, a legacy. With a focus on quality, tradition, and personalized service, we ensure every customer finds the perfect saree to match their unique style and occasion.
      </p>
    </div>
  </div>


  {/* Signature Section */}
  <div className="text-center mb-4">
    <h4 className="fw-bold">Our Signature Touch</h4>
    <p className="text-muted">Crafted with tradition, served with passion</p>
  </div>

  <div className="row g-4">
    {[
      { icon: 'bi-palette-fill', title: 'Unique Designs', desc: 'Explore the diverse collection of sarees that tell their own story.' },
      { icon: 'bi-stars', title: 'Elegant & Exclusive', desc: 'Find the perfect saree for every occasion, from weddings to festivals.' },
      { icon: 'bi-gem', title: 'Premium Quality Fabrics', desc: 'Only the finest quality silk and handloom fabrics, woven with care.' },
      { icon: 'bi-currency-dollar', title: 'Affordable Luxury', desc: 'Offering premium quality at prices that suit your budget.' },
      { icon: 'bi-handbag', title: 'Authentic Handloom', desc: 'Woven by skilled artisans with precision and care.' },
      { icon: 'bi-cart', title: 'Seamless Shopping', desc: 'Shop online with ease and enjoy hassle-free delivery.' },
    ].map((card, idx) => (
      <div key={idx} className="col-md-4">
        <div className="card h-100 shadow-sm border-0 text-center">
          <div className="card-body">
            <i className={`bi ${card.icon} fs-2 mb-3 text-primary`}></i>
            <h6 className="fw-bold fs-4">{card.title}</h6>
            <p className="text-muted fs-1000">{card.desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Mission & Vision */}
  <div className="text-center mt-5 mb-4">
    <h4 className="fw-bold">Where Heritage Meets Heart</h4>
  </div>

  <div className="row g-4">
    <div className="col-md-6">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body text-center">
          <i className="bi bi-bullseye fs-2 mb-3 text-success"></i>
          <h3 className="fw-bold">Mission</h3>
          <p className="text-muted fs-1000" >
            To weave tradition with excellence by offering high-quality sarees at affordable prices, ensuring unmatched value, trust, and satisfaction.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card h-100 shadow-sm border-0">
        <div className="card-body text-center">
          <i className="bi bi-eye fs-2 mb-3 text-info"></i>
          <h3 className="fw-bold">Vision</h3>
          <p className="text-muted">
            To become a cherished household name where tradition meets innovation — offering timeless sarees and heartfelt service across generations.
          </p>
        </div>
      </div>
    </div>
    </div>
            <div><h1>Quality of Our Product</h1></div>

            <div className="row mt-4">
                <h5 className="text-center mb-4">Our Promises</h5>

                <div className="col-md-2 text-center mb-4 promise-item">
                    <i className="bi bi-palette-fill icon mb-3" style={{ fontSize: "30px", color: "#5A2A83" }}></i>
                    <p className="h6">Uncompromised Quality</p>
                </div>

                <div className="col-md-2 text-center mb-4 promise-item">
                    <i className="bi bi-stars icon mb-3" style={{ fontSize: "30px", color: "#F6B800" }}></i>
                    <p className="h6">Authenticity You Can Trust</p>
                </div>

                <div className="col-md-2 text-center mb-4 promise-item">
                    <i className="bi bi-gem icon mb-3" style={{ fontSize: "30px", color: "#DC3545" }}></i>
                    <p className="h6">A Saree for Every Story</p>
                </div>

                <div className="col-md-2 text-center mb-4 promise-item">
                    <i className="bi bi-currency-dollar icon mb-3" style={{ fontSize: "30px", color: "#28A745" }}></i>
                    <p className="h6">Elegance Made Affordable</p>
                </div>
            </div>


            <div>
                <div className="mt-5">
                    <h3 className="text-center mb-4">What our customer says</h3>
                    <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {[1, 2, 3].map((review, idx) => (
                                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card p-3" style={{ maxWidth: "1000px" }}>
                                            <div className="card-body">
                                                <h5 className="card-title">Client {idx + 1}</h5>
                                                <p className="card-text">"Amazing service and support from Madras Acoustics!"</p>
                                                <p className="text-muted">– Happy Customer</p>
                                            </div>
                                        </div>
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

            <div style={{ width: "100%", height: 400 }}>
                <h4 style={{ textAlign: "center", marginBottom: "20px" }}>Customer Growth Over the Years</h4>


                <div className="chart-layout">
                    <div className="container py-5">
                        <div className="row align-items-start">
                            {/* Left Column */}
                

                            {/* Right Column */}
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
                                            <div className="col-md-2 col-6 gap-5  promise-item" style={{ width: "200px", marginRight: "20px" }} key={idx}>
                                                <div className="card  promise-item p-3 rounded-4 border-0">
                                                    <h4 className="fw-bold   text-primary">{item.count}</h4>
                                                    <p className=" small">{item.title}</p>
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


        </div>


    );
};
