import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const About = () => {
    return (
        <div className="container py-5">
            <div className="row align-items-start">
                {/* Left Column */}
                <div className="col-md-6 mb-4">
                    <h6 className="text-muted fs-5">--------Woven with love. Worn with pride.</h6>
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

                {/* Card for Unique Designs */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-palette-fill icon"></i>
                            <p className="card-title">Unique Designs</p>
                            <p>Explore the diverse collection of sarees that tell their own story.</p>
                        </div>
                    </div>
                </div>

                {/* Card for Elegant & Exclusive Saree Collections */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-stars icon"></i>
                            <p className="card-title">Elegant & Exclusive Saree Collections</p>
                            <p>Find the perfect saree for every occasion, from weddings to festivals.</p>
                        </div>
                    </div>
                </div>

                {/* Card for Premium Quality Fabrics */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-gem icon"></i>
                            <p className="card-title">Premium Quality Fabrics</p>
                            <p>Only the finest quality silk and handloom fabrics, woven with care.</p>
                        </div>
                    </div>
                </div>

                {/* Card for Affordable Luxury */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-currency-dollar icon"></i>
                            <p className="card-title">Affordable Luxury for Every Budget</p>
                            <p>Offering premium quality at prices that suit your budget.</p>
                        </div>
                    </div>
                </div>

                {/* Card for Authentic Handloom & Silk Sarees */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <i className="bi bi-handbag icon"></i>
                            <p className="card-title">Authentic Handloom & Silk Sarees</p>
                            <p>Woven by skilled artisans with precision and care.</p>
                        </div>
                    </div>
                </div>

                {/* Card for Easy & Comfortable Shopping */}
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

            </div>
            <div>

                <h1>Where Heritage Meets Heart</h1>
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

            <div><h1>Qualitu of Our Product</h1></div>
            <div><h1>Our Promiees </h1></div>
            <div><h1>What our customer says </h1></div>
            <div><h1>Counts of Customers </h1></div>
            <div><h1>how we get the product </h1></div>
            <div><h1>how wo sell the product </h1></div>
            <div><h1>Quality of Product (vdo) </h1></div>


        </div>


    );
};
