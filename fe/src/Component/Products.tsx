import { useEffect, useState } from "react";
import { addCartProducts, addLikedProducts, getProducts } from "../API/API";
import { toast } from "react-toastify";

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

export const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);


    useEffect(() => {
        fetchProducts();
    }, []);
    const email=sessionStorage.getItem("userEmail");
    const addToCart = async (productId:any) => {
        try {
            const payload = {
                email,
                productId,
                quantity: 1,
            }
            const response = await addCartProducts(payload);
            if(response)  toast.success(response.data.message);
        } catch (err:any) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    const likeProduct = async (productId:any) => {
        try {
            const payload ={
                email,
                productId,
            }
            const response =await addLikedProducts(payload);
            if(response)  toast.success(response.data.message);
        } catch (err:any) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log(response)
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleImageClick = (product: any) => {
        setSelectedProduct(product);
        setSelectedImages(product.image);
        setShowModal(true);
    };


    return (
        <div className="container">
            {/* Header & Filter */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <h4>Our Collections</h4>

                <div className="dropdown">
                    {/* <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Filter Collections
                    </button> */}

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

            {/* Product Grid */}
            <div
                className="mt-4 overflow-auto"
                style={{ height: "calc(100vh - 80px)", width: "100%" }}
            >
                <div className="row">
                    {products.map((product:any) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card">
                                <img
                                    src={product.image?.[0] || '/images/default.jpg'}
                                    className="card-img-top"
                                    style={{ height: '200px', cursor: 'pointer' }}
                                    alt={product.title}
                                    onClick={() => handleImageClick(product.image)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#imageModal"
                                />
                                <div className="card-body">
                                    <span
                                        style={{ cursor: "pointer", fontWeight: "bold" }}
                                        onClick={() => handleImageClick(product)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                    >
                                        {product.title}
                                    </span>
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <button className="btn btn-primary">
                                            <i className="bi bi-bag-fill me-1"></i> Buy Now
                                        </button>
                                        <button className="btn btn-secondary"  title="Add to Cart">
                                            <i className="bi bi-cart-plus-fill" onClick={()=>addToCart(product.id)}></i>
                                        </button>
                                        <button className="btn btn-secondary" title="Like Product">
                                            <i className="bi bi-hand-thumbs-up-fill" onClick={()=>likeProduct(product.id)}></i>
                                        </button>
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
                                    {selectedImages.map((img, idx) => (
                                        <div
                                            className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                            key={idx}
                                            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        >
                                            <img
                                                src={img}
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
                                {selectedImages.map((img, idx) => (
                                    <div
                                        className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                        key={idx}
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                    >
                                        <img
                                            src={img}
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
                                <p><strong>Name:</strong> {selectedProduct?.title}</p>
                                <p><strong>Price:</strong> ₹{selectedProduct?.price}</p>
                                <p><strong>Cloth:</strong> {selectedProduct?.cloth || "N/A"}</p>
                                <p><strong>Category:</strong> {selectedProduct?.category || "Traditional"}</p>
                                <p><strong>Bought By:</strong> {selectedProduct?.bought_by || "N/A"} customers</p>
                                <p><strong>Saree Type:</strong> {selectedProduct?.saree_type}</p>

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
