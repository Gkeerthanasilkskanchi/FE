import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { sendSubscribtion } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";
import { useEffect } from 'react';


export const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);


  const handleEmailSubscribe = async () => {
    setSubscribed(true);
    setLoading(true);
    const value = await sendSubscribtion({ email: email });
    if (value) {
      setLoading(false);
      setMessage("Subscribed successfully!");
      toast.success("Subscribed successfully!");
    }
  };
  const allSarees = [
    'Rising Border Korvai Kanjivaram', 'Double Border Butta Sarees', 'Korvai Butta',
    'Temple Bordered', 'Double Cart Golden Tissue', 'Semi Soft Silk Butta',
    'Pure Soft silk sarees', 'Plain Tissue Kanjivaram', 'Turning Bordered Saree',
  ];

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 576) setItemsPerSlide(1);
      else if (width < 769) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const groupedItems = [];
  for (let i = 0; i < allSarees.length; i += itemsPerSlide) {
    groupedItems.push(allSarees.slice(i, i + itemsPerSlide));
  }

  return (
    <>
      <Loader loading={loading}></Loader>
      <div className="main-content-container">
        <div>
          {/* Hero Banner */}
          <div className="w-100">
            <img
              src="/FE/images/home.png"
              alt="Saree Banner"
              className="img-fluid w-100"
              style={{
                height: '500px',
                objectFit: 'cover',
                objectPosition: 'center top', // shifts focus downward
                borderRadius: '5px'
              }}
            />
          </div>


          {/* Quotes */}
          <div className="container text-center my-5">
            <blockquote className=" fw-semibold text-para" style={{ fontStyle: 'italic' }}>
              “A saree isn’t just attire; it’s a legacy woven in threads.”
            </blockquote>
            <p className="text-clip-gradient-sm" style={{ fontStyle: 'italic' }}>Embrace the elegance of tradition with every drape.</p>
          </div>

          {/* About Us */}
          <div className="container my-5">
            <div className="row align-items-center gy-4">
              <h3
                className="text-center mb-5 fw-bold text-dark text-clip-gradient"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)"
                }}
              >
                About Us
              </h3>
              {/* Left Column: Text */}
              <div className="col-lg-6 position-relative">
                <img
                  src="/FE/images/logo-flower.png"
                  alt="background flower"
                  className="about-bg-image d-none d-md-block"
                />



                {/* <h2 className="fw-bold mb-3 about-title">About Us</h2> */}

                <p className="about-text">
                  We are a heritage saree brand blending timeless tradition with modern elegance.
                  Specializing in <strong>Kanchipuram Bridal Sarees, Butta Sarees, Rising Border Sarees, Turning Border Sarees</strong>.
                  At Keerthana Silks, every saree is a tribute to culture and craftsmanship. We partner with skilled weavers across India to preserve traditional artistry with a contemporary touch.<br /><br />
                  Visit our store or shop online to explore collections that reflect grace, legacy, and lasting memories.
                </p>

              </div>

              {/* Right Column: Main Image */}
              <div className="col-lg-6 text-center">
                <img
                  src="/FE/images/About-us.jpeg"
                  alt="About Us"
                  className="img-fluid rounded"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>


          {/* Stats Cards */}
          <div className="container my-5">
            <h3
              className="text-center mb-4 fw-bold text-para"
              style={{
                marginTop: "70px",
                fontSize: "clamp(1.2rem, 4vw, 2rem)" // 👈 Responsive font size
              }}
            >
              Client Satisfaction
            </h3>
            <div className="row justify-content-center text-center g-4">
              {[
                { title: "Customer Satisfaction", count: "99.5%" },
                { title: "Happy Customers", count: "12,000+" },
                { title: "Total Sarees Sold", count: "25,000+" },
                { title: "States Covered", count: "18+" },
                { title: "Years in Business", count: "20+" },
              ].map((item, idx) => (
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center" key={idx}>
                  <div className="card promise-item p-3 rounded-4 border-0 neon-hover w-100" style={{ maxWidth: "200px" }}>
                    <h4 className="fw-bold text-primary">{item.count}</h4>
                    <p className="small mb-0">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>



          </div>

          {/* FAQs */}
          <div className="container my-5">
            <h3
              className="text-center mb-4 fw-bold text-para"
              style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)" }}
            >
              Frequently Asked Questions
            </h3>
            <Accordion defaultActiveKey="0" className="gradient-accordion">
              {[
                {
                  question: "What types of sarees do you sell?",
                  answer: "We specialize in Kanjivaram, Banarasi, Silk Cotton, and Designer sarees suited for all occasions.",
                },
                {
                  question: "Do you offer shipping ?",
                  answer: "Yes, we offer fast and secure delivery all over world.",
                },
                {
                  question: "Can I return or exchange a saree?",
                  answer: "Yes, we accept returns within 7 days of delivery for unworn sarees with tags intact.",
                },
                {
                  question: "Do you have a physical store?",
                  answer: "Yes, visit us at our flagship showroom in Kanchipuram for an in-person experience.",
                },
              ].map((item, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={idx} className="accordion custom-accordion-border">
                  <Accordion.Header className="custom-header">{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>


              ))}
            </Accordion>
          </div>

          {/* Subscribe Section */}

          <div className="container my-5 d-flex justify-content-center">
            <div className="glass-card w-100 p-3 p-md-4 text-center" style={{ maxWidth: "700px" }}>
              <h3
                className="mb-3 fw-bold text-clip-gradient"
                style={{
                  fontSize: "clamp(1.3rem, 4vw, 2rem)",
                  lineHeight: 1.2,
                }}
              >
                Stay in the Loop!
              </h3>

              <p
                className="mb-4"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
              >
                Subscribe to get updates on our latest collections and exclusive offers.
              </p>

              {subscribed ? (
                <div className="mt-4">
                  <h5 className="text-warning" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
                    🎉 Here's your exclusive insight!
                  </h5>
                  <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)" }}>
                    "Innovation distinguishes between a leader and a follower." – Steve Jobs
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubscribe}>
                  <form onSubmit={handleEmailSubscribe}>
                    <form onSubmit={handleEmailSubscribe}>
                      <div className="d-flex align-items-center gap-2 flex-nowrap w-100">
                        {/* ICON */}
                        <span
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            background: "#fff",
                            // border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "5px",
                            fontSize: "1.3rem",
                            flexShrink: 0,
                          }}
                        >
                          <i className="fas fa-envelope text-primary" style={{ fontSize: "1.8rem" }}></i>
                        </span>

                        {/* INPUT (take more space) */}
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="form-control email-input-text"
                          style={{
                            flex: 1
                          }}
                        />


                        {/* BUTTON (smaller size) */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn btn-warning fw-bold px-2 py-1"
                          style={{
                            fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {loading ? (
                            "Loading..."
                          ) : (
                            <>
                              <span className="d-inline d-md-none">Go</span>         {/* Mobile only */}
                              <span className="d-none d-md-inline">Subscribe</span>  {/* Tablet/Desktop only */}
                            </>
                          )}
                        </button>

                      </div>
                    </form>

                  </form>

                </form>
              )}
            </div>
          </div>

          <div>
            <h3
              className="text-center fw-bold my-5 text-clip-gradient"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }} // 24px to 40px range
            >
              Featured Collections
            </h3>

            <div className="container mb-5">
              <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {groupedItems.map((group, slideIdx) => (
                    <div className={`carousel-item ${slideIdx === 0 ? 'active' : ''}`} key={slideIdx}>
                      <div className="row justify-content-center py-4">
                        {group.map((type, idx) => {
                          const imgIndex = slideIdx * itemsPerSlide + idx + 6;
                          const imgSrc = `/FE/images/saree-${imgIndex}.jpeg`;

                          // ✅ Log the image URL
                          console.log('Image src:', imgSrc);

                          return (
                            <div
                              key={`${type}-${idx}`}
                              className={`${itemsPerSlide === 1 ? 'col-12' :
                                itemsPerSlide === 2 ? 'col-6' :
                                  'col-md-4'
                                } mb-4`}
                            >
                              <div className="d-flex justify-content-center h-100">
                                <div className="card border-0 rounded-4 featured-card" style={{ width: '100%', maxWidth: '18rem' }}>
                                  <img
                                    src={imgSrc}
                                    alt={type}
                                    className="featured-card-img"
                                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                                  />
                                  <div className="card-body text-center">
                                    <h5 className="card-title fw-bold text-clip-gradient featured-title">{type}</h5>
                                    <p className="text-muted featured-desc">
                                      Elegant {type} sarees crafted with love and heritage.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}



                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel Controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#featuredCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon bg-primary" aria-hidden="true"></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#featuredCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon bg-primary" aria-hidden="true"></span>
                </button>
              </div>
            </div>

          </div>





          <h3 className="text-center fw-bold my-5 text-clip-gradient "
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }} // 24px to 40px range
          >
            What Our Customers Say
          </h3>
          <div className="container mb-5">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner w-100">
                {[
                  {
                    name: "Anjali S.",
                    quote: "The Silk Saree was beyond beautiful. Perfect for my wedding!",
                  },
                  {
                    name: "Preeti R.",
                    quote: "Great customer service and lovely packaging. Felt like a gift!",
                  },
                  {
                    name: "Meena K.",
                    quote: "Authentic silk, vibrant colors. I’m in love with every purchase.",
                  },
                ].map((item, index) => (
                  <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                    <div className="container d-flex justify-content-center">
                      <div className="testimonial-box text-center px-4 py-5">
                        <blockquote className="blockquote responsive-quote">
                          “{item.quote}”
                        </blockquote>
                        <footer className="blockquote-footer responsive-name">
                          {item.name}
                        </footer>


                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon bg-primary rounded-circle" />
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon bg-primary rounded-circle" />
              </button>
            </div>
          </div>



        </div>
      </div>

    </>

  );
};
