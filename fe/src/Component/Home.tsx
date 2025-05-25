import { useState } from "react";
import { Accordion } from "react-bootstrap";

export const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate with backend or Mailchimp API
    setSubscribed(true);
    setEmail('');
  };
  return (
    <div>
      {/* Hero Banner */}
      <div className="w-100">
        <img src={'/images/home.jpg'} alt="Saree Banner" className="img-fluid w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
      </div>

      {/* Quotes */}
      <div className="container text-center my-5">
        <blockquote className="fs-4 fw-semibold text-para" style={{ fontStyle: 'italic' }}>
          “A saree isn’t just attire; it’s a legacy woven in threads.”
        </blockquote>
        <p className="text-clip-gradient-sm" style={{ fontStyle: 'italic' }}>Embrace the elegance of tradition with every drape.</p>
      </div>

      {/* About Us */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 position-relative about-us-section">
            <img
              src="/images/logo-flower.png"
              alt="background flower"
              className="about-bg-image"
            />
            <h2 className="fw-bold mb-3 text-para">About Us</h2>
            <p>
              We are a heritage saree brand committed to bringing timeless tradition with a modern touch. With decades of experience, we specialize in Kanjivaram, Banarasi, and designer sarees tailored for every occasion. Explore our world of rich colors, intricate designs, and heartfelt stories behind every weave.
            </p>
            <p>
              At Keerthana Silks, each saree is more than just attire — it is a celebration of culture, artistry, and emotion. We collaborate with skilled weavers from across India to preserve age-old techniques while infusing them with contemporary elegance. From festive collections to bridal exclusives, every piece is handpicked to reflect grace and individuality.
            </p>
            <p>
              Step into our store or explore online to discover collections that blend luxury, comfort, and craftsmanship — sarees that not only drape beautifully, but speak of legacy, love, and lasting memories.
            </p>

          </div>

          <div className="col-md-6">
            <img src={'/images/about.jpg'} alt="About Us" style={{ width: "600px", height: "400px" }} className="img-fluid rounded" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-bold text-para " style={{ marginTop: "70px" }}>Client Satisfaction</h3>

        <div className="row text-center g-4">
          {[
            { title: "Customer Satisfaction", count: "99.5%" },
            { title: "Happy Customers", count: "12,000+" },
            { title: "Total Sarees Sold", count: "25,000+" },
            { title: "States Covered", count: "18+" },
            { title: "Years in Business", count: "20+" },
          ].map((item, idx) => (
            <div className="col-md-2 col-6" style={{ width: "200px", marginRight: "20px" }} key={idx}>
              <div className="card shadow-sm p-3 rounded-4 border-0 neon-hover">
                <h4 className="fw-bold text-primary">{item.count}</h4>
                <p className="text-muted small">{item.title}</p>
              </div>
            </div>
          ))}
        </div>


      </div>

      {/* FAQs */}
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-bold text-para">Frequently Asked Questions</h3>
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
            <Accordion.Item eventKey={idx.toString()} key={idx} className="custom-accordion">
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>


          ))}
        </Accordion>
      </div>

      <div className="container my-5 mt-5">
        <div className="d-flex justify-content-center">
          <div className="card p-4 shadow-lg border-0 rounded-4" style={{ width: "1200px", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "#fff" }}>
            <div className="card-body text-center">
              <h3 className="mb-3 fw-bold">Stay in the Loop!</h3>
              <p className="mb-4">Subscribe to get updates on our latest collections and exclusive offers.</p>

              <form onSubmit={handleEmailSubscribe}>
                <div className="input-group">
                  <span className="input-group-text bg-white border-0">
                    <i className="fas fa-envelope text-primary"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control border-0"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-warning fw-bold">
                    Subscribe
                  </button>
                </div>
              </form>

              {subscribed && <p className="mt-3 text-success">Thanks for subscribing!</p>}
            </div>
          </div>
        </div>
      </div>


      <h3 className="text-center fw-bold my-5 text-clip-gradient">Featured Collections</h3>
      <div className="row g-4">
        {['Kanjivaram', 'Banarasi', 'Silk Cotton'].map((type, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <img src={`/images/saree${idx + 1}.jpg`} className="card-img-top" alt={type} />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{type}</h5>
                <p className="text-muted small">Elegant {type} sarees crafted with love and heritage.</p>
                <button className="btn btn-outline-primary">Explore</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-center fw-bold my-5 text-clip-gradient ">
        What Our Customers Say
      </h3>

      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
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
              <div className="testimonial-box mx-auto text-center px-4 py-5">
                <blockquote className="blockquote fst-italic mb-3">
                  “{item.quote}”
                </blockquote>
                <footer className="blockquote-footer mt-2 text-gold">
                  {item.name}
                </footer>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          {/* <span style={{ color: 'gold', fontWeight: 'bold', marginLeft: '8px' }}>Previous</span> */}
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          {/* <span style={{ color: 'gold', fontWeight: 'bold', marginLeft: '8px' }}>Next</span> */}
        </button>


      </div>




      <h3 className="text-center fw-bold my-5">SareeStyle Inspirations</h3>
      <div className="row g-3">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div className="col-4 col-md-2" key={num}>
            <img src={'/images/saree.jfif'} alt={`Insta ${num}`} className="img-fluid rounded-3 shadow-sm" />
          </div>
        ))}
      </div>


    </div>
  );
};
