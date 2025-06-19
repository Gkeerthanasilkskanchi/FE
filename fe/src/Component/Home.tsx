import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { sendSubscribtion } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

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
    {/* Left Column: Text */}
    <div className="col-lg-6 position-relative">
      <img
        src="/FE/images/logo-flower.png"
        alt="background flower"
        className="about-bg-image d-none d-md-block"
      />

      <h2 className="fw-bold mb-3 about-title">About Us</h2>

      <p className="about-text">
We are a heritage saree brand blending timeless tradition with modern elegance. Specializing in Kanjivaram, Banarasi, and designer sarees, we bring rich colors and intricate weaves to life.<br/><br/>

At Keerthana Silks, every saree is a tribute to culture and craftsmanship. We partner with skilled weavers across India to preserve traditional artistry with a contemporary touch.<br/><br/>

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

            <div className="row text-center g-4" style={{ marginLeft: "5px" }}>
              {[
                { title: "Customer Satisfaction", count: "99.5%" },
                { title: "Happy Customers", count: "12,000+" },
                { title: "Total Sarees Sold", count: "25,000+" },
                { title: "States Covered", count: "18+" },
                { title: "Years in Business", count: "20+" },
              ].map((item, idx) => (
                <div className="col-md-2 col-6" style={{ width: "200px" }} key={idx}>
                  <div className="card promise-item p-3 rounded-4 border-0 neon-hover">
                    <h4 className="fw-bold text-primary">{item.count}</h4>
                    <p className="small">{item.title}</p>
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
                  question: "Do you offer shipping across India?",
                  answer: "Yes, we offer fast and secure delivery all over India.",
                },
                {
                  question: "Can I return or exchange a saree?",
                  answer: "Yes, we accept returns within 7 days of delivery for unworn sarees with tags intact.",
                },
                {
                  question: "Do you have a physical store?",
                  answer: "Yes, visit us at our flagship showroom in Chennai for an in-person experience.",
                },
              ].map((item, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={idx} className="accordion custom-accordion-border">
                  <Accordion.Header className="custom-header">{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>


              ))}
            </Accordion>
          </div>

          <div className="container my-5 d-flex justify-content-center">
            <div className="glass-card w-100 p-4 text-center">
              <h3
                className="mb-3 fw-bold text-clip-gradient"
                style={{ fontSize: "clamp(1.2rem, 4.5vw, 2.2rem)" }}
              >
                Stay in the Loop!
              </h3>
              <p
                className="mb-4"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)" }}
              >
                Subscribe to get updates on our latest collections and exclusive offers.
              </p>


             <form onSubmit={handleEmailSubscribe}>
  <div
    className="d-flex align-items-center w-100 justify-content-between"
    style={{
      gap: "0.5rem",
      flexWrap: "nowrap",
    }}
  >
    {/* Icon */}
    <span
      className="input-group-text bg-white border-0 p-1"
      style={{
        flexShrink: 0,
        padding: "0.25rem 0.5rem",
      }}
    >
      <i
        className="fas fa-envelope text-primary"
        style={{
          fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
        }}
      ></i>
    </span>

    {/* Input */}
    <div className="flex-grow-1" style={{ minWidth: "100px" }}>
      <div className={`floating-group ${email ? "filled" : ""}`}>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="form-control"
          style={{
            fontSize: "clamp(0.75rem, 2vw, 0.95rem)",
            padding: "0.4rem 0.5rem 0.4rem 2rem",
          }}
        />
        <label htmlFor="email">Enter email</label>
        <span className="icon">@</span>
      </div>
    </div>

    {/* ✅ Responsive Button */}
    <button
      type="submit"
  className="btn btn-warning fw-bold subscribe-btn"
      disabled={loading}
      style={{
        flexShrink: 0,
        padding: "0.3rem 0.6rem",
        fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
        minWidth: "80px",
      }}
    >
      {loading ? "..." : "Subscribe"}
    </button>
  </div>
</form>

            </div>
          </div>


            <h3
              className="text-center fw-bold my-5 text-clip-gradient"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }} // 24px to 40px range
            >
              Featured Collections
            </h3>

          <div className="container mb-5">
            <div id="featuredCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner" style={{ width: '100%', overflow: 'hidden' }}>

                {[
                  ['Kanjivaram', 'Banarasi', 'Cotton'],
                  ['Silk Cotton', 'Chiffon', 'Organza'],
                  ['Tissue', 'Linen', 'Georgette'],
                  ['Satin', 'Silk Cotton', 'Net']
                ].map((pair, slideIdx) => (
                  <div className={`carousel-item ${slideIdx === 0 ? 'active' : ''}`} key={slideIdx}>
                    <div className="container my-5">
                      <div className="row justify-content-center">
                        {pair.map((type, idx) => {
                          const imgIndex = slideIdx * 3 + idx + 6; // For images like saree-6.png, saree-7.png...
                          return (
                          <div className="col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4" key={`${type}-${idx}`}>
  <div className="card border-0 promise-item rounded-4 featured-card">
    <img
      src={`/FE/images/saree-${imgIndex}.jpg`}
      alt={type}
      className="featured-card-img"
    />
    <div className="card-body text-center">
      <h5 className="card-title fw-bold text-clip-gradient featured-title">{type}</h5>
      <p className="text-muted featured-desc">
        Elegant {type} sarees crafted with love and heritage.
      </p>
    </div>
  </div>
</div>

                          );
                        })}
                      </div>
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
          quote: "The Banarasi saree was beyond beautiful. Perfect for my wedding!",
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
