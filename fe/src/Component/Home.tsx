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
        <img src={""} alt="Saree Banner" className="img-fluid w-100" style={{ maxHeight: '500px', objectFit: 'cover' }} />
      </div>

      {/* Quotes */}
      <div className="container text-center my-5">
        <blockquote className="fs-4 fw-semibold text-muted">
          “A saree isn’t just attire; it’s a legacy woven in threads.”
        </blockquote>
        <p className="text-secondary">Embrace the elegance of tradition with every drape.</p>
      </div>

      {/* About Us */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">About Us</h2>
            <p>
              We are a heritage saree brand committed to bringing timeless tradition with a modern touch. With decades of experience,
              we specialize in Kanjivaram, Banarasi, and designer sarees tailored for every occasion. Explore our world of rich colors,
              intricate designs, and heartfelt stories behind every weave.
            </p>
          </div>
          <div className="col-md-6">
            <img src={""} alt="About Us" className="img-fluid rounded" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container my-5">
      <h3 className="text-center mb-4 fw-bold">Client Satisfaction</h3>

        <div className="row text-center g-4">
          {[
            { title: "Customer Satisfaction", count: "99.5%" },
            { title: "Happy Customers", count: "12,000+" },
            { title: "Total Sarees Sold", count: "25,000+" },
            { title: "States Covered", count: "18+" },
            { title: "Years in Business", count: "20+" },
          ].map((item, idx) => (
            <div className="col-md-2 col-6" style={{width:"200px",marginRight:"20px"}} key={idx}>
              <div className="card shadow-sm p-3 rounded-4 border-0">
                <h4 className="fw-bold text-primary">{item.count}</h4>
                <p className="text-muted small">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="container my-5">
        <h3 className="text-center mb-4 fw-bold">Frequently Asked Questions</h3>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What types of sarees do you sell?</Accordion.Header>
            <Accordion.Body>
              We specialize in Kanjivaram, Banarasi, Silk Cotton, and Designer sarees suited for all occasions.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Do you offer shipping across India?</Accordion.Header>
            <Accordion.Body>
              Yes, we offer fast and secure delivery all over India.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Can I return or exchange a saree?</Accordion.Header>
            <Accordion.Body>
              Yes, we accept returns within 7 days of delivery for unworn sarees with tags intact.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Do you have a physical store?</Accordion.Header>
            <Accordion.Body>
              Yes, visit us at our flagship showroom in Chennai for an in-person experience.
            </Accordion.Body>
          </Accordion.Item>
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
                
    </div>
  );
};
