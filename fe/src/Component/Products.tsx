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

    const likeProduct = async (productId: any) => {
        try {
            if (!email) { toast.error("Login to like product", { autoClose: 1000 }); }
            if (email) {
                setLoading(true);
                const payload = {
                    email,
                    productId,
                }
                const response = await addLikedProducts(payload);
                if (response) toast.success(response.data.message, { autoClose: 1000 });
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.response?.data?.message, { autoClose: 1000 });
        } finally {
            setLoading(false);
            fetchProducts();
            // window.location.reload();
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
                                        src={product?.image || '/images/default.jpg'}
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
                                                style={{ cursor: "pointer", textDecoration: "underline", maxWidth: "70%" ,color:"#270206"}}
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
                                                style={{ outline: 'none', border: 'none', borderRadius: '5px', background: 'none' }}
                                                className="primary"
                                                title="Buy Now"
                                                onClick={() => handleBuyClick(product)}
                                            >
                                                <i className="bi bi-bag " style={{ fontSize: "30px" }}></i>
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
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
                        <div className="modal-content position-relative" style={{ borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}>
                            {/* Product Info */}
                            <div className="d-flex p-3" style={{ maxHeight: "300px", backgroundColor: "#fff" }}>
                                {/* Left: Description */}
                                <div
                                    className="w-70 pe-3 position-relative"
                                    style={{ width: "70%" }}
                                >
                                    {/* Close Icon (Top-Right Corner) */}
                                    <i
                                        className="bi bi-x cross-icon"
                                        style={{
                                            position: "absolute",
                                            top: "-10px",
                                            right: "-170px",
                                            fontSize: "40px",
                                            color: "black",
                                            cursor: "pointer",
                                            zIndex: "10",
                                        }}
                                        title="Close"
                                        data-bs-dismiss="modal" // ← for Bootstrap modal close
                                    // onClick={() => setShowCard(false)} ← use this if you're hiding via custom state
                                    ></i>

                                    {/* Title */}
                                    <h5
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "700",
                                            fontSize: "22px",
                                            marginBottom: "10px",
                                            marginLeft :"130px",
                                            color: "#6C5CE7",
                                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                        }}
                                    >
                                        About the Product
                                    </h5>

                                    {/* Description */}
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            color: "black",
                                            backgroundColor: "white",
                                            lineHeight: "1.8",
                                            textAlign: "justify",
                                            
                                            marginLeft:"30px",
                                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                            letterSpacing: "0.3px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {selectedProduct?.about}
                                    </p>

                                    {/* Image */}
                                    <img
                                        src={selectedProduct?.image || "/images/default.jpg"}
                                        className="card-img-top"
                                        style={{
                                            height: "200px",
                                            width: "100%",
                                            objectFit: "contain",
                                            objectPosition: "center",
                                            backgroundColor: "#f0f0f0",
                                            cursor: "pointer",
                                            borderRadius: "10px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                            transition: "transform 0.3s ease",
                                        }}
                                        alt={selectedProduct?.title}
                                        data-bs-toggle="modal"
                                        data-bs-target="#imageModal"
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    />
                                </div>

                                {/* Right: Brief info */}
                                <div
                                    className="w-30 border-start ps-3"
                                    style={{
                                        width: "30%",
                                        color: "#2c3e50",
                                        fontSize: "14px",
                                        marginTop: "70px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    <p><strong>Name:</strong> {selectedProduct?.title}</p>
                                    <p><strong>Price:</strong> ₹{selectedProduct?.price}</p>
                                    <p><strong>Cloth:</strong> {selectedProduct?.cloth || "N/A"}</p>
                                    <p><strong>Category:</strong> {selectedProduct?.category || "Traditional"}</p>
                                    <p><strong>Saree Type:</strong> {selectedProduct?.saree_type}</p>
                                </div>
                            </div>

                            {/* Buy Now Button */}
                            <div className="border-top p-3 d-flex justify-content-center">
                                <button
                                    style={{
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: '8px',
                                        background: 'linear-gradient(to right, #fd79a8, #e84393)',
                                        padding: '10px 20px',
                                        color: '#fff',
                                        fontFamily: "'Fantasy', cursive",
                                        fontSize: '18px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        transition: 'transform 0.2s ease-in-out',
                                    }}
                                    className="primary d-flex align-items-center"
                                    title="Buy Now"
                                    onClick={() => handleBuyClick(selectedProduct)}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                >
                                    <i className="bi bi-bag-fill me-3" style={{ fontSize: "22px" }}></i>
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
