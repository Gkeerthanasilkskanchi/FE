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
            <div className="row align-items-start">
                {/* Left Column */}
                <div className="col-md-6 mb-4">
                    <h6 className=" fs-5" style={{ color: '#FF5C8D' }}>--------Woven with love. Worn with pride.</h6>
                    <h2>Serving elegance and excellence for over three decades</h2>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                    <p>
                        Since 2003, <strong>Keerthana Skills</strong> has been the heart of Kanchipuram’s rich
                        saree tradition, offering a stunning collection of silks, handlooms, and exclusive
                        designs. We pride ourselves on curating only the finest sarees, woven with precision and
                        passion. Whether it’s the grandeur of a wedding or the elegance of a festival, our
                        sarees are designed to make every moment unforgettable.
                    </p>
                    <p>
                        At <strong>Keerthana Skills</strong>, we believe that a saree is more than just fabric;
                        it’s an experience, a story, a legacy. With a focus on quality, tradition, and
                        personalized service, we ensure each customer finds the perfect saree to match their
                        style and occasion. Come, drape yourself in elegance and discover the saree that’s made
                        just for you.
                    </p>
                </div>
            </div>
            <div className="row mt-4">
                <h5 className="text-center">Our Signature Touch</h5>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-palette-fill icon"></i>
                            <p className="card-title">Unique Designs</p>
                            <p>Explore the diverse collection of sarees that tell their own story.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-stars icon"></i>
                            <p className="card-title">Elegant & Exclusive Saree Collections</p>
                            <p>Find the perfect saree for every occasion, from weddings to festivals.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-gem icon"></i>
                            <p className="card-title">Premium Quality Fabrics</p>
                            <p>Only the finest quality silk and handloom fabrics, woven with care.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-currency-dollar icon"></i>
                            <p className="card-title">Affordable Luxury for Every Budget</p>
                            <p>Offering premium quality at prices that suit your budget.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-handbag icon"></i>
                            <p className="card-title">Authentic Handloom & Silk Sarees</p>
                            <p>Woven by skilled artisans with precision and care.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-cart icon"></i>
                            <p className="card-title">Easy & Comfortable Shopping Experience</p>
                            <p>Shop online with ease and enjoy hassle-free delivery.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>


                <div className="row mt-4">
                    <h5 className="text-center">Where Heritage Meets Heart</h5>

                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <i className="bi bi-cart icon"></i>
                                <p className="card-title">Mission</p>
                                <p>To weave tradition with excellence by offering high-quality sarees at affordable prices, ensuring
                                    every customer experiences unmatched value, trust, and satisfaction.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <i className="bi bi-cart icon"></i>
                                <p className="card-title">Vision</p>
                                <p>To become a cherished household name, where tradition meets  innovation — offering timeless sarees and
                                    heartfelt service that inspire trust across generations..</p>
                            </div>
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
                            <div className="col-md-6 mb-4">
                                <div className="p-3 border rounded ">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={data}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                                            barCategoryGap="20%"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            <YAxis />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar
                                                dataKey="customers"
                                                fill="#f06292"
                                                radius={[10, 10, 0, 0]}
                                                animationDuration={1500}
                                                isAnimationActive={true}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-md-6 ">
                                <div className="p-3 ">
                                    <div className="row text-center g-4  ">
                                        {[
                                            { title: "Customer Satisfaction", count: "99.5%" },
                                            { title: "Happy Customers", count: "12,000+" },
                                            { title: "Total Sarees Sold", count: "25,000+" },
                                            { title: "States Covered", count: "18+" },
                                            { title: "Years in Business", count: "20+" },
                                        ].map((item, idx) => (
                                            <div className="col-md-2 col-6  promise-item" style={{ width: "200px", marginRight: "20px" }} key={idx}>
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

            <div><h1>how we get the product </h1></div>
            <div><h1>how wo sell the product </h1></div>
            <div><h1>Quality of Product (vdo) </h1></div>


        </div>


    );
};
