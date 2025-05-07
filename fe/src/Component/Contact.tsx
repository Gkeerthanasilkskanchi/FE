import { useState } from "react";

export const Contact = () => {
    const userData = {
        name: "",
        email: "",
        message: "",
        mobileNumber: "",
        subject: "",
        address: "",
    };

    const [formData, setFormData] = useState<any>(userData);
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleEmailSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // You can integrate with backend or Mailchimp API
        setSubscribed(true);
        setEmail('');
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
            //   const send = await sendQuery(formData);
            //   if (send?.status === 200) {
            //     toast.success("Review submitted successfully!", { autoClose: 2000 });
            //     setFormData(userData);
            //     setIsSubmitted(false); 
            //   }
        } catch (error) {
            //   toast.error("Failed to submit review. Please try again.", { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container my-5">
                {/* Contact Us Title */}
                <div className="d-flex justify-content-between align-items-center mt-4 mb-5">
                    <h2 className="fw-bold text-dark">Contact Us</h2>
                </div>

                {/* Contact Info + Form */}
                <div className="row g-4">
                    {/* Left Column - Placeholder or Add Info */}
                    <div className="col-md-6">

                    </div>

                    {/* Right Column - Form */}
                    <div className="col-md-6">
                        <div className="p-4 bg-white rounded shadow-sm h-100">
                            <h4 className="text-center text-dark mb-4">Submit Your Query</h4>

                            {isSubmitted && Object.values(formData).some((value) => typeof value === "string" && value.trim() === "") && (
                                <p className="text-danger text-center">Please fill in all fields.</p>
                            )}

                            <form onSubmit={handleSubmit}>
                                {Object.keys(formData).map((field) => (
                                    <div className="mb-3" key={field}>
                                        <input
                                            type={field === "email" ? "email" : field === "mobileNumber" ? "tel" : "text"}
                                            className="form-control"
                                            id={field}
                                            name={field}
                                            required
                                            placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
                                            value={formData[field as keyof typeof formData] || ""}
                                            onChange={handleChange}
                                        />
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
                    <h3 className="text-center mb-4">What Our Clients Say</h3>
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

                {/* Contact Ways - Cards in Grid */}
                <div className="mt-5">
                    <h3 className="text-center mb-4">Connect With Us</h3>
                    <div className="row g-4">
                        {[
                            { icon: "fab fa-whatsapp", title: "WhatsApp", link: "https://wa.me/918248365067", color: "text-success" },
                            { icon: "fab fa-facebook-f", title: "Facebook", link: "https://www.facebook.com/share/18kVHF8oaP/", color: "text-primary" },
                            { icon: "fab fa-instagram", title: "Instagram", link: "https://instagram.com/madras_acoustics/", color: "text-danger" },
                            { icon: "fas fa-envelope", title: "Email", link: "mailto:jeromedj@madrasacoustics.com", color: "text-warning" },
                            { icon: "fas fa-phone", title: "Phone", link: "tel:+918248365067", color: "text-dark" },
                            { icon: "fas fa-whatsapp", title: "Quick Call for Selection", link: "https://wa.me/918248365067", color: "text-dark" },
                        ].map((item, idx) => (
                            <div className="col-md-3 col-sm-6" key={idx}>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                    <div className="card text-center shadow-sm h-100">
                                        <div className="card-body">
                                            <i className={`${item.icon} fs-2 ${item.color}`}></i>
                                            <h5 className="card-title mt-3">{item.title}</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
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

                {/* Instagram Video Carousel Section */}
                <div className="container my-5">
                    <h3 className="text-center mb-4">Follow us on Instagram for the updates</h3>

                    <div id="instagramCarousel" className="carousel slide" data-bs-ride="carousel">
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
                                <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                                    <div className="row justify-content-center">
                                        {group.map((video, index) => (
                                            <div className="col-md-4" key={index}>
                                                <div className="card mb-3 shadow-sm border-0">
                                                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                                                        <img src={video.thumbnail} className="card-img-top" alt={`Instagram Video ${index + 1}`} />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#instagramCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-primary"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#instagramCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-primary"></span>
                        </button>
                    </div>
                </div>

            </div>


        </>
    )
}