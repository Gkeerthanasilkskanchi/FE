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
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <h4>Contact US</h4>
                </div>

                <div className="container my-5">
                    <div className="row">
                        {/* Left Column - Contact Info */}
                        <div className="col-md-6 mb-4 bg-primary">
                            <h2>Our Location</h2>

                            <div className="mb-3">
                                <p><i className="fas fa-envelope me-2 text-primary"></i>jeromedj@madrasacoustics.com</p>
                                <p><i className="fas fa-phone-alt me-2 text-success"></i>+91-82483 65067</p>
                                <p><i className="fas fa-map-marker-alt me-2 text-danger"></i>9/10, Perumal Kovil Street, Kotturpuram, Chennai -600 085</p>
                            </div>

                            <div className="d-flex gap-3">
                                <a href="tel:+918248365067" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-phone fs-5 text-dark"></i>
                                </a>
                                <a href="https://wa.me/918248365067" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-whatsapp fs-5 text-success"></i>
                                </a>
                                <a href="mailto:jeromedj@madrasacoustics.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-envelope fs-5 text-danger"></i>
                                </a>
                                <a href="https://www.facebook.com/share/18kVHF8oaP/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f fs-5 text-primary"></i>
                                </a>
                                <a href="https://instagram.com/madras_acoustics/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram fs-5 text-danger"></i>
                                </a>
                                <a href="https://x.com/madrasacoustics?t=L0Mh48j0u6tjYhUAw00f_g&s=08" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-x-twitter fs-5 text-dark"></i>
                                </a>
                            </div>
                        </div>

                        {/* Right Column - Query Form */}
                        <div className="col-md-6 bg-secondary">
                            <h2 className="text-center mb-4">Submit Your Query</h2>

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
                                            placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
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

            </div>
        </>
    )
}