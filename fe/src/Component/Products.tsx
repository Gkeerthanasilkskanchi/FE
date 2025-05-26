import { useEffect, useState } from "react";
import { addCartProducts, addLikedProducts, addOrderService, getProducts } from "../API/API";
import { toast } from "react-toastify";

// const filterCategories = [
//     {
//         title: "By Fabric",
//         options: [
//             "Silk Sarees",
//             "Cotton Sarees",
//             "Chiffon/Georgette Sarees",
//             "Linen Sarees",
//             "Crepe & Satin Sarees",
//         ],
//     },
//     {
//         title: "By Region / Tradition",
//         options: [
//             "Kanchipuram (Tamil Nadu)",
//             "Banarasi (Uttar Pradesh)",
//             "Paithani (Maharashtra)",
//             "Bandhani (Rajasthan/Gujarat)",
//             "Patola (Gujarat)",
//             "Sambalpuri (Odisha)",
//             "Chikankari Sarees (Lucknow)",
//             "Assam Silk (Muga)",
//             "Kasavu (Kerala)",
//         ],
//     },
//     {
//         title: "By Style",
//         options: [
//             "Lehenga Saree",
//             "Half-and-Half Saree",
//             "Ready-to-Wear Saree",
//         ],
//     },
// ];

export const Products = () => {
    const [products, setProducts] = useState<any>([]);
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);


    useEffect(() => {
        fetchProducts();
    }, [selectedProduct]);
    const email = sessionStorage.getItem("userEmail");
    const addToCart = async (productId: any) => {
        try {
            const payload = {
                email,
                productId,
                quantity: 1,
            }
            const response = await addCartProducts(payload);
            if (response) toast.success(response.data.message);
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };

    const likeProduct = async (productId: any) => {
        try {
            const payload = {
                email,
                productId,
            }
            const response = await addLikedProducts(payload);
            if (response) toast.success(response.data.message);
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message);
        }
    };
    const fetchProducts = async () => {
        try {
            const response :any= await getProducts();
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    //  const addOrder = async (product:any) => {
    //     try {
    //         const email = sessionStorage.getItem("userEmail");
    //         const payload : any = {email,product.id,product?.quantity,product?.price}
    //         const response = await addOrderService(payload);

    //         if (Array.isArray(response.data)) {
    //             setProducts(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch products:", error);
    //     }
    // };
    const handleImageClick = (product: any) => {
        setSelectedProduct(product);
        console.log(product)
        // setSelectedImages(product);
        setShowModal(true);
    };


    return (
        <div className="container">
            {/* Header & Filter */}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="w-100">
                    <h4 className="text-center">Our Collections</h4>
                </div>

                {/* <div className="dropdown">
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
                </div> */}
            </div>

            {/* Product Grid */}
            <div
                className="mt-4 overflow-auto"
                style={{ height: "calc(100vh - 80px)", width: "100%" }}
            >
                <div className="row g-4">
                    {products?.map((product: any) => (
                        <div
                            key={product.id}
                            className="col-12 col-sm-6 col-lg-4"
                        >
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={product.image?.[0] || '/images/default.jpg'}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                                    alt={product.title}
                                    // onClick={() => handleImageClick(product)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#imageModal"
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <span
                                        className="fw-bold d-block mb-2 text-truncate"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleImageClick(product)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                        title={product.title}
                                    >
                                        {product.title}
                                    </span>
                                    <div className="d-flex justify-content-between align-items-center gap-2 mt-auto ps-4 pe-4">
                                        <button style={{outline:'none',border:'none',borderRadius:'5px'}} className="primary">
                                            <i className="bi bi-bag-fill me-1"  style={{fontSize:"30px"}}></i> 
                                        </button>
                                        <button  style={{outline:'none',border:'none',borderRadius:'5px'}} className="primary" title="Add to Cart" onClick={() => addToCart(product.id)}>
                                            <i className="bi bi-cart-plus-fill" style={{fontSize:"30px"}}></i>
                                        </button>
                                        <button style={{outline:'none',border:'none',borderRadius:'5px'}} className="primary" title="Like Product" onClick={() => likeProduct(product.id)}>
                                            <i className="bi bi-hand-thumbs-up-fill" style={{fontSize:"30px"}}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* <div
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
                                    {selectedImages.map((img:any, idx:any) => (
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
            </div> */}



            {/* PRODUCT DETAIL MODAL */}
            <div className="modal fade" id="productDetailModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
                    <div className="modal-content position-relative">

                       
                        {/* <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>

                       
                        <div id="productCarousel" className="carousel slide">
                            <div className="carousel-inner">
                                {selectedImages.map((img:any, idx:any) => (
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
                        </div> */}

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
                                {/* <p><strong>Bought By:</strong> {selectedProduct?.bought_by || "N/A"} customers</p> */}
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
                            <button className="btn btn-secondary me-2" onClick={() => addToCart(selectedProduct.id)}><i className="bi bi-cart-plus"></i></button>
                            <button className="btn btn-outline-danger"  onClick={() => likeProduct(selectedProduct.id)}><i className="bi bi-heart"></i></button>
                        </div>

                    </div>
                </div>
            </div>



        </div>
    );
};
