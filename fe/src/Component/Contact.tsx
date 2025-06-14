import { useState } from "react";
import { sendQuery, sendSubscribtion } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";

export const Contact = () => {
    const [focused, setFocused] = useState(false);
    const userData = {
        name: "",
        email: "",
        subject: "",
        message: "",
        mobileNumber: "",
        address: "",
    };

    const platforms = [
        {
            icon: "fab fa-whatsapp",
            title: "WhatsApp",
            desc: "+917904999697",
            link: "https://wa.me/917904999697",
            color: "#25D366",
        },
        {
            icon: "fab fa-facebook-f",
            title: "Facebook",
            desc: "Keerthana Silks",
            link: "https://www.facebook.com/share/18hqSuYoCp//",
            color: "#1877F2",
        },
        {
            icon: "fab fa-instagram",
            title: "Instagram",
            desc: "@keerthanasilk_kanchipuram",
            link: "https://instagram.com/keerthanasilk_kanchipuram?igsh=aDZieG5uZnB4cmZi",
            color: "#E1306C",  // Instagram's pinkish-red official color
        },

        {
            icon: "fas fa-envelope",
            title: "Email",
            desc: "gkeerthanasilkskanchi@gmail.com",
            link: "mailto:gkeerthanasilkskanchi@gmail.com",
            color: "#FF9F00",
        },
        {
            icon: "fas fa-phone",
            title: "Phone",
            desc: "+917904999697",
            link: "tel:+917904999697",
            color: "#4CAF50",
        },
        {
            icon: "fab fa-youtube",
            title: "YouTube",
            desc: "@keerthanasilk_kanchipuram",
            link: "https://youtube.com/@keerthanasilk_kanchipuram?si=zLTHLZ3zXOttTUYD",
            color: "#FF0000",
        },
    ];
    const [formData, setFormData] = useState<any>(userData);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleEmailSubscribe = async () => {
        setSubscribed(true);
        setLoading(true)
        const value = await sendSubscribtion({ email: email });
        if (value) {
            setLoading(false);
            toast.success("Subscribed successfully!");
        }
    };


    const validate = () => {
        let newErrors: any = {};
        if (!formData.name.trim()) newErrors.name = "Please fill this field";
        if (!formData.email.trim()) newErrors.email = "Please fill this field";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.subject.trim()) newErrors.subject = "Please fill this field";
        if (!formData.message.trim()) newErrors.message = "Please fill this field";
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Please fill this field";
        else if (!/^\d{10,}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Invalid phone number";
        if (!formData.address.trim()) newErrors.address = "Please fill this field";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id]: "" });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (!validate()) return;

        setLoading(true);
        try {
            const send = await sendQuery(formData);
            if (send?.status === 200) {
                toast.success("Review submitted successfully!", { autoClose: 2000 });
                setFormData(userData);
                setIsSubmitted(false);
            }
        } catch (error) {
            toast.error("Failed to submit review. Please try again.", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loader loading={loading}></Loader>
            <div className="container mt-5">
  {/* WhatsApp QR Section */}
  <div className="row align-items-center my-5">
    <div className="col-md-7">
      <h3 className="mb-3 ms-5 blockquote fst-italic">
        Connect with <span className="text-success">Keerthana Silks</span><br /> on WhatsApp
      </h3>
      <h6 className="mb-3 ms-5">Scan this QR code and opt-in to WhatsApp to:</h6>
      <ul className="list-unstyled ms-5">
        <li><span className="gold-tick">✔</span> Receive exclusive offers and sale alerts</li>
        <li><span className="gold-tick">✔</span> Chat with Keerthana Silks customer support</li>
        <li><span className="gold-tick">✔</span> Stay updated on new arrivals and festive collections</li>
        <li><span className="gold-tick">✔</span> Get styling tips and saree care guidance</li>
        <li><span className="gold-tick">✔</span> Be the first to know about limited-edition collections</li>
      </ul>
      <p className="text-muted mt-3 ms-5" style={{ fontSize: '0.9rem' }}>
        <em>Android users may need to enable Google Lens to scan the QR code.</em>
      </p>
    </div>
    <div className="col-md-5 text-center">
      <img
        src="/images/wp_connect_prasanth.jpg"
        alt="WhatsApp QR"
        className="img-fluid qr-image neon-border"
        style={{ maxWidth: '400px' }}
      />
    </div>
  </div>

  {/* Contact Info + Form */}
  <div className="row g-4">
    <div className="col-md-6">
      <img
        src="/images/submit_your_query.png"
        alt="Submit your query"
        className="img-fluid"
        style={{ maxHeight: '500px', objectFit: 'cover', marginTop: '50px' }}
      />
    </div>
    <div className="col-md-6">
      <div className="p-4 bg-white rounded shadow-sm h-100">
        <h4 className="text-center text-dark mb-4">Submit Your Query</h4>
        {isSubmitted && Object.values(formData).some((value) => typeof value === "string" && value.trim() === "") && (
          <p className="text-danger text-center">Please fill in all fields.</p>
        )}
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div className={`form-floating-wrapper ${formData[field] ? 'filled' : ''}`} key={field}>
              <input
                type={field === "email" ? "email" : field === "mobileNumber" ? "tel" : "text"}
                className="form-control"
                id={field}
                name={field}
                required
                onChange={handleChange}
                value={formData[field] || ""}
              />
              <label htmlFor={field}>
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
              </label>
            </div>
          ))}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  {/* Client Reviews Carousel */}
  <div className="mt-5">
    <h3 className="text-center mb-5 fw-bold text-dark text-clip-gradient">What Our Clients Say</h3>
    <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {[1, 2, 3].map((_, idx) => (
          <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
            <div className="d-flex justify-content-center">
              <div className="card border-0 promise-item p-4 mx-auto" style={{ width: "80%", maxWidth: "500px", backgroundColor: "#fff", borderRadius: "1rem" }}>
                <div className="card-body text-center">
                  <img src={`https://i.pravatar.cc/100?img=${idx + 20}`} alt="Client" className="rounded-circle mb-3 shadow" style={{ width: 80, height: 80, objectFit: "cover" }} />
                  <h5 className="fw-bold mb-1">Client {idx + 1}</h5>
                  <p className="text-muted mb-3">– Verified Customer</p>
                  <p className="fst-italic px-2" style={{ fontSize: "1.1rem" }}>
                    “Madras Acoustics offered us outstanding quality and support. Truly exceptional experience!”
                  </p>
                  <div><span className="text-warning">★ ★ ★ ★ ★</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#clientCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" style={{ backgroundColor: "#0d6efd", borderRadius: "50%", padding: "1rem" }}></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#clientCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" style={{ backgroundColor: "#0d6efd", borderRadius: "50%", padding: "1rem" }}></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  {/* Connect With Us Grid */}
  <div className="connect-section mt-5">
    <h3 className="text-center mb-5 fw-bold text-dark text-clip-gradient">Connect With Us</h3>
    <div className="row g-4 justify-content-center">
      {platforms?.map((item, idx) => (
        <div className="col-md-4 col-sm-6" key={idx}>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front d-flex flex-column justify-content-center align-items-center text-white" style={{ background: `linear-gradient(to bottom, ${item.color}, rgb(249, 231, 231))`, color: "#000", cursor: "pointer" }}>
                <i className={`${item.icon} fa-3x mb-3`} style={{ color: 'black' }}></i>
                <h5 style={{ color: 'black' }}>{item.title}</h5>
                <p className="text-center px-3" style={{ color: 'black' }}>{item.desc}</p>
              </div>
              <div className="flip-card-back d-flex flex-column justify-content-center align-items-center bg-light text-dark">
                <p className="text-center px-3">{item.desc}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-2">Connect</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Subscribe Section */}
  <div className="container my-5 d-flex justify-content-center">
    <div className="glass-card w-100 p-4 text-center">
      <h3 className="mb-3 fw-bold text-clip-gradient">Stay in the Loop!</h3>
      <p className="mb-4">Subscribe to get updates on our latest collections and exclusive offers.</p>
      {subscribed ? (
        <div className="mt-4">
          <h5 className="text-warning">🎉 Here's your exclusive insight!</h5>
          <p>"Innovation distinguishes between a leader and a follower." – Steve Jobs</p>
        </div>
      ) : (
        <form onSubmit={handleEmailSubscribe}>
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-0">
              <i className="fas fa-envelope text-primary" style={{ fontSize: '40px' }}></i>
            </span>
            <div className="email-input-wrapper">
              <div className={`floating-group ${email ? 'filled' : ''}`}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                />
                <label htmlFor="email">Enter email</label>
                <span className="icon">@</span>
              </div>
            </div>
            <button type="submit" className="btn btn-warning fw-bold" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </form>
      )}
    </div>
  </div>

  {/* Instagram Carousel */}
  <div className="container my-5">
    <h3 className="text-center mb-4 text-clip-gradient">View Our Insights to Know More</h3>
    <div id="instagramCarousel" className="carousel slide instagram-carousel" data-bs-ride="carousel">
      <div className="carousel-inner">
        {[
          ["video-1", "video-2", "video-3"],
          ["video-4", "video-5", "video-6"],
          ["video-7", "video-8"]
        ].map((group, idx) => (
          <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
            <div className="row justify-content-center">
              {group.map((video, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card reel-card">
                    <video
                      className="card-img-top reel-img"
                      src={`videos/${video}.mp4`}
                      controls
                      preload="metadata"
                      style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#instagramCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon rounded-pill custom-nav"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#instagramCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon rounded-pill custom-nav"></span>
      </button>
    </div>
  </div>
</div>

        </>
    )
}