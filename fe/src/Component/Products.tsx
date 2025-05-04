import { useState } from "react";

const filterCategories = [
    {
        title: "By Fabric",
        options: [
            "Silk Sarees",
            "Cotton Sarees",
            "Chiffon/Georgette Sarees",
            "Linen Sarees",
            "Crepe & Satin Sarees",
        ],
    },
    {
        title: "By Region / Tradition",
        options: [
            "Kanchipuram (Tamil Nadu)",
            "Banarasi (Uttar Pradesh)",
            "Paithani (Maharashtra)",
            "Bandhani (Rajasthan/Gujarat)",
            "Patola (Gujarat)",
            "Sambalpuri (Odisha)",
            "Chikankari Sarees (Lucknow)",
            "Assam Silk (Muga)",
            "Kasavu (Kerala)",
        ],
    },
    {
        title: "By Style",
        options: [
            "Lehenga Saree",
            "Half-and-Half Saree",
            "Ready-to-Wear Saree",
        ],
    },
];

const products = [
    { id: 1, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 2, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 3, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 4, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 5, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 6, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 7, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 8, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 9, title: 'Card title', imgSrc: '/images/saree.jfif' },
    { id: 10, title: 'Card title', imgSrc: '/images/saree.jfif' },
];

export const Products = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = (images: any) => {
        setSelectedImages(images);
        setShowModal(true);
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Our Collections</h4>

                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Filter Collections
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end nested-dropdown">
                        {filterCategories.map((category, idx) => (
                            <li className="dropdown-submenu" key={idx}>
                                <a className="dropdown-item dropdown-toggle" href="#">
                                    {category.title}
                                </a>
                                <ul className="dropdown-menu">
                                    {category.options.map((option, optIdx) => (
                                        <li key={optIdx}>
                                            <span className="dropdown-item-text">{option}</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div
                className="mt-4 overflow-auto"
                style={{ height: "calc(100vh - 80px)", width: "100%" }}
            >
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img
                                    src={product.imgSrc}
                                    className="card-img-top"
                                    style={{ height: '200px', cursor: 'pointer' }}
                                    alt="saree"
                                    onClick={() => handleImageClick([product.imgSrc])}
                                    data-bs-toggle="modal"
                                    data-bs-target="#imageModal"
                                />
                                <div className="card-body">
                                    <a
                                        onClick={() => {
                                            handleImageClick([product.imgSrc]);
                                        }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                    >
                                        <span className="card-title">{product.title}</span>
                                    </a>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <a className="btn btn-primary">Buy Now</a>
                                        <a className="btn btn-secondary"><i className="bi bi-cart-plus"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div
                className="modal fade"
                id="imageModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    style={{ width: "100vw", maxWidth: "500px" }}
                >
                    <div className="modal-content position-relative">

                        {/* Close Icon */}
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            style={{ zIndex: 1051 }}
                        ></button>

                        <div
                            className="modal-body p-0"
                            style={{
                                maxHeight: "90vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                id="carouselImages"
                                className="carousel slide w-100"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-inner">
                                    {[...Array(5)].map((_, idx) => (
                                        <div
                                            className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                            key={idx}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={selectedImages[0]} // Repeat the same image
                                                alt={`slide-${idx}`}
                                                className="img-fluid"
                                                style={{
                                                    maxHeight: "80vh",
                                                    objectFit: "contain",
                                                    padding: "10px",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselImages"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon bg-primary" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselImages"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon bg-primary" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* PRODUCT DETAIL MODAL */}
            <div className="modal fade" id="productDetailModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
                    <div className="modal-content position-relative">

                        {/* Close icon */}
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>

                        {/* Image carousel */}
                        <div id="productCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {[...Array(5)].map((_, idx) => (
                                    <div
                                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                        key={idx}
                                        style={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        <img
                                            src={selectedImages[0]}
                                            alt={`slide-${idx}`}
                                            className="d-block"
                                            style={{ maxHeight: '250px', objectFit: 'contain', padding: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon bg-primary" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon bg-primary" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                        {/* Product Info */}
                        <div className="d-flex p-3" style={{ maxHeight: "300px" }}>
                            {/* Left: Description */}
                            <div className="w-70 pe-3" style={{ width: "70%" }}>
                                <h5>About the Product</h5>
                                <p style={{ fontSize: "14px" }}>
                                    This saree is crafted with exquisite silk, perfect for festive and formal occasions. The intricate patterns
                                    and vibrant colors add elegance to your appearance.
                                </p>
                            </div>

                            {/* Right: Brief info */}
                            <div className="w-30 border-start ps-3" style={{ width: "30%" }}>
                                <p><strong>Name:</strong> Elegant Saree</p>
                                <p><strong>Price:</strong> ₹1499</p>
                                <p><strong>Cloth:</strong> Silk</p>
                                <p><strong>Category:</strong> Traditional</p>
                                <p><strong>Bought By:</strong> 1523 customers</p>
                            </div>
                        </div>

                        {/* Reviews Carousel */}
                        <div className="px-3 pb-3">
                            <h6>Customer Reviews</h6>
                            <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {[0, 1].map((groupIndex) => (
                                        <div
                                            className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
                                            key={groupIndex}
                                        >
                                            <div className="d-flex justify-content-between">
                                                {[0, 1, 2].map((i) => {
                                                    const idx = groupIndex * 3 + i;
                                                    return (
                                                        <div className="card me-2 flex-fill" key={idx} style={{ minWidth: "0" }}>
                                                            <div className="card-body">
                                                                <h6 className="card-title mb-1">User {idx + 1}</h6>
                                                                <div className="mb-2">
                                                                    {"⭐".repeat(4)}{"☆".repeat(1)}
                                                                </div>
                                                                <p className="card-text" style={{ fontSize: "14px" }}>
                                                                    Loved the fabric and design. Very comfortable and looked amazing!
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#reviewCarousel"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon bg-primary" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#reviewCarousel"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon bg-primary" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>


                        {/* Footer */}
                        <div className="border-top p-3 d-flex justify-content-between">
                            <button className="btn btn-success w-100 me-2">Buy</button>
                            <button className="btn btn-secondary me-2"><i className="bi bi-cart-plus"></i></button>
                            <button className="btn btn-outline-danger"><i className="bi bi-heart"></i></button>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};
