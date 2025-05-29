import { useState } from "react";
import { sendQuery, sendSubscribtion } from "../API/API";
import { toast } from "react-toastify";

export const Contact = () => {
    const [focused, setFocused] = useState(false);
    const userData = {
        name: "",
        email: "",
        message: "",
        mobileNumber: "",
        subject: "",
        address: "",
    };

    const platforms = [
        {
            icon: "fab fa-whatsapp",
            title: "WhatsApp",
            desc: "Chat with us instantly",
            link: "https://wa.me/918248365067",
            color: "#25D366",
        },
        {
            icon: "fab fa-facebook-f",
            title: "Facebook",
            desc: "Follow for latest updates",
            link: "https://www.facebook.com/share/18kVHF8oaP/",
            color: "#1877F2",
        },
        {
            icon: "fab fa-instagram",
            title: "Instagram",
            desc: "Catch our latest reels & posts",
            link: "https://instagram.com/madras_acoustics/",
            color: "#E1306C",  // Instagram's pinkish-red official color
        },

        {
            icon: "fas fa-envelope",
            title: "Email",
            desc: "Drop us a message",
            link: "mailto:jeromedj@madrasacoustics.com",
            color: "#FF9F00",
        },
        {
            icon: "fas fa-phone",
            title: "Phone",
            desc: "Call our support team",
            link: "tel:+918248365067",
            color: "#4CAF50",
        },
        {
            icon: "fab fa-youtube",
            title: "YouTube",
            desc: "Watch our product demos",
            link: "https://youtube.com/@madrasacoustics",
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
        const value = await sendSubscribtion({ email: email });
        if (value) {
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
            <div className="container mt-5">
                <div className="row align-items-center my-5">

                    {/* <div className="col-md-6 text-center">
                        <img
                            src="/images/wp_image.jpg"
                            alt="Connect to wp"
                            className="img-fluid"
                            style={{ maxHeight: '500px', objectFit: 'cover', marginTop: '30px' }}
                        />

                    </div> */}

                    {/* Right side - WhatsApp section */}
                    <div className="row align-items-center">
                        {/* QR Code on the left */}
                        <div className="col-md-5 text-center">
                            <img
                                src="/images/wp_connect.jpg"
                                alt="Connect with Keerthana Silks on WhatsApp"
                                className="img-fluid qr-image neon-border"
                                style={{ maxWidth: '400px' }}
                            />
                        </div>

                        {/* Content on the right */}
                        <div className="col-md-7">
                            <h3 className="mb-3 ms-5 blockquote fst-italic">
                                Connect with <span className="text-success">Keerthana Silks</span><br /> on WhatsApp
                            </h3>

                            <h6 className="mb-3 ms-5 ">Scan this QR code and opt-in to WhatsApp to:</h6>

                            <ul className="list-unstyled ms-5 ">
                                <li><span className="gold-tick">✔</span> Receive exclusive offers and sale alerts</li>
                                <li><span className="gold-tick">✔</span> Chat with Keerthana Silks customer support</li>
                                <li><span className="gold-tick">✔</span> Stay updated on new arrivals and festive collections</li>
                                <li><span className="gold-tick">✔</span> Get styling tips and saree care guidance</li>
                                <li><span className="gold-tick">✔</span> Be the first to know about limited-edition collections</li>

                            </ul>

                            <p className="text-muted mt-3 ms-5 " style={{ fontSize: '0.9rem' }}>
                                <em>Android users may need to enable Google Lens to scan the QR code.</em>
                            </p>
                        </div>
                    </div>
                </div>


                {/* Contact Info + Form */}
                <div className="row g-4">
                    {/* Right Column - Form */}
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
                                            value={formData[field as keyof typeof formData] || ""}
                                        />
                                        <label htmlFor={field}>
                                            {field
                                                .replace(/([A-Z])/g, " $1")
                                                .replace(/^./, (c) => c.toUpperCase())}
                                        </label>
                                    </div>

                                ))}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Left Column - Placeholder or Add Info */}
                    <div className="col-md-6">
                        <img
                            src="/images/submit_your_query.png"
                            alt="Connect with Keerthana Silks on WhatsApp"
                            className="img-fluid"
                            style={{ maxHeight: '500px', objectFit: 'cover', marginBottom: '-100px' }}
                        />


                    </div>


                </div>

                {/* Client Reviews Carousel */}
                <div className="mt-5">
                    <h3 className="text-center mb-5 fw-bold text-dark text-clip-gradient ">What Our Clients Say</h3>

                    <div id="clientCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {[1, 2, 3].map((review, idx) => (
                                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="card border-0 shadow-lg p-4"
                                            style={{
                                                maxWidth: "600px",
                                                width: "60%",
                                                backgroundColor: "#ffffff",
                                                borderRadius: "1rem",
                                            }}
                                        >
                                            <div className="card-body text-center">
                                                <img
                                                    src={`https://i.pravatar.cc/100?img=${idx + 20}`}
                                                    alt="Client"
                                                    className="rounded-circle mb-3"
                                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                                />
                                                <h5 className="fw-bold mb-1">Client {idx + 1}</h5>
                                                <p className="text-muted mb-3">– Verified Customer</p>
                                                <p className="fst-italic px-2" style={{ fontSize: "1.1rem" }}>
                                                    “Madras Acoustics offered us outstanding quality and support. Truly exceptional
                                                    experience!”
                                                </p>
                                                <div>
                                                    <span className="text-warning">★ ★ ★ ★ ★</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Prev Button */}
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#clientCarousel"
                            data-bs-slide="prev"
                        >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                                style={{
                                    backgroundColor: "#0d6efd",
                                    borderRadius: "50%",
                                    padding: "1rem",
                                }}
                            ></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        {/* Next Button */}
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#clientCarousel"
                            data-bs-slide="next"
                        >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                                style={{
                                    backgroundColor: "#0d6efd",
                                    borderRadius: "50%",
                                    padding: "1rem",
                                }}
                            ></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Contact Ways - Cards in Grid */}
                <div className="connect-section mt-5">
                    <h3 className="text-center mb-5 fw-bold text-dark text-clip-gradient">Connect With Us</h3>
                    <div className="row g-4 justify-content-center">
                        {platforms.map((item, idx) => {

                            return (
                                <div className="col-md-4 col-sm-6" key={idx}>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div
                                                className="flip-card-front d-flex flex-column justify-content-center align-items-center text-white"
                                                style={{ backgroundColor: item.color }}
                                            >
                                                <i className={`${item.icon} fa-3x mb-3`} style={{color:'black'}}></i>
                                                <h5 style={{color:'black'}}>{item.title}</h5>
                                                <p className="text-center px-3" style={{color:'black'}}>{item.desc}</p>
                                            </div>
                                            <div className="flip-card-back d-flex flex-column justify-content-center align-items-center bg-light text-dark">
                                                <p className="text-center px-3">{item.desc}</p>
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-dark mt-2"
                                                >
                                                    Connect
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>






                <div className="container my-5 d-flex justify-content-center">
                    <div className="glass-card w-100 p-4 text-center">
                        <h3 className="mb-3 fw-bold text-clip-gradient " >Stay in the Loop!</h3>
                        <p className="mb-4">
                            Subscribe to get updates on our latest collections and exclusive offers.
                        </p>

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

                {/* Instagram Video Carousel Section */}
                <div className="container my-5">
                    <h3 className="text-center mb-4 text-clip-gradient ">Follow us on Instagram for the updates</h3>

                    <div id="instagramCarousel" className="carousel slide instagram-carousel" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {[
                                [
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_1/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_1/"
                                    },
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_2/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_2/"
                                    },
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_3/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_3/"
                                    }
                                ],
                                [
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_4/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_4/"
                                    },
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_5/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_5/"
                                    },
                                    {
                                        thumbnail: "https://img.youtube.com/vi/VIDEO_ID_6/0.jpg",
                                        link: "https://www.instagram.com/reel/INSTAGRAM_VIDEO_6/"
                                    }
                                ]
                            ].map((group, idx) => (
                                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                                    <div className="row justify-content-center">
                                        {group.map((video, index) => (
                                            <div className="col-md-4" key={index}>
                                                <div className="card reel-card">
                                                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                                                        <img src={video.thumbnail} className="card-img-top reel-img" alt={`Instagram Video ${index + 1}`} />
                                                    </a>
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