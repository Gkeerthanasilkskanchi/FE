import { useEffect, useState } from "react";
import { addCartProducts, addLikedProducts, addOrderService, getProducts } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";


export const Products = () => {
    const [products, setProducts] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [selectedProduct]);
    const email = sessionStorage.getItem("userEmail");
    const addToCart = async (productId: any) => {
        try {
            if (!email) { toast.error("Login to add product", { autoClose: 1000 }); }
            if (email) {
                setLoading(true);
                const payload = {
                    email,
                    productId,
                    quantity: 1,
                }
                const response = await addCartProducts(payload);
                if (response) toast.success(response.data.message, { autoClose: 1000 });
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message);
        } finally {
            setLoading(false);
            fetchProducts();
            // window.location.reload();
        }
    };

    const likeProduct = async (productId: number) => {
        try {
            if (!email) {
                toast.error("Login to like product", { autoClose: 1000 });
                return;
            }

            setLoading(true);

            const payload = {
                email,
                productId,
            };

            const response = await addLikedProducts(payload);

            if (response) {
                toast.success(response.data.message, { autoClose: 1000 });
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong", {
                autoClose: 1000,
            });
        } finally {
            setLoading(false);
            fetchProducts(); // or fetchProducts()
        }
    };



    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response: any = await getProducts(email);
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleBuyClick = async (product: any) => {
        try {
            const email = sessionStorage.getItem("userEmail");
            if (!email) { toast.error("Login to buy a product", { autoClose: 1000 }); }
            if (email) {
                setLoading(true);
                const payload = {
                    email,
                    id: product.id,
                    quantity: product.quantity || 1,
                    price: product.price,
                };
                await addOrderService(payload);
                setLoading(false);
                const message = encodeURIComponent(
                    `Hello, I'm interested in buying:\n\n` +
                    `🧵 *${product.title}*\n💰 Price: ₹${product.price}\n📦 Quantity: ${product.quantity || 1}\n\n` +
                    `Please provide further details.`
                );
                const whatsappNumber = "917904999697";
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            }
        } catch (error) {
            console.error("Buy operation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = (product: any) => {
        setSelectedProduct(product);
        // setSelectedImages(product);
        setShowModal(true);
    };


    return (
        <>
            <Loader loading={loading}></Loader>
            <div className="container">
                {/* Header & Filter */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="w-100">
                        <h4 className="text-center fw-boldj text-clip-gradient">Our Collections</h4>
                    </div>

                </div>

                {/* Product Grid */}
                <div
                    className="mt-4 h-100"
                    style={{ width: "100%" }}
                >
                    <div className="row g-4">
                        {products?.map((product: any) => (
                            <div
                                key={product.id}
                                className="col-12 col-sm-6 col-lg-4"

                            >
                                <div className="card h-100 shadow-sm border-0" >
                                    <img
                                        src={product?.image || '/FE/images/default.jpg'}
                                        className="card-img-top"
                                        onClick={() => handleImageClick(product)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#productDetailModal"
                                        style={{
                                            height: '300px',
                                            width: '100%',
                                            objectFit: 'fill',
                                            objectPosition: 'center',
                                            backgroundColor: '#f8f8f8',
                                            cursor: 'pointer',

                                        }}

                                        alt={product.title}


                                    />

                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span
                                                className="fw-bold text-truncate"
                                                style={{ cursor: "pointer", textDecoration: "underline", maxWidth: "70%", color: "#270206" }}
                                                onClick={() => handleImageClick(product)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#productDetailModal"
                                                title={product.title}

                                            >
                                                {product?.title}
                                            </span>

                                            <span className="fw-bold">
                                                ₹{product?.price}
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center gap-2 mt-auto ps-4 pe-4">
                                            <button
                                                className="d-flex align-items-center justify-content-center gap-1 text-white fw-semibold"
                                                style={{
                                                    backgroundColor: '#ff69b4',
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    padding: '6px 16px',
                                                    fontSize: 'clamp(10px, 1vw, 14px)',
                                                    width: '80px', // Adjust width as needed
                                                    height:"40px",
                                                    whiteSpace: 'nowrap', // Prevent line break
                                                }}
                                                title="Buy Now"
                                                onClick={() => handleBuyClick(product)}
                                            >
                                                <i
                                                    className="bi bi-bag"
                                                    style={{
                                                        fontSize: 'clamp(12px, 1.5vw, 16px)',
                                                        marginTop:"15px"

                                                    }}
                                                ></i>
                                                <span>Buy Now</span>
                                            </button>





                                            <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} title="Add to Cart" onClick={() => addToCart(product.id)}>
                                                {product?.is_product_in_cart ? <i className="bi bi-cart-plus" style={{ fontSize: "30px" }}></i>
                                                    : <i className="bi bi-cart" style={{ fontSize: "30px" }}></i>}

                                            </button>
                                            <button style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }} className="primary" title="Like Product" onClick={() => likeProduct(product.id)}>
                                                {!(product?.is_product_liked) ? <i className="bi bi-suit-heart heart-style " style={{ fontSize: '30px' }}></i>
                                                    : <i className="bi bi-heart-fill heart-style " style={{ fontSize: '30px' }}></i>}

                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* PRODUCT DETAIL MODAL */}
                <div className="modal fade" id="productDetailModal" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "550px", width: "92%" }}>
                        <div
                            className="modal-content position-relative"
                            style={{
                                borderRadius: '10px',
                                boxShadow: '0 6px 12px rgba(0,0,0,0.12)'
                            }}
                        >
                            {/* Product Info */}
                            <div
                                className="d-flex flex-column flex-md-row p-3"
                                style={{
                                    maxHeight: "80vh",
                                    overflowY: "auto",
                                    backgroundColor: "#fff"
                                }}
                            >
                                {/* Left: Description */}
                                <div className="w-100 w-md-70 pe-md-3 position-relative">
                                    {/* Close Icon */}
                                    <i
                                        className="bi bi-x cross-icon"
                                        title="Close"
                                        data-bs-dismiss="modal"
                                    />


                                    {/* Title */}
                                    <h5
                                        className="text-center"
                                        style={{
                                            fontWeight: "700",
                                            fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
                                            marginBottom: "8px",
                                            color: "#6C5CE7",
                                            textTransform: "uppercase",
                                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                        }}
                                    >
                                        About the Product
                                    </h5>

                                    {/* Description */}
                                    <p
                                        style={{
                                            fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
                                            color: "#000",
                                            lineHeight: "1.5",
                                            textAlign: "justify",
                                            marginBottom: "0.8rem"
                                        }}
                                    >
                                        {selectedProduct?.about}
                                    </p>

                                    {/* Image */}
                                    <img
                                        src={selectedProduct?.image || "/FE/images/default.jpg"}
                                        className="img-fluid rounded"
                                        style={{
                                            height: "150px",
                                            width: "100%",
                                            objectFit: "contain",
                                            backgroundColor: "#f0f0f0",
                                            cursor: "pointer",
                                            transition: "transform 0.2s ease"
                                        }}
                                        alt={selectedProduct?.title}
                                        data-bs-toggle="modal"
                                        data-bs-target="#imageModal"
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                </div>

                                {/* Right: Info */}
                                <div className="w-100 w-md-30 border-top border-md-start pt-3 pt-md-0 ps-md-3 mt-3 mt-md-0">
                                    {[
                                        { label: "Name", value: selectedProduct?.title },
                                        { label: "Price", value: `₹${selectedProduct?.price}` },
                                        { label: "Cloth", value: selectedProduct?.cloth || "N/A" },
                                        { label: "Category", value: selectedProduct?.category || "Traditional" },
                                        { label: "Saree Type", value: selectedProduct?.saree_type }
                                    ].map((item, i) => (
                                        <p key={i} style={{
                                            fontSize: "clamp(0.75rem, 1.7vw, 0.9rem)",
                                            marginBottom: "0.4rem",
                                            color: "#2c3e50"
                                        }}>
                                            <strong>{item.label}:</strong> {item.value}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Button */}
                            <div className="border-top p-2 d-flex justify-content-center">
                                <button
                                    className="btn d-flex align-items-center"
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: 'linear-gradient(to right, #fd79a8, #e84393)',
                                        padding: '8px 16px',
                                        color: '#fff',
                                        fontFamily: "'Segoe UI', sans-serif",
                                        fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                        boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}
                                    onClick={() => handleBuyClick(selectedProduct)}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <i className="bi bi-bag-fill me-2" style={{ fontSize: "clamp(1rem, 1.7vw, 1.2rem)" }}></i>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>





            </div>
        </>

    );
};
