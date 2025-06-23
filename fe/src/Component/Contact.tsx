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

  const reviews = [
    {
      name: "Divya R.",
      quote: "Absolutely loved the soft silk saree I ordered! The color was vibrant and exactly as shown online.",
      rating: 5,
      imgId: 23
    },
    {
      name: "Meena V.",
      quote: "Keerthana Silks never disappoints! This is my third purchase, and the weaving quality is just unmatched.",
      rating: 4,
      imgId: 24
    },
    {
      name: "Anitha K.",
      quote: "I was skeptical about ordering a saree online, but Keerthana Silks exceeded my expectations. Elegant and neatly packed!",
      rating: 5,
      imgId: 25
    },
    {
    name: "Kavitha R.",
    quote: "Beautiful zari work and authentic Kanchipuram feel. My sister wore it for her wedding and everyone loved it!",
    rating: 5,
    imgId: 26
  },
  {
    name: "Sowmya P.",
    quote: "What impressed me the most was their customer support—they helped me pick the perfect saree for a family function.",
    rating: 4,
    imgId: 27
  },
  {
    name: "Janani M.",
    quote: "Elegant packaging and quick delivery! My saree looked so premium when I opened the box.",
    rating: 5,
    imgId: 28
  },
  {
    name: "Deepa L.",
    quote: "The silk quality is rich and breathable—perfect for long traditional events. Got lots of compliments!",
    rating: 5,
    imgId: 29
  },
  {
    name: "Ramya S.",
    quote: "I gifted one to my mom for her 60th birthday. She was touched and said it reminded her of her wedding saree.",
    rating: 5,
    imgId: 30
  },
  {
    name: "Bhavya T.",
    quote: "Affordable yet premium! I’ve bookmarked Keerthana Silks for all future festivals.",
    rating: 4,
    imgId: 31
  }
  ];

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
        <div className="row align-items-center my-5 px-3  flex-md-row">
          <h3
            className="blockquote fst-italic fw-bold text-center text-center mb-5 fw-bold text-dark text-clip-gradient"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 2rem)",
              lineHeight: 1.3,
              marginBottom: "1rem"
            }}
          >
            Connect with Keerthana Silks on WhatsApp
          </h3>


          {/* TEXT SECTION */}
          <div className="col-md-7 mt-4 mt-md-0">



            <h6
              className="text-center text-md-start "
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
            >
              Scan this QR code and opt-in to WhatsApp to:
            </h6>

            <ul className="list-unstyled ps-2 ps-md-4">
              {[
                "Receive exclusive offers and sale alerts",
                "Chat with Keerthana Silks customer support",
                "Stay updated on new arrivals and festive collections",
                "Get styling tips and saree care guidance",
                "Be the first to know about limited-edition collections",
              ].map((text, idx) => (
                <li key={idx} className="d-flex align-items-start mb-2">
                  <span className="gold-tick me-2">✔</span>
                  <span style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>{text}</span>
                </li>
              ))}
            </ul>

            <p
              className="text-muted text-center text-md-start mt-3"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}
            >
              <em>Android users may need to enable Google Lens to scan the QR code.</em>
            </p>
          </div>

          {/* IMAGE FIRST ON MOBILE */}
          <div className="col-md-5 text-center">
            <img
              src="/FE/images/wp_connect_prasanth.jpg"
              alt="WhatsApp QR"
              className="img-fluid qr-image neon-border"
              style={{ maxWidth: '300px', width: '100%', height: 'auto' }}
            />
          </div>
        </div>



        {/* Contact Info + Form */}
        <div className="row g-4 ">
          <h3
            className="text-center fw-bold text-dark text-clip-gradient"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              marginTop: "clamp(0.5rem, 2vw, 2rem)",
              marginBottom: "clamp(0.75rem, 3vw, 2.5rem)"
            }}
          >
            Submit Your Query
          </h3>



          <div className="col-md-6 text-center">

            <img
              src="/FE/images/submit_your_query.png"
              alt="Submit your query"
              className="img-fluid mt-md-5 mt-3"
              style={{
                maxHeight: '350px',
                objectFit: 'cover',
                width: '100%',
              }}
            />


          </div>

          <div className="col-md-6">
            <div
              className="p-2 bg-white rounded shadow-sm h-100"
              style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}
            >
              {isSubmitted &&
                Object.values(formData).some((value) => typeof value === "string" && value.trim() === "") && (
                  <p
                    className="text-danger text-center"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.6vw, 0.9rem)',
                    }}
                  >
                    Please fill in all fields.
                  </p>
                )}

              <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((field) => (
                  <div
                    className={`form-floating-wrapper mb-2 ${formData[field] ? 'filled' : ''}`}
                    key={field}
                  >
                    <input
                      type={field === "email" ? "email" : field === "mobileNumber" ? "tel" : "text"}
                      className="form-control"
                      id={field}
                      name={field}
                      required
                      onChange={handleChange}
                      value={formData[field] || ""}
                      style={{
                        fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
                        padding: '0.4rem 0.6rem',
                        height: '38px'
                      }}
                    />
                    <label
                      htmlFor={field}
                      style={{
                        fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
                      }}
                    >
                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                    </label>
                  </div>
                ))}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
                      padding: '0.4rem 0.6rem',
                      height: '38px'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>


        {/* Client Reviews Carousel */}
        <div className="mt-5">
          <h3
            className="text-center mb-5 fw-bold text-dark text-clip-gradient"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
          >
            What Our Clients Say
          </h3>

          <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {reviews.map((review, idx) => (
                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                  <div className="d-flex justify-content-center">
                    <div
                      className="card border-0 promise-item p-4 mx-auto"
                      style={{
                        width: "80%",
                        maxWidth: "500px",
                        backgroundColor: "#fff",
                        borderRadius: "1rem"
                      }}
                    >
                      <div className="card-body text-center px-2 px-md-4">
                        <img
                          src={`https://i.pravatar.cc/100?img=${review.imgId}`}
                          // src={`https://source.unsplash.com/100x100/?indian-girl,saree&sig=${idx}`}
                          alt={review.name}
                          className="rounded-circle mb-2 shadow"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover"
                          }}
                        />

                        <h5
                          className="fw-bold mb-1"
                          style={{ fontSize: "clamp(0.65rem, 1vw, 0.9rem)" }}
                        >
                          {review.name}
                        </h5>

                        <p
                          className="text-muted mb-2"
                          style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.8rem)" }}
                        >
                          – Verified Customer
                        </p>

                        <p
                          className="fst-italic mb-3"
                          style={{
                            fontSize: "clamp(0.6rem, 1vw, 0.85rem)",
                            lineHeight: 1.3
                          }}
                        >
                          “{review.quote}”
                        </p>

                        <div>
                          <span
                            className="text-warning"
                            style={{
                              fontSize: "clamp(0.7rem, 1vw, 0.9rem)"
                            }}
                          >
                            {"★ ".repeat(review.rating).trim()}
                          </span>
                        </div>
                      </div>
                    </div>
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
              <span
                className="carousel-control-prev-icon"
                style={{
                  backgroundColor: "#0d6efd",
                  borderRadius: "50%",
                  padding: "1rem"
                }}
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#clientCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                style={{
                  backgroundColor: "#0d6efd",
                  borderRadius: "50%",
                  padding: "1rem"
                }}
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Connect With Us Grid */}
        <div className="connect-section mt-5">
          <h3 className="text-center mb-5 fw-bold text-dark text-clip-gradient" style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)"
          }} >Connect With Us</h3>
          <div className="row g-4 justify-content-center">
            {platforms?.map((item, idx) => (
              <div className="col-md-4 col-sm-6" key={idx}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front d-flex flex-column justify-content-center align-items-center text-white" style={{ background: `linear-gradient(to bottom, ${item.color}, rgb(249, 231, 231))`, color: "#000", cursor: "pointer" }}>
                      <i className={`${item.icon} fa-3x mb-3`} style={{ color: 'black' }}></i>
                      <h5 style={{ color: 'black' }}>{item.title}</h5>
                      <p
                        className="text-center px-3"
                        style={{
                          color: 'black',
                          fontSize: 'clamp(0.45rem, 1vw, 0.65rem)' // very small text on all screens
                        }}
                      >
                        {item.desc}
                      </p>


                    </div>
                    <div className="flip-card-back d-flex flex-column justify-content-center align-items-center bg-light text-dark">
                      <p className="text-center px-3" style={{
                        color: 'black',
                        fontSize: 'clamp(0.7rem, 2vw, 1rem)'  // smaller minimum size on mobile
                      }}>{item.desc}</p>
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
                        <i className="fas fa-envelope text-primary"></i>
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


        {/* Instagram Carousel */}
        <div className="container my-5">
          <h3 className="text-center mb-4 text-clip-gradient" style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)"
          }} >View Our Insights to Know More</h3>
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