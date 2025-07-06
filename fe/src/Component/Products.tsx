import { useEffect, useState } from "react";
import { addCartProducts, addLikedProducts, addOrderService, baseURL, getCategory, getProductByCategory, getProducts } from "../API/API";
import { toast } from "react-toastify";
import { Loader } from "./Loader";


export const Products = () => {
    const [products, setProducts] = useState<any>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [category, setCategory] = useState<any>([]);

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
            setIsCategorySelected(false);
            const response: any = await getCategory();
            if (Array.isArray(response?.data?.data)) {
                setCategory(response.data?.data);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    // const fetchProducts = async () => {
    //     try {
    //         setLoading(true);
    //         const response: any = await getProducts(email);
    //         if (Array.isArray(response.data)) {
    //             setProducts(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch products:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
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
                const whatsappNumber = "919600610845";
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            }
        } catch (error) {
            console.error("Buy operation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const categorySelected = async (product: any) => {
        setLoading(true);
        let response = null;
        if (product == 'all') {
            response = await getProductByCategory('all', email);
        } else {
            response = await getProductByCategory(product?.category, email);
        }
        if (response?.data) {
            setIsCategorySelected(true);
            setProducts(response?.data?.data);
        }
        setLoading(false);
    }

    const handleImageClick = (product: any) => {
        setSelectedProduct(product);
        // setSelectedImages(product);
        setShowModal(true);
    };


    return (
        <>
            <Loader loading={loading}></Loader>
            {!isCategorySelected && (
                <div className="container my-5">
                    <h3
                        className="text-center mb-4 fw-bold text-para"
                        style={{
                            marginTop: "70px",
                            fontSize: "clamp(1rem, 3vw, 1.5rem)",
                        }}
                    >
                        Product Categories
                    </h3>

                    {/* Use Bootstrap gap (g-4) and also padding/margin inside col */}
                    <div className="row g-4 justify-content-center">
                        {[
                            { category: 'All', image: '/FE/images/saree-11.jpeg' },
                            ...category,
                        ]?.map((item: any, idx: number) => (
                            <div
                                className="col-lg-3 col-md-4 col-sm-6 px-3" // px adds horizontal space
                                key={idx}
                            >
                                <div
                                    className="card promise-item p-3 rounded-4 border-0 neon-hover d-flex flex-column align-items-center text-center"
                                    style={{
                                        width: "100%",
                                        height: "360px",
                                        marginBottom: "20px", // ensures vertical spacing as fallback
                                    }}
                                >
                                    <div
                                        className="w-100 mb-3"
                                        style={{
                                            height: "230px",
                                            overflow: "hidden",
                                            backgroundColor: "#f8f8f8",
                                            borderRadius: "0.5rem",
                                        }}
                                    >
                                        <img
                                            src={
                                                item?.image
                                                    ? item.category === "All"
                                                        ? item.image
                                                        : `${baseURL}/${item.image}`
                                                    : "/FE/images/default.jpg"
                                            }
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            alt={item?.category || "Category"}
                                        />
                                    </div>

                                    <h5 className="fw-bold" style={{ fontSize: "1rem" }}>
                                        {item?.category}
                                    </h5>

                                    <button
                                        className="btn btn-outline-primary mt-2"
                                        onClick={() =>
                                            categorySelected(item.category === "All" ? "all" : item)
                                        }
                                    >
                                        View Products
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}




            {isCategorySelected && <div className="container">
                {/* Header & Filter */}
<div className="d-flex flex-column flex-md-row justify-content-center align-items-center text-center gap-3 my-3">
  <h4
    className="fw-bold text-clip-gradient m-0"
    style={{
      fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
    }}
  >
    Our Collections
  </h4>

  <button
    className="btn mt-2 mt-md-0"
    style={{
      padding: "10px 16px",
      color: "white",
      background: "linear-gradient(to right, #c98b8b, #aa9b83)",
      border: "none",
      borderRadius: "5px",
      fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
    }}
    onClick={() => fetchProducts()}
  >
    View Category
  </button>
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
  src={`${baseURL}/${product?.image}` || "/FE/images/default.jpg"}
  className="card-img-top mx-auto d-block"
  onClick={() => handleImageClick(product)}
  data-bs-toggle="modal"
  data-bs-target="#productDetailModal"
  alt={product.title}
style={{
  height: "300px",    // Reduced height (previously 200px or 300px)
  width: "80%",       // Reduced width (previously 90% or 100%)
  objectFit: "cover",
  objectPosition: "center",
  backgroundColor: "#f8f8f8",
  cursor: "pointer",
  borderRadius: "8px",
  display: "block",
  margin: "0 auto",   // Ensures image is centered horizontally
}}

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
                                                    height: "40px",
                                                    whiteSpace: 'nowrap', // Prevent line break
                                                }}
                                                title="Buy Now"
                                                onClick={() => handleBuyClick(product)}
                                            >
                                                <i
                                                    className="bi bi-bag"
                                                    style={{
                                                        fontSize: 'clamp(12px, 1.5vw, 16px)',
                                                        marginTop: "15px"

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

                {selectedProduct && (
                    <div
                        className="modal fade"
                        id="productDetailModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "550px", width: "92%" }}>
                            <div
                                className="modal-content position-relative"
                                style={{
                                    borderRadius: "5px",
                                    boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
                                }}
                            >
                                {/* ❌ Close Icon */}
                                <i
                                    className="bi bi-x"
                                    title="Close"
                                    data-bs-dismiss="modal"
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "15px",
                                        fontSize: "1.3rem",
                                        color: "#333",
                                        cursor: "pointer",
                                        borderRadius: "10px",
                                        padding: "4px",
                                        transition: "border 0.2s ease",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.border = "2px solid black")}
                                    onMouseOut={(e) => (e.currentTarget.style.border = "none")}
                                />

                                {/* 🟣 Title */}
                                <h5
                                    className="text-center"
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
                                        margin: "16px 0 30px 0",
                                        color: "#6C5CE7",
                                        textTransform: "uppercase",
                                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    }}
                                >
                                    About the Product
                                </h5>

                                {/* 🔵 Two Column Layout – FORCED SIDE-BY-SIDE */}
                                <div
                                    className="d-flex flex-row px-3 pb-3"
                                    style={{
                                        flexWrap: "nowrap", // 🚨 prevent stacking
                                        maxHeight: "80vh",
                                        overflowY: "auto",
                                        backgroundColor: "#fff",
                                        gap: "12px",
                                    }}
                                >
                                    {/* Left Side – Image + About */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <img
                                            src={`${baseURL}/${selectedProduct.image}` || "/FE/images/default.jpg"}
                                            className="img-fluid rounded"
                                            alt={selectedProduct.title}
                                            style={{
                                                height: "130px",
                                                width: "100%",
                                                objectFit: "contain",
                                                backgroundColor: "#f0f0f0",
                                                cursor: "pointer",
                                                transition: "transform 0.2s ease",
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#imageModal"
                                            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                                            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                        />
                                        <p
                                            style={{
                                                fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                                                color: "#000",
                                                lineHeight: "1.4",
                                                textAlign: "justify",
                                                marginTop: "0.8rem",
                                                marginLeft: "43%", overflowWrap: "break-word",
                                            }}
                                        >
                                            {selectedProduct.about}
                                        </p>
                                    </div>

                                    {/* Right Side – Details */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        {[
                                            { label: "Name", value: selectedProduct.title },
                                            { label: "Price", value: `₹${selectedProduct.price}` },
                                            { label: "Cloth", value: selectedProduct.cloth || "N/A" },
                                            { label: "Category", value: selectedProduct.category || "Traditional" },
                                            { label: "Saree Type", value: selectedProduct.saree_type },
                                        ].map((item, i) => (
                                            <p
                                                key={i}
                                                style={{
                                                    fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
                                                    marginBottom: "0.4rem",
                                                    color: "#2c3e50",
                                                    overflowWrap: "break-word",
                                                }}
                                            >
                                                <strong>{item.label}:</strong> {item.value}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* 🔘 Buy Button */}
                                <div className="border-top p-2 d-flex justify-content-center">
                                    <button
                                        className="btn d-flex align-items-center"
                                        style={{
                                            outline: "none",
                                            border: "none",
                                            borderRadius: "6px",
                                            background: "linear-gradient(to right, #fd79a8, #e84393)",
                                            padding: "8px 16px",
                                            color: "#fff",
                                            fontFamily: "'Segoe UI', sans-serif",
                                            fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                                            boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                                            transition: "transform 0.2s ease-in-out",
                                        }}
                                        onClick={() => handleBuyClick(selectedProduct)}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        <i
                                            className="bi bi-bag-fill me-2"
                                            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
                                        ></i>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}









            </div>}
        </>

    );
};
